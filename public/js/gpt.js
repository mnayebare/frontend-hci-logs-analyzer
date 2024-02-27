// Copyright 2024 Micheal Nayebare


async function sendPrompt(prompt) {
    // Prompt to send
    const prompt = "Can you provide a Chain of Thought on how to solve" + prompt +" 
    +"Without solving the problem just yet, think through this carefully and list systematically and in"
    +"detail all the possible problems that need to be consindered before"
    +"you can arrive at the answer that has the highest probability of being correctCan you provide "
    +"a Chain of Thought on the benefits of renewable energy?";
    
    // Data payload for the POST request
    const data = {
      prompt: prompt
    };
  
    try {
      // Send POST request to FastAPI endpoint
      const response = await fetch("http://127.0.0.1:8000/api/v1/cot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      // Check if request was successful
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      else{
        console.log("Request was successful", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  
  // Call the function to send the prompt
  sendPrompt();
  