import Link from "next/link";
import Image from "next/image";

export const Navbar = () => {
    return (
        <nav className="w-full h-16 bg-gray-800 flex items-center px-4">
            {/* <h1 className="text-white text-2xl font-bold">Movie List App</h1> */}
            <Link href="/">
                <Image className="hover:scale-110 transition-transform duration-200" src="/film-icon.png" alt="Logo" width={50} height={50} />
            </Link>
            <Link href="/" className="text-white text-sm ml-4 hover:text-gray-300">Home</Link>
            <Link href="/favorites" className="text-white text-sm ml-4 hover:text-gray-300">Favorites</Link>
        </nav>
    );
}