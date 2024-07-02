"use client";
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Header from '../components/header';
// Load the map component dynamically to ensure it works with Next.js SSR
const Map1 = dynamic(() => import('../components/map3'), { ssr: false });
const Map2 = dynamic(() => import('../components/map4'), { ssr: false });
export default function MeasureDistance() {
  const [geoJsonData, setGeoJsonData] = useState(null);

  // Handle adding, editing, deleting markers logic here

  return (
    <div>
        <Header></Header>
    <div className="distancemain">
        
        <h1 className="header1 mb-4">Measuring Distance on Maps</h1>
        <div className="m-auto overflow-hidden mb-4 ">
          <Map1 />
        </div>
        <h1 className="header1 mb-4">Point markers on Maps</h1>
        {/* <Map2  /> */}
        <div className="m-auto overflow-hidden mb-4 ">
          <Map2/>
        </div>
        <div className="controls">
          {/* Add buttons or inputs for adding, editing, deleting markers */}
        </div>
      </div>
    </div>

  );
}
