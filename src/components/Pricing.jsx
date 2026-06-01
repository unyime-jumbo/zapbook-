const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    description: "Perfect for trying out ZapBook",
    color: "border-white/10",
    buttonColor: "bg-white/10 hover:bg-white/20 text-white",
    features: [
      "1 service",
      "10 bookings per month",
      "Basic booking page",
      "Email notifications",
    ]
  },
  {
    name: "Basic",
    price: "$9",
    period: "per month",
    description: "Perfect for small businesses",
    color: "border-[#7C3AED]",
    badge: "Most Popular",
    buttonColor: "bg-[#7C3AED] hover:bg-[#6D28D9] text-white",
    features: [
      "3 services",
      "Unlimited bookings",
      "Custom booking page",
      "Email & SMS notifications",
      "Accept payments",
    ]
  },
  {
    name: "Pro",
    price: "$19",
    period: "per month",
    description: "Perfect for growing businesses",
    color: "border-[#10B981]",
    buttonColor: "bg-[#10B981] hover:bg-[#059669] text-white",
    features: [
      "Unlimited services",
      "Unlimited bookings",
      "Custom branding",
      "Priority support",
      "Accept payments",
      "Analytics dashboard",
    ]
  }
]

export default function Pricing() {
  return (
    <section className="bg-[#0F0F0F] px-6 py-24">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Simple, Transparent
            <span className="text-[#7C3AED]"> Pricing</span>
          </h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto">
            Start for free. Upgrade when you're ready. No hidden fees ever.
          </p>
        </div>

        {/* Pricing Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-white/5 border-2 ${plan.color} rounded-2xl p-8 flex flex-col`}
            >
              {/* Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#7C3AED] text-white text-sm font-bold px-4 py-1 rounded-full">
                  {plan.badge}
                </div>
              )}

              {/* Plan Name */}
              <h3 className="text-white font-black text-2xl mb-2">{plan.name}</h3>
              <p className="text-gray-400 text-sm mb-6">{plan.description}</p>

              {/* Price */}
              <div className="mb-6">
                <span className="text-5xl font-black text-white">{plan.price}</span>
                <span className="text-gray-400 ml-2">/{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-300">
                    <span className="text-[#10B981] font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>

              {/* Button */}
              <button className={`w-full py-3 font-bold rounded-xl transition ${plan.buttonColor}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}