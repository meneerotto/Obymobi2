function showProductPage(categoryId, productId, back) {
    if (back == true) {
        removeLastPage();
    }
    addPage("showProductPage('" + categoryId + "', '" + productId + "', true)");

    var ModelCollection = sessvars.ModelCollection;

    this.hideAllPages(false);

    var detailpagina = document.getElementById("detailpagina");
    detailpagina.style.visibility = "visible";
    detailpagina.style.display = "block";

    //Top menu
    var topLeft = document.getElementById("topLeft");
    topLeft.setAttribute("class", "previous");
    topLeft.setAttribute("onclick", getLastPage());
    topLeft.innerHTML = "Back";
    var topRight = document.getElementById("topRight");
    topRight.setAttribute("class", "next totaal leeg");
    topRight.setAttribute("onclick", "showBesteloverzichtPage(false);");
    topRight.innerHTML = "Order Basket";

    if (sessvars.selectedCompany != undefined) {
        var selectedCompany = sessvars.selectedCompany;
        document.getElementById("horecanaam").innerHTML = selectedCompany.companyName;
    }

    var company_id = sessvars.CompanyId;

    var categoryID = categoryId;
    var productID = productId;
    var collectionCount = ModelCollection.length - 1;

    var productName;
    var productDescription;
    var productPrice;
    var productParsedPrice;
    var productImagePath;
    var hasAlterations = false;
    var alterations;
    var hasProductSuggestions = false;
    var ProductSuggestions;
    var productInBestelling = false;
    var productAantal = 0;

    for (i = 0; i <= collectionCount; i++) {
        if (ModelCollection[i].ID == productID && ModelCollection[i].ParentProductmenuItemId == categoryID) {
            productName = ModelCollection[i].Name;
            productDescription = ModelCollection[i].Description;
            productPrice = ModelCollection[i].PriceIn;
            if (ModelCollection[i].hasAlterations == true) {
                hasAlterations = true;
                alterations = ModelCollection[i].Alteration;
            }
            if (ModelCollection[i].hasProductSuggestions == true) {
                hasProductSuggestions = true;
                ProductSuggestions = ModelCollection[i].ProductSuggestions;
            }

            if (ModelCollection[i].hasImage == true) {
                productImagePath = ModelCollection[i].FilePathRelativeToMediaPath2;
            }
        }
    }

    //controleer of het product al in de bestelling is opgenomen
    if (sessvars.bestelling != undefined) {
        //Kijk hoeveel producten er in de bestelling zitten

        for (var j = 0; j < sessvars.bestelling.length; j++) {
            var bestelling = sessvars.bestelling[j];
            productAantal += bestelling.Hoeveelheid;
        }
        productInBestelling = true;
    }

    var items = document.getElementById("topRight");
    if (productInBestelling == true) {
        items.setAttribute("class", "next totaal");
        if (productAantal == 1) {
            items.innerHTML = "Total: " + productAantal + " item";
        } else if (productAantal != 0) {
            items.innerHTML = "Total: " + productAantal + " items";
        } else {
            items.innerHTML = "Total: 0 items";
            items.setAttribute("class", "next totaal leeg");
        }
    } else {
        items.setAttribute("class", "next totaal leeg");
        items.innerHTML = "";
    }

    var detailPagina = document.getElementById("detailpagina");
    while (detailPagina.firstChild) detailPagina.removeChild(detailPagina.firstChild);

    var productH1 = document.createElement("h1");
    productH1.innerHTML = productName;

    var productP = document.createElement("p");
    productP.setAttribute("class", "prijs");

    var fullPrice = productPrice;
    var beforeComma = fullPrice.toString().substring(0, fullPrice.toString().length - 2);
    var behindComma = fullPrice.toString().substring(fullPrice.toString().length - 2, 3);
    var correctPrice = beforeComma + "," + behindComma
    productP.innerHTML = correctPrice;

    detailPagina.appendChild(productH1);
    detailPagina.appendChild(productP);

    if (hasAlterations == true) {
        var alterationDiv = document.createElement("div");
        alterationDiv.setAttribute("class", "alterations");

        var samenstellingSpan = document.createElement("span");
        samenstellingSpan.innerHTML = "Select your choice:";
        alterationDiv.appendChild(samenstellingSpan);

        var alterationOptionsDiv = document.createElement("div");
        alterationOptionsDiv.setAttribute("class", "alterationOptions");

        var alterationsLength = alterations.length;
        for (var i = 0; i < alterationsLength; i++) {
            var alterationName = alterations[i].Name;
            var alterationOptions = alterations[i].Alterationoptions;
            var alterationOptionsLength = alterations[i].Alterationoptions.length;

            var MinOptions = alterations[i].MinOptions;
            var MaxOptions = alterations[i].MaxOptions;

            var alterationRequired = false;

            if (MaxOptions == 100) {
                MaxOptions = alterationOptionsLength;
            }

            if (MinOptions > 0) {
                //Keuze is verplicht. De keuzes moeten allemaal toegevoegd worden zonder de optie "Geen" bijvoorbeeld
                alterationRequired = true;
            } else {
                //Keuze is niet verplicht. Maak een extra veld aan met de keuze "Geen" of zoiets
                alterationRequired = false;
            }

            var alterationSpan = document.createElement("span");
            alterationSpan.innerHTML = alterationName;

            if (MaxOptions > 1) {
                //Combobox
                alterationOptionsDiv.appendChild(alterationSpan);

                for (var j = 0; j < alterationOptionsLength; j++) {
                    var alterationOptionName = alterationOptions[j].Name;
                    var alterationDivCheckbox = document.createElement("div");
                    alterationDivCheckbox.setAttribute("class", "alterationDivCheckbox");

                    var alterationCheckbox = document.createElement("input");
                    alterationCheckbox.setAttribute("type", "checkbox");
                    alterationCheckbox.setAttribute("id", alterationOptions[j].AlterationoptionId);
                    alterationCheckbox.setAttribute("value", alterations[i].AlterationId);
                    alterationCheckbox.setAttribute("class", "alterationoptionCheckbox");
                    if (alterationRequired == true) {
                        alterationCheckbox.setAttribute("name", alterations[i].AlterationId);
                    }
                    var alterationOptionNameDiv = document.createElement("div");
                    alterationOptionNameDiv.setAttribute("id", "alterationOption" + alterationOptions[j].AlterationoptionId);
                    alterationOptionNameDiv.setAttribute("class", "alterationOptionNameDiv");
                    alterationOptionNameDiv.innerHTML = alterationOptionName;

                    alterationDivCheckbox.appendChild(alterationCheckbox);
                    alterationDivCheckbox.appendChild(alterationOptionNameDiv);

                    alterationOptionsDiv.appendChild(alterationDivCheckbox);
                }

            } else if (MaxOptions == 1) {
                //Checkboxes
                var alterationSelect = document.createElement("select");
                alterationSelect.setAttribute("id", alterations[i].AlterationId);

                if (alterationRequired == false) {
                    var alterationOption = document.createElement("option");
                    alterationOption.setAttribute("id", "0");
                    alterationOption.innerHTML = "No, thank you";
                    alterationSelect.appendChild(alterationOption);
                }

                //loop through alteration options
                for (var j = 0; j < alterationOptionsLength; j++) {
                    var alterationOptionName = alterationOptions[j].Name;

                    var alterationOption = document.createElement("option");
                    alterationOption.setAttribute("id", alterationOptions[j].AlterationoptionId);
                    alterationOption.innerHTML = alterationOptionName;
                    alterationSelect.appendChild(alterationOption);
                }
                alterationOptionsDiv.appendChild(alterationSpan);
                alterationOptionsDiv.appendChild(alterationSelect);
            }
        }

        alterationDiv.appendChild(alterationOptionsDiv);
        detailPagina.appendChild(alterationDiv);
    }

    var hoeveelheidDiv = document.createElement("div");
    hoeveelheidDiv.setAttribute("class", "hoeveelheid");

    var hoeveelheidSpan = document.createElement("span");
    hoeveelheidSpan.setAttribute("id", "hoeveelheidSpan");
    hoeveelheidSpan.innerHTML = "Amount:";

    var alterationHoeveelheidDiv = document.createElement("div");
    alterationHoeveelheidDiv.setAttribute("class", "alterationHoeveelheid");

    var hoeveelheidInput = document.createElement("input");
    hoeveelheidInput.setAttribute("id", "gekozenProductAantal");
    hoeveelheidInput.setAttribute("type", "number");
    hoeveelheidInput.setAttribute("min", "0");
    hoeveelheidInput.setAttribute("max", "10");
    hoeveelheidInput.setAttribute("step", "1");
    hoeveelheidInput.setAttribute("value", "1");

    var plusButton = document.createElement("button");
    plusButton.setAttribute("type", "button");
    plusButton.setAttribute("class", "addone");
    
    plusButton.setAttribute("onclick", "addToOrder1('"+ categoryId +"', '"+ productID +"')");
    plusButton.innerHTML = "+";

    var minButton = document.createElement("button");
    minButton.setAttribute("type", "button");
    minButton.setAttribute("class", "minusone");
    minButton.setAttribute("onclick", "removeFromOrder1('" + productID + "')");
    minButton.innerHTML = "-";

    hoeveelheidDiv.appendChild(hoeveelheidSpan);
    alterationHoeveelheidDiv.appendChild(hoeveelheidInput);
    alterationHoeveelheidDiv.appendChild(plusButton);
    //alterationHoeveelheidDiv.appendChild(minButton);
    hoeveelheidDiv.appendChild(alterationHoeveelheidDiv);

    detailPagina.appendChild(hoeveelheidDiv);

    //Append description, image and suggestions
    var beschrijvingP = document.createElement("p");
    beschrijvingP.setAttribute("class", "beschrijving");
    var productImg = document.createElement("img");

    if (productImagePath != undefined) {
        productImg.setAttribute("src", productImagePath);
    }
    productImg.setAttribute("width", "100px");
    productImg.setAttribute("height", "191px");
    var productDescriptionDiv = document.createElement("div");
    productDescriptionDiv.setAttribute("class", "description");
    productDescriptionDiv.innerHTML = productDescription;

    beschrijvingP.appendChild(productImg);
    beschrijvingP.appendChild(productDescriptionDiv);

    var clrDiv = document.createElement("div");
    clrDiv.setAttribute("class", "clr");

    detailPagina.appendChild(beschrijvingP);
    detailPagina.appendChild(clrDiv);

    if (hasProductSuggestions == true) {
        if (ProductSuggestions.length != 0) {
            var productlijstUl = document.createElement("ul");
            productlijstUl.setAttribute("id", "productlijst");
            var productlijstHeader = document.createElement("li");
            productlijstHeader.setAttribute("class", "header");
            productlijstHeader.innerHTML = "Suggesties";
            productlijstUl.appendChild(productlijstHeader);

            var ProductSuggestionsLength = ProductSuggestions.length;

            for (var i = 0; i < ProductSuggestionsLength; i++) {
                var SuggestedProductId = ProductSuggestions[i].SuggestedProductId;

                var suggestionAdded = false;
                for (var j = 0; j <= collectionCount; j++) {
                    if (ModelCollection[j].ID == SuggestedProductId) {
                        if (suggestionAdded == false) {
                            var suggestion = createMenuItem(ModelCollection[j].Name, ModelCollection[j].PriceIn, ModelCollection[j].hasAlterations, ModelCollection[j].ParentProductmenuItemId, ModelCollection[j].ID, ModelCollection[j].hasFilePathRelativeToMediaPath, ModelCollection[j].FilePathRelativeToMediaPath);
                            productlijstUl.appendChild(suggestion);
                            suggestionAdded = true;
                        }
                    }
                }
            }
            detailPagina.appendChild(productlijstUl);
        }
    }

}

//PRODUCTENGEDEELTE
var totaal = 0;

//huidige hoeveelheid ophalen
$("button.addone").live('click', function () {
    var aantal = parseFloat($(this).siblings('input').attr('value'));

    //hoeveelheid plaatsen in span element
    //$(this).siblings('span').html(aantal);
    //$(this).siblings('input').attr('value', aantal);

    //optellen bij totaal en laten zien bij 1 of meer
    totaal = totaal + aantal;
    if (totaal > 0) {
        $('a.totaal').removeClass('leeg');
    };

    var totaalTekst = document.getElementById("topRight").innerHTML;
    if (totaalTekst != "") {
        var splitTekst = totaalTekst.split(" ");
        totaal = parseInt(splitTekst[1]) + aantal;
    } else {
        totaal = aantal;
    }

    if (totaal == 1) {
        $('a.totaal').html('Total: ' + totaal + ' item');
    } else {
        $('a.totaal').html('Total: ' + totaal + ' items');
    }

});
//$("button.minusone").tap(function() {
//$("button.minusone").live('touchstart', function() {
$("button.minusone").live('click', function () {

    //huidige hoeveelheid ophalen
    var aantal = parseFloat($(this).siblings('input').attr('value'));

    aantal = aantal - 1;
    
    /*
    if (aantal <= 0) {
        aantal = 0;
        $(this).siblings('input').attr('value', aantal);
    } else {	
        $(this).siblings('input').attr('value', aantal);
    };
    */

    var totaalTekst = document.getElementById("topRight").innerHTML;
    if (totaalTekst != "") {
        var splitTekst = totaalTekst.split(" ");
        totaal = parseInt(splitTekst[1]) - 1;
    } else {
        totaal = 0;
    }

    if (totaal <= 0) {	//als 0 verstoppen en 0 plaatsen
        $('a.totaal').addClass('leeg');
        totaal = 0;
    }

    if (totaal == 1) {
        $('a.totaal').html('Total: ' + totaal + ' item');

    } else {
        $('a.totaal').html('Total: ' + totaal + ' items');
    }

});