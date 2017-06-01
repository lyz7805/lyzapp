
if (!PDFJS.PDFViewer || !PDFJS.getDocument) {
  alert('Please build the pdfjs-dist library using\n' +
    '  `gulp dist`');
}

// The workerSrc property shall be specified.
//
PDFJS.workerSrc = '../../build/dist/build/pdf.worker.js';

// Some PDFs need external cmaps.
//
// PDFJS.cMapUrl = '../../build/dist/cmaps/';
// PDFJS.cMapPacked = true;

var DEFAULT_URL = 'lyzapp/attach/cpgl/201705/pdfjstest.pdf';
var SEARCH_FOR = ''; // try 'Mozilla';

var container = document.getElementById('viewerContainer');

// (Optionally) enable hyperlinks within PDF files.
var pdfLinkService = new PDFJS.PDFLinkService();

var pdfViewer = new PDFJS.PDFViewer({
  container: container,
  linkService: pdfLinkService,
});
pdfLinkService.setViewer(pdfViewer);

// (Optionally) enable find controller.
var pdfFindController = new PDFJS.PDFFindController({
  pdfViewer: pdfViewer
});
pdfViewer.setFindController(pdfFindController);

container.addEventListener('pagesinit', function () {
  // We can use pdfViewer now, e.g. let's change default scale.
  pdfViewer.currentScaleValue = 'page-width';

  if (SEARCH_FOR) { // We can try search for things
    pdfFindController.executeCommand('find', { query: SEARCH_FOR });
  }
});

// Loading document.
PDFJS.getDocument(DEFAULT_URL).then(function (pdfDocument) {
  // Document loaded, specifying document for the viewer and
  // the (optional) linkService.
  pdfViewer.setDocument(pdfDocument);

  pdfLinkService.setDocument(pdfDocument, null);
});