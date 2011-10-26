function showIndexPage(back) {
    if (back == true) {
        removeLastPage();
    }
    addPage("showIndexPage(false)");

    this.hideAllPages(true);

    var contentmain = document.getElementById("contentmain");
    contentmain.style.visibility = "visible";
    contentmain.style.display = "block";
}