import React, { useEffect, useState } from 'react'
import { FaArrowRight } from 'react-icons/fa'
import axiosClient from '../../../axios-client'
import { useDocumentContext } from '../../Auth/contexts/DocumentContext'

const filterType = [
    {
        name: "Filter docs by date",
        type: "date"
    },
    {
        name: "Filter docs by tag",
        type: "tag"

    },
    {
        name: "Filter docs by type",
        type: "type"
    }

]
const DocumentFilter = () => {
    const [inputType, setInputType] = useState("date")

    return (
        <>
            <div className='flex gap-3 '>

                {/* <div>This is DocumentFilter</div> */}
                <FilterSelector inputType={inputType} setInputType={setInputType} />
                <InputBox inputType={inputType} />
            </div>
        </>
    )
}

export default DocumentFilter

const FilterSelector = ({ inputType, setInputType }) => {
    const handleChange = (e) => {
        // console.log(e.target.value)
        setInputType(e.target.value)
    }
    return (
        <>
            <select name="filterType" id="filterType" onChange={handleChange} className='bg-transparent focus:outline-none dark:text-fuchsia-50'>
                {
                    filterType && filterType.map((x, index) => (

                        <option value={x.type} key={index} className='dark:text-neutral-900'>
                            {x.name}
                        </option>

                    ))
                }
            </select>
        </>
    )
}

const InputBox = ({ inputType }) => {
    const [searchParam, setSerchParam] = useState(inputType == 'date' ? new Date().toISOString().slice(0, 10) : '')
    const [modifiedDate, setModifiedDate] = useState(new Date().toISOString().slice(0, 10))
    const handleChange = (e) => {
        e.preventDefault()
        setSerchParam(e.target.value)

        if (inputType == "date") {
            setModifiedDate(prev=>e.target.value)
            console.log("modified date= ",modifiedDate)
        }
    }


    useEffect(() => {
        setSerchParam(prev=>inputType == 'date' ? modifiedDate : '')
        return
    }, [inputType])

    return (
        <>
            <div className='flex gap-3 justify-center items-center p-3 flex-col xl:flex-row md:flex-row'>
                {/* <span className='font-bold'>Get your documents for a specific date: </span> */}
                <input type={inputType} onChange={handleChange} value={inputType == 'date' ? modifiedDate :searchParam} placeholder={`Enter ${inputType}`} className='w-96 border-none rounded p-2 focus:outline-none ' />
                <SearchButton searchParam={searchParam} inputType={inputType} />
            </div>
        </>
    )
}

const SearchButton = ({ searchParam, inputType }) => {

    const { setFiles } = useDocumentContext()
    console.log(searchParam)
    let url = '';
    const handleClick = (e) => {
        e.preventDefault();
        if (inputType == "date") {
            url = `/doc/by-date/${searchParam}`
        }
        else if (inputType == "tag") {
            url = `/doc/getbytag/${searchParam}`
        }
        else {
            url = `/doc/getbytype/${searchParam}`
        }
        axiosClient.get(url)
            .then((response) => {
                setFiles(prev => [...response.data])
                console.log(response.data)
            })
            .catch(error => {
                console.log(error)
            })
    }

    return (
        <span className='flex justify-center items-center border rounded-full shadow-md p-2 dark:text-fuchsia-50' onClick={handleClick} ><FaArrowRight size={25} /></span>
    )
}
