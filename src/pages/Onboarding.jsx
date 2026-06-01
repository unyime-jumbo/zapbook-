import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const API = "http://localhost:5000/api"

const categories = [
  "Hair Salon", "Barbershop", "Nail Studio", "Spa & Wellness",
  "Gym & Fitness", "Personal Trainer", "Medical Clinic", "Dental Clinic",
  "Photography", "Tutoring", "Consulting", "Other"
]

export default function Onboarding() {
  const [form, setForm] = useState({
    name: '',
    description: '',
    category: '',
    phone: '',
    address: '',
    color: '#7C3AED'
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    setError('')
    setLoading(true)

    try {
      const token = localStorage.getItem('token')
      await axios.post(`${API}/business/create`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      navigate('/dashboard')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Something went wrong!')
      setError(err.response?.data?.error || 'Something went wrong!')
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] px-6 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Header */}
        <h1 className="text-4xl font-black text-white text-center mb-2">
          Zap<span className="text-[#7C3AED]">Book</span>
        </h1>
        <h2 className="text-2xl font-black text-white text-center mt-6 mb-2">
          Set Up Your Business 🚀
        </h2>
        <p className="text-gray-400 text-center mb-8">
          Tell us about your business so we can set up your booking page.
        </p>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

          {/* Error */}
          {error && (
            <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">{error}</p>
          )}

          <div className="space-y-4">

            {/* Business Name */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Business Name *</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Glam Hair Salon"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#7C3AED]"
              />
            </div>

            {/* Category */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Business Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#7C3AED]"
              >
                <option value="">Select a category</option>
                {categories.map((cat, i) => (
                  <option key={i} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Description</label>
              <textarea
                name="description"
                placeholder="Tell customers about your business..."
                value={form.description}
                onChange={handleChange}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#7C3AED] resize-none"
              />
            </div>

            {/* Phone */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="e.g. +234 801 234 5678"
                value={form.phone}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#7C3AED]"
              />
            </div>

            {/* Address */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Address</label>
              <input
                type="text"
                name="address"
                placeholder="e.g. 123 Lagos Island, Lagos"
                value={form.address}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#7C3AED]"
              />
            </div>

            {/* Brand Color */}
            <div>
              <label className="text-gray-400 text-sm mb-2 block">Brand Color</label>
              <div className="flex items-center gap-4">
                <input
                  type="color"
                  name="color"
                  value={form.color}
                  onChange={handleChange}
                  className="w-16 h-12 rounded-xl border border-white/10 cursor-pointer bg-transparent"
                />
                <span className="text-gray-400 text-sm">Choose your brand color for your booking page</span>
              </div>
            </div>

          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 py-4 bg-[#7C3AED] text-white font-black text-lg rounded-2xl hover:bg-[#6D28D9] transition disabled:opacity-50"
          >
            {loading ? 'Setting up...' : 'Create My Booking Page 🚀'}
          </button>

        </div>
      </div>
    </div>
  )
}