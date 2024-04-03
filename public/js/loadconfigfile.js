//
// new configuration file
//

    // Function to dynamically set the code in the editor
    function loadDynamicCode(newCode) {
      editor.setValue(newCode, -1); // -1 moves the cursor to the start
  }

  // Example of fetching code from a URL and loading it into the editor
  function fetchAndLoadCode(url) {
      fetch(url)
          .then(response => {
              if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
              }
              return response.json();
          })
          .then(code => {
              console.log('Fetched code:', code["content"]);
              loadDynamicCode(code.content);
          })
          .catch(error => {
              console.error('Fetching code failed:', error);
              loadDynamicCode('// Failed to load code');
          });
  }

  // URL of the code to fetch (replace with your actual URL)
  const codeUrl = 'http://127.0.0.1:8000/api/v1/nginxconfig';

  // Fetch and load the code
  fetchAndLoadCode(codeUrl);

// // // This file is used to fetch the data from the API and display it in the popup.html file
// // // under the linux system you find the logs in the /var/log/nginx/error.log
// // //https://www.digitalocean.com/community/tutorials/nginx-access-logs-error-logs
// async function loadConfigFile() {
//     try {
//       const res = await fetch("http://127.0.0.1:8000/api/v1/nginxconfig");
//       if (!res.ok) {
//         throw new Error(`Failed to fetch data: ${res.status}`);
//       }
      
//       const record = await res.json();

//     //  document.getElementById("editor").inner = record.content;
//       // $('#editor').append(record.content);
//       // const data = record;
//       // $('#editor').append(record.content);
//       // $('#editor').text(record.content);

//     // console.log(typeof(record.content)) ;

//     // editor.setValue(newCode, -1); // -1 moves the cursor to the start
//     // // Function to dynamically set the code in the editor
//     // function loadDynamicCode(newCode) {
//       editor.setValue(newCode, -1); // -1 moves the cursor to the start
//   // }

//   // Example usage: Load new code into the editor after 3 seconds
//   setTimeout(() => {
  
//         document.getElementById("editor").innerText = record.content;
//   }, 2000);

//     } catch (error) {
//       console.error("Error fetching data.......", error);
//     }
//   }
  
//   // Call fetchData function to fetch and display data
//   loadConfigFile();
