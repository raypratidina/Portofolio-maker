'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ImageUploader from './ImageUploader';
import RichTextEditor from './RichTextEditor';

interface ProjectFormProps {
    initialData?: any;
}

export default function ProjectForm({ initialData }: ProjectFormProps) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        slug: initialData?.slug || '',
        category: initialData?.category || '',
        thumbnail: initialData?.thumbnail || '',
        descriptionShort: initialData?.descriptionShort || '',
        descriptionLong: initialData?.descriptionLong || '',
        client: initialData?.client || '',
        role: initialData?.role || '',
        year: initialData?.year || '',
        technologies: initialData?.technologies || '',
        link: initialData?.link || '',
        status: initialData?.status || 'DRAFT',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => {
            const newData = { ...prev, [name]: value };

            // Auto-generate slug from title if slug is empty or matches the previous auto-generated one
            if (name === 'title' && !initialData) {
                const currentSlugified = prev.title.toLowerCase().trim().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '').replace(/\-\-+/g, '-');
                const isSlugEmptyOrAuto = !prev.slug || prev.slug === currentSlugified;

                if (isSlugEmptyOrAuto) {
                    newData.slug = value
                        .toLowerCase()
                        .trim()
                        .replace(/\s+/g, '-')
                        .replace(/[^\w\-]+/g, '')
                        .replace(/\-\-+/g, '-');
                }
            }
            return newData;
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const url = initialData ? `/api/projects/${initialData.id}` : '/api/projects';
            const method = initialData ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                router.push('/admin/projects');
                router.refresh();
            } else {
                alert('Something went wrong');
            }
        } catch (error) {
            console.error(error);
            alert('Error saving project');
        } finally {
            setLoading(false);
        }
    };

    const handleStatusToggle = () => {
        setFormData(prev => ({
            ...prev,
            status: prev.status === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
        }));
    };

    const inputClasses = "mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-gray-900 dark:text-white bg-white dark:bg-gray-900 font-medium placeholder-gray-400 focus:ring-2 focus:ring-blue-600 focus:border-transparent focus:bg-blue-50 dark:focus:bg-blue-900/20 transition-all duration-200 outline-none";
    const labelClasses = "block text-sm font-medium text-gray-700 dark:text-gray-300";

    return (
        <form onSubmit={handleSubmit} className="space-y-8 max-w-4xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                    <div>
                        <label className={labelClasses}>Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className={inputClasses}
                            required
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Slug</label>
                        <input
                            type="text"
                            name="slug"
                            value={formData.slug}
                            onChange={handleChange}
                            className={inputClasses}
                            required
                        />
                    </div>
                    <div>
                        <label className={labelClasses}>Category</label>
                        <input
                            type="text"
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={inputClasses}
                            required
                        />
                    </div>
                </div>

                <div>
                    <ImageUploader
                        label="Thumbnail"
                        value={formData.thumbnail}
                        onChange={(url) => setFormData(prev => ({ ...prev, thumbnail: url }))}
                    />
                </div>
            </div>

            <div>
                <label className={labelClasses}>Short Description</label>
                <textarea
                    name="descriptionShort"
                    value={formData.descriptionShort}
                    onChange={handleChange}
                    rows={3}
                    className={inputClasses}
                />
            </div>

            <div>
                <RichTextEditor
                    label="Detailed Description"
                    value={formData.descriptionLong}
                    onChange={(value) => setFormData(prev => ({ ...prev, descriptionLong: value }))}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                <div>
                    <label className={labelClasses}>Client</label>
                    <input
                        type="text"
                        name="client"
                        value={formData.client}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label className={labelClasses}>Role</label>
                    <input
                        type="text"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label className={labelClasses}>Year</label>
                    <input
                        type="text"
                        name="year"
                        value={formData.year}
                        onChange={handleChange}
                        className={inputClasses}
                    />
                </div>
                <div>
                    <label className={labelClasses}>Technologies</label>
                    <input
                        type="text"
                        name="technologies"
                        value={formData.technologies}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="e.g. React, Next.js, Tailwind"
                    />
                </div>
                <div>
                    <label className={labelClasses}>Project Link <span className="text-gray-400 font-normal">(Optional)</span></label>
                    <input
                        type="url"
                        name="link"
                        value={formData.link}
                        onChange={handleChange}
                        className={inputClasses}
                        placeholder="https://example.com"
                    />
                </div>
                <div>
                    <label className={labelClasses}>Status</label>
                    <div className="mt-2 flex items-center">
                        <button
                            type="button"
                            onClick={handleStatusToggle}
                            className={`${formData.status === 'PUBLISHED' ? 'bg-blue-600' : 'bg-gray-200 dark:bg-gray-700'
                                } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2`}
                            role="switch"
                            aria-checked={formData.status === 'PUBLISHED'}
                        >
                            <span
                                aria-hidden="true"
                                className={`${formData.status === 'PUBLISHED' ? 'translate-x-5' : 'translate-x-0'
                                    } pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out`}
                            />
                        </button>
                        <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {formData.status === 'PUBLISHED' ? 'Published' : 'Draft'}
                        </span>
                    </div>
                </div>
            </div>

            <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200 dark:border-gray-800">
                <button
                    type="button"
                    onClick={() => router.back()}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-md shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none disabled:opacity-50"
                >
                    {loading ? 'Saving...' : 'Save Project'}
                </button>
            </div>
        </form>
    );
}
