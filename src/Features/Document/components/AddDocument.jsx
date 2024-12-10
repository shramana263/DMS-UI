// import React, { useState } from 'react';
// import axios from 'axios';

// const AddDocument = () => {
//   const [file, setFile] = useState(null);
//   const [name, setName] = useState('');
//   const [tags, setTags] = useState('');
//   const [uploadStatus, setUploadStatus] = useState('');


//   const handleFileChange = (event) => {
//     setFile(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!file) {
//       setUploadStatus('Please select a file to upload');
//       return;
//     }
//     const token=localStorage.getItem('ACCESS_TOKEN');

//     const formData = new FormData();
//     formData.append('file', file);
//     formData.append('name', name);
//     formData.append('tags', JSON.stringify(tags.split(',').map(tag => ({ name: tag.trim() }))));

//     try {
//       const response = await axios.post('http://localhost:8080/api/doc/upload', formData ,{
//         headers: {
//           'Content-Type': 'multipart/form-data',
//           'Access-Control-Allow-Origin': '*',
//            'Authorization': `Bearer ${token}`
//         },
//       });

//       if (response.status === 201) {
//         setUploadStatus('File uploaded successfully!');
//       }
//     } catch (error) {
//       console.error('Error uploading file:', error);
//       setUploadStatus('File upload failed.');
//     }
//   };

//   return (
//     <div className="bg-gray-100 min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-8">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">Upload Document</h1>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Document File</label>
//             <input
//               type="file"
//               onChange={handleFileChange}
//               className="block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
//             />
//           </div>
//           <div className="mb-4">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
//             <input
//               type="text"
//               placeholder="Document Name"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
//             />
//           </div>
//           <div className="mb-6">
//             <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma separated)</label>
//             <input
//               type="text"
//               placeholder="Tags (comma separated)"
//               value={tags}
//               onChange={(e) => setTags(e.target.value)}
//               className="block w-full text-gray-700 border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
//           >
//             Upload
//           </button>
//           {uploadStatus && <p className="mt-4 text-center text-gray-600">{uploadStatus}</p>}
//         </form>
//       </div>
//     </div>
//   );
// };

// export default AddDocument;