// Initialize the Image Classifier method with MobileNet
let me = io.connect();
let circles = document.getElementById("circles");
let reflectionChoice
let connectionChoice
let perceptionChoice

const video = document.getElementById("webcam");
const webcamPredictions = document.getElementById("webcamPredictions");

const URL = "https://teachablemachine.withgoogle.com/models/-d8fw4DM1/";
const classifier = ml5.imageClassifier(URL, modelLoaded);




me.on("connect", () => {
  console.log(me.id);
  // When the model is loaded
  //make sure the length of the array is the same as the length of the number in the Math. thing
  reflectionChoice = Math.floor(Math.random() * 3);
  connectionChoice = Math.floor(Math.random() * 3);
  perceptionChoice = Math.floor(Math.random() * 3);
});


var modelHasLoaded = false;
var model = undefined;

function modelLoaded() {
  console.log("Model Loaded!");
  model = modelLoaded;
  modelHasLoaded = true;
}

function hasGetUserMedia() {

  
  return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

  // const capture = async facingMode => {
  //   const options = {
  //     audio: false,
  //     video: {
  //       facingMode,
  //     },
  //   };

function predictWebcam() {
  classifier.classify(video).then(function (predictions) {
    webcamPredictions.innerText = "Let's talk about " + predictions[0].label;
    if (Math.round(parseFloat(predictions[0].confidence) * 100) > 30) {
      let messageYell = {
        message: predictions[0].label,
        id: me.id, 
        reflectionChoice:reflectionChoice, 
        connectionChoice:connectionChoice,
        perceptionChoice: perceptionChoice
        // image: circles,
      };

      // if ((messageYell = predictions[0])) {
      //   // console.log("predictions1");
      //   let messageYell = {
      //     message: predictions[0].label,
      //     id: me.id,
      //     // image: circles,
      //   };
        me.emit("newMessage", messageYell);
      
    }

    window.requestAnimationFrame(predictWebcam);
  });
}

function enableCam(event) {
  if (!modelHasLoaded) {
    return;
  }
}
const constraints = {
  video: {
    facingMode: {
      exact: "environment"
    }
  }
};

// Activate the webcam stream.
navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
  video.srcObject = stream;
  video.addEventListener("loadeddata", predictWebcam);
});

// If webcam supported, add event listener to button for when user
// wants to activate it.
if (hasGetUserMedia()) {
  const enableWebcamButton = document.getElementById("webcamButton");
  enableWebcamButton.addEventListener("click", enableCam);
} else {
  console.warn("getUserMedia() is not supported by your browser");
}
