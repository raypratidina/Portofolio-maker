'use client';

import { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface ImageUploaderProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUploader({ value, onChange, label = "Image" }: ImageUploaderProps) {
    const [uploading, setUploading] = useState(false);

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        const formData = new FormData();
        formData.append('file', file);

        try {
            const res = await fetch('/api/upload', {
                method: 'POST',
                body: formData,
            });
            const data = await res.json();
            if (data.success) {
                onChange(data.url);
            }
        } catch (error) {
            console.error('Upload failed:', error);
        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground">{label}</label>

            {value ? (
                <div className="relative w-full h-48 bg-foreground/5 rounded-lg overflow-hidden group">
                    <img src={value} alt="Preview" className="w-full h-full object-cover" />
                    <button
                        type="button"
                        aria-label={`Remove ${label}`}
                        onClick={() => onChange('')}
                        className="absolute top-2 right-2 p-3 bg-red-500 text-white rounded-full opacity-100 transition-opacity"
                    >
                        <X className="w-4 h-4" />
                    </button>
                </div>
            ) : (
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-border border-dashed rounded-md hover:border-foreground transition-colors">
                    <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-muted" />
                        <div className="flex text-sm text-muted">
                            <label className="relative cursor-pointer bg-background rounded-md font-medium text-foreground hover:text-muted focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                <span>Upload a file</span>
                                <input type="file" className="sr-only" accept="image/*,.pdf,application/pdf" onChange={handleUpload} disabled={uploading} />
                            </label>
                        </div>
                        <p className="text-xs text-muted">Images (PNG, JPG) or Document (PDF) up to 10MB</p>
                    </div>
                </div>
            )}
            {uploading && <p className="text-sm text-muted animate-pulse">Uploading to Cloud...</p>}
            {/* Error Message Display */}
            {/* We could add state for error here if we refactor, but for now console.error is what we have. Let's add simple alert in catch block or verify user fixed .env */}
        </div>
    );
}
