status = "";
objects= [];

function preload(){
video=createVideo("vid.mp4");
}
function setup(){
canvas= createCanvas(480,380);
canvas.center();
video.hide();
}
function draw(){
image(video, 0,0,480,380);
if (status != ""){
    object_detector.detect(video, gotResult);
    for(var i=0; i <= objects.length; i++){
        document.getElementById("status").innerHTML="Objects Detected";
        document.getElementById("object_amount").innerHTML= "number of objects"+objects.length;
        fill("#f4c2c2");
        var percent= floor(objects[i].confidence*100);
        text(objects[i].label+" "+percent+"%", objects[i].x+15, objects[i].y+15);
        noFill();
        stroke("#f4c2c2");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
    }
}
}
function gotResult(error, results){
if (error){
    console.log(error);
}
    console.log(results);
    objects=results;
}
function start_video(){
    object_detector= ml5.objectDetector("cocoSSD",modelLoaded);
    document.getElementById(status).innerHTML="Status: Detecting Objects";
}

function modelLoaded(){
    console.log("model loaded");
status=true;
video.loop();
video.speed(1);
video.volume(0);
}