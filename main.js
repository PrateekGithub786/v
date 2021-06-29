var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

function start() {
    document.getElementById("microphone").src = "Speak.gif";
    document.getElementById("textbox").innerHTML = "";
    recognition.start();
    setTimeout(function () {
        document.getElementById("microphone").src = "mi.png";
    }, 6000);
}

recognition.onresult = function (event) {
    console.log(event);

    var content = event.results[0][0].transcript;
    console.log(content);
    document.getElementById("textbox").innerHTML = content;
    if (content == "take my selfie") {
        speak();
    }

}

function speak() {
    var synthesis = window.speechSynthesis;
    var text_data = "taking your selfie in 5 seconds";
    var speakThis = new SpeechSynthesisUtterance(text_data);
    /*
    speakThis.pitch = 10;
    pitch of speech
    speakThis.volume = 0.4;
    volume of speech*/
    synthesis.speak(speakThis);
    Webcam.attach(camera);
    setTimeout(function(){
        take_snapshot();
        save();
    }, 5000);
}

camera = document.getElementById("camera");

Webcam.set({
    width: 360,
    height: 250,
    image_format: 'png',
    png_quality: 90
});

function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="selfie_img" src="' + data_uri + '"/>';
    });
}

function save(){
    link = document.getElementById("link");
    image = document.getElementById("selfie_img").src;
    link.href = image;
    link.click();
}