'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/admin/ImageUploader';
import FileUploader from '@/components/admin/FileUploader';
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
        <div className="max-w-2xl">
            <h1 className="text-3xl font-bold mb-8 text-gray-800">Profile Settings</h1>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 mb-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="flex items-start space-x-6">
                        <div className="w-1/3">
                            <ImageUploader
                                label="Profile Photo"
                                value={formData.avatar}
                                onChange={(url) => setFormData(prev => ({ ...prev, avatar: url }))}
                            />
                        </div>
                        <div className="w-2/3 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Full Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:bg-blue-50 transition-all duration-200 outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Role / Job Title</label>
                                <input
                                    type="text"
                                    name="role"
                                    value={formData.role}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:bg-blue-50 transition-all duration-200 outline-none"
                                    placeholder="e.g. UI/UX Designer"
                                />
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Country / Location</label>
                        <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:bg-blue-50 transition-all duration-200 outline-none"
                            placeholder="e.g. Indonesia"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Link Curriculum Vitae (PDF/Google Drive)</label>
                        <input
                            type="text"
                            name="cvUrl"
                            value={formData.cvUrl}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:bg-blue-50 transition-all duration-200 outline-none"
                            placeholder="https://drive.google.com/file/d/..."
                        />
                        <p className="mt-1 text-xs text-gray-500">Paste link CV Anda di sini (Google Drive, Dropbox, atau link PDF langsung).</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        <textarea
                            name="bio"
                            value={formData.bio}
                            onChange={handleChange}
                            rows={4}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Tell us a little about yourself..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Works Page Intro</label>
                        <textarea
                            name="worksIntro"
                            value={(formData as any).worksIntro || ''}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                            placeholder="Welcome message on the Works page..."
                        />
                        <p className="mt-1 text-xs text-gray-500">This text will be displayed at the top of your Works page.</p>
                    </div>

                    <div className="pt-4 border-t border-gray-100 flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
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
