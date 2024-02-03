let mediaRecorder; // Define mediaRecorder globally so it can be accessed in different functions
let recordedChunks = [];

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

document.getElementById('shareScreenBtn').addEventListener('click', async () => {
  try {
    // Request screen capture
    const stream = await navigator.mediaDevices.getDisplayMedia({
      video: { cursor: "always" },
      audio: false
    });

    console.log('Screen sharing stream:', stream);

    // Create a video element to play the shared screen
    const videoElement = document.createElement('video');
    videoElement.autoplay = true;
    videoElement.srcObject = stream;
    videoElement.style.display = 'none'; // Hide the video element
    document.body.appendChild(videoElement);

    videoElement.onloadedmetadata = () => {
      // Ensure the video stream is ready to play
      videoElement.play().then(() => {
        // Create a canvas element to capture the first frame
        const canvas = document.createElement('canvas');
        canvas.width = videoElement.videoWidth;
        canvas.height = videoElement.videoHeight;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

        // Convert the canvas to a Blob
        canvas.toBlob(blob => {
          console.log('Blob ready to be sent:', blob);
          // Here you can send the blob to your server or OpenAI API
          // sendBlobToServer(blob); // Implement this function according to your requirements
        }, 'image/jpeg', 0.95); // Adjust the image format and quality as needed

        // Cleanup after capturing the frame
        document.body.removeChild(videoElement);
        stream.getTracks().forEach(track => track.stop());
      });
    };

    // Handle the stop event when the user stops sharing their screen
    stream.getVideoTracks()[0].addEventListener('ended', () => {
      console.log('Screen sharing stopped');
      document.body.removeChild(videoElement); // Remove the video element
    });
  } catch (error) {
    console.error('Error sharing the screen:', error);
  }
});


// In popup.js or a content script
chrome.runtime.sendMessage({action: "fetchOpenAiResponse", prompt: "Your prompt here"}, response => {
  console.log(response); // Handle the response
});


document.getElementById('recordBtn').addEventListener('click', () => {
    // Start video logic
    console.log("Hiiiii");
});

document.getElementById('endCallBtn').addEventListener('click', () => {
    // End call logic
});

