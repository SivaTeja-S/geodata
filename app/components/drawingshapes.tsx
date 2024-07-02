// components/Drawingshapes.js
import Link from 'next/link';
import "../globals.css";

export default function Drawingshapes() {
  return (
    <div className="drawingshapes ">
      <h2 className=" mb-4 header1">Customizations on Map</h2>
      <p className="mb-6 text-gray-700">
        Draw custom shapes on the map and save them for future reference. You can create, edit, and manage your custom shapes with ease. This is perfect for planning, analysis, and visualization of spatial data.
      </p>
      <div className="features-benifits">
      <div className="features mb-6 border border-gray-200 p-4 rounded-lg shadow-md">
        <h3 className="header2 mb-2">Features:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          <li>Draw polygons, lines, and points</li>
          {/* <li>Save and load your custom shapes</li> */}
          <li>Save,Edit shapes at any time</li>
          {/* <li>Export shapes in various formats</li> */}
        </ul>
      </div>
      <div className="benefits mb-6 border border-gray-200 p-4 rounded-lg shadow-md">
        <h3 className="header2 mb-2">Benefits:</h3>
        <ul className="list-disc list-inside space-y-1 text-gray-800">
          <li>Improve spatial planning and analysis</li>
          <li>Visualize data with custom shapes</li>
        </ul>
      </div>
      </div>
    
      <Link href="/drawingpage" className="block text-center px-4 py-2 mx-auto bg-blue-500 text-white font-semibold rounded hover:bg-blue-600 transition">
          Start Drawing Now
      </Link>
    </div>
  );
}
