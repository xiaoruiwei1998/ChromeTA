chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed.');
    // Perform any setup or initialization here, if necessary.
});

// Example of making a request to the OpenAI API from your extension's background script

// const openAIRequest = async () => {
//     const response = await fetch('https://api.openai.com/v1/completions', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer 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`
//       },
//       body: JSON.stringify({
//         model: "gpt-3.5-turbo",
//         prompt: "translate English to French: 'Hello, world!'",
//         temperature: 0.7,
//         max_tokens: 64,
//       })
//     });
//     const data = await response.json();
//     console.log(data);
//   };

async function fetchOpenAiResponse(prompt) {
    const apiKey = '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'; // Consider securely storing and retrieving your API key
    const response = await fetch('https://api.openai.com/v1/engines/davinci/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: prompt,
        temperature: 0.7,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
      })
    });
    const data = await response.json();
    return data;
  }
  
// openAIRequest().catch(console.error);
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "fetchOpenAiResponse") {
      fetchOpenAiResponse(message.prompt).then(response => {
        sendResponse(response);
      });
      return true; // Indicates you wish to respond asynchronously
    }
});