// This file is used to fetch the data from the API and display it in the popup.html file
// under the linux system you find the logs in the /var/log/nginx/error.log
//https://www.digitalocean.com/community/tutorials/nginx-access-logs-error-logs
async function fetchCloseSerperData() {
    try {
        const res = await fetch("http://127.0.0.1:8000/api/v1/closeresults");
        if (!res.ok) {
            throw new Error(`Failed to fetch data: ${res.status}`);
        }

        const record = await res.json();
        const log_data = record.data;
        console.log("log_data", log_data);

        let table = "<table class='table table-hover'><thead class='thead-dark'><tr><td>title</td><td>link</td></tr></thead>";

        for (let i = 0; i < log_data.length; i++) {
            table += "<tr>";
            table += "<td class='result_link'>" + log_data[i].title + "</td>";
            table += "<td class='result_link'><a href='" + log_data[i].link + "' target='_blank' >" + log_data[i].link + "</a></td>";
            table += "</tr>";
        }

        table += "</table>";
        $('.close_results_data_table').append(table);
    } catch (error) {
        console.error("Error fetching data.......", error);
    }
}


