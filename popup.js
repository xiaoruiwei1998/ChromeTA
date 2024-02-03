document.getElementById('talkBtn').addEventListener('click', () => {
    var button = event.target;
    var status = button.getAttribute('data-status');
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.continuous = true; 
    var transcript = "";

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

    if (status === "inactive") {
      button.setAttribute('data-status', 'active');
      button.textContent = 'Speaking'; // Change button text or appearance
      if (SpeechRecognition) {
        recognition.start();
        recognition.onstart = function() {
          console.log('Voice recognition started. Speak into the microphone.');
        };
      } else {
        console.error('Speech Recognition API not supported.');
      }
    } else {
        button.setAttribute('data-status', 'inactive');
        button.textContent = 'Start Speaking'; 
    }
});

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

