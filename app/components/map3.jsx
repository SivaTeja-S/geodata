import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import distance from '@turf/distance';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2l2YXRlamFzIiwiYSI6ImNseTJtYnJyNDE3eDEyanBudWVybW00YnEifQ.ygXwgcS8vuN4RY2xPOwYqg';
const Map = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const drawRef = useRef(null);

  const [route, setRoute] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [totalDistance, setTotalDistance] = useState(0);

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

      // Handle map click to add points
      mapRef.current.on('click', handleMapClick);
    });

    return () => mapRef.current.remove();
  }, []);

  const handleMapClick = (e) => {
    const coords = [e.lngLat.lng, e.lngLat.lat];
    addPoint(coords);
  };

  const addPoint = (coords) => {
    const data = drawRef.current.getAll();
    const points = data.features.map(feature => feature.geometry.coordinates);

    if (points.length < 2) {
      drawRef.current.add({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coords,
        }
      });

      if (points.length === 1) {
        calculateRoute(points[0], coords);
      }
    } else {
      clearRoute();
      drawRef.current.deleteAll();
      drawRef.current.add({
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: coords,
        },
      });
    }
  };

  const calculateRoute = async (origin, destination) => {
    const response = await fetch(
      `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?geometries=geojson&steps=true&access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();

    if (data.routes && data.routes.length > 0) {
      const newRoute = data.routes[0];
      setRoute(newRoute);

      const routeDistance = newRoute.distance / 1000; // Convert meters to kilometers
      setTotalDistance(routeDistance.toFixed(2));

      // Update markers
      setMarkers([origin, destination]);

      // Remove existing route layer and source if they exist
      if (mapRef.current.getLayer('route')) {
        mapRef.current.removeLayer('route');
      }
      if (mapRef.current.getSource('route')) {
        mapRef.current.removeSource('route');
      }

      // Add new route layer
      mapRef.current.addLayer({
        id: 'route',
        type: 'line',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            properties: {},
            geometry: newRoute.geometry,
          },
        },
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 5,
          'line-opacity': 0.75,
        },
      });
    }
  };

  const clearRoute = () => {
    setRoute(null);
    setMarkers([]);
    setTotalDistance(0);
    if (mapRef.current.getLayer('route')) {
      mapRef.current.removeLayer('route');
    }
    if (mapRef.current.getSource('route')) {
      mapRef.current.removeSource('route');
    }
  };

  return (
    <div className='map3'>
      <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} className='map3main'/>
      <div style={{ marginTop: '10px' }}>
        {/* {markers.length === 2 && ( */}
        <div className="flex justify-between items-center mt-4">
  <span className="flex items-center space-x-2">
    <h4 className="header2">Distance:</h4>
    <span className="text">{totalDistance} kilometers</span>
  </span>
  <span>
    <button 
      onClick={() => {
        drawRef.current.deleteAll();
        clearRoute();
      }} 
      className="bg-red-500 text-white px-4 py-2 rounded mt-2 hover:bg-red-600"
    >
      Clear Map
    </button>
  </span>
</div>
        {/* )} */}
     
      </div>
    </div>
  );
};

export default Map;
