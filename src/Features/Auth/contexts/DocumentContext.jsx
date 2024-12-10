import React, { createContext, useContext, useState } from 'react'

const DocumentContext= createContext({

    files:null,
    details:false,
    isConversion:false,
    selectedImages:[],
    serFiles:()=>{},
    setDetails:()=>{},
    setConversion:()=>{},
    setSelectedImages:()=>{}
})
export const DocumentProvider = ({children}) => {
    const [files, setFiles]= useState()
    const [details, setDetails] = useState(false)
    const [isConversion, setConversion] = useState(false)
    const [selectedImages, setSelectedImages] = useState([]);
  return (
    <DocumentContext.Provider value={{ 
        files, setFiles, details, setDetails, isConversion, setConversion,selectedImages, setSelectedImages
     }}>
      {children}
    </DocumentContext.Provider>
  )
}

export const useDocumentContext=()=>useContext(DocumentContext)


