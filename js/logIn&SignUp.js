//variabili globali che utilizzo
var formLogIn = document.getElementById("formLogIn");
var usernameLogIn = document.getElementById("usernameLogIn");
var passwordLogIn = document.getElementById("passwordLogIn");
var formSignUp = document.getElementById("formSignUp");
var usernameSignUp = document.getElementById("usernameSignUp");
var passwordSignUp = document.getElementById("passwordSignUp");
var showPassword = document.getElementById("showPassword");
var hidden = true;


//formato per il controllo dei caratteri
var format = /[ `!@#$%^&*()+\-=\[\]{};':"\\|,<>\/?~]/g;


function begin() {
    // quando viene caricata la pagina scelgo se mostrare il login o il signup in base alla variabile di sessione
    var res = document.getElementById("ctx").innerHTML.replace(/[ \r\n]/g, '');
    if (res === "SignUp")
        changeForm("SignUp",0);
    else
        changeForm("LogIn",0);
    //aggiorno lo stile degli errori
    LogInError();
    SignUpError();
}

//Aggiorna lo stile dell'occhio che mostra la password
showPassword.addEventListener("click", function(){
    var status = passwordSignUp.type;
    if (status === "password") {
        passwordSignUp.type = "text";
        showPassword.src = "./css/img/openedeye.png";
    } else {
        passwordSignUp.type = "password";
        showPassword.src = "./css/img/closedeye.png";
    }
});

// funzioni che aggiornano lo stile degli input in login e signin

function LogInError() {
    if (document.getElementById("logInError").textContent !== "") {
        usernameLogIn.style.backgroundColor = "red";
        passwordLogIn.style.backgroundColor = "red";
    } else {
        usernameLogIn.style.backgroundColor = "black";
        passwordLogIn.style.backgroundColor = "black";
    }
}

function SignUpError() {
    if (document.getElementById("usernameSignUpError").textContent !== "") {
        usernameSignUp.style.backgroundColor = "red";
    } else {
        usernameSignUp.style.backgroundColor = "black";
    }

    if (document.getElementById("passwordSignUpError").textContent !== "") {
        passwordSignUp.style.backgroundColor = "red";
    } else {
        passwordSignUp.style.backgroundColor = "black";
    }
}

function changeForm(value,timer) {
    //pulsanti che mi cambiano la form
    var buttonLogIn = document.getElementById("changeToLogIn");
    var buttonSignUp = document.getElementById("changeToSignUp");
    //setto il tempo di animazione per le form e per i pulsanti
    formLogIn.style.transition = formSignUp.style.transition =
        buttonLogIn.style.transition = buttonSignUp.style.transition = "display " + timer + "s, opacity " + timer + "s";

    if (value === "SignUp") { //cambio in signUp
        
        //faccio sparire la form e il pulsante relativi al login
        formLogIn.style.opacity = buttonSignUp.style.opacity = 0;
        formLogIn.style.display = buttonSignUp.style.display = "none";

        //faccio apparire la form e il pulsante relativi al signup
        formSignUp.style.display = buttonLogIn.style.display = "inline-block";
        formSignUp.style.opacity = buttonLogIn.style.opacity = 1;

    } else { //cambio in logIn

        //faccio sparire la form e il pulsante relativi al signup
        formSignUp.style.display = buttonLogIn.style.display = "none";
        formSignUp.style.opacity = buttonLogIn.style.opacity = 0;

        //faccio apparire la form e il pulsante relativi al login
        buttonSignUp.style.display = formLogIn.style.display = "inline-block";
        buttonSignUp.style.opacity = formLogIn.style.opacity = 1;
    }
}

//controllo la form di login in js prima di fare la richiesta in php
formLogIn.addEventListener("submit", function(e){
    //variabile che setto se trovo un errore
    var error = false;
    //contatore utilizzo caratteri speciali
    var nSpecialCharactersUsername = 0;
    var nSpecialCharactersPassword = 0;

    if (usernameLogIn.value.match(format) != null)
        nSpecialCharactersUsername = usernameLogIn.value.match(format).length;

    if (passwordLogIn.value.match(format) != null)
        nSpecialCharactersPassword = passwordLogIn.value.match(format).length;

    /*controllo il formato dello username (non vuota, compresa tra 6 e 15  
        e al massimo 2 caratteri speciali)*/
    if (usernameLogIn.value === "" || usernameLogIn.value.length < 6 ||
        usernameLogIn.value.length > 15 || nSpecialCharactersUsername > 2)
        error = true;

    /*controllo il formato della password (non vuota, compresa tra 8 e 20, 
        con almeno un carattere speciale ma non piu di 5, 
        con almeno un numero una maiuscola e una minuscola */
    if (
        passwordLogIn.value === "" || passwordLogIn.value.length < 8 || passwordLogIn.value.length > 20 ||
        (nSpecialCharactersPassword == 0) || (nSpecialCharactersPassword > 5) ||
        (passwordLogIn.value.match(/[0-9]/) == null) || (passwordLogIn.value.match(/[a-z]/) == null) ||
        (passwordLogIn.value.match(/[A-Z]/) == null)
        )
        error = true;
       
    //restituisco errore in caso di utente o password non validi ed impedisco la sottomissione della form
    if (error) {
        e.preventDefault();
        document.getElementById("logInError").textContent = "Username o Password Errati.";
    } else {
        document.getElementById("logInError").textContent = "";
    }

    //aggiorno lo stile degli input
    LogInError();

});

//controllo la form di sign up js prima di fare la richiesta in php
formSignUp.addEventListener("submit", function (e) {
    //variabile che setto se trovo un errore
    var error = false;
    //contatore utilizzo caratteri speciali
    var nSpecialCharactersUsername = 0;
    var nSpecialCharactersPassword = 0;
    //info su errori
    var pErrorUsername = "";
    var pErrorpassword = "";

    if (usernameSignUp.value.match(format) != null) 
        nSpecialCharactersUsername = usernameSignUp.value.match(format).length;

    if (passwordSignUp.value.match(format) != null) 
        nSpecialCharactersPassword = passwordSignUp.value.match(format).length;
    
    //controllo dello username
    if (usernameSignUp.value === "") {
        pErrorUsername = "Inserire uno Username.";
        error = true;
    } else if (usernameSignUp.value.length < 6) {
        pErrorUsername = "Inserisci almeno 6 caratteri.";
        error = true;
    } else if (usernameSignUp.value.length > 15) {
        pErrorUsername = "Non puoi inserire piu di 15 caratteri.";
        error = true;
    } else if (nSpecialCharactersUsername > 2) {
        pErrorUsername = "Non puoi utilizzare piu di 2 caratteri speciali differenti.";
        error = true;
    } else if (usernameSignUp.value.match("_") != null) {
        pErrorUsername = "Carattere _ non utilizzabile";
        error = true;
    } else if (usernameSignUp.value.indexOf('.') != -1) {
        pErrorUsername = "Carattere . non utilizzabile";
        error = true;
    }

    //controllo della password
    if (passwordSignUp.value === "") {
        pErrorpassword = "Inserire una Password.";
        error = true;
    } else if (passwordSignUp.value.length < 8) {
        pErrorpassword = "Inserisci almeno 8 caratteri.";
        error = true;
    } else if (passwordSignUp.value.length > 20) {
        pErrorpassword = "Password troppo lunga.";
        error = true;
    } else if (nSpecialCharactersPassword == 0) {
        pErrorpassword = "Utilizza almeno un carattere speciale.";
        error = true;
    } else if (nSpecialCharactersPassword > 5) {
        pErrorpassword = "Hai utilizzato troppi caratteri speciali.";
        error = true;
    } else if (passwordSignUp.value.match(/[0-9]/) == null) {
        pErrorpassword = "Utilizza almeno un numero";
        error = true;
    } else if (passwordSignUp.value.match(/[a-z]/) == null) {
        pErrorpassword = "Usa almeno una lettera minuscola";
        error = true;
    } else if (passwordSignUp.value.match(/[A-Z]/) == null) {
        pErrorpassword = "Usa almeno una lettera maiuscola";
        error = true;
    }

    document.getElementById("usernameSignUpError").textContent = pErrorUsername;
    document.getElementById("passwordSignUpError").textContent = pErrorpassword;

    if (error) //impedisco la sottomissione della form in caso di errore
        e.preventDefault();
    
    
    SignUpError();

});
