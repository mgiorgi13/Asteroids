<?php
// è richiesto il file di connessione al DB affinche si possa effettuare il login
require "./DBConnection.php";

session_start();

//controllo prima se lo username scelto è gia utilizzato 
$usernameRegistrazione = $AsteroidsDB->sqlInjectionFilter($_POST["usernameSignUp"]);

$_SESSION['SessionUsernameSignUp'] = $usernameRegistrazione;
$_SESSION['SessionUsernameSignUpError'] = "";

//variabile di sessione per capire se ho provato a fare un login
$_SESSION['LogIn_SignUp_Attempt'] = "SignUp";

//controllo se lo username è gia stato utilizzato da qualcuno
$query = "SELECT * FROM utenti WHERE username = '$usernameRegistrazione' ";

$result = $AsteroidsDB->performQuery($query);
$count = mysqli_num_rows($result);

//se ho trovato un risultato, esite gia un utente con lo stesso username 
if ($count == 1) {
    $_SESSION['SessionUsernameSignUpError'] = "Username non disponibile.";
    //chiudo la connessione con il db
    $AsteroidsDB->closeConnection();
    header("location: ../index.php");
    exit;
}

//controllo la password
$passwordRegistrazione = $AsteroidsDB->sqlInjectionFilter($_POST["passwordSignUp"]);

//inserisco nel db il nuovo utente
$encryptedPassword = md5($passwordRegistrazione);
$query = "INSERT INTO utenti (username, password) VALUES ('$usernameRegistrazione', '$encryptedPassword')";

//se l'inserimento è andato a buon fine
if ($AsteroidsDB->performQuery($query) === TRUE) {
    //elimino tutte le variabili di sessione 
    session_destroy();

    //mi tengo in sessione lo username e setto la variabile connessione
    session_start();
    $_SESSION['Username'] = $usernameRegistrazione;
    $_SESSION['Connection'] = "Effettuata";
    header("location: ./asteroids.php");
} else {
    //in caso in cui l'insermento non avvenga
    $_SESSION['SessionUsernameSignUpError'] = "Connessione fallita.";
    $_SESSION['SessionPasswordSignUpError'] = "Connessione fallita.";
    header("location: ../index.php");
}

//chiudo la connessione con il db
$AsteroidsDB->closeConnection();
?>