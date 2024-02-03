document.getElementById('talkBtn').addEventListener('click', () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.start();
  
      recognition.onstart = function() {
        console.log('Voice recognition started. Speak into the microphone.');
      };
  
      recognition.onspeechend = function() {
        recognition.stop();
      };
  
      recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        console.log(transcript);
        // You can process the transcript here, e.g., send it to a server or display it in the UI.
      };
    } else {
      console.error('Speech Recognition API not supported.');
    }
});

document.getElementById('recordBtn').addEventListener('click', () => {
    // Start video logic
    console.log("Hiiiii");
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
    // End call logic
});

