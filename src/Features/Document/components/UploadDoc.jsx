import React, { useRef, useState } from 'react';
import axios from 'axios';
import axiosClient from '../../../axios-client';
import { SlCloudUpload } from "react-icons/sl";

const UploadDoc = () => {
  
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [tags, setTags] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [isDraggingOver, setDraggingOver] = useState(false)

  const inputRef = useRef()

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("button clicked!")
    console.log(selectedFiles)

    if (!selectedFiles.length) {
      setUploadStatus('Please select a file to upload');
      return;
    }
    const token = localStorage.getItem('ACCESS_TOKEN');


    // for (const file of selectedFiles) {

    const formData = new FormData();
    for (const file of selectedFiles) {
      formData.append('files', file);
    };
    // formData.append('tags', JSON.stringify(tags.split(',').map(tag => ({ name: tag.trim() }))));
    // formData.append('tags',tags);
    console.log(formData)

    try {
      const response = await axiosClient.post('http://localhost:8080/api/doc/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          'Authorization': `Bearer ${token}`
        },
      });
      if (response.status === 201) {
        setUploadStatus('Files uploaded successfully!');
        setTags('')
        setSelectedFiles([])
      }
      console.log(response.status)

    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus('File upload failed.');
    }
    // }
  };

  const handleFileChange = (event) => {
    setSelectedFiles(event.target.files); // Select multiple files
    console.log(event.target.files)
    setUploadStatus(''); // Clear previous status
  };



  const handleDragOver = (e) => {

    e.preventDefault();
    setDraggingOver(true)
  }

  const handleDrop = (e) => {

    e.preventDefault();
    // setFile(e.dataTransfer.files[0])
    setSelectedFiles(prev => [...prev, ...e.dataTransfer.files])
    // console.log(file)
  }
  const handleDragLeave = (e) => {
    e.preventDefault();
    setDraggingOver(false);
  }

  const handleChangeFile = (e) => {
    e.preventDefault();
    
    setDraggingOver(false)

  }


  return (
    <>
      <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">Upload Document</h1>
          <form onSubmit={handleSubmit}>
            {/* <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-1">Document File</label>
            <input
              type="file"
              onChange={handleFileChange}
              className="block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            />
          </div> */}
            <div className='flex justify-center items-center'>

              {
                !selectedFiles.length &&
                <div
                  className="dropzone flex justify-center items-center gap-3"
                  onDragOver={handleDragOver}
                  onDrop={handleDrop}
                  onDragLeave={handleDragLeave}
                  style={{
                    border: isDraggingOver ? "4px dashed #00C21A" : "4px dashed #757070"
                  }}
                >
                  <div className=' font-thin' style={{ color: isDraggingOver ? "#00C21A" : "#757070" }}> <SlCloudUpload size={80} /></div>
                  <h1 className='text-lg' style={{ color: isDraggingOver ? "#00C21A" : "#757070" }}>Drag and Drop Files to Upload</h1>
                  <h1 style={{ color: isDraggingOver ? "#00C21A" : "#757070" }}>Or</h1>
                  <input
                    type="file"
                    multiple
                    onChange={handleFileChange}
                    hidden
                    // accept="image/png, image/jpeg"
                    ref={inputRef}
                  />
                  <div className='rounded p-3  hover:cursor-pointer'
                    style={{ color: isDraggingOver ? "#00C21A" : "#757070", border: isDraggingOver ? "2px solid #00C21A" : "2px solid #757070" }}
                    onClick={() => inputRef.current.click()}
                  >Select File</div>
                </div>
              }
              {
                selectedFiles.length>0 &&
                <span className='text-xl'>Selected Files</span>
              }
              {
                selectedFiles &&
                <>
                <div className=''>

                  {
                    selectedFiles && selectedFiles.map((file) => (

                      <div className='flex justify-center items-center flex-col gap-3'>
                        {/* {console.log(file)} */}
                        <span className='border ps-4 pe-4 pt-2 pb-2 border-black text-lg'>{file.name}</span>
                        <div className='border p-3 rounded bg-slate-900 text-white hover:cursor-pointer' onClick={handleChangeFile}>Change file</div>
                      </div>
                    ))
                  }
                </div>
                </>
              }
            </div>

            <div className="mb-6 mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
              <input
                type="text"
                placeholder="Tags (comma separated)"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="block w-full p-3 pt-2 pb-2 text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
            >
              Upload
            </button>
            {uploadStatus && <p className="mt-4 text-center text-gray-600">{uploadStatus}</p>}
          </form>
        </div>
      </div>


    </>
  );
};

export default UploadDoc;