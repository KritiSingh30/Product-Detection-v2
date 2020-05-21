//DISPLAY IMAGE ON SCREEN
const inpFile = document.getElementById("inpFile");
const previewContainer = document.getElementById("imagePreview");
const previewImage = previewContainer.getElementById("imagePreviewImage");
const previewDefaultText = previewContainer.getElementById("imagePreviewDefaultText");


inpFile.addEventListener("change",function(){
    const file = this.files[0];
    //console.log(file);

    if(file) {
        /* if the file select pop up is closed
           chrome displays file as undefined */
        const reader = new FileReader();

        previewDefaultText.style.display = "none";
        previewImage.style.display = "block";

        reader.addEventListener("load", function(){
            previewImage.setAttribute("src",this.result);
        });

        reader.readAsDataURL(file);
    }else {
        previewDefaultText.style.display = "null";
        previewImage.style.display = "null";
        previewImage.setAttribute("src","");
        

    }
});
