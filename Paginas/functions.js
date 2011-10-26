var totaalPrijs = 0;
var collapseImages = new Array();
var collapseIndex = 0;

var ModelCollection = sessvars.ModelCollection;

function resetOrderlist() {
    sessvars.bestelling = undefined;
    //Link naar besteloverzicht
    showBesteloverzichtPage(true);
}

//Add and remove from bestellijst
function addToOrder(productID, categoryId) {
    var list = document.getElementById("li" + productID);
    var span = document.getElementById("span" + productID);
    var productAantal = 0;

    //getal zichtbaar maken voor product op de lijst
    //list.setAttribute("class", "product");
    //span.innerHTML = parseInt(span.innerHTML) + 1;

    if (sessvars.bestelling == undefined) {
        //Dit is een nieuwe bestelling
        var bestellingen = new Array();
        var bestelling = new Object();
        bestelling.bestellingId = 0;
        bestelling.ProductId = productID;
        bestelling.CategoryId = categoryId;
        bestelling.Hoeveelheid = 1;
        bestellingen[0] = bestelling;
        sessvars.bestelling = bestellingen;
    } else {
        //Dit is een lopende bestelling
        var bestellingen = new Array();
        var productInOrder = false;
        
        for (var i = 0; i < sessvars.bestelling.length; i++) {
            bestellingen[i] = sessvars.bestelling[i];
        }

        for (var j = 0; j < bestellingen.length; j++) {
            var productIDFromBestellijst = bestellingen[j].ProductId;
            if (productIDFromBestellijst == productID) {
                productInOrder = true;
                bestellingen[j].Hoeveelheid = bestellingen[j].Hoeveelheid + 1;
            }
        }

        if (productInOrder == false) {
            var bestelling = new Object();
            bestelling.bestellingId = sessvars.bestelling.length;
            bestelling.ProductId = productID;
            bestelling.CategoryId = categoryId;
            bestelling.Hoeveelheid = 1;
            bestellingen[bestellingen.length] = bestelling;
        }

        sessvars.bestelling = bestellingen;
    }

    //Kijk hoeveel producten er in de bestelling zitten
    for (var i = 0; i < sessvars.bestelling.length; i++) {
        productAantal += sessvars.bestelling[i].Hoeveelheid;
    }
    var topRight = document.getElementById("topRight");
    topRight.innerHTML = "Order Basket(" + productAantal + ")";
}

function createMenuItem(Name, PriceIn, hasAlterations, ParentProductmenuItemId, productID, hasFilePathRelativeToMediaPath, FilePathRelativeToMediaPath) {
    var hasAlterations = hasAlterations;

    var productLi = document.createElement("li");
    var productSpan = document.createElement("span");
    var productImg = document.createElement("img");
    var productA = document.createElement("a");
    var productSpan2 = document.createElement("span");
    var productEm = document.createElement("em");
    var productAlteration = document.createElement("a");
    var productBtn = document.createElement("button");

    productLi.setAttribute("class", "product negatief");
    productLi.setAttribute("id", "li" + productID);

    productSpan.setAttribute("id", "span" + productID);
    productSpan.innerHTML = "0";

    productImg.setAttribute("height", "45px");
    productImg.setAttribute("width", "62px");

    if (hasFilePathRelativeToMediaPath == true) {
        if (FilePathRelativeToMediaPath != undefined) {
            productImg.setAttribute("src", FilePathRelativeToMediaPath);
        }
    }

    productImg.setAttribute("alt", "");

    productA.setAttribute("class", "productName");
    //productA.setAttribute("href", "product.html?categoryID=" + ParentProductmenuItemId + "&productID=" + productID);
    //Maak hier een onclick functie van
    productA.setAttribute("onclick", "showProductPage('" + ParentProductmenuItemId + "', '" + productID + "');");
    productA.setAttribute("style", "cursor: pointer;");

    productSpan2.innerHTML = Name;

    var fullPrice = PriceIn;
    var beforeComma = fullPrice.toString().substring(0, fullPrice.toString().length - 2);
    var behindComma = fullPrice.toString().substring(fullPrice.toString().length - 2, 3);
    var correctPrice = beforeComma + "," + behindComma

    productEm.innerHTML = correctPrice;

    if (hasAlterations == true) {
        productAlteration.setAttribute("class", "plusLink");
        //productAlteration.setAttribute("href", "product.html?categoryID=" + ParentProductmenuItemId + "&productID=" + productID);
        //Maak hier een onclick functie van
        productAlteration.setAttribute("onclick", "showProductPage('" + ParentProductmenuItemId + "', '" + productID + "');");
        productAlteration.setAttribute("style", "cursor: pointer;");
        productAlteration.innerHTML = "+";
    }
    else {
        productBtn.setAttribute("type", "button");
        productBtn.setAttribute("class", "plus");
        productBtn.setAttribute("onclick", "addToOrderProduct(" + ParentProductmenuItemId + "," + productID + ");");
        productBtn.innerHTML = "+";
    }

    productLi.appendChild(productSpan);
    productLi.appendChild(productImg);
    productSpan2.appendChild(productEm);
    productA.appendChild(productSpan2);
    productLi.appendChild(productA);
    if (hasAlterations == true) {
        productLi.appendChild(productAlteration);
    }
    else {
        productLi.appendChild(productBtn);
    }
    return productLi;
}

function addToOrder1(categoryID, productID) {
    var gekozenProductAantal = document.getElementById("gekozenProductAantal");
    var aantal = parseInt(gekozenProductAantal.value);
    var ModelCollection = sessvars.ModelCollection;
    var alterationChoices = new Array();
    var hasAlterations = false;

    //Haal de keuze van de gebruiker op door te bekijken welke alterations hij gekozen heeft
    var index = 0;
    for (var k = 0; k < ModelCollection.length; k++) {
        if (ModelCollection[k].ID == productID && ModelCollection[k].ParentProductmenuItemId == categoryID) {
            if (ModelCollection[k].hasAlterations == true) {
                hasAlterations = true;

                var alterations = ModelCollection[k].Alteration;

                for (var l = 0; l < alterations.length; l++) {
                    var alteration = new Object();
                    var AlterationId = alterations[l].AlterationId;
                    var Alterationoptions = alterations[l].Alterationoptions;

                    if (alterations[l].MaxOptions == 1) {
                        //Combobox uitlezen
                        var selectedAlteration = document.getElementById(AlterationId);
                        var AlterationoptionName = selectedAlteration.options[selectedAlteration.selectedIndex].text;
                        var AlterationoptionId;

                        for (var m = 0; m < Alterationoptions.length; m++) {
                            if (Alterationoptions[m].Name == AlterationoptionName) {
                                AlterationoptionId = Alterationoptions[m].AlterationoptionId;
                            }
                        }

                        alteration.AlterationId = AlterationId;
                        alteration.AlterationoptionId = AlterationoptionId;
                        alteration.AlterationoptionName = AlterationoptionName;
                        alterationChoices[index] = alteration;
                        index++;
                    } else {
                        //Checkboxes uitlezen
                        //Voor alle gecheckte boxes wordt een aparte alteration met hetzelfde alterationId aangemaakt
                        for (var m = 0; m < Alterationoptions.length; m++) {
                            var AlterationoptionId2 = Alterationoptions[m].AlterationoptionId;
                            var checkbox = document.getElementById(AlterationoptionId2);
                            var alterationOptionDiv = document.getElementById("alterationOption" + AlterationoptionId2);

                            if (checkbox.checked == true) {
                                var alteration = new Object();
                                alteration.AlterationId = AlterationId;
                                alteration.AlterationoptionId = AlterationoptionId2;
                                alteration.AlterationoptionName = alterationOptionDiv.innerHTML;
                                alterationChoices[index] = alteration;
                                index++;
                            }
                        }
                    }
                }
            } else {
                hasAlterations = false;
            }
        }
    }

    if (sessvars.bestelling == undefined) {
        //Dit is een nieuwe bestelling
        var bestellingen = new Array();
        var bestelling = new Object();
        bestelling.bestellingId = 0;
        bestelling.ProductId = productID;
        bestelling.CategoryId = categoryID;
        bestelling.Hoeveelheid = aantal;
        bestelling.hasAlterations = hasAlterations;
        if (bestelling.hasAlterations == true) {
            bestelling.Alterations = alterationChoices;
        } else {
            bestelling.Alterations = null;
        }
        bestellingen[0] = bestelling;
        sessvars.bestelling = bestellingen;
    } else {
        //Dit is een lopende bestelling
        var bestellingen = new Array();
        var aantalbestellingen = sessvars.bestelling.length;
        var productInOrder = false;

        //Laad de bestaande bestellingen in de array bestellingen
        for (var i = 0; i < aantalbestellingen; i++) {
            bestellingen[i] = sessvars.bestelling[i];
        }

        //Controleren of er al een product met dezelfde alterations bestaat in de bestellingenlijst. Zo ja, hoog die op.
        var productMetAlterationsOpgehoogd = false;
        for (var j = 0; j < bestellingen.length; j++) {
            var productIDbestellijst = bestellingen[j].ProductId;
            if (productIDbestellijst == productID) {
                if (bestellingen[j].hasAlterations) {
                    //Controleer of de alterations overeenkomen
                    var alterationsInBestelling = bestellingen[j].Alterations;
                    var komenAlterationsOvereen = false;

                    if (alterationsInBestelling.length != alterationChoices.length) {
                        //Het product heeft niet evenveel alterations als het product in de bestelling. Zowiezo niet gelijk.
                        komenAlterationsOvereen = false;
                    } else {
                        komenAlterationsOvereen = true;
                        for (var k = 0; k < alterationsInBestelling.length; k++) {
                            //Het product heeft evenveel alterations als het product in de bestelling. Controleer voor elke alteration of deze gelijk zijn aan elkaar.
                            var AlterationIdInBestelling = alterationsInBestelling[k].AlterationId;
                            var AlterationoptionIdInBestelling = alterationsInBestelling[k].AlterationoptionId;
                            var AlterationoptionNameInBestelling = alterationsInBestelling[k].AlterationoptionName;

                            //Controle voor product met alterations zonder checkboxes.
                            if (AlterationIdInBestelling != alterationChoices[k].AlterationId || AlterationoptionIdInBestelling != alterationChoices[k].AlterationoptionId || AlterationoptionNameInBestelling != alterationChoices[k].AlterationoptionName) {
                                komenAlterationsOvereen = false;
                            }
                        }
                    }

                    if (komenAlterationsOvereen == true) {
                        //Bijvoorbeeld door 4 alterations heen gelopen en 4x true gegevens dan hoeveelheid ophogen
                        bestellingen[j].Hoeveelheid = bestellingen[j].Hoeveelheid + aantal;
                        productMetAlterationsOpgehoogd = true;
                    }
                } else {
                    productInOrder = true;
                    bestellingen[j].Hoeveelheid = bestellingen[j].Hoeveelheid + aantal;
                }
            }
        }

        if (productInOrder == false) {
            if (hasAlterations == true) {
                //Product met alterations
                if (productMetAlterationsOpgehoogd == false) {
                    var bestelling = new Object();
                    bestelling.bestellingId = aantalbestellingen;
                    bestelling.ProductId = productID;
                    bestelling.CategoryId = categoryID;
                    bestelling.Hoeveelheid = aantal;
                    bestelling.hasAlterations = hasAlterations;
                    bestelling.Alterations = alterationChoices;
                    bestellingen[bestellingen.length] = bestelling;
                }
            } else {
                //product zonder alterations
                var bestelling = new Object();
                bestelling.bestellingId = aantalbestellingen;
                bestelling.ProductId = productID;
                bestelling.CategoryId = categoryID;
                bestelling.Hoeveelheid = aantal;
                bestelling.hasAlterations = hasAlterations;
                bestelling.Alterations = null;
                bestellingen[bestellingen.length] = bestelling;
            }
        }

        sessvars.bestelling = bestellingen;
    }
}

function removeFromOrder1(productID) {
    var aantalBestellingen = sessvars.bestelling.length;

    for (var i = 0; i < aantalBestellingen; i++) {
        if (sessvars.bestelling[i].Hoeveelheid != 0) {
            var productIDFromBestellijst = sessvars.bestelling[i].ProductId;
            if (productIDFromBestellijst == productID) {
                sessvars.bestelling[i].Hoeveelheid = sessvars.bestelling[i].Hoeveelheid - 1;
            }
        }
    }
}


//Add and remove from bestellijst
function addToOrderProduct(categoryId, productID) {
    var list = document.getElementById("li" + productID);
    var span = document.getElementById("span" + productID);
    //list.setAttribute("class", "product");
    //span.innerHTML = parseInt(span.innerHTML) + 1;

    if (sessvars.bestelling == undefined) {
        //Dit is een nieuwe bestelling
        var bestellingen = new Array();
        var bestelling = new Object();
        bestelling.bestellingId = 0;
        bestelling.ProductId = productID;
        bestelling.CategoryId = categoryId;
        bestelling.Hoeveelheid = 1;
        bestellingen[0] = bestelling;
        sessvars.bestelling = bestellingen;
    } else {
        //Dit is een lopende bestelling
        var bestellingen = new Array();
        var productInOrder = false;

        for (var i = 0; i < sessvars.bestelling.length; i++) {
            bestellingen[i] = sessvars.bestelling[i];
        }

        for (var j = 0; j < bestellingen.length; j++) {
            var productIDFromBestellijst = bestellingen[j].ProductId;
            if (productIDFromBestellijst == productID) {
                productInOrder = true;
                bestellingen[j].Hoeveelheid = bestellingen[j].Hoeveelheid + 1;
            }
        }

        if (productInOrder == false) {
            var bestelling = new Object();
            bestelling.bestellingId = sessvars.bestelling.length;
            bestelling.ProductId = productID;
            bestelling.CategoryId = categoryId;
            bestelling.Hoeveelheid = 1;
            bestellingen[bestellingen.length] = bestelling;
        }

        sessvars.bestelling = bestellingen;
    }

    //Kijk hoeveel producten er in de bestelling zitten
    if (sessvars.bestelling !== undefined) {
        //Kijk hoeveel producten er in de bestelling zitten
        var productAantal = 0;

        for (var j = 0; j < sessvars.bestelling.length; j++) {
            var bestelling = sessvars.bestelling[j];
            productAantal += bestelling.Hoeveelheid;
        }

        if (totaal == 1) {
            $('a.totaal').html('Total: ' + productAantal + ' item');
        } else {
            $('a.totaal').html('Total: ' + productAantal + ' items');
        }
    }
}

function resetCollapseImages(divPlusMin) {
    for (var i = 0; i < collapseImages.length; i++) {
        var div = document.getElementById(collapseImages[i]);
        if (div != divPlusMin) {
            div.className = "alterationImgPlus";
        }
    }
}

function collapseAlteration(position, imgDiv, bestellingId) {
    var divExpand = document.getElementById("divCollapse");
    var divPlusMin = document.getElementById(imgDiv);

    this.resetCollapseImages(divPlusMin);

    if (divPlusMin.className == "alterationImgPlus") {
        divPlusMin.className = "alterationImgMin";
        divExpand.style.display = "block";
        divExpand.style.visibility = "visible";
    } else {
        divPlusMin.className = "alterationImgPlus";
        divExpand.style.display = "none";
        divExpand.style.visibility = "hidden";
    }

    var curLeftBox = 0;
    var curTopBox = 0;

    do {
        curLeftBox += position.offsetLeft;
        curTopBox += position.offsetTop;
    } while (position = position.offsetParent);

    // Set position of hover-over popup
    divExpand.style.top = curTopBox + 20 + "px";
    if (navigator.appName == "Microsoft Internet Explorer") {
        divExpand.style.left = curLeftBox - 15 + "px";
    } else {
        divExpand.style.left = curLeftBox - 15 + "px";
    }

    //Haal bestellingen op en geef de alterations bij het betreffende bestellingId weer
    var aantalBestellingen = sessvars.bestelling.length;

    for (var i = 0; i < aantalBestellingen; i++) {
        if (sessvars.bestelling[i].bestellingId == bestellingId) {
            var alterations = sessvars.bestelling[i].Alterations;
            divExpand.innerHTML = "";

            var textPositioningDiv = document.createElement("div");
            textPositioningDiv.setAttribute("class", "textPositioningDiv");
            for (var j = 0; j < alterations.length; j++) {
                textPositioningDiv.innerHTML += "- " + alterations[j].AlterationoptionName + " <br />";
            }
            divExpand.appendChild(textPositioningDiv);
        }
    }
}



function createMenuItemBestel(Name, PriceIn, hasAlterations, ParentProductmenuItemId, productID, hasFilePathRelativeToMediaPath, FilePathRelativeToMediaPath, aantalProducten, Alterations, bestellingId) {
    var hasAlterations = hasAlterations;

    var productLi = document.createElement("li");
    var productSpan = document.createElement("span");
    var productImg = document.createElement("img");
    var productA = document.createElement("a");
    var productSpan2 = document.createElement("span");
    var productEm = document.createElement("em");
    var productAlteration = document.createElement("a");
    var productBtn = document.createElement("button");
    var productBtn2 = document.createElement("button");

    productLi.setAttribute("class", "product");
    productLi.setAttribute("id", "li" + bestellingId);

    productSpan.setAttribute("id", "span" + bestellingId);
    productSpan.innerHTML = aantalProducten;

    productImg.setAttribute("height", "45px");
    productImg.setAttribute("width", "62px");

    if (hasFilePathRelativeToMediaPath == true) {
        if (FilePathRelativeToMediaPath != undefined) {
            productImg.setAttribute("src", FilePathRelativeToMediaPath);
        }
    }

    productImg.setAttribute("alt", "");

    productA.setAttribute("class", "productName");

    productSpan2.innerHTML = Name;

    var fullPrice = PriceIn;
    var totalLength = fullPrice.toString().length;
    var beforeComma = fullPrice.toString().substr(0, totalLength - 2);
    var afterComma = fullPrice.toString().substr(totalLength - 2, 2);
    var correctPrice = beforeComma + "." + afterComma;

    if (hasAlterations == true) {
        //Haal de alterations op en geef die weer onder het product
        var productText = document.createElement("div");
        productText.setAttribute("class", "productText");

        collapseImages[collapseIndex] = "plus" + bestellingId;
        collapseIndex++;
        productText.setAttribute("onclick", "collapseAlteration(this, 'plus" + bestellingId + "'," + bestellingId + ");");

        var productEmImg = document.createElement("div");
        productEmImg.setAttribute("class", "alterationImgPlus");
        productEmImg.setAttribute("id", "plus" + bestellingId);

        var productEMLbl = document.createElement("div");
        productEMLbl.setAttribute("class", "alterationTekst");
        productEMLbl.innerHTML = "Options available";

        productText.appendChild(productEmImg);
        productText.appendChild(productEMLbl);
        productEm.appendChild(productText);
    }

    productBtn.setAttribute("type", "button");
    productBtn.setAttribute("class", "plus");
    productBtn.setAttribute("onclick", "addToOrderBestel(" + productID + "," + bestellingId + ");");
    productBtn.innerHTML = "+";

    productBtn2.setAttribute("type", "button");
    productBtn2.setAttribute("class", "minus");
    productBtn2.setAttribute("onclick", "removeFromOrderBestel(" + productID + "," + bestellingId + ");");
    productBtn2.innerHTML = "-";

    productLi.appendChild(productSpan);
    productLi.appendChild(productImg);
    productSpan2.appendChild(productEm);
    productA.appendChild(productSpan2);
    productLi.appendChild(productA);
    productLi.appendChild(productBtn);

    productLi.appendChild(productBtn2);
    return productLi;
}

//Add and remove from bestellijst
function addToOrderBestel(productID, bestellingId) {
    var list = document.getElementById("li" + bestellingId);
    var span = document.getElementById("span" + bestellingId);
    list.setAttribute("class", "product");

    //Dit is een lopende bestelling
    var aantalBestellingen = sessvars.bestelling.length;

    for (var i = 0; i < aantalBestellingen; i++) {
        var bestellingIdFromBestellijst = sessvars.bestelling[i].bestellingId;
        if (bestellingIdFromBestellijst == bestellingId) {
            //Haal de prijs op van het product en tel dat bij het totaal op 
            var ModelCollection = sessvars.ModelCollection;
            var price;

            for (var j = 0; j < ModelCollection.length; j++) {
                if (ModelCollection[j].ID == productID) {
                    price = ModelCollection[j].PriceIn;
                }
            }

            totaalPrijs = totaalPrijs + price;

            var fullPrice = totaalPrijs;
            var totalLength = fullPrice.toString().length;
            var beforeComma = fullPrice.toString().substr(0, totalLength - 2);
            var afterComma = fullPrice.toString().substr(totalLength - 2, 2);
            var correctPrice = beforeComma + "." + afterComma;


            var spanTotaal = document.getElementById("bedragTotaal");
            spanTotaal.innerHTML = "Amount: " + correctPrice;

            sessvars.bestelling[i].Hoeveelheid = sessvars.bestelling[i].Hoeveelheid + 1;
            span.innerHTML = parseInt(span.innerHTML) + 1;
        }
    }
}

function removeFromOrderBestel(productID, bestellingId) {
    var list = document.getElementById("li" + bestellingId);
    var span = document.getElementById("span" + bestellingId);

    var aantalBestellingen = sessvars.bestelling.length;

    for (var i = 0; i < aantalBestellingen; i++) {
        if (sessvars.bestelling[i].Hoeveelheid != 0) {
            var bestellingIdFromBestellijst = sessvars.bestelling[i].bestellingId;
            if (bestellingIdFromBestellijst == bestellingId) {
                //Haal de prijs op van het product en haal dat van het totaal af
                var ModelCollection = sessvars.ModelCollection;
                var price;

                for (var j = 0; j < ModelCollection.length; j++) {
                    if (ModelCollection[j].ID == productID) {
                        price = ModelCollection[j].PriceIn;
                    }
                }
                totaalPrijs = totaalPrijs - price;

                var fullPrice = totaalPrijs;
                var totalLength = fullPrice.toString().length;
                var beforeComma = fullPrice.toString().substr(0, totalLength - 2);
                var afterComma = fullPrice.toString().substr(totalLength - 2, 2);
                var correctPrice = beforeComma + "." + afterComma;

                var spanTotaal = document.getElementById("bedragTotaal");
                spanTotaal.innerHTML = "Amount: " + correctPrice;

                if (parseInt(span.innerHTML) > 1) {
                    span.innerHTML = parseInt(span.innerHTML) - 1;
                } else {
                    span.innerHTML = 0;
                    list.setAttribute("class", "product negatief");
                }

                sessvars.bestelling[i].Hoeveelheid = sessvars.bestelling[i].Hoeveelheid - 1;
            }
        }
    }
}

function plaatsBestelling() {
    if (sessvars.bestelling != undefined && sessvars.selectedCompany != undefined) {
        if (document.getElementById("tafelnummer").value != "") {
            var PaymentmethodId = "";
            var PaymentmethodName = "";
            var DeliverypointNumber = "";

            DeliverypointNumber = document.getElementById("tafelnummer").value;

            var paymentsCount = sessvars.Paymentmethods.length;
            var betalingsopties = document.betalingsopties;

            var oneChecked = false;
            for (var i = 0; i < paymentsCount; i++) {
                if (betalingsopties[i].checked == true) {
                    oneChecked = true;
                    PaymentmethodId = betalingsopties[i].attributes[3].value;
                    PaymentmethodName = betalingsopties[i].attributes[4].value;
                }
            }

            if (oneChecked == true) {
                sessvars.selectedCompany.PaymentmethodId = PaymentmethodId;
                sessvars.selectedCompany.PaymentmethodName = PaymentmethodName;
                sessvars.selectedCompany.DeliverypointNumber = DeliverypointNumber;

                this.saveOrder(this.getXML(sessvars.ModelCollection, sessvars.bestelling, sessvars.selectedCompany), sessvars.selectedCompany.customerId);
            } else {
                alert("Please select a payment method first.");
            }
        } else {
            alert("Please select a table number first.");
        }
    } else {
        alert("No orders available to be placed.");
    }
}

function order_received(response) {
    if (response.ResultCode == 100) {
        //Succesvolle bestelling link door via javascript naar bestelbevestiging
        showBestelbevestigingPage();
    } else if (response.ResultCode == 202) {
        alert("The table number is unknown in our system.");
    }else {
        alert("The order failed with result code: " + response.ResultCode);
    }
}

function error_occurred(response) {
    alert("An error occurred. Please contact Crave Interactive.");
}

function setTotaalPrijs(totaalprijs) {
    totaalPrijs = totaalprijs;
}
