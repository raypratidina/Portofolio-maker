'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, name }),
            });

            if (res.ok) {
                router.push('/admin/login?registered=true');
            } else {
                const data = await res.json();
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-5 py-12">
            <div className="bg-background border border-border p-6 sm:p-10 rounded-2xl w-full max-w-md">
                <p className="admin-eyebrow mb-8">Ray Pratidina / Portfolio studio</p>
                <h1 className="text-4xl font-medium mb-3 tracking-tight text-foreground">Create Admin Account</h1><p className="text-muted text-sm leading-relaxed mb-8">A space to curate your work and tell your story.</p>
                {error && <p role="alert" className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-foreground " htmlFor="name">Name</label>
                        <input
                            id="name" autoComplete="name" type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-border  rounded-md shadow-none text-foreground  bg-background  font-medium focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent"
                            placeholder="Your Name"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground " htmlFor="email">Email</label>
                        <input
                            id="email" autoComplete="email" type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-border  rounded-md shadow-none text-foreground  bg-background  font-medium focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground " htmlFor="password">Password</label>
                        <input
                            id="password" autoComplete="new-password" type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-border  rounded-md shadow-none text-foreground  bg-background  font-medium focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="admin-primary w-full"
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>

                    <div className="text-center mt-4">
                        <a href="/admin/login" className="text-sm text-foreground hover:underline">
                            Already have an account? Login
                        </a>
                    </div>
                </form>
            </div>
        </div>
    );
}
