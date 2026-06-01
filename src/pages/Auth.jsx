import { useState } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const API = "http://localhost:5000/api"

export default function Auth() {
    const [isLogin, setIsLogin] = useState(true)
    const [form, setForm] = useState({ fullname: '', email: '', password: '' })
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
            const endpoint = isLogin ? 'login' : 'register'
            const body = isLogin
                ? { email: form.email, password: form.password }
                : { fullname: form.fullname, email: form.email, password: form.password }

            const res = await axios.post(`${API}/auth/${endpoint}`, body)

            if (isLogin) {
                localStorage.setItem('token', res.data.token)
                localStorage.setItem('user', JSON.stringify({ fullname: res.data.fullname, email: res.data.email }))
                navigate('/onboarding')
            } else {
               toast.success('Account created! Please login.')
                setIsLogin(true)
            }
        } catch (err) {
            setError(err.response?.data?.error || 'Something went wrong!')
        }

        setLoading(false)
    }

    return (
        <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-6">
            <div className="w-full max-w-md">

                {/* Logo */}
                <h1 className="text-4xl font-black text-white text-center mb-2">
                    Zap<span className="text-[#7C3AED]">Book</span>
                </h1>
                <p className="text-gray-400 text-center mb-8">
                    {isLogin ? 'Welcome back!' : 'Create your free account'}
                </p>

                {/* Card */}
                <div className="bg-white/5 border border-white/10 rounded-3xl p-8">

                    {/* Error */}
                    {error && (
                        <p className="text-red-400 text-sm mb-4 bg-red-500/10 border border-red-500/20 p-3 rounded-xl">{error}</p>
                    )}

                    {/* Form */}
                    <div className="space-y-4">
                        {!isLogin && (
                            <input
                                type="text"
                                name="fullname"
                                placeholder="Full Name"
                                value={form.fullname}
                                onChange={handleChange}
                                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#7C3AED]"
                            />
                        )}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            value={form.email}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#7C3AED]"
                        />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={form.password}
                            onChange={handleChange}
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 outline-none focus:border-[#7C3AED]"
                        />
                    </div>

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={loading}
                        className="w-full mt-6 py-4 bg-[#7C3AED] text-white font-black text-lg rounded-2xl hover:bg-[#6D28D9] transition disabled:opacity-50"
                    >
                        {loading ? 'Please wait...' : isLogin ? 'Login' : 'Create Account'}
                    </button>

                    {/* Toggle */}
                    <p className="text-center mt-4 text-gray-500 text-sm">
                        {isLogin ? "Don't have an account?" : "Already have an account?"}
                        <button
                            onClick={() => { setIsLogin(!isLogin); setError('') }}
                            className="text-[#7C3AED] font-bold ml-1"
                        >
                            {isLogin ? 'Sign Up' : 'Login'}
                        </button>
                    </p>

                </div>
            </div>
        </div>
    )
}