function showProductenPage(categoryId, back) {
    if (back == true) {
        removeLastPage();
    }
    addPage("showProductenPage('"+ categoryId +"', true)");

    var ModelCollection = sessvars.ModelCollection;

    this.hideAllPages(false);

    var productlijst = document.getElementById("productlijst");
    var productenlijst = document.getElementById("productenlijst");
    productlijst.style.visibility = "visible";
    productlijst.style.display = "block";
    productenlijst.style.visibility = "visible";
    productenlijst.style.display = "block";

    //Top menu
    var topLeft = document.getElementById("topLeft");
    topLeft.setAttribute("class", "previous");
    topLeft.setAttribute("onclick", getLastPage());
    topLeft.innerHTML = "Back";
    var topRight = document.getElementById("topRight");
    topRight.setAttribute("class", "next totaal");
    topRight.setAttribute("onclick", "showBesteloverzichtPage(false);");
    topRight.innerHTML = "Order Basket";

    var productenlijst = document.getElementById("productenlijst");
    var productlijst = document.getElementById("productlijst");
    while (productenlijst.firstChild) productenlijst.removeChild(productenlijst.firstChild);
    while (productlijst.firstChild) productlijst.removeChild(productlijst.firstChild);

    if (sessvars.selectedCompany != undefined) {
        var selectedCompany = sessvars.selectedCompany;
        document.getElementById("horecanaam").innerHTML = selectedCompany.companyName;
    }

    var ModelCollection = sessvars.ModelCollection;
    var company_id = sessvars.CompanyId;

    var ItemType = 100;

    //Check voor het ItemType van de subCategories
    for (var i = 0; i < ModelCollection.length; i++) {
        if (ModelCollection[i].ParentProductmenuItemId == categoryId) {
            if (ModelCollection[i].ItemType == 200) {
                ItemType = 200;
            }
        }
    }

    //Aan de hand van het ItemType wordt gekeken wat voor pagina er gemaakt moet worden
    if (ItemType == 100) {
        //ItemType 100 = category
        var categorieId = categoryId;
        var categorieName;

        var categories = new Array();
        
        var productList = document.createElement("ul");

        var index = 0;
        for (var i = 0; i < ModelCollection.length; i++) {
            if (ModelCollection[i].ParentProductmenuItemId == categorieId) {
                categories[index] = ModelCollection[i];
                index++;
            }
            else if (ModelCollection[i].ID == categorieId) {
                categorieName = ModelCollection[i].Name;
            }
        }

        var categorieHeader = document.createElement("li");
        categorieHeader.setAttribute("class", "header");
        categorieHeader.innerHTML = categorieName;
        productList.appendChild(categorieHeader);

        for (var j = 0; j < categories.length; j++) {
            var categoryName = categories[j].Name;
            var categoryId = categories[j].ID;

            var listItem = document.createElement("li");
            var linkItem = document.createElement("a");
            listItem.setAttribute("style", "cursor: pointer;");
            listItem.setAttribute("onclick", "showProductenPage('" + categoryId + "')");
            linkItem.innerHTML = categoryName;
            listItem.appendChild(linkItem);
            productList.appendChild(listItem);
        }

        productenlijst.appendChild(productList);
    } else {
        //ItemType 200 = product
        var collectionCount = ModelCollection.length - 1;

        var productCategory;
        var producten = new Array();

        var indexProduct = 0;
        for (i = 0; i <= collectionCount; i++) {
            if (ModelCollection[i].ID == categoryId) {
                productCategory = ModelCollection[i].Name;
            }
            else if (ModelCollection[i].ParentProductmenuItemId == categoryId) {
                var Model;
                if (ModelCollection[i].hasImage) {
                    if (ModelCollection[i].hasAlterations == true) {
                        Model = [ModelCollection[i].Name, ModelCollection[i].ID, ModelCollection[i].hasImage, ModelCollection[i].FilePathRelativeToMediaPath, true, ModelCollection[i].Alterations, ModelCollection[i].PriceIn];
                    }
                    else {
                        Model = [ModelCollection[i].Name, ModelCollection[i].ID, ModelCollection[i].hasImage, ModelCollection[i].FilePathRelativeToMediaPath, false, null, ModelCollection[i].PriceIn];
                    }
                }
                else {
                    if (ModelCollection[i].hasAlterations == true) {
                        Model = [ModelCollection[i].Name, ModelCollection[i].ID, ModelCollection[i].hasImage, null, true, ModelCollection[i].Alterations, ModelCollection[i].PriceIn];
                    }
                    else {
                        Model = [ModelCollection[i].Name, ModelCollection[i].ID, ModelCollection[i].hasImage, null, false, null, ModelCollection[i].PriceIn];
                    }
                }
                producten[indexProduct] = Model;
                indexProduct++;
            }
        }
        producten.sort();

        var productlijst = document.getElementById("productlijst");

        var productList = document.createElement("ul");
        var productHeader = document.createElement("li");
        productHeader.setAttribute("class", "header");
        productHeader.innerHTML = productCategory;
        productList.appendChild(productHeader);

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

        for (i = 0; i <= producten.length - 1; i++) {
            var hasAlterations = producten[i][4];

            var productLi = document.createElement("li");
            var productSpan = document.createElement("span");
            var productImg = document.createElement("img");
            var productA = document.createElement("a");
            var productSpan2 = document.createElement("span");
            var productEm = document.createElement("em");
            var productAlteration = document.createElement("a");
            var productBtn = document.createElement("button");
            //var productBtn2 = document.createElement("button");
            
            productLi.setAttribute("class", "product negatief");
            productLi.setAttribute("id", "li" + producten[i][1]);

            productSpan.setAttribute("id", "span" + producten[i][1]);
            productSpan.innerHTML = "0";

            productImg.setAttribute("height", "45px");
            productImg.setAttribute("width", "62px");

            if (producten[i][2] == true) {
                if (producten[i][3] != undefined) {
                    productImg.setAttribute("src", producten[i][3]);
                }
            }
            productImg.setAttribute("alt", "");

            productA.setAttribute("class", "productName");
            
            //maak een onclick functie
            productA.setAttribute("onclick", "showProductPage('" + categoryId + "', '" + producten[i][1] + "');");
            productA.setAttribute("style", "cursor: pointer;");

            //Controleer op lengte van de naam van het product. Te lang? voeg ... aan het eind toe
            if (producten[i][0].toString().length > 23) {
                productSpan2.innerHTML = producten[i][0].toString().substr(0, 20) + "...";
            } else {
                productSpan2.innerHTML = producten[i][0];
            }

            var fullPrice = producten[i][6];
            var beforeComma = fullPrice.toString().substring(0, fullPrice.toString().length - 2);
            var behindComma = fullPrice.toString().substring(fullPrice.toString().length - 2, 4);
            var correctPrice = beforeComma + "." + behindComma
            if (hasAlterations == true) {
                productEm.innerHTML = correctPrice + " Options available";
            } else {
                productEm.innerHTML = correctPrice;
            }

            if (hasAlterations == true) {
                productAlteration.setAttribute("class", "plusLink");

                //Maak een onclick functie
                productAlteration.setAttribute("onclick", "showProductPage('" + categoryId + "', '" + producten[i][1] + "');");
                productAlteration.setAttribute("style", "cursor: pointer;");

                productAlteration.innerHTML = "+";
            }
            else {
                productBtn.setAttribute("type", "button");
                productBtn.setAttribute("class", "plus");
                productBtn.setAttribute("onclick", "addToOrder(" + producten[i][1] + "," + categoryId + ");");
                productBtn.innerHTML = "+";
            }

            //productBtn2.setAttribute("type", "button");
            //productBtn2.setAttribute("class", "minus");
            //productBtn2.setAttribute("onclick", "removeFromOrder(" + producten[i][1] + ");");
            //productBtn2.innerHTML = "-";

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
            //productLi.appendChild(productBtn2);
            productList.appendChild(productLi);
        }

        productlijst.appendChild(productList);
    }
}