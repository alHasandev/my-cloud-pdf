const myState = {
  pdf: null,
  currentPage: 1,
  zoom: 1,
};

// Get pdf from server
fetch('https://my-cloud-pdf.herokuapp.com/pdf', {
  method: 'POST',
})
  .then((data) => data.blob())
  .then(async (response) => {
    const pdfData = await blobToBase64(response);
    renderPDF('#pdf_renderer', pdfData);

    // Re-render when control clicked
    document.getElementById('go_previous').addEventListener('click', (e) => {
      if (myState.pdf == null || myState.currentPage == 1) return;
      myState.currentPage -= 1;
      document.getElementById('current_page').value = myState.currentPage;
      renderPDF('#pdf_renderer', pdfData);
    });

    document.getElementById('go_next').addEventListener('click', (e) => {
      if (
        myState.pdf == null ||
        myState.currentPage > myState.pdf._pdfInfo.numPages
      )
        return;
      myState.currentPage += 1;
      document.getElementById('current_page').value = myState.currentPage;
      renderPDF('#pdf_renderer', pdfData);
    });

    document
      .getElementById('current_page')
      .addEventListener('keypress', (e) => {
        if (myState.pdf == null) return;

        // Get key code
        var code = e.keyCode ? e.keyCode : e.which;

        // If key code matches that of the Enter key
        if (code == 13) {
          var desiredPage =
            document.getElementById('current_page').valueAsNumber;

          if (
            desiredPage >= 1 &&
            desiredPage <= myState.pdf._pdfInfo.numPages
          ) {
            myState.currentPage = desiredPage;
            document.getElementById('current_page').value = desiredPage;
            renderPDF('#pdf_renderer', pdfData);
          }
        }
      });

    document.getElementById('zoom_in').addEventListener('click', (e) => {
      if (myState.pdf == null) return;
      myState.zoom += 0.5;
      renderPDF('#pdf_renderer', pdfData);
    });

    document.getElementById('zoom_out').addEventListener('click', (e) => {
      if (myState.pdf == null) return;
      myState.zoom -= 0.5;
      renderPDF('#pdf_renderer', pdfData);
    });
  })

preventDigitalWebPiracy();