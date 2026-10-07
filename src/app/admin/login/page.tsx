'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
        });

        if (result?.error) {
            setError('Invalid email or password');
        } else {
            router.push('/admin/dashboard');
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background px-5 py-12">
            <div className="bg-background border border-border p-6 sm:p-10 rounded-2xl w-full max-w-md">
                <p className="admin-eyebrow mb-8">Ray Pratidina / Portfolio studio</p>
                <h1 className="text-4xl font-medium mb-3 tracking-tight text-foreground">Admin Login</h1><p className="text-muted text-sm leading-relaxed mb-8">A space to curate your work and tell your story.</p>
                {error && <p role="alert" className="text-red-500 mb-4 text-center">{error}</p>}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-foreground " htmlFor="email">Email</label>
                        <input
                            id="email" autoComplete="email" type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-border  rounded-md shadow-none text-foreground  bg-background  font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent focus:bg-background  transition-all duration-200"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-foreground " htmlFor="password">Password</label>
                        <input
                            id="password" autoComplete="current-password" type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-border  rounded-md shadow-none text-foreground  bg-background  font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-foreground focus:border-transparent focus:bg-background  transition-all duration-200"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="admin-primary w-full"
                    >
                        Sign In
                    </button>
                </form>
                <div className="text-center mt-4">
                    <a href="/admin/register" className="text-sm text-foreground hover:underline">
                        Need an account? Register
                    </a>
                </div>
            </div>
        </div>
    );
}
