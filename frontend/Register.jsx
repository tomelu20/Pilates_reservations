import React, { useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';

export default function Register({ setActiveTab }) {
    const [step, setStep] = useState('register'); // 'register' sau 'verify'
    const [registeredEmail, setRegisteredEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');

    const [formData, setFormData] = useState({
        nume: '',
        prenume: '',
        email: '',
        phone_number: '',
        password: '',
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);

    const validatePassword = (pwd) => {
        return (
            pwd.length >= 6 &&
            /[A-Z]/.test(pwd) &&
            /[a-z]/.test(pwd) &&
            /[0-9]/.test(pwd) &&
            /[!@#$%^&*(),.?":{}|<>]/.test(pwd)
        );
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (!/^\d{10}$/.test(formData.phone_number)) {
            setError('Numărul de telefon trebuie să conțină exact 10 cifre.');
            return;
        }

        if (!validatePassword(formData.password)) {
            setError(
                'Parola trebuie să conțină min. 6 caractere, o literă mare, o literă mică, un număr și un caracter special.'
            );
            return;
        }

        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.detail || 'Eroare la înregistrare.');

            setRegisteredEmail(formData.email);
            setStep('verify'); // Trecem la pasul de introducere a codului primit pe email
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleVerifyCode = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await fetch('http://localhost:8000/api/auth/verify-email', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email: registeredEmail, code: verificationCode }),
            });

            const data = await response.json();
            if (!response.ok) throw new Error(data.detail || 'Cod de verificare invalid.');

            setSuccess('Cont activat cu succes! Redirecționare către autentificare...');
            setTimeout(() => setActiveTab('login'), 3000);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleRegister = useGoogleLogin({
        onSuccess: async (tokenResponse) => {
            try {
                const userInfoRes = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                    headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
                });
                const googleUser = await userInfoRes.json();

                const response = await fetch('http://localhost:8000/api/auth/google', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        email: googleUser.email,
                        nume: googleUser.family_name || googleUser.name,
                        prenume: googleUser.given_name || '',
                        google_id: googleUser.sub,
                    }),
                });

                const data = await response.json();
                if (!response.ok) throw new Error(data.detail || 'Eroare la înregistrarea cu Google.');

                localStorage.setItem('token', data.access_token);
                setActiveTab('acasa');
            } catch (err) {
                setError(err.message);
            }
        },
        onError: () => setError('Înregistrarea cu Google a eșuat.'),
    });

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-[#F4EFEA]">
            <div className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-[#E2DAD0] p-8">

                {/* Logo / Brand */}
                <div className="text-center mb-6">
                    <div
                        onClick={() => setActiveTab('acasa')}
                        className="w-12 h-12 rounded-full bg-[#8C5E48] mx-auto flex items-center justify-center text-white font-serif text-xl font-bold mb-3 cursor-pointer"
                    >
                        YP
                    </div>
                    <h2 className="text-2xl font-serif font-bold text-[#3A322C]">Zenith Studio</h2>
                </div>

                {/* TAB-URI SUS */}
                <div className="flex border-b border-gray-200 mb-6">
                    <button
                        type="button"
                        onClick={() => setActiveTab('login')}
                        className="w-1/2 pb-3 text-sm font-semibold text-gray-400 hover:text-gray-600 text-center transition"
                    >
                        Autentificare
                    </button>
                    <button
                        type="button"
                        className="w-1/2 pb-3 text-sm font-semibold text-[#8C5E48] border-b-2 border-[#8C5E48] text-center"
                    >
                        Devino Membru
                    </button>
                </div>

                {error && (
                    <div className="mb-4 bg-red-50 border border-red-200 text-red-600 text-xs p-3 rounded-xl text-center">
                        {error}
                    </div>
                )}

                {success && (
                    <div className="mb-4 bg-green-50 border border-green-200 text-green-700 text-xs p-3 rounded-xl text-center">
                        {success}
                    </div>
                )}

                {/* PASUL 1: Formularul clasic de înregistrare */}
                {step === 'register' && (
                    <>
                        <form onSubmit={handleSubmit} className="space-y-3">
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A322C] mb-1">
                                        Nume
                                    </label>
                                    <input
                                        type="text"
                                        name="nume"
                                        required
                                        value={formData.nume}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2.5 rounded-xl border border-[#D9CEC3] focus:outline-none focus:border-[#8C5E48] text-sm text-[#3A322C]"
                                        placeholder="Popescu"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A322C] mb-1">
                                        Prenume
                                    </label>
                                    <input
                                        type="text"
                                        name="prenume"
                                        required
                                        value={formData.prenume}
                                        onChange={handleChange}
                                        className="w-full px-3 py-2.5 rounded-xl border border-[#D9CEC3] focus:outline-none focus:border-[#8C5E48] text-sm text-[#3A322C]"
                                        placeholder="Andrei"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A322C] mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2.5 rounded-xl border border-[#D9CEC3] focus:outline-none focus:border-[#8C5E48] text-sm text-[#3A322C]"
                                    placeholder="nume@exemplu.ro"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A322C] mb-1">
                                    Număr Telefon (10 cifre)
                                </label>
                                <input
                                    type="tel"
                                    name="phone_number"
                                    required
                                    maxLength="10"
                                    value={formData.phone_number}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2.5 rounded-xl border border-[#D9CEC3] focus:outline-none focus:border-[#8C5E48] text-sm text-[#3A322C]"
                                    placeholder="0721000111"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold uppercase tracking-wider text-[#3A322C] mb-1">
                                    Parolă
                                </label>
                                <input
                                    type="password"
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="w-full px-3 py-2.5 rounded-xl border border-[#D9CEC3] focus:outline-none focus:border-[#8C5E48] text-sm text-[#3A322C]"
                                    placeholder="••••••••"
                                />
                                <p className="text-[10px] text-gray-500 mt-1">
                                    * Min. 6 caractere, 1 literă mare, 1 mică, 1 cifră, 1 caracter special.
                                </p>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-[#8C5E48] hover:bg-[#734B38] text-white py-3 rounded-xl text-sm font-medium transition shadow-md disabled:opacity-50 mt-2"
                            >
                                {loading ? 'Se înregistrează...' : 'Înregistrare'}
                            </button>
                        </form>

                        <div className="relative my-5">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-200" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white px-2 text-gray-400">sau continuă cu</span>
                            </div>
                        </div>

                        <button
                            type="button"
                            onClick={() => handleGoogleRegister()}
                            className="w-full flex items-center justify-center gap-3 bg-white border border-[#D9CEC3] hover:bg-gray-50 text-[#3A322C] py-3 rounded-xl text-sm font-medium transition shadow-sm"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"/>
                                <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.13 0-5.78-2.11-6.73-4.96H1.18v3.15C3.15 21.32 7.23 24 12 24z"/>
                                <path fill="#FBBC05" d="M5.27 14.24c-.25-.72-.38-1.49-.38-2.24s.13-1.52.38-2.24V6.6H1.18C.43 8.13 0 9.87 0 12s.43 3.87 1.18 5.4l4.09-3.16z"/>
                                <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.15 2.68 1.18 6.6l4.09 3.15c.95-2.85 3.6-4.96 6.73-4.96z"/>
                            </svg>
                            Google
                        </button>
                    </>
                )}

                {/* PASUL 2: Ecranul de verificare prin cod trimis pe email */}
                {step === 'verify' && (
                    <form onSubmit={handleVerifyCode} className="space-y-4 text-center">
                        <div>
                            <h3 className="text-lg font-serif font-bold text-[#3A322C]">Verifică-ți adresa de email</h3>
                            <p className="text-xs text-gray-500 mt-1">
                                Am trimis un cod de 6 cifre pe adresa <span className="font-semibold text-[#8C5E48]">{registeredEmail}</span>.
                            </p>
                        </div>

                        <div>
                            <input
                                type="text"
                                required
                                maxLength="6"
                                value={verificationCode}
                                onChange={(e) => setVerificationCode(e.target.value)}
                                className="w-full px-4 py-3 text-center tracking-widest text-2xl font-bold rounded-xl border border-[#D9CEC3] focus:outline-none focus:border-[#8C5E48] text-[#3A322C]"
                                placeholder="123456"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#8C5E48] hover:bg-[#734B38] text-white py-3 rounded-xl text-sm font-medium transition shadow-md disabled:opacity-50"
                        >
                            {loading ? 'Se verifică...' : 'Confirmă Codul'}
                        </button>

                        <button
                            type="button"
                            onClick={() => setStep('register')}
                            className="text-xs text-gray-500 hover:underline mt-2 block mx-auto"
                        >
                            ← Înapoi la înregistrare
                        </button>
                    </form>
                )}

            </div>
        </div>
    );
}