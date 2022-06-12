<?php
require "./DBConnection.php";
session_start();

$query = "SELECT * FROM classifica ORDER BY score DESC";

$result = $AsteroidsDB->performQuery($query);

//variabili per la ricerca dei valori del giocatore in classifica
$pos = 1;
$posUsername = 0;
$bestScore = 0;

//creo la tabella della classifica
echo "<table>";
    echo "<caption>TopPlayers</caption>";
    echo "<thead id='rankingHeader'>";
        echo "<tr>";
            echo "<th class='position'>#</th>";
            echo "<th class='player'>Player</th>";
            echo "<th class='score'>Score</th>";
        echo "</tr>";
    echo "</thead>";
    echo "<tbody>";
while ($row = $result->fetch_assoc()) {
    if ($_SESSION['Username'] === $row['name']) { // memorizzo la posizione e il miglior punteggio del giocatore
        $posUsername = $pos;
        $bestScore = $row['score'];
    }
    if ($pos <= 10) { //stampo solo i primi 10 migliori giocatori
        echo "<tr>";
            echo "<td class='position'>" . $pos . "</th>";
            echo "<td class='player'>" . $row['name'] . "</th>";
            echo "<td class='score'>" . $row['score'] . "</th>";
        echo "</tr>";
    }
    $pos++;
}
    echo "</tbody>";
echo "</table>";




if ($posUsername !== 0) {//se ho trovato il giocatore in classifica lo memorizzo in un div
    echo "<div id = 'myResult' class='ranking'>";
    echo "<p class='position'>" . $posUsername . "</p>";
    echo "<p class='player'>" . $_SESSION['Username'] . "</p>";
    echo "<p class='score'>" . $bestScore . "</p>";
    echo "</div>";
}

?>