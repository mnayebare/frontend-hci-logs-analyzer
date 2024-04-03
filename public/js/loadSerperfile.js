// This file is used to fetch the data from the API and display it in the popup.html file
// under the linux system you find the logs in the /var/log/nginx/error.log
//https://www.digitalocean.com/community/tutorials/nginx-access-logs-error-logs
async function loadSerperFile(prompt) {
    try {
        const response = await fetch("http://127.0.0.1:8000/api/v1/serper", {
            method: "POST",
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
            body: JSON.stringify({
                data: prompt
            }),
        });
       
        //console log prompt sent 
        console.log("what is prompt", prompt);
        
        const record = await response.json();

        document.getElementById("serper_file").innerText = record.content;
     
    }
    catch (error) {
        console.error("Error fetching data.......", error);
    }
}

// Call fetchData function to fetch and display data
//loadSerperFile();
