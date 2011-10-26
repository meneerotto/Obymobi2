//Mathieu's pc
//var webservice_url = "http://192.168.57.30/obymobi/ObymobiTypedWebService.asmx";
//Floris pc
//var webservice_url = "http://192.168.57.108/obymobi/ObymobiTypedWebService.asmx";
//Online i-dev webservice
var webservice_url = "http://development.obymobi.com/ObymobiTypedWebService.asmx";
var method;
var args = {};
var service;

function getMenu(company_id, customer_id) {
    method = "GetMenu";

    var service = new WS(webservice_url, WSDataType.jsonp);
    service.call(method, { customerId: customer_id, hashedPassword: "", companyId: company_id, updatedDateTimeFrom: "" }, menu_received, error_occurred);
    sessvars.CompanyId = company_id.toString();
}

function getPaymentMethods(company_id, customer_id) {
    method = "GetPaymentmethods";

    var service = new WS(webservice_url, WSDataType.jsonp);
    service.call(method, { customerId: customer_id, hashedPassword: "", companyId: company_id, updatedDateTimeFrom: "" }, payments_received, error_occurred);
}

function saveOrder(xmlVar, customerId) {
    method = "SaveOrder";
    
    var service = new WS(webservice_url, WSDataType.jsonp);
    service.call(method, { customerId: customerId, hashedPassword: "", xml: xmlVar, companyIdToSetFavorite: "" }, order_received, error_occurred);
}

function GetCompanyByCompanyId(company_id, customer_id) {
    method = "GetCompanyByCompanyId";

    var service = new WS(webservice_url, WSDataType.jsonp);
    service.call(method, { customerId: customer_id, hashedPassword: "", companyId: company_id }, company_received, error_occurred);
}

function GetCompaniesBySearchQuery(customerId, searchquery) {
    method = "GetCompaniesBySearchQuery";

    var service = new WS(webservice_url, WSDataType.jsonp);
    service.call(method, { customerId: customerId, hashedPassword: "", searchquery: searchquery }, companyBySearch_received, error_occurred);
}