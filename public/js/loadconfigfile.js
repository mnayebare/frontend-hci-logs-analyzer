// This file is used to fetch the data from the API and display it in the popup.html file
// under the linux system you find the logs in the /var/log/nginx/error.log
//https://www.digitalocean.com/community/tutorials/nginx-access-logs-error-logs
async function loadConfigFile() {
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/nginxconfig");
      if (!res.ok) {
        throw new Error(`Failed to fetch data: ${res.status}`);
      }
      
      const record = await res.json();

      document.getElementById("editor").innerText = record.content;

    } catch (error) {
      console.error("Error fetching data.......", error);
    }
  }
  
  // Call fetchData function to fetch and display data
  loadConfigFile();
  