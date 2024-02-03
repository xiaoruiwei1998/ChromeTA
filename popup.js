document.getElementById('recordBtn').addEventListener('click', () => {
  queryGPT("Hi GPT, how are you doing?")
    .then((response) => {
        console.log(response); // Handle the response
    })
    .catch((error) => {
        console.error(error); // Handle any errors
    });
});

document.getElementById('shareScreenBtn').addEventListener('click', async () => {
    // Share screen logic
    try {
        const stream = await navigator.mediaDevices.getDisplayMedia({ video: true });
        // Handle the screen capture stream.
        console.log('Screen sharing stream:', stream);
    } catch (error) {
        console.error('Error sharing the screen:', error);
    }
});

document.getElementById('endCallBtn').addEventListener('click', () => {
  window.close();
});

document.addEventListener('DOMContentLoaded', function () {
  const toggleBtn = document.getElementById('talkBtn');
  let isListening = false; // Tracks the microphone state
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();

  recognition.continuous = true; // Keep the microphone open

  recognition.onstart = function() {
      console.log('Microphone is on.');
  };

  recognition.onend = function() {
      console.log('Microphone is off.');
  };

  recognition.onerror = function(event) {
      console.error('Speech recognition error', event.error);
  };

  toggleBtn.addEventListener('click', () => {
      if (!isListening) {
          recognition.start();
          toggleBtn.textContent = 'Stop Microphone';
      } else {
          recognition.stop();
          toggleBtn.textContent = 'Start Microphone';
      }
      isListening = !isListening; // Toggle the state
  });
  recognition.onresult = function(event) {
    // Handle the speech result here
    transcript = event.results[event.resultIndex][0].transcript;
    console.log(transcript);
    queryGPT(transcript)
          .then((response) => {
              console.log(response);
          })
          .catch((error) => {
              console.error(error);
          });
};
});
