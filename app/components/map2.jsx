// components/Map.js
import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2l2YXRlamFzIiwiYSI6ImNseTJtYnJyNDE3eDEyanBudWVybW00YnEifQ.ygXwgcS8vuN4RY2xPOwYqg';

const Map = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const drawRef = useRef(null);
  const [drawnFeatures, setDrawnFeatures] = useState([]);
  const [isSaving, setIsSaving] = useState(false);
  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [77.5946, 12.9716], // Center on Bangalore
      zoom: 10,
    });

    mapRef.current.on('load', async () => {
      drawRef.current = new MapboxDraw({
        displayControlsDefault: false,
        controls: {
          polygon: true,
          trash: true,
        },
      });

      mapRef.current.addControl(drawRef.current);

      // Load existing shapes from backend
      const existingShapes = await fetchExistingShapes();
      if (existingShapes) {
        drawRef.current.set({ type: 'FeatureCollection', features: existingShapes });
      }

      // Event listeners for draw events
      mapRef.current.on('draw.create', updateDrawnFeatures);
      mapRef.current.on('draw.delete', updateDrawnFeatures);
      mapRef.current.on('draw.update', updateDrawnFeatures);
    });

    return () => mapRef.current.remove();
  }, []);

  const updateDrawnFeatures = () => {
    const data = drawRef.current.getAll();
    setDrawnFeatures(data.features);
  };

  const saveDrawnFeatures = async () => {
    setIsSaving(true);
    try {
      const response = await fetch('/api/save-shapes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ shapes: drawnFeatures }),
      });

      if (!response.ok) {
        throw new Error('Failed to save shapes');
      }

      console.log('Shapes saved successfully');
    } catch (error) {
      console.error('Error saving shapes:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const clearDrawnFeatures = () => {
    drawRef.current.deleteAll();
    setDrawnFeatures([]);
  };

  const fetchExistingShapes = async () => {
    try {
      const response = await fetch('/api/get-shapes');
      if (!response.ok) {
        throw new Error('Failed to fetch shapes');
      }
      const data = await response.json();
      return data.shapes;
    } catch (error) {
      console.error('Error fetching shapes:', error);
      return [];
    }
  };

  return (
    <div className="map2">
      <div ref={mapContainerRef} style={{ width: '70vw', height: '500px' }} className='mx-auto'/>
      <div className="mt-10 flex justify-between mx-auto" style={{ width: '70vw'}}>
        <button onClick={saveDrawnFeatures} className="bg-blue-500 text-white px-4 py-2 rounded mt-2 hover:bg-blue-600"> {isSaving ? 'Saving...' : 'Save Shapes'}</button>
        <button onClick={clearDrawnFeatures} className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600">Clear Shapes</button>
      </div>
    </div>
  );
};

export default Map;
