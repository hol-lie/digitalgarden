let me = io.connect();
// let image = document.getElementById("circles");


//calathea
let reflectionWords = [
  "Remember a time where you were happiest",
  "Think about how you were raised, what would you change?",
  "What is your most terrible memory",
];


//pilea
let connectionWords = [
  "Think about someone you appreciate deeply.",
  "Think about the qualities you love about someone",
  "Send a message about how much someone means to you.",
  "What do you value most in friendship?"
];

//dracena
let perceptionWords = [
  "What, if anything, is too serious to be joked about?",
  "Would you liek to be famous? In what way?",
  "Before making a telephone call, do you ever rehearse what you are going to say? Why?",
];





let clientResponse = document.querySelector(".clientResponse");

me.on("connect", () => {
  // console.log(me.id);
});

me.on("personConnected", function (ID) {
  let div = document.createElement("div");
  div.id = "me-" + ID;
  let image = document.createElement("h2"); 
  div.appendChild(image);
  document.body.appendChild(div);
  // document.body.appendChild(image);
});

me.on("personDisconnected", function (id) {  
  let findElement = document.getElementById("me-" + id);
  findElement.remove();
});

me.on("messageYell", function (promptResponse) {
  // console.log(promptResponse.message);

  let findElement = document.getElementById("me-" + promptResponse.id);
      
  
  let textTag = document.createElement("h2")
  
  if(promptResponse.message === "Connection"){
    // imageTag.setAttribute("connection");
      
    // let refelctionWords = Math.floor(Math.random() * reflectionWords.length);
    
    textTag.innerHTML = "connection"
    
    // imageTag.setAttribute("src", "https://cdn.glitch.global/23975ba8-535e-4d98-a0d1-3bd5812e7414/class1gif.gif?v=1682545040550")
  } else if(promptResponse.message === "Reflection"){
        // imageTag.setAttribute("reflection");
    
    // console.log(promptResponse.connectionArray[0]);
   
    // let words = Math.floor(Math.random() * reflectionWords.length);
      textTag.innerHTML = reflectionWords[promptResponse.reflectionChoice]
     // clickforprompt.innerHTML = myWords[words];
    // textTag.innerHTML = reflectionWords[words];

    // imageTag.setAttribute("src", "https://cdn.glitch.global/23975ba8-535e-4d98-a0d1-3bd5812e7414/class2.gif?v=1682546155338")

  }else if(promptResponse.message === "Perception"){
            // imageTag.setAttribute("perception");
      textTag.innerHTML = "per"

    // imageTag.setAttribute("src", "https://cdn.glitch.global/23975ba8-535e-4d98-a0d1-3bd5812e7414/class3.gif?v=1682547305576")

  }
      // console.log(promptResponse.message);

      // findElement.appendChild(imageTag)
      findElement.replaceChild(textTag,findElement.children[0])


});
