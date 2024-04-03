// This file is used to fetch the data from the API and display it in the popup.html file
// under the linux system you find the logs in the /var/log/nginx/error.log
//https://www.digitalocean.com/community/tutorials/nginx-access-logs-error-logs
async function fetchData() {
  try {
    const res = await fetch("http://127.0.0.1:8000/api/v1/nginxlogs");
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status}`);
    }
    
    const record = await res.json();
    const log_data = record.data;
    const create_serper_file="scrap serper API with this error message"

    let table = "<table class='table table-hover'><thead class='thead-dark'><tr><td>Process_ID</td><td>Timestamp</td><td>Threat Level</td><td>Error Message</td><td> create serper file </td></tr></thead>";

    for (let i = 0; i < log_data.length; i++) {
      table += "<tr>";
      table += "<td class='result_link'>" + log_data[i].process_id + "</td>";
      table += "<td class='result_link'>" + log_data[i].timestamp + "</td>";
      table += "<td class='result_link'>" + log_data[i].log_level + "</td>";
      table += "<td class='result_link'>" + log_data[i].error_message.replace('"', '\\"') + "</td>";
      table += "<td><button id='result_button' class='btn btn-secondary border-primary' onclick='loadSerperFile(\"" + log_data[i].error_message.replace('"', '\\"') + "\"); fetchCloseSerperData();'>" + create_serper_file + "</button></td>"
      table += "</tr>";
    }

    table += "</table>";
    $('.data-table').append(table);
  } catch (error) {
    console.error("Error fetching data.......", error);
  }
}

// Call fetchData function to fetch and display data
fetchData();
