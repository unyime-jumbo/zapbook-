export default function Hero() {
  return (
    <section className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-6 pt-24">
      <div className="max-w-4xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-[#7C3AED]/20 border border-[#7C3AED]/30 rounded-full px-4 py-2 mb-8">
          <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></span>
          <span className="text-[#10B981] text-sm font-medium">Now live — Start booking in minutes</span>
        </div>

        {/* Headline */}
        <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6">
          The Smartest Way to
          <span className="text-[#7C3AED]"> Manage Bookings</span>
        </h1>

        {/* Subheadline */}
        <p className="text-gray-400 text-xl md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed">
          Give your business a professional booking page in minutes. No more WhatsApp back and forth. Just clean, simple, automated bookings.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-4 bg-[#7C3AED] text-white font-black text-lg rounded-2xl hover:bg-[#6D28D9] transition hover:scale-105">
            Start For Free 🚀
          </button>
          <button className="w-full sm:w-auto px-8 py-4 border border-white/20 text-white font-semibold text-lg rounded-2xl hover:bg-white/5 transition">
            See How It Works
          </button>
        </div>

        {/* Social Proof */}
        <p className="text-gray-500 text-sm mt-8">
          ✅ No credit card required &nbsp;·&nbsp; ✅ Free plan available &nbsp;·&nbsp; ✅ Setup in 2 minutes
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-8 mt-16 border-t border-white/10 pt-16">
          <div>
            <p className="text-4xl font-black text-white">500+</p>
            <p className="text-gray-500 mt-1">Businesses</p>
          </div>
          <div>
            <p className="text-4xl font-black text-[#7C3AED]">10k+</p>
            <p className="text-gray-500 mt-1">Bookings Made</p>
          </div>
          <div>
            <p className="text-4xl font-black text-[#10B981]">99%</p>
            <p className="text-gray-500 mt-1">Satisfaction</p>
          </div>
        </div>

      </div>
    </section>
  )
}