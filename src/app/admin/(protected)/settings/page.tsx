'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/admin/ImageUploader';

import ExperienceSettings from '@/components/admin/ExperienceSettings';

export default function SettingsPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        bio: '',
        country: '',
        avatar: '',
        cvUrl: '',
        worksIntro: '',
    });

    useEffect(() => {
        fetch('/api/profile', { cache: 'no-store' })
            .then(res => res.json())
            .then(data => {
                if (data && !data.error) {
                    setFormData({
                        name: data.name || '',
                        role: data.role || '',
                        bio: data.bio || '',
                        country: data.country || '',
                        avatar: data.avatar || '',
                        cvUrl: data.cvUrl || '',
                        worksIntro: data.worksIntro || '',
                    });
                }
                setLoading(false);
            })
            .catch(err => {
                console.error(err);
                setLoading(false);
            });
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await fetch('/api/profile', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            if (res.ok) {
                const data = await res.json();
                if (data.warning) {
                    alert('Profile saved with warning: ' + data.warning);
                } else {
                    alert('Profile updated successfully!');
                }
                router.refresh();
            } else {
                const errorData = await res.json();
                console.error('API Error:', errorData);
                alert(`Failed to update profile: ${errorData.error || 'Unknown error'}\nDetails: ${errorData.details || JSON.stringify(errorData)}`);
            }
        } catch (error) {
            console.error('Network/Client Error:', error);
            alert('Error updating profile: ' + (error as Error).message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <div className="max-w-4xl">
            <header className="mb-10"><p className="admin-eyebrow mb-4">03 / Settings</p><h1 className="text-4xl md:text-5xl">Make it yours.</h1><p className="text-muted mt-4">Your profile, background, and experience in one place.</p></header>

            <div className="bg-background p-6 rounded-xl shadow-none border border-border mb-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="flex flex-col sm:flex-row items-start gap-6">
                        <div className="w-full sm:w-1/3">
                            <ImageUploader
                                label="Profile Photo"
                                value={formData.avatar}
                                onChange={(url) => setFormData(prev => ({ ...prev, avatar: url }))}
                            />
                        </div>
                        <div className="w-full sm:w-2/3 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-foreground">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-none text-foreground font-medium placeholder-gray-400 focus:ring-2 focus:ring-foreground focus:border-transparent focus:bg-background transition-all duration-200 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-foreground">Role / Job Title</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-none text-foreground font-medium placeholder-gray-400 focus:ring-2 focus:ring-foreground focus:border-transparent focus:bg-background transition-all duration-200 outline-none"
                                    placeholder="e.g. UI/UX Designer"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground">Country / Location</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-none text-foreground font-medium placeholder-gray-400 focus:ring-2 focus:ring-foreground focus:border-transparent focus:bg-background transition-all duration-200 outline-none"
                            placeholder="e.g. Indonesia"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground">Link Curriculum Vitae (PDF/Google Drive)</label>
                        <input
                            type="text"
                            name="cvUrl"
                            value={formData.cvUrl}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-none text-foreground font-medium placeholder-gray-400 focus:ring-2 focus:ring-foreground focus:border-transparent focus:bg-background transition-all duration-200 outline-none"
                            placeholder="https://drive.google.com/file/d/..."
                        />
                        <p className="mt-1 text-xs text-muted">Paste link CV Anda di sini (Google Drive, Dropbox, atau link PDF langsung).</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                            className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-none focus:ring-foreground focus:border-foreground"
                            placeholder="Tell us a little about yourself..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground">Works Page Intro</label>
                        <textarea
                            name="worksIntro"
                            value={formData.worksIntro || ''}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-none focus:ring-foreground focus:border-foreground"
                            placeholder="Welcome message on the Works page..."
                        />
                        <p className="mt-1 text-xs text-muted">This text will be displayed at the top of your Works page.</p>
                    </div>

                    <div className="pt-4 border-t border-border flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="admin-primary"
                        >
                            {saving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>

                </form>
            </div>

            <ExperienceSettings />
        </div>
    );
}
