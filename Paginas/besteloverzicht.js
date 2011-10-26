function showBesteloverzichtPage(emptyBasket) {
    if (emptyBasket == false) {
        addPage("showBesteloverzichtPage(false)");
    }

    this.hideAllPages(false);

    var bestellijst = document.getElementById("bestellijst");
    bestellijst.style.visibility = "visible";
    bestellijst.style.display = "block";

    //Top menu
    var topLeft = document.getElementById("topLeft");
    topLeft.setAttribute("class", "previous");
    topLeft.setAttribute("onclick", getLastPage());
    topLeft.innerHTML = "Back";
    var topRight = document.getElementById("topRight");
    topRight.setAttribute("class", "next plaatsen");
    topRight.setAttribute("style", "cursor: pointer;");
    topRight.setAttribute("onclick", "resetOrderlist();");
    topRight.innerHTML = "Empty Basket";

    //empty the page first
    var bestellijst = document.getElementById("bestellijst");
    while (bestellijst.firstChild) bestellijst.removeChild(bestellijst.firstChild);

    if (sessvars.selectedCompany != undefined) {
        var selectedCompany = sessvars.selectedCompany;
        document.getElementById("horecanaam").innerHTML = selectedCompany.companyName;
    }

    var productAanwezig = false;
    var exitFor = false;
    if (sessvars.bestelling != undefined) {
        var aantalBestellingen = sessvars.bestelling.length;
        //Controleer in de bestellingen of er wel een product is. Hoeveelheid kan ook 0 zijn.
        for (var i = 0; i < aantalBestellingen; i++) {
            if (sessvars.bestelling[i].Hoeveelheid == 0) {
                if (exitFor == false) {
                    productAanwezig = false;
                }
            } else {
                productAanwezig = true;
                exitFor = true;
            }
        }

        if (productAanwezig == true) {
            var ModelCollection = sessvars.ModelCollection;
            var categoryIds = new Array();
            var bestellijst = document.getElementById("bestellijst");
            var totaalPrijs = 0;
            var collapseImages = new Array();
            var collapseIndex = 0;

            var ul = document.createElement("ul");

            //Kijk welke categoriën er in de bestellingen aanwezig zijn
            var index = 0;
            for (var i = 0; i < aantalBestellingen; i++) {
                var bestellingCategoryId = sessvars.bestelling[i].CategoryId;
                var categoryExists = false;
                var categoriesLength = categoryIds.length;

                for (var j = 0; j < categoriesLength; j++) {
                    var categoryId = categoryIds[j];
                    if (bestellingCategoryId == categoryId) {
                        categoryExists = true;
                    }
                }

                if (categoryExists == false) {
                    if (sessvars.bestelling[i].Hoeveelheid != 0) {
                        categoryIds[index] = bestellingCategoryId;
                        index++;
                    }
                }
            }

            //kijk per categorie welke bestellingen erbij horen en geef ze weer op de bestelpagina
            for (var i = 0; i < categoryIds.length; i++) {
                var categoryId = categoryIds[i];
                var categoryIdsUsed = new Array();

                for (var j = 0; j < aantalBestellingen; j++) {
                    var bestellingCategoryId = sessvars.bestelling[j].CategoryId;
                    var bestellingId = sessvars.bestelling[j].bestellingId;

                    if (categoryId == bestellingCategoryId) {
                        var productId = sessvars.bestelling[j].ProductId;
                        var categoryId = sessvars.bestelling[j].CategoryId;
                        var aantalProducten = sessvars.bestelling[j].Hoeveelheid;
                        var productName;
                        var PriceIn;
                        var hasAlterations = sessvars.bestelling[j].hasAlterations;
                        var Alterations = sessvars.bestelling[j].Alterations;
                        var hasFilePathRelativeToMediaPath;
                        var FilePathRelativeToMediaPath;
                        var categoryName;

                        if (aantalProducten != 0) {
                            for (var k = 0; k < sessvars.ModelCollection.length; k++) {
                                if (categoryId == sessvars.ModelCollection[k].ID) {
                                    var categoryUsed = false;
                                    for (var m = 0; m < categoryIdsUsed.length; m++) {
                                        if (categoryIdsUsed[m] == categoryId) {
                                            categoryUsed = true;
                                        }
                                    }

                                    if (categoryUsed == false) {
                                        categoryName = sessvars.ModelCollection[k].Name;
                                        var productlijstHeader = document.createElement("li");
                                        productlijstHeader.setAttribute("class", "header");
                                        productlijstHeader.innerHTML = categoryName;
                                        ul.appendChild(productlijstHeader);
                                        categoryIdsUsed[categoryIdsUsed.length + 1] = categoryId;
                                    }
                                }
                            }

                            for (var l = 0; l < sessvars.ModelCollection.length; l++) {
                                if (productId == sessvars.ModelCollection[l].ID && categoryId == sessvars.ModelCollection[l].ParentProductmenuItemId) {
                                    productName = ModelCollection[l].Name;
                                    FilePathRelativeToMediaPath = ModelCollection[l].FilePathRelativeToMediaPath;
                                    PriceIn = ModelCollection[l].PriceIn;
                                    hasFilePathRelativeToMediaPath = ModelCollection[l].hasFilePathRelativeToMediaPath;

                                    var menuItem = createMenuItemBestel(productName, PriceIn, hasAlterations, categoryId, productId, hasFilePathRelativeToMediaPath, FilePathRelativeToMediaPath, aantalProducten, Alterations, bestellingId);
                                    totaalPrijs = totaalPrijs + PriceIn * aantalProducten;
                                    setTotaalPrijs(totaalPrijs);
                                    ul.appendChild(menuItem);
                                }
                            }
                        }
                    }
                }
            }
            bestellijst.appendChild(ul);

            var bedragP = document.createElement("p");
            bedragP.setAttribute("class", "totaalbedrag");
            var bedragSpan = document.createElement("span");
            bedragSpan.setAttribute("id", "bedragTotaal");
            var fullPrice = totaalPrijs;
            var totalLength = fullPrice.toString().length;
            var beforeComma = fullPrice.toString().substr(0, totalLength - 2);
            var afterComma = fullPrice.toString().substr(totalLength - 2, 2);
            var correctPrice = beforeComma + "." + afterComma;
            bedragSpan.innerHTML = "Amount: " + correctPrice;
            bedragP.appendChild(bedragSpan);

            bestellijst.appendChild(bedragP);

            var tafelDiv = document.createElement("div");
            tafelDiv.setAttribute("class", "tafelnummer");
            var tafelLabel = document.createElement("label");
            tafelLabel.setAttribute("for", "tafelnummer");
            tafelLabel.innerHTML = "Table number:";
            var tafelInput = document.createElement("input");
            tafelInput.setAttribute("id", "tafelnummer");
            tafelInput.setAttribute("type", "number");
            tafelDiv.appendChild(tafelLabel);
            tafelDiv.appendChild(tafelInput);

            bestellijst.appendChild(tafelDiv);

            var betaalDiv = document.createElement("div");
            betaalDiv.setAttribute("class", "betaalmethode");

            var betaalP = document.createElement("p");
            betaalP.innerHTML = "Select payment method:";
            betaalDiv.appendChild(betaalP);

            var formRadioBtns = document.createElement("form");
            formRadioBtns.setAttribute("name", "betalingsopties");

            if (sessvars.Paymentmethods != undefined) {
                var paymentsCount = sessvars.Paymentmethods.length;

                for (var m = 0; m < paymentsCount; m++) {
                    var PaymentmethodId = sessvars.Paymentmethods[m].PaymentmethodId;
                    var Name = sessvars.Paymentmethods[m].Name;
                    var CompanyId = sessvars.Paymentmethods[m].CompanyId;

                    var paymentRowDiv = document.createElement("div");
                    paymentRowDiv.setAttribute("class", "paymentRowDiv");

                    var betaalInput = document.createElement("input");
                    betaalInput.setAttribute("class", "betaalInput");
                    betaalInput.setAttribute("type", "radio");
                    betaalInput.setAttribute("name", "betaalmethode");
                    betaalInput.setAttribute("id", PaymentmethodId);
                    betaalInput.value = Name;
                    var betaalLabel = document.createElement("label");
                    betaalLabel.setAttribute("class", "betaalLabel");
                    betaalLabel.setAttribute("for", Name);
                    betaalLabel.innerHTML = Name;

                    paymentRowDiv.appendChild(betaalInput);
                    paymentRowDiv.appendChild(betaalLabel);

                    formRadioBtns.appendChild(paymentRowDiv);
                }
            }

            betaalDiv.appendChild(formRadioBtns);
            bestellijst.appendChild(betaalDiv);

            var clrDiv = document.createElement("div");
            clrDiv.setAttribute("class", "clr");
            bestellijst.appendChild(clrDiv);

            var backgroundDiv = document.createElement("div");
            backgroundDiv.setAttribute("class", "backgroundDiv");

            var bestellingPlaatsenDiv = document.createElement("a");
            bestellingPlaatsenDiv.setAttribute("id", "bestellingPlaatsenDiv");
            bestellingPlaatsenDiv.setAttribute("class", "next plaatsen");
            bestellingPlaatsenDiv.setAttribute("style", "cursor: pointer;");
            bestellingPlaatsenDiv.setAttribute("onclick", "plaatsBestelling();");
            bestellingPlaatsenDiv.innerHTML = "Place Order";
            backgroundDiv.appendChild(bestellingPlaatsenDiv);

            bestellijst.appendChild(backgroundDiv);

            var productAlterationText = document.createElement("div");
            productAlterationText.setAttribute("id", "divCollapse");
            bestellijst.appendChild(productAlterationText);
        } else {
            //Geen bestellingen weergeven
            var bestellijst = document.getElementById("bestellijst");

            var geenOrdersDiv = document.createElement("div");
            geenOrdersDiv.setAttribute("class", "geenOrdersDiv");
            var geenOrdersSpan = document.createElement("span");
            geenOrdersSpan.setAttribute("class", "geenOrdersSpan");
            geenOrdersSpan.innerHTML = "Er zijn geen producten toegevoegd.";
            geenOrdersDiv.appendChild(geenOrdersSpan);
            bestellijst.appendChild(geenOrdersDiv);
        }
    } else {
        //Geen bestellingen weergeven
        var bestellijst = document.getElementById("bestellijst");

        var geenOrdersDiv = document.createElement("div");
        geenOrdersDiv.setAttribute("class", "geenOrdersDiv");
        var geenOrdersSpan = document.createElement("span");
        geenOrdersSpan.setAttribute("class", "geenOrdersSpan");
        geenOrdersSpan.innerHTML = "Er zijn geen producten toegevoegd.";
        geenOrdersDiv.appendChild(geenOrdersSpan);
        bestellijst.appendChild(geenOrdersDiv);
    }
}

