// viewer.js
// Make sure to include pdf.js and pdf.worker.js from the pdf.js library

// Set the URL of your PDF file
const pdfUrl = 'Prashant_Mhanta(2).pdf';

// Get the PDF container div element
const pdfContainer = document.getElementById('pdf-container');

// Initialize PDF.js
pdfjsLib.getDocument(pdfUrl).promise.then(pdfDoc => {
    let currentPage = 1;
    const numPages = pdfDoc.numPages;

    // Function to render a specific page
    function renderPage(pageNumber) {
        pdfDoc.getPage(pageNumber).then(page => {
            const scale = 1.5;
            const viewport = page.getViewport({ scale });

            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;

            const renderContext = {
                canvasContext: context,
                viewport: viewport,
            };

            pdfContainer.appendChild(canvas);

            page.render(renderContext).promise.then(() => {
                if (currentPage < numPages) {
                    currentPage++;
                    renderPage(currentPage);
                }
            });
        });
    }

    renderPage(currentPage);
});
