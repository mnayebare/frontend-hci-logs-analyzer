
// This code demonstrates how to use the OpenAI API to generate chat completions.
//  This opencode https://github.com/gopinav/ai/blob/main/examples/javascript-vanilla/stream-response.js
// There some slight modifications to the code to fit the current project but credit is given to the original author
// The generated completions are received as a stream of data from the API and the

/**
 * This code demonstrates how to use the OpenAI API to generate chat completions.
 * The generated completions are received as a stream of data from the API and the
 * code includes functionality to handle errors and abort requests using an AbortController.
 * The API_KEY variable needs to be updated with the appropriate value from OpenAI for successful API communication.
 */

// Define the main function

async function furtherInspection() {
var prompt = document.getElementById("selectedResponse").text;
console.log(prompt);

    // 
    // define the variables
    //
    const API_URL = "https://api.openai.com/v1/chat/completions"; //always use the latest version of the API
    const API_KEY = "";

    const result_button = document.getElementById("result_button");
    const gptFurtherResponse = document.getElementById("gptFurtherResponse");
    let controller = null; // Store the AbortController instance

    // 
    // Prompt to send
    //
    const cot_prompt = "Can you provide a Chain of Thought on how to solve " + prompt + "? " +
        "Without solving the problem just yet, think through this carefully and list systematically and in " +
        "detail all the possible problems that need to be considered before " +
        "you can arrive at the answer that has the highest probability of being correct. ";

    // 
    // send only the prompt to the API
    //
    const send_prompt = prompt;

    // 
    // Disable the generate button and enable the stop button
    //
    result_button.disabled = true;
    gptFurtherResponse.innerText = "Generating response.................";

    // 
    // Create a new AbortController instance
    //
    controller = new AbortController();
    const signal = controller.signal;

    try {
        // 
        // Fetch the response from the OpenAI API with the signal from AbortController
        //
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${API_KEY}`,
            },
            body: JSON.stringify({
                model: "gpt-3.5-turbo",
                messages: [{ role: "user", content: cot_prompt }],
                max_tokens: 150,
                stream: true, // For streaming responses
            }),
            signal, // Pass the signal to the fetch request
        });
         
        //
        // Read the response as a stream of data
        //
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");
        gptFurtherResponse.innerText = "";

        while (true) {
            const { done, value } = await reader.read();
            if (done) {
                break;
            }
            // Massage and parse the chunk of data
            const chunk = decoder.decode(value);
            const lines = chunk.split("\n");
            const parsedLines = lines
                .map((line) => line.replace(/^data: /, "").trim()) // Remove the "data: " prefix
                .filter((line) => line !== "" && line !== "[DONE]") // Remove empty lines and "[DONE]"
                .map((line) => JSON.parse(line)); // Parse the JSON string

            for (const parsedLine of parsedLines) {
                const { choices } = parsedLine;
                const { delta } = choices[0];
                const { content } = delta;
                // Update the UI with the new content
                if (content) {
                    gptFurtherResponse.innerText += content;
                }
            }
        }
    } catch (error) {
        // Handle fetch request errors
        if (signal.aborted) {
            gptFurtherResponse.innerText = "Request aborted.";
        } else {
            console.error("Error:", error);
            gptFurtherResponse.innerText = "Error occurred while generating.";
        }
    } finally {
        result_button.disabled = false;
        controller = null; // Reset the AbortController instance
    }
};

const stop = () => {
    // Abort the fetch request by calling abort() on the AbortController instance
    if (controller) {
        controller.abort();
        controller = null;
    }
};
