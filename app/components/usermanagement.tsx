
import "../globals.css";
import Link from 'next/link';
export default function Userdata() {
    return (
        <div className="userdata relative w-full h-[400px] overflow-hidden ">
            {/* Background Video */}
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                src="/3129957-uhd_3840_2160_25fps.mp4" // Update this path to your video file
                autoPlay
                loop
                muted
            ></video>

            {/* Overlay Content */}
            <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
                <h1 className="text-5xl font-bold mb-4">Welcome to Geo-Data Application</h1>
                <p className="text-lg mb-8">
                    You can upload GeoJSON/KML and TIFF files to see the map in Mapbox.
                </p>
                <button
                    // onClick={() => (window.location.href = "/userdata")}
                    className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full text-white text-lg font-semibold"
                >
                    <Link href="/users">Go to Userdata</Link>
                    
                </button>
            </div>

            {/* Background Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
        </div>
    );
}