//DISPLAY IMAGE ON SCREEN
var loadFile = function(event) {
    var image = document.getElementById('output');
    image.src = URL.createObjectURL(event.target.files[0]);
    };

//Show result function
function showResult(file) {
    fileDataURL( file)
    .then( data => showResponse(data.slice(23)))
    .catch(err => console.log(err));
}
 //BASE ENCODE THE UPLOADED IMAGE
 const fileDataURL = file => new Promise((resolve,reject) => {
    let fr = new FileReader();
    fr.onload = () => resolve( fr.result);
    fr.onerror = reject;
    fr.readAsDataURL( file)
});

//REQUEST AND RESPONSE FROM VISION API

function showResponse(contents){
    var data = JSON.stringify({"requests":[{"image":{"content":`${contents}`},"features":[{"type":"TEXT_DETECTION","maxResults":1}]}]});
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("readystatechange", function() {
    if(this.readyState === 4) {
        //console.log(this.responseText);
        console.log("Success");
    }
    });
    xhr.open("POST", "https://vision.googleapis.com/v1/images:annotate?key=AIzaSyAgKoAsY740EfT73y6wZgLHCIWTe8HvFUo");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);  
    xhr.onreadystatechange = processRequest;
    function processRequest(e){
        if(xhr.readyState == 4 && xhr.status == 200){
            alert(xhr.responseText);
            var data = JSON.parse(xhr.responseText);
            var final_text = data.responses[0].textAnnotations[0].description
            var el_down = document.getElementById("textResults"); 
            el_down.innerHTML = JSON.stringify((final_text).replace("\n", ' '));
            var x =  document.getElementById("textResults").textContent;
            const arr1 = ["MUSIC","skin", "lotion"];
            let hasSome = arr1.some(item => x.includes(item));
            console.log(hasSome);
            
        }
    }
}