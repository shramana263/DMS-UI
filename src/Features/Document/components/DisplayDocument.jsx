import React, { useEffect, useState } from 'react'
import axiosClient from '../../../axios-client'
import { useDocumentContext } from '../../Auth/contexts/DocumentContext'
import DisplayArea from './DisplayArea'




const DisplayDocument = () => {

    // const [files, setFiles] = useState([])
    const {  setFiles } = useDocumentContext()

    useEffect(() => {

        axiosClient.get(`/doc/getbytoken`)
            .then(response => {
                // console.log("response", response.data)
                setFiles(response.data)

            })
            .catch(error => {
                console.log(error)
            })
    }, [])

    return (
        <>
            <DisplayArea/>

        </>
    )
}

export default DisplayDocument
