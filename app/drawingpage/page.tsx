// pages/users.js
"use client";
import React, { useState } from 'react';
import Header from "../components/header";
import Map from "../components/map2";
// import FileUpload from "../components/fileupload";

export default function Users() {
  return (
    <main className="">
      <Header />
      
        {/* <FileUpload onFileUpload={handleFileUpload} /> */}
      <div className=" m-auto  overflow-hidden drawingshapes">
      <div><h2 className="header1 mb-10">Drawing shapes on maps</h2></div>
      <Map />
  </div>
     
    </main>
  );
}




  // sk.eyJ1Ijoic2l2YXRlamFzIiwiYSI6ImNseTJtZzIzcDB6dzMyanBkdXB2bnZrZ2MifQ.-My46GKAmlo0x_0GIeQGCA