<?php
require "./DBConnection.php";
session_start();

$score = $AsteroidsDB->sqlInjectionFilter($_POST["score"]);
//controllo se è la prima partita dell'utente
$searchUsernameScore = "SELECT score FROM classifica WHERE name = '$_SESSION[Username]' ";
$updateUsernameScore = "UPDATE classifica SET score = ". $score ." WHERE name = '$_SESSION[Username]' ";
$insertUsernameScore = "INSERT INTO classifica VALUES ('$_SESSION[Username]', '$score') ";

$result = $AsteroidsDB->performQuery($searchUsernameScore);
if(mysqli_num_rows($result) == 1){//utente ha gia giocato
    $row = $result->fetch_assoc();
    if($row['score'] >= $score) { //in classifica l'utente ha gia uno score migliore
        echo "No Highscore";
    }else{ //aggiorno il risultato della classifica
        $AsteroidsDB->performQuery($updateUsernameScore);
        echo "Nuovo HighScore (" . $row['score'] . ")";
    }
    die;
}
//è la prima partita dell'utente
if ($AsteroidsDB->performQuery($insertUsernameScore) === TRUE) {
    echo "inserito";
} else {
    echo "errore";
}

?>