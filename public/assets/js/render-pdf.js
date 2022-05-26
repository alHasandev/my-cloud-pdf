function renderPDF(query = '', data) {
  pdfjsLib.getDocument(data).then((pdf) => {
    myState.pdf = pdf;
    myState.pdf.getPage(myState.currentPage).then((page) => {
      var canvas = document.querySelector(query);
      var ctx = canvas.getContext('2d');

      var viewport = page.getViewport(myState.zoom);

      canvas.width = viewport.width;
      canvas.height = viewport.height;

      page.render({
        canvasContext: ctx,
        viewport: viewport,
      });
    });
  });
}