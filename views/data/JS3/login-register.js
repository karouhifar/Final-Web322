var dataL = document.getElementById("login");
var dataR = document.getElementById("register");
var word1 = document.getElementById("A");
var word2 = document.getElementById("B");
var dataB = document.querySelector(".color");

function register() {
    dataL.style.left = "-100%";
    dataR.style.left = "0";
    dataB.style.left = "50%";
    word2.style.left = "25%";
    word1.style.left = "-100%";
    dataR.transform = "translate(0, 0)";
    
}

function login() {
    dataL.style.left = "0";
    dataR.style.left = "100%";
    dataB.style.left = "0";
    word1.style.left = "25%";
    word2.style.left = "-100%";
    dataL.transform = "translate(0, 0)";
}

