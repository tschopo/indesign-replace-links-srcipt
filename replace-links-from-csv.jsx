// Choose the file from a dialog
var file = File.openDialog();

// Open the file for reading
file.open("r");

var doc = app.activeDocument;

var ln = file.readln();
var tabs = ln.split('\t');
var originalUrl = tabs[0];
var pdfUrl = tabs[1];
var shortLink = tabs[2];

var failedUrls = [];
var succUrls = [];
var succCounter = 0;
var totCounter = 0;
while(ln) {

	totCounter ++;
	ln = file.readln();
	tabs = ln.split('\t');
	originalUrl = tabs[0];
	pdfUrl = tabs[1];
	shortLink = tabs[2];
	
	var m = replaceLink(originalUrl,shortLink);
	
	if(m) {
		succUrls.push(originalUrl);
		succCounter++;
	} else {
		failedUrls.push(originalUrl)
	}
}

var message = "Finished.";
message += (" Replaced " + succCounter.toString() + "/" + totCounter.toString() + " Urls.\r\nFailed Urls:\r\n");
for(i=0; i<failedUrls.length; i++) {
	message += (failedUrls[i] + "\r\n");
}

alert(message);

function replaceLink(searchUrl,replaceText) {

	var m = false;
	
	for(var i = 0; i < doc.hyperlinks.length; i++) {
		
	    if(doc.hyperlinks.item(i).destination.name === searchUrl) {

			doc.hyperlinks.item(i).source.sourceText.contents = replaceText;
			m = true;
	    }
		
	}
	
	return m;
}
