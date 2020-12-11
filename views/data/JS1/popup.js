var modal = document.querySelector(".modal");
var clicking = document.querySelector(".clicking");
var closeBttn = document.querySelector(".closeBttn");
window.addEventListener("click", windowOnClick);
clicking.addEventListener("click", change_Modal);
closeBttn.addEventListener("click", change_Modal);

function change_Modal() {
    modal.classList.toggle("change-modal");
}
clicking.onclick = function () {
    modal.style.display = "block";
};

function windowOnClick(event) {
    if (event.target == modal) {
        change_Modal();
    }
}