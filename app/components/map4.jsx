import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2l2YXRlamFzIiwiYSI6ImNseTJtYnJyNDE3eDEyanBudWVybW00YnEifQ.ygXwgcS8vuN4RY2xPOwYqg';

const Map = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const drawRef = useRef(null);

  const [markers, setMarkers] = useState([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [77.5946, 12.9716], // Initial center position
      zoom: 10,
    });

    mapRef.current.on('load', () => {
      drawRef.current = new MapboxDraw({
        displayControlsDefault: false, // Disable default controls
      });

      mapRef.current.addControl(drawRef.current);

      mapRef.current.on('click', handleMapClick);
    });

    return () => mapRef.current.remove();
  }, []);

  const handleMapClick = (e) => {
    const coords = [e.lngLat.lng, e.lngLat.lat];
    addMarker(coords);
  };

  const addMarker = (coords) => {
    drawRef.current.add({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: coords,
      }
    });

    setMarkers((prevMarkers) => [...prevMarkers, coords]);
  };

  const clearMarkers = () => {
    drawRef.current.deleteAll();
    setMarkers([]);
  };

  const saveMarkers = async () => {
    setSaving(true);
    // Replace with actual save logic
    console.log('Saving markers:', markers);
    // Simulating a delay for demonstration
    setTimeout(() => {
      setSaving(false);
      console.log('Markers saved successfully!');
    }, 1500);
  };

  return (
    <div className='map3'>
      <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} className='map3main'/>
      <div style={{ marginTop: '10px' }}>
        <div className="flex justify-between items-center mt-4">
          <span className="flex items-center space-x-2">
            <h4 className="header2">Markers:</h4>
            <span className="text">{markers.length}</span>
          </span>
          <span>
            <button 
              onClick={saveMarkers}
              className={`save-button ${saving ? 'saving' : ''}`}
              disabled={markers.length === 0 || saving}
            >
              {saving ? 'Saving...' : 'Save Markers'}
            </button>
            <button 
              onClick={clearMarkers}
              className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600 ml-4"
              disabled={markers.length === 0}
            >
              Clear Markers
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Map;
