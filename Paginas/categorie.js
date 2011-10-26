function showCategoriePage(back) {
    if (back == true) {
        removeLastPage();
    }
    addPage("showCategoriePage(true)");

    var ModelCollection = sessvars.ModelCollection;
    
    this.hideAllPages(false);

    //Laat categoriepagina zien
    var categorielijst = document.getElementById("categorielijst");
    categorielijst.style.visibility = "visible";
    categorielijst.style.display = "block";

    //Top menu
    var topLeft = document.getElementById("topLeft");
    topLeft.setAttribute("class", "previous");
    topLeft.setAttribute("onclick", getLastPage());
    topLeft.innerHTML = "Back";
    var topRight = document.getElementById("topRight");
    topRight.setAttribute("class", "next totaal");
    topRight.setAttribute("onclick", "showBesteloverzichtPage(false);");
    topRight.innerHTML = "Order Basket";
    
    if (sessvars.selectedCompany != undefined) {
        var selectedCompany = sessvars.selectedCompany;
        document.getElementById("horecanaam").innerHTML = selectedCompany.companyName;
    }

    if (sessvars.bestelling !== undefined) {
        //Kijk hoeveel producten er in de bestelling zitten
        var productAantal = 0;

        for (var j = 0; j < sessvars.bestelling.length; j++) {
            var bestelling = sessvars.bestelling[j];
            productAantal += bestelling.Hoeveelheid;
        }

        if (productAantal != 0) {
            topRight.innerHTML = "Order Basket(" + productAantal + ")";
        }
    }

    var categoriën = new Array();

    //Deel de categoriën in aan de hand van ParentProductmenuItemId waar het -1 is.
    var categoryIndex = 0;
    for (var i = 0; i < ModelCollection.length; i++) {
        if (ModelCollection[i].ParentProductmenuItemId == -1 && ModelCollection[i].ItemType == 100) {
            if (categoryIndex < 2) {
                categoriën[categoryIndex] = ModelCollection[i].ID;
                categoryIndex++;
            }
        }
    }

    categoriën.sort();

    //Load category menu items
    var mainMenu = document.getElementById("mainmenuCategorie");
    while (mainMenu.firstChild) mainMenu.removeChild(mainMenu.firstChild);


    for (var j = 0; j < categoriën.length; j++) {
        var categoryName;
        for (var i = 0; i < ModelCollection.length; i++) {
            if (ModelCollection[i].ID == categoriën[j]) {
                categoryName = ModelCollection[i].Name;
            }
        }

        var categoryLi = document.createElement("li");
        categoryLi.setAttribute("class", "header");
        categoryLi.innerHTML = categoryName;
        mainMenu.appendChild(categoryLi);

        var subCategories = new Array();

        var index = 0;
        for (var k = 0; k < ModelCollection.length; k++) {
            if (ModelCollection[k].ParentProductmenuItemId == categoriën[j]) {
                subCategories[index] = ModelCollection[k].Name + "," + ModelCollection[k].ID;
                index++;
            }
        }

        subCategories.sort();

        for (var l = 0; l < subCategories.length; l++) {
            var values = subCategories[l].toString().split(",");
            var listItem = document.createElement("li");
            listItem.setAttribute("style", "cursor: pointer;");
            var linkItem = document.createElement("a");
            //Geef categoryId door
            listItem.setAttribute("onclick", "showProductenPage('" + values[1] + "');");
            linkItem.setAttribute("style", "cursor: pointer;");
            linkItem.innerHTML = values[0];
            listItem.appendChild(linkItem);
            mainMenu.appendChild(listItem);
        }
    }
}