import Link from 'next/link';

export default function Pointers() {
  return (
    <div className="pointmarker mx-auto mb-10 pt-5 pb-5">
      <h2 className="text-2xl font-bold mb-4 header1">Distance Measurement and Marker Management</h2>
      <p className="text-lg mb-4 text-black">
        This feature allows you to measure distances on the map and manage markers. You can add, save, delete, and edit markers on the map.
      </p>
      <Link href="/distance" className="text-blue-500 hover:text-blue-700">
        {/* <a className="text-blue-500 hover:text-blue-700"> */}
            Go to Distance Measurement and Marker Management
            {/* </a> */}
      </Link>
    </div>
  );
}
