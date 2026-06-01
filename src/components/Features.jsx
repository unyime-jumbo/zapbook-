const features = [
  {
    icon: "⚡",
    title: "Instant Booking Page",
    description: "Get a unique booking link in minutes. Share it on WhatsApp, Instagram or anywhere."
  },
  {
    icon: "📅",
    title: "Smart Scheduling",
    description: "Set your available hours and days. ZapBook automatically blocks out taken slots."
  },
  {
    icon: "🔔",
    title: "Instant Notifications",
    description: "Get notified immediately when a customer books. Never miss an appointment again."
  },
  {
    icon: "💳",
    title: "Accept Payments",
    description: "Collect deposits or full payments at booking. Supports Paystack and Stripe."
  },
  {
    icon: "📊",
    title: "Booking Dashboard",
    description: "See all your upcoming bookings in one clean dashboard. Manage everything easily."
  },
  {
    icon: "🌍",
    title: "Works Worldwide",
    description: "Whether you're in Lagos, London or New York — ZapBook works everywhere."
  }
]

export default function Features() {
  return (
    <section className="bg-[#0F0F0F] px-6 py-24">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Everything You Need to
            <span className="text-[#7C3AED]"> Grow Faster</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Powerful features built for modern businesses. Simple enough for anyone to use.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#7C3AED]/50 hover:bg-[#7C3AED]/5 transition duration-300"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-white font-bold text-xl mb-2">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}