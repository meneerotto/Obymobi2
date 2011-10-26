var pagesArray = new Array();
var pagesIndex = 0;

function addPage(pageFunction) {
    if (pageFunction == "showIndexPage(true)") {
        pagesArray = new Array();
        pagesIndex = 0;
    }
    pagesArray[pagesIndex] = pageFunction;
    pagesIndex++;
}

function getLastPage() {
    var indexPreviousPage = pagesIndex - 2;
    var previousPage = pagesArray[indexPreviousPage];
    return previousPage;
}

function removeLastPage() {
    pagesIndex = pagesIndex - 2;
}

function hideAllPages(indexPage) {
    if (indexPage == false) {
        //Laat de topbar zien
        var topID = document.getElementById("topID");
        topID.style.display = "block";
    } else {
        //Haal de topbar weg
        var topID = document.getElementById("topID");
        topID.style.display = "none";
    }

    //Index pagina
    var contentmain = document.getElementById("contentmain");
    contentmain.style.visibility = "hidden";
    contentmain.style.display = "none";

    //categorie pagina
    var categorielijst = document.getElementById("categorielijst");
    categorielijst.style.visibility = "hidden";
    categorielijst.style.display = "none";

    //producten pagina
    var productlijst = document.getElementById("productlijst");
    var productenlijst = document.getElementById("productenlijst");
    productlijst.style.visibility = "hidden";
    productlijst.style.display = "none";
    productenlijst.style.visibility = "hidden";
    productenlijst.style.display = "none";

    //product pagina
    var detailpagina = document.getElementById("detailpagina");
    detailpagina.style.visibility = "hidden";
    detailpagina.style.display = "none";

    //besteloverzicht
    var bestellijst = document.getElementById("bestellijst");
    bestellijst.style.visibility = "hidden";
    bestellijst.style.display = "none";

    //bestelbevestiging
    var bestelbevestigingslijst = document.getElementById("bestelbevestigingslijst");
    bestelbevestigingslijst.style.visibility = "hidden";
    bestelbevestigingslijst.style.display = "none";
}