function getXML(ModelCollection, bestelling, xmlData) {
    var xml = new XMLWriter();
    
    xml.BeginNode("Order");

    xml.BeginNode("OrderId"); xml.WriteString("0"); xml.EndNode();
    xml.BeginNode("Guid"); xml.WriteString(guid().toString()); xml.EndNode();
    xml.BeginNode("CustomerId"); xml.WriteString(xmlData.customerId.toString()); xml.EndNode();
    xml.BeginNode("CompanyId"); xml.WriteString(xmlData.companyId.toString()); xml.EndNode();
    xml.BeginNode("PaymentmethodId"); xml.WriteString(xmlData.PaymentmethodId.toString()); xml.EndNode();
    xml.BeginNode("DeliverypointNumber"); xml.WriteString(xmlData.DeliverypointNumber.toString()); xml.EndNode();
    xml.BeginNode("Status"); xml.WriteString("0"); xml.EndNode();
    xml.BeginNode("StatusText"); xml.WriteString(""); xml.EndNode();
    xml.BeginNode("Notes"); xml.WriteString(""); xml.EndNode();
    xml.BeginNode("BenchmarkInformation"); xml.WriteString("None"); xml.EndNode();
    xml.BeginNode("MobileClientHistoryOrderPriceInTotal"); xml.WriteString("0"); xml.EndNode();

    xml.BeginNode("Orderitems");
        var ProductName = "";
        var PriceIn = "";

        for (var i = 0; i < bestelling.length; i++) {
            for (var j = 0; j < ModelCollection.length; j++) {
                if (bestelling[i].ProductId == ModelCollection[j].ID) {
                    ProductName = ModelCollection[j].Name;
                    PriceIn = ModelCollection[j].PriceIn;
                }
            }

            xml.BeginNode("Orderitem");
                xml.BeginNode("OrderitemId"); xml.WriteString("5"); xml.EndNode();
                xml.BeginNode("OrderId"); xml.WriteString("0"); xml.EndNode();
                xml.BeginNode("Guid"); xml.WriteString(guid().toString()); xml.EndNode();
                xml.BeginNode("ProductId"); xml.WriteString(bestelling[i].ProductId.toString()); xml.EndNode();
                xml.BeginNode("ProductName"); xml.WriteString(ProductName); xml.EndNode();
                xml.BeginNode("Quantity"); xml.WriteString(bestelling[i].Hoeveelheid.toString()); xml.EndNode();
                xml.BeginNode("PriceIn"); xml.WriteString(PriceIn.toString()); xml.EndNode();
                xml.BeginNode("PriceInSubTotal"); xml.WriteString("0"); xml.EndNode();
                xml.BeginNode("Notes"); xml.WriteString(""); xml.EndNode();
                xml.BeginNode("BenchmarkInformation"); xml.WriteString(""); xml.EndNode();

                if (bestelling[i].hasAlterations == true) {
                    var alterations = bestelling[i].Alterations;

                    xml.BeginNode("Alterationitems");
                    for (var k = 0; k < alterations.length; k++) {
                            xml.BeginNode("Alterationitem");
                                xml.BeginNode("AlterationitemId"); xml.WriteString(k.toString()); xml.EndNode();
                                xml.BeginNode("AlterationId"); xml.WriteString(alterations[k].AlterationId.toString()); xml.EndNode();
                                xml.BeginNode("Guid"); xml.WriteString(guid().toString()); xml.EndNode();
                                xml.BeginNode("AlterationName"); xml.WriteString(""); xml.EndNode();
                                xml.BeginNode("AlterationoptionId"); xml.WriteString(alterations[k].AlterationoptionId.toString()); xml.EndNode();
                                xml.BeginNode("AlterationoptionName"); xml.WriteString(alterations[k].AlterationoptionName.toString()); xml.EndNode();
                                xml.BeginNode("SelectedOnDefault"); xml.WriteString("false"); xml.EndNode();
                                xml.BeginNode("SortOrder"); xml.WriteString("0"); xml.EndNode();
                            xml.EndNode();
                        }
                    xml.EndNode();
                } else {
                    xml.BeginNode("Alterationitems"); xml.WriteString(""); xml.EndNode();
                }
                
            xml.EndNode();
        }
    xml.EndNode();
    
    xml.BeginNode("CustomerNameFull"); xml.WriteString(""); xml.EndNode();
    xml.BeginNode("CustomerPhonenumber"); xml.WriteString(""); xml.EndNode();
    xml.BeginNode("CompanyName"); xml.WriteString(""); xml.EndNode();
    xml.BeginNode("CompanyObycode"); xml.WriteString(""); xml.EndNode();
    xml.BeginNode("PaymentmethodName"); xml.WriteString(xmlData.PaymentmethodName.toString()); xml.EndNode();
    xml.BeginNode("Type"); xml.WriteString("200"); xml.EndNode();
    xml.BeginNode("ConfirmationCodeDeliveryType"); xml.WriteString("0"); xml.EndNode();
    xml.BeginNode("Updated"); xml.WriteString(""); xml.EndNode();
    xml.BeginNode("Created"); xml.WriteString(""); xml.EndNode();
    xml.BeginNode("ProcessingExpired"); xml.WriteString("false"); xml.EndNode();
    xml.BeginNode("PhoneInfo"); xml.WriteString(""); xml.EndNode();
    xml.BeginNode("AgeVerificationType"); xml.WriteString("100"); xml.EndNode();
    xml.BeginNode("RequiredAge"); xml.WriteString("0"); xml.EndNode();
    xml.BeginNode("ErrorSentByEmail"); xml.WriteString("false"); xml.EndNode();
    xml.BeginNode("ErrorSentBySMS"); xml.WriteString("false"); xml.EndNode();
    xml.BeginNode("FieldValue1"); xml.WriteString(""); xml.EndNode();
    xml.BeginNode("FieldValue2"); xml.WriteString(""); xml.EndNode();
    xml.BeginNode("FieldValue3"); xml.WriteString(""); xml.EndNode();
    xml.BeginNode("FieldValue4"); xml.WriteString(""); xml.EndNode();
    xml.BeginNode("FieldValue5"); xml.WriteString(""); xml.EndNode();
    xml.BeginNode("FieldValue6"); xml.WriteString(""); xml.EndNode();
    xml.BeginNode("FieldValue7"); xml.WriteString(""); xml.EndNode();
    xml.BeginNode("FieldValue8"); xml.WriteString(""); xml.EndNode();
    xml.BeginNode("FieldValue9"); xml.WriteString(""); xml.EndNode();
    xml.BeginNode("FieldValue10"); xml.WriteString(""); xml.EndNode();
    xml.EndNode();
    xml.Close();

    return xml.ToString();
}

function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}
function guid() {
    return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4() + S4() + S4());
}
