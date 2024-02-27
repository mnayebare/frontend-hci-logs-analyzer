// This file is used to fetch the data from the API and display it in the popup.html file
async function fetchData() {
  const res=await fetch ("http://127.0.0.1:8000/api/list/nginxlogs");
  const record=await res.json();
  const log_data = record.data;

      $table = "<table class='table table-hover'><thead class='thead-dark'><tr><td>Process_ID</td><td>Timestamp</td><td>Threat Level</td><td>Error Message</td></tr></thead>";
    
      for (var i = 0; i < log_data.length; i++) {
    
        $table += "<tr>";
    
        $table += "<td>" + log_data[i].process_id + "</td>";
        $table += "<td>" + log_data[i].timestamp + "</td>";
        $table += "<td>" + log_data[i].log_level + "</td>";
        $table += "<td><a href='' onclick='sendPrompt();' >" + log_data[i].error_message+ "</a></td>";
        //alert(items[i].duration);
        $table += "</tr>";
      }
    
      $table += "</table>";
      $('.data-table').append($table);
}
fetchData();
