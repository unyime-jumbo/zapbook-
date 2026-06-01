const steps = [
  {
    number: "01",
    title: "Create Your Account",
    description: "Sign up for free in seconds. No credit card required. Just your email and you're in.",
    icon: "👤"
  },
  {
    number: "02",
    title: "Set Up Your Services",
    description: "Add your services, set your prices and choose your available hours and days.",
    icon: "⚙️"
  },
  {
    number: "03",
    title: "Share Your Booking Link",
    description: "Get your unique link and share it on WhatsApp, Instagram or anywhere. Customers book instantly.",
    icon: "🔗"
  }
]

export default function HowItWorks() {
  return (
    <section className="bg-[#0F0F0F] px-6 py-24">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Get Started in
            <span className="text-[#7C3AED]"> 3 Simple Steps</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            No technical knowledge needed. Set up your booking page in minutes.
          </p>
        </div>

        {/* Steps */}
        <div className="grid md:grid-cols-3 gap-8 relative">

          {/* Connector Line */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-[#7C3AED] to-[#10B981]"></div>

          {steps.map((step, index) => (
            <div key={index} className="relative text-center">

              {/* Icon Circle */}
              <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-[#7C3AED]/20 border border-[#7C3AED]/30 flex items-center justify-center text-4xl">
                {step.icon}
              </div>

              {/* Number */}
              <span className="text-[#7C3AED] font-black text-sm tracking-widest mb-2 block">
                STEP {step.number}
              </span>

              {/* Title */}
              <h3 className="text-white font-black text-xl mb-3">{step.title}</h3>

              {/* Description */}
              <p className="text-gray-400 leading-relaxed">{step.description}</p>

            </div>
          ))}
        </div>

      </div>
    </section>
  )
}