// components/FileUpload.js
import React, { useRef, useState, useEffect } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  useEffect(() => {
    // Fetch the list of uploaded files from the backend
    const fetchUploadedFiles = async () => {
      try {
        const response = await fetch('/api/get-files');
        if (response.ok) {
          const data = await response.json();
          setUploadedFiles(data.files);
        } else {
          console.error('Failed to fetch uploaded files');
        }
      } catch (error) {
        console.error('Error fetching uploaded files:', error);
      }
    };

    fetchUploadedFiles();
  }, []);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = async () => {
    if (selectedFile) {
      const formData = new FormData();
      formData.append('file', selectedFile);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const result = await response.json();
          setUploadStatus('File successfully uploaded!');
          onFileUpload(result.fileUrl); // Pass the file URL to the parent component
          setUploadedFiles([...uploadedFiles, result.fileUrl]);
          setTimeout(() => {
            setUploadStatus('');
            setSelectedFile(null);
          }, 3000);
        } else {
          setUploadStatus('Failed to upload file.');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        setUploadStatus('Error uploading file.');
      }
    }
  };

  return (
    <div className="fileuploader">
      <div>
        <h4>Upload geojson/tiff files to see maps on mapbox</h4>
      </div>
      <div className="relative flex gap-x-5">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".geojson,.tiff"
          className="hidden"
        />
        <button
          onClick={handleUploadClick}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        >
          Choose File
        </button>
        {selectedFile && <span className="text-sm text-gray-600 w-full py-2 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">{selectedFile.name}</span>}
      </div>
      <div className="mt-4">
        <button
          onClick={handleFileUpload}
          className="py-2 px-4 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-75"
        >
          Upload
        </button>
      </div>
      {uploadStatus && (
        <div className="mt-4 text-green-600 bg-green-100 p-2 rounded">
          {uploadStatus}
        </div>
      )}
      <div className="mt-4">
        <h5>Uploaded Files:</h5>
        <ul>
          {uploadedFiles.map((fileUrl, index) => (
            <li key={index}>
              <button onClick={() => onFileUpload(fileUrl)} className="text-blue-500 underline">
                {fileUrl}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FileUpload;
