// Copyright 2024 Micheal Nayebare


async function sendPrompt(prompt) {
  alert("Prompt: " + prompt);
  // Prompt to send
  const cot_prompt = "Can you provide a Chain of Thought on how to solve " + prompt + "? " +
                   "Without solving the problem just yet, think through this carefully and list systematically and in " +
                   "detail all the possible problems that need to be considered before " +
                   "you can arrive at the answer that has the highest probability of being correct. " 
                  


  // Data payload for the POST request in need to figure out how to send json string
  

  fetch('http://127.0.0.1:8000/api/v1/cot', {
    method: 'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({data:cot_prompt})
  })
    .then(resp => resp.json()) // or, resp.text(), etc
    .then(data => {
      console.log(data); // handle response data
    })
    .catch(error => {
      console.error(error);
    });
}