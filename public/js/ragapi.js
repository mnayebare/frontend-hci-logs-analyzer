// This file is used to fetch the data from the API and display it in the popup.html file
// under the linux system you find the logs in the /var/log/nginx/error.log
//https://www.digitalocean.com/community/tutorials/nginx-access-logs-error-logs


const prompt_button = document.getElementById("result_button");
const stop_button = document.getElementById("stop_button");
const gptRepsonse = document.getElementById("gptResponse");
// const prompt = document.getElementById("prompt").value;
console.log(prompt_button)

//API_URL and API_KEY
const API_URL = "http://127.0.0.1:8000/api/v1/chat";

// Create a new AbortController instance
async function generateShallowRag(prompt) {


    // Disable the generate button and enable the stop button
    //   prompt_button.disabled = true;
    gptResponse.innerText = "Generating response.........";

    // Create a new AbortController instance
    controller = new AbortController();
    const signal = controller.signal;

    try {
        const response = await fetch(API_URL, {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                data: prompt
            }),
            signal,
        });
        if (!response.ok) {
            console.log("Error fetching data.......", response);
            throw new Error(`Failed to fetch data: ${response.status}`);
        }

        // Read the response as a stream of data
        const reader = response.body.getReader();
        const decoder = new TextDecoder("utf-8");

        //what is in the decoder
        console.log("what is in decoder", reader)

        gptRepsonse.innerText = "";

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
                console.log("what is in parsedLines", parsedLine)
                gptRepsonse.innerText += parsedLine.generated_text;
            }
        }
    } catch (error) {
        // Handle fetch request errors
        if (signal.aborted) {
            gptRepsonse.innerText = "Request aborted.";
        } else {
            console.error("Error:", error);
            gptRepsonse.innerText = "Error occurred while generating.";
        }
    } finally {
        result_button.disabled = false;
        controller = null; // Reset the AbortController instance
    }
};