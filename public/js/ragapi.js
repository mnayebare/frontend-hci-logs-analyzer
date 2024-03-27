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
        const res = await fetch(API_URL, {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                data: prompt
            }),
            signal,
        });
        if (!res.ok) {
            console.log("Error fetching data.......", res);
            throw new Error(`Failed to fetch data: ${res.status}`);
        }

        // Read the response as a stream of data
        const reader = res.body.getReader();
        const decoder = new TextDecoder("utf-8");
        const { value } = await reader.read();

        gptRepsonse.innerText = "";
     
         const chunk = decoder.decode(value);
         console.log("what is in res", chunk);
        gptRepsonse.innerText += chunk;

        // while (true) {
        //     const { done, value } = await reader.read();
        //     if (done) {
        //         break;
        //     }

        //     //Get the value of the data this read has no element of done.
        //     const chunk = decoder.decode(value);
        //     console.log("what is in", typeof (chunk));

        //     const lines = chunk.split("\n");
        //     console.log("Give me chuck after the split", lines);

        //     const parsedLines = lines
        //         .map((line) => line.replace(/^data: /, "").trim())
        //         .filter((line) => line !== "" && line !== "[DONE]")
        //         .map((line) => JSON.parse(line));

        //     console.log("what is being mapped", parsedLines);

        //     gptRepsonse.innerText += parsedLines;
        // }

        const record = await res.json();
        const log_data = record.data;

    } catch (error) {
        console.error("Error fetching data.......", error);
    }
}
