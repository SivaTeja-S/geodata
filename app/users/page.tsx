// pages/users.js
"use client";
import React, { useState } from 'react';
import Header from "../components/header";
import Map from "../components/map1";
import FileUpload from "../components/fileupload";

export default function Users() {
  const [geoJsonData, setGeoJsonData] = useState(null);

  const handleFileUpload = (content:any, fileType:'application/json') => {
    console.log("File type:", fileType);
    console.log("File content:", content);

    if (fileType === 'application/json' || fileType === 'application/geojson') {
      try {
        const parsedData = JSON.parse(content);
        console.log("Parsed GeoJSON Data:", parsedData);
        setGeoJsonData(parsedData);
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    } else if (fileType === 'image/tiff') {
      console.error('TIFF file handling not implemented yet');
      // Handle TIFF file parsing or processing here if needed
    }
  };
  

  return (
    <main className="usermaps">
      <Header />
      <div className="overflow-hidden mapcontainermain">
      <Map geoJsonData={geoJsonData} />
  </div>
  <FileUpload onFileUpload={handleFileUpload} />
     
    </main>
  );
}




  // sk.eyJ1Ijoic2l2YXRlamFzIiwiYSI6ImNseTJtZzIzcDB6dzMyanBkdXB2bnZrZ2MifQ.-My46GKAmlo0x_0GIeQGCA