import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'

const API = "http://localhost:5000/api"

export default function Dashboard() {
  const [business, setBusiness] = useState(null)
  const [bookings, setBookings] = useState([])
  const [services, setServices] = useState([])
  const [availability, setAvailability] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user') || '{}')

  useEffect(() => {
    if (!token) {
      navigate('/auth')
      return
    }
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const headers = { Authorization: `Bearer ${token}` }
      const [businessRes, bookingsRes, servicesRes, availabilityRes] = await Promise.all([
        axios.get(`${API}/business/me`, { headers }),
        axios.get(`${API}/bookings/mine`, { headers }),
        axios.get(`${API}/services/mine`, { headers }),
        axios.get(`${API}/availability/mine`, { headers })
      ])
      setBusiness(businessRes.data)
      setBookings(bookingsRes.data)
      setServices(servicesRes.data)
      setAvailability(availabilityRes.data)
    } catch (err) {
      if (err.response?.status === 404) {
        navigate('/onboarding')
      }
    }
    setLoading(false)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] flex">

      {/* Sidebar */}
      <div className="w-64 bg-white/5 border-r border-white/10 flex flex-col">
        <div className="p-6 border-b border-white/10">
          <h1 className="text-2xl font-black text-white">
            Zap<span className="text-[#7C3AED]">Book</span>
          </h1>
          <p className="text-gray-400 text-sm mt-1">{business?.name}</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {[
            { id: 'overview', icon: '📊', label: 'Overview' },
            { id: 'bookings', icon: '📅', label: 'Bookings' },
            { id: 'services', icon: '⚙️', label: 'Services' },
            { id: 'availability', icon: '🕐', label: 'Availability' },
            { id: 'settings', icon: '🔧', label: 'Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition ${
                activeTab === item.id
                  ? 'bg-[#7C3AED] text-white'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <span>{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <p className="text-gray-400 text-sm mb-3">Hi, {user.fullname}!</p>
          <button
            onClick={handleLogout}
            className="w-full py-2 border border-white/10 text-gray-400 rounded-xl hover:bg-white/5 transition text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="p-8">
            <h2 className="text-3xl font-black text-white mb-8">Overview</h2>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Total Bookings</p>
                <p className="text-4xl font-black text-white">{bookings.length}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Total Services</p>
                <p className="text-4xl font-black text-[#7C3AED]">{services.length}</p>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                <p className="text-gray-400 text-sm mb-2">Pending Bookings</p>
                <p className="text-4xl font-black text-[#10B981]">
                  {bookings.filter(b => b.status === 'confirmed').length}
                </p>
              </div>
            </div>

            {/* Booking Link */}
            <div className="bg-[#7C3AED]/10 border border-[#7C3AED]/30 rounded-2xl p-6">
              <p className="text-white font-bold mb-2">Your Booking Link 🔗</p>
              <p className="text-gray-400 text-sm mb-4">Share this link with your customers so they can book appointments</p>
              <div className="flex items-center gap-3">
                <code className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#10B981] text-sm">
                  {window.location.origin}/book/{business?.slug}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(`${window.location.origin}/book/${business?.slug}`)}
                  className="px-4 py-3 bg-[#7C3AED] text-white rounded-xl font-semibold hover:bg-[#6D28D9] transition"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Recent Bookings */}
            <div className="mt-8">
              <h3 className="text-white font-black text-xl mb-4">Recent Bookings</h3>
              {bookings.length === 0 ? (
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                  <p className="text-gray-400">No bookings yet. Share your booking link to get started!</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {bookings.slice(0, 5).map((booking) => (
                    <div key={booking._id} className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between">
                      <div>
                        <p className="text-white font-bold">{booking.customerName}</p>
                        <p className="text-gray-400 text-sm">{booking.service?.name} — {booking.date} at {booking.time}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        booking.status === 'confirmed' ? 'bg-[#10B981]/20 text-[#10B981]' :
                        booking.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                        'bg-[#7C3AED]/20 text-[#7C3AED]'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="p-8">
            <h2 className="text-3xl font-black text-white mb-8">All Bookings</h2>
            {bookings.length === 0 ? (
              <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
                <p className="text-gray-400">No bookings yet!</p>
              </div>
            ) : (
              <div className="space-y-3">
                {bookings.map((booking) => (
                  <div key={booking._id} className="bg-white/5 border border-white/10 rounded-2xl p-6">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-white font-black text-lg">{booking.customerName}</p>
                        <p className="text-gray-400">{booking.customerEmail} · {booking.customerPhone}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        booking.status === 'confirmed' ? 'bg-[#10B981]/20 text-[#10B981]' :
                        booking.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                        'bg-[#7C3AED]/20 text-[#7C3AED]'
                      }`}>
                        {booking.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Service</p>
                        <p className="text-white">{booking.service?.name}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Date</p>
                        <p className="text-white">{booking.date}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Time</p>
                        <p className="text-white">{booking.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Services Tab */}
        {activeTab === 'services' && (
          <ServicesTab token={token} services={services} setServices={setServices} API={API} />
        )}

        {/* Availability Tab */}
        {activeTab === 'availability' && (
          <AvailabilityTab token={token} availability={availability} setAvailability={setAvailability} API={API} />
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
          <SettingsTab token={token} business={business} setBusiness={setBusiness} API={API} />
        )}

      </div>
    </div>
  )
}

// Services Tab Component
function ServicesTab({ token, services, setServices, API }) {
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ name: '', description: '', duration: '', price: '', currency: 'NGN' })
  const [loading, setLoading] = useState(false)

  const handleAdd = async () => {
    setLoading(true)
    try {
      const res = await axios.post(`${API}/services/add`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setServices([...services, res.data.service])
      setForm({ name: '', description: '', duration: '', price: '', currency: 'NGN' })
      setShowForm(false)
    } catch (err) {
     toast.error(err.response?.data?.error || 'Something went wrong!')
    }
    setLoading(false)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this service?')) return
    try {
      await axios.delete(`${API}/services/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setServices(services.filter(s => s._id !== id))
    } catch (err) {
      toast.error('Something went wrong!')
    }
  }

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-3xl font-black text-white">Services</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className="px-6 py-3 bg-[#7C3AED] text-white font-bold rounded-xl hover:bg-[#6D28D9] transition"
        >
          + Add Service
        </button>
      </div>

      {/* Add Service Form */}
      {showForm && (
        <div className="bg-white/5 border border-[#7C3AED]/30 rounded-2xl p-6 mb-6">
          <h3 className="text-white font-bold mb-4">New Service</h3>
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Service Name"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#7C3AED]"
            />
            <input
              type="number"
              placeholder="Duration (minutes)"
              value={form.duration}
              onChange={e => setForm({...form, duration: e.target.value})}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#7C3AED]"
            />
            <input
              type="number"
              placeholder="Price"
              value={form.price}
              onChange={e => setForm({...form, price: e.target.value})}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#7C3AED]"
            />
            <select
              value={form.currency}
              onChange={e => setForm({...form, currency: e.target.value})}
              className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#7C3AED]"
            >
              <option value="NGN">NGN (₦)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
            </select>
            <input
              type="text"
              placeholder="Description (optional)"
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              className="col-span-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#7C3AED]"
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleAdd}
              disabled={loading}
              className="px-6 py-3 bg-[#7C3AED] text-white font-bold rounded-xl hover:bg-[#6D28D9] transition disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Service'}
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="px-6 py-3 border border-white/10 text-gray-400 rounded-xl hover:bg-white/5 transition"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Services List */}
      {services.length === 0 ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center">
          <p className="text-gray-400">No services yet. Add your first service!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {services.map((service) => (
            <div key={service._id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex items-center justify-between">
              <div>
                <p className="text-white font-black text-lg">{service.name}</p>
                <p className="text-gray-400 text-sm">{service.duration} mins · {service.currency} {service.price}</p>
                {service.description && <p className="text-gray-500 text-sm mt-1">{service.description}</p>}
              </div>
              <button
                onClick={() => handleDelete(service._id)}
                className="px-4 py-2 border border-red-500/30 text-red-400 rounded-xl hover:bg-red-500/10 transition text-sm"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// Availability Tab Component
function AvailabilityTab({ token, availability, setAvailability, API }) {
  const [form, setForm] = useState(availability)
  const [loading, setLoading] = useState(false)
  const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']

  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await axios.put(`${API}/availability/update`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setAvailability(res.data.availability)
      toast.success('Availability updated!')
    } catch (err) {
      toast.error('Something went wrong!')
    }
    setLoading(false)
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-black text-white mb-8">Availability</h2>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <div className="space-y-4">
          {days.map((day) => (
            <div key={day} className="flex items-center gap-6">
              <div className="w-32">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form?.[day]?.open || false}
                    onChange={e => setForm({...form, [day]: {...form[day], open: e.target.checked}})}
                    className="w-4 h-4 accent-[#7C3AED]"
                  />
                  <span className="text-white capitalize font-semibold">{day}</span>
                </label>
              </div>
              {form?.[day]?.open && (
                <div className="flex items-center gap-3">
                  <input
                    type="time"
                    value={form[day].start}
                    onChange={e => setForm({...form, [day]: {...form[day], start: e.target.value}})}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#7C3AED]"
                  />
                  <span className="text-gray-400">to</span>
                  <input
                    type="time"
                    value={form[day].end}
                    onChange={e => setForm({...form, [day]: {...form[day], end: e.target.value}})}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 text-white outline-none focus:border-[#7C3AED]"
                  />
                </div>
              )}
              {!form?.[day]?.open && (
                <span className="text-gray-500 text-sm">Closed</span>
              )}
            </div>
          ))}
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-6 px-8 py-3 bg-[#7C3AED] text-white font-bold rounded-xl hover:bg-[#6D28D9] transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Availability'}
        </button>
      </div>
    </div>
  )
}

// Settings Tab Component
function SettingsTab({ token, business, setBusiness, API }) {
  const [form, setForm] = useState({
    name: business?.name || '',
    description: business?.description || '',
    phone: business?.phone || '',
    address: business?.address || '',
    color: business?.color || '#7C3AED'
  })
  const [loading, setLoading] = useState(false)

  const handleSave = async () => {
    setLoading(true)
    try {
      const res = await axios.put(`${API}/business/update`, form, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setBusiness(res.data.business)
      toast.success('Business updated!')
    } catch (err) {
     toast.error(err.response?.data?.error || 'Something went wrong!')
    }
    setLoading(false)
  }

  return (
    <div className="p-8">
      <h2 className="text-3xl font-black text-white mb-8">Settings</h2>
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 max-w-2xl">
        <div className="space-y-4">
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Business Name</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({...form, name: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#7C3AED]"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Description</label>
            <textarea
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#7C3AED] resize-none"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Phone</label>
            <input
              type="tel"
              value={form.phone}
              onChange={e => setForm({...form, phone: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#7C3AED]"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Address</label>
            <input
              type="text"
              value={form.address}
              onChange={e => setForm({...form, address: e.target.value})}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#7C3AED]"
            />
          </div>
          <div>
            <label className="text-gray-400 text-sm mb-2 block">Brand Color</label>
            <input
              type="color"
              value={form.color}
              onChange={e => setForm({...form, color: e.target.value})}
              className="w-16 h-12 rounded-xl border border-white/10 cursor-pointer bg-transparent"
            />
          </div>
        </div>
        <button
          onClick={handleSave}
          disabled={loading}
          className="mt-6 px-8 py-3 bg-[#7C3AED] text-white font-bold rounded-xl hover:bg-[#6D28D9] transition disabled:opacity-50"
        >
          {loading ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  )
}