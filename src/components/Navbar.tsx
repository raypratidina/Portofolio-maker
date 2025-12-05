import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex-shrink-0">
                        <Link href="/" className="text-xl font-bold text-gray-900">
                            Portfolio
                        </Link>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-8">
                            <Link href="/" className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Home
                            </Link>
                            <Link href="/#works" className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Works
                            </Link>
                            <Link href="/#about" className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                About
                            </Link>
                            <Link href="/#contact" className="text-gray-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                Contact
                            </Link>
                            <Link href="/admin/login" className="text-gray-500 hover:text-black px-3 py-2 rounded-md text-sm font-medium transition-colors border border-transparent hover:border-gray-200">
                                Login
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
