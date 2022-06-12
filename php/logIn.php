<?php
// è richiesto il file di connessione al DB affinche si possa effettuare il login
require "./DBConnection.php";

session_start();

//recupero i valori passati tramite form e li controllo
$usernameLogIn = $AsteroidsDB->sqlInjectionFilter($_POST["usernameLogIn"]);
$passwordLogIn = $AsteroidsDB->sqlInjectionFilter($_POST["passwordLogIn"]);

//tengo memorizzato lo username in maniera tale da non azzerare il campo nella form
$_SESSION['SessionUsernameLogIn'] = $usernameLogIn;
//variabile di sessione per capire se ho provato a fare un login
$_SESSION['LogIn_SignUp_Attempt'] = "LogIn";


//controllo la password relativa al dato utente
$encryptedPassword = md5($passwordLogIn);
$query = "SELECT * FROM utenti WHERE username = '$usernameLogIn' AND password = '$encryptedPassword' ";

//eseguo la query
$result = $AsteroidsDB->performQuery($query);
$count = mysqli_num_rows($result);

//se ho un risultato allora l'utente è registrato quindi il login è avvenuto correttamente
if ($count == 1) {
    
    //elimino tutte le variabili di sessione
    session_destroy();

    //mi tengo in sessione lo username e setto la variabile connessione
    session_start();
    $_SESSION['Username'] = $usernameLogIn;
    $_SESSION['Connection'] = "Effettuata";
    header("location: ./asteroids.php");

}else { //in caso di login errato 
    $_SESSION['SessionLogInError'] = "Username o Password Errati.";
    header("location: ../index.php");
}
//chiudo la connessione con il db
$AsteroidsDB->closeConnection();
?>