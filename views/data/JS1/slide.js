function Slides(n) {


    var slides = document.querySelectorAll(".Slides_detail");
    if (n > slides.length) { //Reversing

        Index = 1;
    }
    if (n < 1) { // Reversing 
        Index = slides.length;
    }
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slides[Index - 1].style.display = "block"; // Showing current photo

}
var Index = 1;
Slides(Index);

function Move_slides(n) {
    Slides(Index += n);
}