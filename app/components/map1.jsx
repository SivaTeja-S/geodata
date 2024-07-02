// components/Map.js
"use client";
import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = 'pk.eyJ1Ijoic2l2YXRlamFzIiwiYSI6ImNseTJtYnJyNDE3eDEyanBudWVybW00YnEifQ.ygXwgcS8vuN4RY2xPOwYqg';


const Map = ({ geoJsonData }) => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [77.5946, 12.9716], // Center on Bangalore
      zoom: 10,
    });

    return () => mapRef.current.remove();
  }, []);

  useEffect(() => {
    if (geoJsonData && mapRef.current) {
      console.log("Updating map with GeoJSON Data:", geoJsonData);
      const sourceId = 'uploadedData';

      if (mapRef.current.getSource(sourceId)) {
        mapRef.current.getSource(sourceId).setData(geoJsonData);
        console.log("GeoJSON data updated in existing source");
      } else {
        mapRef.current.addSource(sourceId, {
          type: 'geojson',
          data: geoJsonData,
        });

        mapRef.current.addLayer({
          id: sourceId,
          type: 'circle',
          source: sourceId,
          paint: {
            'circle-radius': 6,
            'circle-color': '#B42222'
          },
        });

        console.log("New source and layer added to map");
      }

      // Fit map to the bounds of the GeoJSON data
      const bounds = new mapboxgl.LngLatBounds();

      geoJsonData.features.forEach((feature) => {
        const geometryType = feature.geometry.type;
        const coordinates = feature.geometry.coordinates;

        if (geometryType === 'Point') {
          bounds.extend(coordinates);
        } else if (geometryType === 'LineString' || geometryType === 'Polygon') {
          coordinates.forEach(coord => bounds.extend(coord));
        } else if (geometryType === 'MultiPolygon') {
          coordinates.forEach(polygon => {
            polygon.forEach(coord => bounds.extend(coord));
          });
        } else if (geometryType === 'MultiLineString') {
          coordinates.forEach(lineString => {
            lineString.forEach(coord => bounds.extend(coord));
          });
        } else if (geometryType === 'MultiPoint') {
          coordinates.forEach(coord => bounds.extend(coord));
        }
      });

      mapRef.current.fitBounds(bounds, {
        padding: 20,
      });
    }
  }, [geoJsonData]);

  return <div ref={mapContainerRef} style={{ width: '100%', height: '500px' }} />;
};

export default Map;


