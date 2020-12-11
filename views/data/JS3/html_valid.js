var input=document.getElementById("Password");
var error_message =document.querySelector(".aside_area");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
var answer = document.getElementById("answer");
var answer2 = document.getElementById("answer2");
var answer3 = document.getElementById("answer3");
var answer4 = document.getElementById("answer4");

//----------------------------------------------- Main Function
// Receiving the Html form validation



 
validating = function(){
  
    var boolean =true;
    var Email = document.forms["User_Registration_data"]["Email"];
    var First_name = document.forms["User_Registration_data"]["First_name"];
    var Last_name= document.forms["User_Registration_data"]["Last_name"];
    var Password = document.forms["User_Registration_data"]["Password"];
    var Birthday = document.forms["User_Registration_data"]["birthday"];
    //------------------------------------------------------------------//


    var per_position=Email.value.indexOf("@");  
    var per_dot_position=Email.value.lastIndexOf(".");  
    if (per_position<1 || per_dot_position<per_position+2 || per_dot_position+2>=Email.length){  
      let text ="Please enter a valid e-mail address !!!";  
      document.getElementById("email_err").style.color='red';
      document.getElementById("email_err").style.fontWeight='500';
      document.getElementById("email_err").innerHTML=text;
      boolean=false; 
      }  
    else{
        document.getElementById("email_err").innerHTML='';
    }
    if (Email.value === "" ) {
        window.alert("Please enter your Email. !!!"); 
        Email.focus(); 
        boolean=false; 
    }
    
    if (First_name.value === "" ) {
        window.alert("Please enter your First name. !!!"); 
        First_name.focus(); 
        boolean=false; 
    }
    if (Last_name.value === "" ) {
        window.alert("Please enter your Last name. !!!"); 
        Last_name.focus(); 
        boolean=false; 
    }
    if (Password.value === "" ) {
        window.alert("Please enter your Password. !!!"); 
        Password.focus(); 
        boolean=false; 
    }
    var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,12}$/;
    var specialCh = /[^\w\s\d]/gim;
    if(Password.value.match(pattern) && !(Password.value.match(specialCh)) ) 
    { 
        document.getElementById("password_err").innerHTML="";
    }
    else if (Password.value.match(specialCh)){
        let text ="Don't use special characters !!!";  
        document.getElementById("password_err").style.color='red';
        document.getElementById("password_err").style.fontWeight='900';
        document.getElementById("password_err").innerHTML=text;
        boolean = false;
    }
    else if (Password.value === "" ){
      let text ="No Password data !!!";  
      document.getElementById("password_err").style.color='red';
      document.getElementById("password_err").style.fontWeight='900';
      document.getElementById("password_err").innerHTML=text;
      boolean = false;
    }
    else
    { 
        let text ="Wrong Password Pattern !!!";  
        document.getElementById("password_err").style.color='red';
        document.getElementById("password_err").style.fontWeight='900';
        document.getElementById("password_err").innerHTML=text;
        boolean = false;
    }



    if (Birthday.value === "" ) {
        window.alert("Please enter your Birthday date. !!!"); 
        Birthday.focus(); 
        boolean=false; 
    }
   
   
    return boolean;
};

//--------------------------------------------------------------
input.onfocus = function() {
    error_message.style.display = "block";
  }
  
  input.onblur = function() {
    error_message.style.display = "none";
  }

  input.onkeyup = function() {
    // Validate lowercase letters
    var lowerCaseLetters = /[a-z]/g;
    if( input.value.match(lowerCaseLetters)) {  
      letter.classList.remove("invalid");
      letter.classList.add("valid");
      answer.innerHTML =" Valid !!";
      answer.style.fontWeight="900";
    } else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
      answer.innerHTML ="";
    }
    
    // Validate capital letters
    var upperCaseLetters = /[A-Z]/g;
    if( input.value.match(upperCaseLetters)) {  
      capital.classList.remove("invalid");
      capital.classList.add("valid");
      answer2.innerHTML =" Valid !!";
      answer2.style.fontWeight="900";
    } else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
      answer2.innerHTML ="";
    }
  
    // Validate numbers
    var numbers = /[0-9]/g;
    if( input.value.match(numbers)) {  
      number.classList.remove("invalid");
      number.classList.add("valid");
      answer3.innerHTML =" Valid !!";
      answer3.style.fontWeight="900";
    } else {
      number.classList.remove("valid");
      number.classList.add("invalid");
      answer3.innerHTML ="";
    }
    
    // Validate length
    if( input.value.length >= 6 && input.value.length <= 12 ) {
      length.classList.remove("invalid");
      length.classList.add("valid");
      answer4.innerHTML =" Valid !!";
      answer4.style.fontWeight="900";
    } else {
      length.classList.remove("valid");
      length.classList.add("invalid");
      answer4.innerHTML ="";
    }
  }