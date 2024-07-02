// components/FileUpload.js
import React, { useRef, useState } from 'react';

const FileUpload = ({ onFileUpload }) => {
  const fileInputRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onload = () => {
      onFileUpload(reader.result, file.type);
    };
    if (file) {
      reader.readAsText(file);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      setUploadStatus('File successfully uploaded!');
      setTimeout(() => {
        setUploadStatus('');
        setSelectedFile(null);
      }, 3000);
    }
  };

  return (
    <div className="fileuploader">
      <div>
      <h4>
    Upload geojson/tiff files to see maps on mapbox
  </h4>
      </div>
      <div className="relative  flex gap-x-5 ">
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
        {selectedFile && <span className="text-sm text-gray-600 w-full py-2 px-4  rounded-lg shadow-md  focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">{selectedFile.name}</span>}
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
    </div>
  );
};

export default FileUpload;
