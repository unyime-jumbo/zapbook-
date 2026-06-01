import { useState } from 'react'

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <nav className="fixed top-0 w-full z-50 bg-[#0F0F0F]/80 backdrop-blur-xl border-b border-white/10">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">

                {/* Logo */}
                <h1 className="text-2xl font-black text-white">
                    Zap<span className="text-[#7C3AED]">Book</span>
                </h1>

                {/* Desktop Menu */}
                <ul className="hidden md:flex items-center gap-8 text-gray-400 font-medium">
                    <li className="hover:text-white cursor-pointer transition">Features</li>
                    <li className="hover:text-white cursor-pointer transition">Pricing</li>
                    <li className="hover:text-white cursor-pointer transition">About</li>
                </ul>

                {/* Buttons */}
                <a href="/auth" className="px-5 py-2 text-gray-300 hover:text-white font-semibold transition">
                    Login
                </a>
                <a href="/auth" className="px-5 py-2 bg-[#7C3AED] text-white font-semibold rounded-xl hover:bg-[#6D28D9] transition">
                    Get Started Free
                </a>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-white text-2xl"
                >
                    {menuOpen ? '✕' : '☰'}
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden bg-[#0F0F0F] border-t border-white/10 px-6 py-4 space-y-4">
                    <p className="text-gray-400 hover:text-white cursor-pointer">Features</p>
                    <p className="text-gray-400 hover:text-white cursor-pointer">Pricing</p>
                    <p className="text-gray-400 hover:text-white cursor-pointer">About</p>
                    <button className="w-full py-3 bg-[#7C3AED] text-white font-semibold rounded-xl">
                        Get Started Free
                    </button>
                </div>
            )}
        </nav>
    )
}