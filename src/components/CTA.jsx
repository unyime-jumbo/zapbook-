export default function CTA() {
  return (
    <section className="bg-[#0F0F0F] px-6 py-24">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-br from-[#7C3AED]/30 to-[#10B981]/20 border border-[#7C3AED]/30 rounded-3xl p-12 text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-[#7C3AED]/20 border border-[#7C3AED]/30 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-[#10B981] rounded-full animate-pulse"></span>
            <span className="text-[#10B981] text-sm font-medium">Join 500+ businesses already using ZapBook</span>
          </div>

          {/* Headline */}
          <h2 className="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">
            Ready to Stop Losing
            <span className="text-[#7C3AED]"> Bookings?</span>
          </h2>

          {/* Subheadline */}
          <p className="text-gray-400 text-xl mb-10 max-w-2xl mx-auto">
            Join hundreds of businesses worldwide who use ZapBook to automate their bookings and grow faster.
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-10 py-4 bg-[#7C3AED] text-white font-black text-lg rounded-2xl hover:bg-[#6D28D9] transition hover:scale-105">
              Start For Free 🚀
            </button>
            <button className="w-full sm:w-auto px-10 py-4 border border-white/20 text-white font-semibold text-lg rounded-2xl hover:bg-white/5 transition">
              View Pricing
            </button>
          </div>

          {/* Note */}
          <p className="text-gray-500 text-sm mt-6">
            ✅ No credit card required &nbsp;·&nbsp; ✅ Free plan available &nbsp;·&nbsp; ✅ Setup in 2 minutes
          </p>

        </div>
      </div>
    </section>
  )
}