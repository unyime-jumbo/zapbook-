export default function Footer() {
  return (
    <footer className="bg-[#0F0F0F] border-t border-white/10 px-6 py-16">
      <div className="max-w-6xl mx-auto">

        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <h1 className="text-3xl font-black text-white mb-4">
              Zap<span className="text-[#7C3AED]">Book</span>
            </h1>
            <p className="text-gray-400 leading-relaxed max-w-sm">
              The smartest way to manage bookings for your business. Simple, fast and powerful.
            </p>
            <div className="flex gap-4 mt-6">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-[#7C3AED] hover:text-white transition">
                𝕏
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-[#7C3AED] hover:text-white transition">
                in
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-gray-400 hover:bg-[#7C3AED] hover:text-white transition">
                ig
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-white font-bold mb-4">Product</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-white cursor-pointer transition">Features</li>
              <li className="hover:text-white cursor-pointer transition">Pricing</li>
              <li className="hover:text-white cursor-pointer transition">How it Works</li>
              <li className="hover:text-white cursor-pointer transition">Changelog</li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="hover:text-white cursor-pointer transition">About</li>
              <li className="hover:text-white cursor-pointer transition">Blog</li>
              <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
              <li className="hover:text-white cursor-pointer transition">Terms of Service</li>
            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">© 2026 ZapBook. All rights reserved.</p>
          <p className="text-gray-500 text-sm">Built with passion for businesses worldwide</p>
        </div>

      </div>
    </footer>
  )
}