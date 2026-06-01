const businesses = [
  "💇 Hair Salons",
  "✂️ Barbershops",
  "🏥 Clinics",
  "💪 Gyms",
  "📚 Tutors",
  "📸 Photographers",
  "💆 Spas",
  "🦷 Dentists",
  "🏋️ Personal Trainers",
  "👔 Consultants",
  "💅 Nail Studios",
  "🎨 Artists",
]

export default function Marquee() {
  return (
    <section className="bg-[#0F0F0F] py-12 border-y border-white/10 overflow-hidden">
      <p className="text-center text-gray-500 text-sm font-medium mb-8 tracking-widest uppercase">
        Perfect for every type of business
      </p>
      <div className="flex gap-8 animate-marquee whitespace-nowrap">
        {[...businesses, ...businesses].map((business, index) => (
          <span
            key={index}
            className="text-gray-400 font-semibold text-lg bg-white/5 border border-white/10 rounded-full px-6 py-3 inline-block"
          >
            {business}
          </span>
        ))}
      </div>
    </section>
  )
}