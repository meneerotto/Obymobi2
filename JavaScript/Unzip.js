var rootDir = unescape(window.location.href.substring(0, (window.location.href.lastIndexOf("/")) + 1))
var ImagesDir = rootDir + "/productimages/50/";

new ZipFile("Media20111004090646.zip", test, 1);
function test(zip) {
    var entry = zip.entries[0];

    entry.extract(extractCB);
}

function extractCB(entry, entryContent) {
    alert(entryContent);
}

var images_zip_file = "C:/Users/Floris/Desktop/Media20111004090646.zip";

function unzip() {
    var timer = new Timer();
    var doneReading = function (zip) {
        try {
            displayZipStatus(zipFile);
            showZipContent(zipFile, timer.split());
        }
        catch (exc1) {
            defaultCursor();
        }
    };
    var doneReading = function (zip) {
        try {
            alert("test");
        }
        catch (exc1) {
            alert("test2");
            defaultCursor();
        }
    };
    timer.start();
    waitCursor();
    var zipFile = new ZipFile(images_zip_file, doneReading, 1);
}

function waitCursor() {
    document.body.style.cursor = 'wait';
}

function defaultCursor() {
    document.body.style.cursor = 'default';
}

var Timer = function () { };
Timer.prototype = {
    _start: null,
    _stop: null,
    start: function () {
        var now = new Date();
        this._start = now.getTime();
    },
    stop: function () {
        var now = new Date();
        this._stop = now.getTime();
    },
    elapsed: function () {
        return this._stop - this._start;
    },
    split: function () {
        var now = new Date();
        return now - this._start;
    }
};

function displayZipStatus(zip) {
    var status = "";
    if (zip.status.length > 0) {
        status += "<br/>status messages: " + zip.status.length +
                ':<br/><ol>\n';
        for (var i = 0; i < zip.status.length; i++) {
            var msg = zip.status[i];
            status += "<li style='font-size:x-small;'>" + msg + "</li>\n";
        }
        status += "</ol><br/>\n";
    }
    else {
        status += "<br/>no status messages.<br/>";
    }
    $("#status").append(status);
    zip.status = [];  // clear
}

