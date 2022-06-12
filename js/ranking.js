function loadRaking() {
    var rankingArea = document.getElementById("ranking");
    var xmlHttpRequest = create_HTTP_Request();
    if (xmlHttpRequest){
        //richiesta http asincrona a loadRanking.php
        xmlHttpRequest.open("POST", "../php/loadRanking.php", true);
        xmlHttpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlHttpRequest.send();

        xmlHttpRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) { // carico nell'area ranking la tabella
                rankingArea.innerHTML = xmlHttpRequest.responseText;
            }
        }
    }
}

function saveScore(risultatoPartita) {
    var rankingArea = document.getElementById("ranking");
    var xmlHttpRequest = create_HTTP_Request();
    if (xmlHttpRequest) {
        //richiesta http asincrona a saveScore.php
        xmlHttpRequest.open("POST", "../php/saveScore.php", true);
        xmlHttpRequest.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xmlHttpRequest.send("score=" + risultatoPartita);

        xmlHttpRequest.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                if (xmlHttpRequest.responseText === "inserito"){ // caso in cui gioco per la prima volta
                    rankingArea.innerHTML = "";
                    loadRaking();
                }else if (xmlHttpRequest.responseText === "errore"){ // impossibile fare il salvataggio dello score
                    window.alert("Impossibile inserire lo score");
                } else if (xmlHttpRequest.responseText !== "No Highscore"){ // ho fatto un nuovo highscore
                    rankingArea.innerHTML = "";
                    loadRaking();
                    window.alert(xmlHttpRequest.responseText);
                }
            }
        }
    }
}

function create_HTTP_Request() {
    var xmlHttp;
    try { xmlHttp = new XMLHttpRequest(); }
    catch (e) {

        try { xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); }
        //IE (recent versions)
        catch (e) {

            try { xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); }
            //IE (older versions)
            catch (e) {

                window.alert("Il Tuo Browser non supporta AJAX!");
                return false;
            }
        }
    }
    return xmlHttp;
}