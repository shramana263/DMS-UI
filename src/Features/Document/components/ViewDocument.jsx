import React, { useEffect, useRef, useState } from 'react'
// import pdfjsLib from 'pdfjs-dist';
import { useLocation } from 'react-router-dom';
// import pdfjsLib from '';
import { pdfjs } from 'react-pdf';

const ViewDocument = () => {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const location1 = useLocation();
  const { url } = location1.state || {};
  console.log('Child : ', url)

  // useEffect(()=>{
  //     const iframe = document.createElement('iframe');
  //     iframe.src = url;
  //     iframe.sandbox="allow-same-origin"
  //     iframe.policy="SAMEORIGIN"
  //   //Add a loading indicator (optional)
  //   // iframe.classList.add('loading');
  //   // iframe.addEventListener('load', () => {
  //   //   iframe.classList.remove('loading');
  //   // });

  //   iframe.style.width = '100%';
  //   iframe.style.height = '500px'; // Adjust height as needed
  //   console.log(iframe)
  //   document.body.appendChild(iframe);
  //   return () => {
  //     document.body.removeChild(iframe);
  //   };
  // },[url])


  const pdfUrl = 'http://localhost:8080/documents/1725366497339srs v2.pdf';
  const pdfContainer = document.getElementById('pdf-container');

  pdfjs.getDocument(pdfUrl).then((pdfDoc) => {
    // Render the PDF
    pdfDoc.getPage(1).then((page) => {
      const scale = 1.5; // Adjust zoom level
      const viewport = page.getViewport({ scale });
    
      const canvas = document.createElement('canvas');
      canvas.height = viewport.height;
      canvas.width = viewport.width;
    
      pdfContainer.appendChild(canvas);
    
      const ctx = canvas.getContext('2d');
      page.render({ canvasContext: ctx, viewport });
    });
  });


  return (
    <>
      <div>

      </div>
    </>
  );
};

export default ViewDocument
