import { createContext, useContext, useModal, useState } from "react";

const ModalContext= createContext({
    isPreviewModalOpen:null,
    setPreviewModalOpen:()=>{}
});

export const ModalProvider=({children})=>{
    const [isPreviewModalOpen, setPreviewModalOpen]= useState(false)
    return(
        <ModalContext.Provider value={{ 
            isPreviewModalOpen, setPreviewModalOpen
         }}
        >
            {children}
        </ModalContext.Provider>
    )
}

export const useModalContext=()=>useContext(ModalContext)