import DocViewer, { DocViewerRenderers } from '@cyntler/react-doc-viewer'
import React from 'react'

const DocxView = () => {

    const docs=[
        {
            uri:"http://localhost:8080/documents/1728333290830sample-2.docx",
            fileType:"docx",
            fileName:"1728333290830sample-2.docx"
        },
        // { uri: 'https://getsamplefiles.com/download/word/sample-2.docx', fileType: "docx", fileName: "test-doc2.docx" },
    ]
    // const docs = [{ uri:`${window.location.origin}/test-doc.docx` }];
    const headers = {
        "X-Access-Token": "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJTaHJhbWFuYSIsImlhdCI6MTcyODMzMjgxMSwiZXhwIjoxNzI4NDE5MjExfQ.smUx_TuWl_lWBUSlfQ7Y-LvJYOoYNhQBkZ-5j783rE4",
        // "My-Custom-Header": "my-custom-value",
      };
  return (
    <>
    <div>
        <h1>Document Viewer</h1>
        <DocViewer documents={docs} pluginRenderers={DocViewerRenderers} 
        style={{ height:"1000 px" }}
        prefetchMethod="GET"
        requestHeaders={headers}
        config={{
            header: {
              disableHeader: false,
              disableFileName: false,
              retainURLParams: false,
            },
          }}
        />
        {/* <iframe src='https://getsamplefiles.com/download/word/sample-2.docx' frameborder="0"
        sandbox="allow-scripts allow-same-origin allow-popups"
        ></iframe> */}
    </div>
      
    </>
  )
}

export default DocxView
