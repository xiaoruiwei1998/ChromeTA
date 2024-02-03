// Define your API key (securely) and the endpoint URL
const apiKey = 'API_KEY'; // Replace this with your actual OpenAI API key
const endpointUrl = 'https://api.openai.com/v1/chat/completions';

async function main() {
  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4-vision-preview",
        messages: [
          {
            role: "user",
            content: [
              { type: "text", text: "What’s in this image?" },
              {
                type: "image_url",
                image_url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    if (data.choices && data.choices.length > 0) {
        const choice = data.choices[0];
        if (choice.message && choice.message.content) {
          console.log(choice.message.content);
        } else {
          console.log('Content not found in the message');
        }
    } else {
        console.log('No choices found in the response');
    }
  } catch (error) {
    console.error('Request failed:', error);
  }
}

main();
