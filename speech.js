const apiKey = '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';

// Function to call OpenAI's text-to-speech API
function openAITextToSpeech(text) {
    const url = 'https://api.openai.com/v1/audio/speech'; // This URL is for example purposes; replace with the actual API endpoint for OpenAI's text-to-speech
    const postData = {
    model: "tts-1",
    input: text,
    voice: "alloy"
    };

    fetch(url, {
    method: 'POST',
    headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(postData)
    })
    .then(response => {
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.blob(); // Assuming the response is a binary audio file
    })
    .then(blob => {
        // Create a blob URL from the blob
        const audioURL = URL.createObjectURL(blob);
        
        // Create a new audio element and set the source to the blob URL
        const audio = new Audio(audioURL);
        audio.play(); // Play the audio
      
        // Optional: Revoke the blob URL to release memory after the audio has been played
        audio.onended = () => {
          URL.revokeObjectURL(audioURL);
        };
      })
      .catch(error => {
        console.error('There was an error with the speech synthesis request:', error);
      });
}

async function queryGPT (prompt){
    console.log("test in");
    
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo", // Or any other model you wish to use
            messages: [{
                role: "system",
                content: "You are a helpful assistant."
            },{
                role: "user",
                content: prompt
            }],
            temperature: 0,
            max_tokens: 200
        })
    });
    const data = await response.json();
    openAITextToSpeech(data.choices[0].message.content);
    return data.choices[0].text;
}

