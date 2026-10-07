'use client';

import { useState, useEffect } from 'react';
import { Plus, Trash2, Briefcase, Calendar, MapPin } from 'lucide-react';
import ImageUploader from './ImageUploader';

interface Experience {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description?: string;
    location?: string;
    type?: string;
    logo?: string;
}

export default function ExperienceSettings() {
    const [experiences, setExperiences] = useState<Experience[]>([]);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Partial<Experience>>({
        current: false
    });

    useEffect(() => {
        fetchExperiences();
    }, []);

    const fetchExperiences = async () => {
        try {
            const res = await fetch('/api/experiences');
            const data = await res.json();
            setExperiences(data);
        } catch (error) {
            console.error('Error fetching experiences:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this experience?')) return;
        try {
            await fetch(`/api/experiences/${id}`, { method: 'DELETE' });
            fetchExperiences();
        } catch (error) {
            alert('Failed to delete experience');
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const url = formData.id ? `/api/experiences/${formData.id}` : '/api/experiences';
            const method = formData.id ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                setIsEditing(false);
                setFormData({ current: false });
                fetchExperiences();
            } else {
                alert('Failed to save experience');
            }
        } catch (error) {
            console.error(error);
            alert('Error saving experience');
        }
    };

    const handleEdit = (exp: Experience) => {
        setFormData({
            ...exp,
            startDate: exp.startDate.split('T')[0],
            endDate: exp.endDate ? exp.endDate.split('T')[0] : undefined,
        });
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({ current: false });
    };

    if (loading) return <div>Loading experiences...</div>;

    return (
        <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <h2 className="text-xl font-medium text-foreground">Experience</h2>
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="admin-primary"
                    >
                        <Plus className="w-4 h-4 mr-1" /> Add Experience
                    </button>
                )}
            </div>

            {isEditing && (
                <div className="bg-foreground/3 p-6 rounded-xl mb-8 border border-border">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="w-full sm:w-1/4">
                                <ImageUploader
                                    label="Company Logo"
                                    value={formData.logo || ''}
                                    onChange={(url) => setFormData({ ...formData, logo: url })}
                                />
                            </div>
                            <div className="w-full sm:w-3/4 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground">Company Name</label>
                                        <input
                                            type="text"
                                            required
                                            className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-none text-foreground font-medium placeholder-gray-400 focus:ring-2 focus:ring-foreground focus:border-transparent focus:bg-background transition-all duration-200 outline-none"
                                            value={formData.company || ''}
                                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground">Role / Title</label>
                                        <input
                                            type="text"
                                            required
                                            className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-none text-foreground font-medium placeholder-gray-400 focus:ring-2 focus:ring-foreground focus:border-transparent focus:bg-background transition-all duration-200 outline-none"
                                            value={formData.role || ''}
                                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground">Start Date</label>
                                        <input
                                            type="month"
                                            required
                                            className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-none text-foreground font-medium placeholder-gray-400 focus:ring-2 focus:ring-foreground focus:border-transparent focus:bg-background transition-all duration-200 outline-none"
                                            value={formData.startDate ? formData.startDate.substring(0, 7) : ''}
                                            onChange={e => setFormData({ ...formData, startDate: e.target.value + '-01' })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground">End Date</label>
                                        <input
                                            type="month"
                                            disabled={formData.current}
                                            className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-none focus:ring-2 focus:ring-foreground focus:border-transparent focus:bg-background transition-all duration-200 outline-none disabled:opacity-50"
                                            value={formData.endDate ? formData.endDate.substring(0, 7) : ''}
                                            onChange={e => setFormData({ ...formData, endDate: e.target.value + '-01' })}
                                        />
                                        <div className="mt-2 flex items-center">
                                            <input
                                                type="checkbox"
                                                id="current"
                                                checked={formData.current}
                                                onChange={e => setFormData({ ...formData, current: e.target.checked, endDate: undefined })}
                                                className="h-4 w-4 text-foreground rounded border-border"
                                            />
                                            <label htmlFor="current" className="ml-2 text-sm text-muted">I currently work here</label>
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-foreground">Location</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Jakarta, Indonesia"
                                            className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-none focus:ring-2 focus:ring-foreground focus:border-transparent focus:bg-background transition-all duration-200 outline-none"
                                            value={formData.location || ''}
                                            onChange={e => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-foreground">Type</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Full-time, Hybrid"
                                            className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-none focus:ring-2 focus:ring-foreground focus:border-transparent focus:bg-background transition-all duration-200 outline-none"
                                            value={formData.type || ''}
                                            onChange={e => setFormData({ ...formData, type: e.target.value })}
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-foreground">Description</label>
                                    <textarea
                                        rows={3}
                                        className="mt-1 block w-full px-3 py-2 border border-border rounded-md shadow-none focus:ring-2 focus:ring-foreground focus:border-transparent focus:bg-background transition-all duration-200 outline-none"
                                        value={formData.description || ''}
                                        onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end space-x-3 pt-4">
                            <button
                                type="button"
                                onClick={handleCancel}
                                className="px-4 py-2 text-foreground hover:bg-foreground/5 rounded-lg"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className="admin-primary"
                            >
                                Save Experience
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {experiences.map((exp) => (
                    <div key={exp.id} className="bg-background p-4 rounded-xl border border-border flex justify-between items-start group hover:shadow-none transition-shadow">
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="w-12 h-12 rounded-lg bg-foreground/5 flex items-center justify-center overflow-hidden border border-border">
                                {exp.logo ? (
                                    <img src={exp.logo} alt="" className="w-full h-full object-cover" />
                                ) : (
                                    <Briefcase className="w-5 h-5 text-muted" />
                                )}
                            </div>
                            <div>
                                <h3 className="font-medium text-foreground">{exp.company}</h3>
                                <p className="text-sm text-muted">{exp.role}</p>
                                <div className="flex flex-wrap items-center gap-3 text-xs text-muted mt-1">
                                    <span className="flex items-center">
                                        <Calendar className="w-3 h-3 mr-1" />
                                        {new Date(exp.startDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })} -
                                        {exp.current ? 'Present' : (exp.endDate ? new Date(exp.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : '')}
                                    </span>
                                    {exp.location && (
                                        <span className="flex items-center">
                                            <MapPin className="w-3 h-3 mr-1" />
                                            {exp.location}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex space-x-2 opacity-100 transition-opacity">
                            <button
                                onClick={() => handleEdit(exp)}
                                className="p-2 text-muted hover:text-foreground"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(exp.id)}
                                className="p-2 text-muted hover:text-red-600"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}
                {experiences.length === 0 && !loading && (
                    <div className="text-center py-8 text-muted text-sm">
                        No experience added yet.
                    </div>
                )}
            </div>
        </div>
    );
}
