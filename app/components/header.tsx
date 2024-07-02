import Link from 'next/link';
// import { FaHome } from 'react-icons/fa';

function Header() {
    return (
        <header className="bg-gray-800 p-4 fixed w-full top-0 z-50">
            <nav className="container mx-auto flex justify-between items-center">
                <Link href="/">
                    {/* <a className="text-white flex items-center space-x-2"> */}
                        {/* <FaHome className="text-2xl" /> */}
                        <span className="text-white cursor-pointer">Home</span>
                    {/* </a> */}
                </Link>
                <Link href="/login">
                    {/* <a className="bg-blue-500 text-white px-4 py-2 rounded"> */}
                        <span className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer">Login</span>
                    {/* </a> */}
                </Link>
            </nav>
        </header>
    );
};

export default Header;