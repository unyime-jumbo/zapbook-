import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const API = "http://localhost:5000/api"

export default function BookingPage() {
  const { slug } = useParams()
  const [business, setBusiness] = useState(null)
  const [services, setServices] = useState([])
  const [availability, setAvailability] = useState(null)
  const [bookedSlots, setBookedSlots] = useState([])
  const [loading, setLoading] = useState(true)
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState(null)
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [form, setForm] = useState({ customerName: '', customerEmail: '', customerPhone: '', notes: '' })
  const [submitting, setSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchBusiness()
  }, [slug])

  useEffect(() => {
    if (selectedDate && business) {
      fetchBookedSlots()
    }
  }, [selectedDate])

  const fetchBusiness = async () => {
    try {
      const businessRes = await axios.get(`${API}/business/${slug}`)
      setBusiness(businessRes.data)
      const servicesRes = await axios.get(`${API}/services/public/${businessRes.data._id}`)
      setServices(servicesRes.data)
      const availabilityRes = await axios.get(`${API}/availability/public/${businessRes.data._id}`)
      setAvailability(availabilityRes.data)
    } catch (err) {
      console.log(err)
    }
    setLoading(false)
  }

  const fetchBookedSlots = async () => {
    try {
      const res = await axios.get(`${API}/bookings/slots/${business._id}/${selectedDate}`)
      setBookedSlots(res.data)
    } catch (err) {
      console.log(err)
    }
  }

  const generateTimeSlots = () => {
    if (!availability || !selectedDate) return []
    const date = new Date(selectedDate)
    const dayName = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()]
    const dayAvailability = availability[dayName]
    if (!dayAvailability?.open) return []

    const slots = []
    const [startHour, startMin] = dayAvailability.start.split(':').map(Number)
    const [endHour, endMin] = dayAvailability.end.split(':').map(Number)
    const duration = selectedService?.duration || 30

    let current = startHour * 60 + startMin
    const end = endHour * 60 + endMin

    while (current + duration <= end) {
      const hours = Math.floor(current / 60)
      const mins = current % 60
      const time = `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`
      slots.push(time)
      current += duration
    }

    return slots
  }

  const handleBooking = async () => {
    setSubmitting(true)
    try {
      await axios.post(`${API}/bookings/create`, {
        businessId: business._id,
        serviceId: selectedService._id,
        customerName: form.customerName,
        customerEmail: form.customerEmail,
        customerPhone: form.customerPhone,
        date: selectedDate,
        time: selectedTime,
        notes: form.notes
      })
      setSuccess(true)
      toast.success('Booking confirmed!')
    } catch (err) {
      toast.error(err.response?.data?.error || 'Something went wrong!')
    }
    setSubmitting(false)
  }

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <p className="text-white text-xl">Loading...</p>
      </div>
    )
  }

  if (!business) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center">
        <p className="text-white text-xl">Business not found!</p>
      </div>
    )
  }

  if (success) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-6">
        <div className="text-center max-w-md">
          <div className="text-8xl mb-6">🎉</div>
          <h2 className="text-4xl font-black text-white mb-4">Booking Confirmed!</h2>
          <p className="text-gray-400 text-lg mb-2">Your appointment has been booked successfully.</p>
          <p className="text-gray-400 mb-8">A confirmation email has been sent to <span className="text-[#10B981]">{form.customerEmail}</span></p>
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-left">
            <p className="text-white font-bold mb-3">Booking Details</p>
            <p className="text-gray-400"><span className="text-white">Business:</span> {business.name}</p>
            <p className="text-gray-400"><span className="text-white">Service:</span> {selectedService.name}</p>
            <p className="text-gray-400"><span className="text-white">Date:</span> {selectedDate}</p>
            <p className="text-gray-400"><span className="text-white">Time:</span> {selectedTime}</p>
          </div>
        </div>
      </div>
    )
  }

  const timeSlots = generateTimeSlots()

  return (
    <div className="min-h-screen bg-[#0F0F0F] px-6 py-12">
      <div className="max-w-2xl mx-auto">

        {/* Business Header */}
        <div className="text-center mb-10">
          <div
            className="w-20 h-20 rounded-2xl mx-auto mb-4 flex items-center justify-center text-3xl font-black text-white"
            style={{ backgroundColor: business.color || '#7C3AED' }}
          >
            {business.name.charAt(0)}
          </div>
          <h1 className="text-3xl font-black text-white">{business.name}</h1>
          <p className="text-gray-400 mt-2">{business.description}</p>
          <p className="text-gray-500 text-sm mt-1">{business.address}</p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step >= s ? 'bg-[#7C3AED] text-white' : 'bg-white/10 text-gray-400'
              }`}>
                {s}
              </div>
              {s < 3 && <div className={`w-16 h-0.5 ${step > s ? 'bg-[#7C3AED]' : 'bg-white/10'}`}></div>}
            </div>
          ))}
        </div>

        {/* Step 1 - Select Service */}
        {step === 1 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-6">Select a Service</h2>
            {services.length === 0 ? (
              <p className="text-gray-400 text-center">No services available yet.</p>
            ) : (
              <div className="space-y-3">
                {services.map((service) => (
                  <div
                    key={service._id}
                    onClick={() => setSelectedService(service)}
                    className={`bg-white/5 border rounded-2xl p-6 cursor-pointer transition ${
                      selectedService?._id === service._id
                        ? 'border-[#7C3AED] bg-[#7C3AED]/10'
                        : 'border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-black text-lg">{service.name}</p>
                        <p className="text-gray-400 text-sm">{service.duration} minutes</p>
                        {service.description && <p className="text-gray-500 text-sm mt-1">{service.description}</p>}
                      </div>
                      <p className="text-[#10B981] font-black text-xl">
                        {service.currency} {service.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button
              onClick={() => setStep(2)}
              disabled={!selectedService}
              className="w-full mt-6 py-4 bg-[#7C3AED] text-white font-black text-lg rounded-2xl hover:bg-[#6D28D9] transition disabled:opacity-50"
            >
              Continue →
            </button>
          </div>
        )}

        {/* Step 2 - Select Date & Time */}
        {step === 2 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-6">Select Date & Time</h2>
            <div className="mb-6">
              <label className="text-gray-400 text-sm mb-2 block">Choose a Date</label>
              <input
                type="date"
                min={getMinDate()}
                value={selectedDate}
                onChange={e => { setSelectedDate(e.target.value); setSelectedTime('') }}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-[#7C3AED]"
              />
            </div>
            {selectedDate && (
              <div>
                <label className="text-gray-400 text-sm mb-3 block">Available Time Slots</label>
                {timeSlots.length === 0 ? (
                  <p className="text-gray-400">No available slots on this day. Please choose another date.</p>
                ) : (
                  <div className="grid grid-cols-4 gap-3">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        disabled={bookedSlots.includes(time)}
                        className={`py-3 rounded-xl font-semibold text-sm transition ${
                          bookedSlots.includes(time)
                            ? 'bg-white/5 text-gray-600 cursor-not-allowed line-through'
                            : selectedTime === time
                            ? 'bg-[#7C3AED] text-white'
                            : 'bg-white/5 border border-white/10 text-gray-300 hover:border-[#7C3AED]'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(1)}
                className="flex-1 py-4 border border-white/10 text-gray-400 font-bold rounded-2xl hover:bg-white/5 transition"
              >
                ← Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={!selectedDate || !selectedTime}
                className="flex-1 py-4 bg-[#7C3AED] text-white font-black text-lg rounded-2xl hover:bg-[#6D28D9] transition disabled:opacity-50"
              >
                Continue →
              </button>
            </div>
          </div>
        )}

        {/* Step 3 - Your Details */}
        {step === 3 && (
          <div>
            <h2 className="text-2xl font-black text-white mb-6">Your Details</h2>
            <div className="bg-[#7C3AED]/10 border border-[#7C3AED]/30 rounded-2xl p-4 mb-6">
              <p className="text-white font-bold">{selectedService.name}</p>
              <p className="text-gray-400 text-sm">{selectedDate} at {selectedTime}</p>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name"
                value={form.customerName}
                onChange={e => setForm({...form, customerName: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#7C3AED]"
              />
              <input
                type="email"
                placeholder="Email Address"
                value={form.customerEmail}
                onChange={e => setForm({...form, customerEmail: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#7C3AED]"
              />
              <input
                type="tel"
                placeholder="Phone Number"
                value={form.customerPhone}
                onChange={e => setForm({...form, customerPhone: e.target.value})}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#7C3AED]"
              />
              <textarea
                placeholder="Additional notes (optional)"
                value={form.notes}
                onChange={e => setForm({...form, notes: e.target.value})}
                rows={3}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#7C3AED] resize-none"
              />
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(2)}
                className="flex-1 py-4 border border-white/10 text-gray-400 font-bold rounded-2xl hover:bg-white/5 transition"
              >
                ← Back
              </button>
              <button
                onClick={handleBooking}
                disabled={submitting || !form.customerName || !form.customerEmail || !form.customerPhone}
                className="flex-1 py-4 bg-[#7C3AED] text-white font-black text-lg rounded-2xl hover:bg-[#6D28D9] transition disabled:opacity-50"
              >
                {submitting ? 'Booking...' : 'Confirm Booking ✅'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}