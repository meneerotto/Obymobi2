function showBestelbevestigingPage() {
    this.hideAllPages(false);

    var bestelbevestigingslijst = document.getElementById("bestelbevestigingslijst");
    bestelbevestigingslijst.style.visibility = "visible";
    bestelbevestigingslijst.style.display = "block";

    //Top menu
    var topLeft = document.getElementById("topLeft");
    topLeft.setAttribute("class", "previous");
    topLeft.setAttribute("onclick", "showCategoriePage();");
    topLeft.innerHTML = "Back";
    var topRight = document.getElementById("topRight");
    topRight.setAttribute("class", "next totaal leeg");
    topRight.setAttribute("style", "cursor: pointer;");
    topRight.innerHTML = "";

    if (sessvars.selectedCompany != undefined) {
        var selectedCompany = sessvars.selectedCompany;
        document.getElementById("horecanaam").innerHTML = selectedCompany.companyName;
    }

    sessvars.bestelling = undefined; 
}