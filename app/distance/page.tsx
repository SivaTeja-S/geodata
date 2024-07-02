"use client";
import dynamic from 'next/dynamic';
import { useState } from 'react';
import Header from '../components/header';
// Load the map component dynamically to ensure it works with Next.js SSR
const Map = dynamic(() => import('../components/map'), { ssr: false });

export default function MeasureDistance() {
  const [geoJsonData, setGeoJsonData] = useState(null);

  // Handle adding, editing, deleting markers logic here

  return (
    <div>
        <Header></Header>
    <div className="distancemain">
        
        <h1 className="text-3xl font-bold mb-4">Measure Distance and Manage Markers</h1>
        <div className=" m-auto overflow-hidden mb-4">
          <Map geoJsonData={geoJsonData} />
        </div>
        <div className="controls">
          {/* Add buttons or inputs for adding, editing, deleting markers */}
        </div>
      </div>
    </div>

  );
}
