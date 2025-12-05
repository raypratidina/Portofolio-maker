'use client';

import { useState } from 'react';
import { Upload, FileText, X } from 'lucide-react';

interface FileUploaderProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
    accept?: string;
}

export default function FileUploader({ value, onChange, label = "File", accept = ".pdf" }: FileUploaderProps) {
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
            <label className="block text-sm font-medium text-gray-700">{label}</label>

            {value ? (
                <div className="relative w-full p-4 bg-gray-50 border border-gray-200 rounded-lg flex items-center justify-between group">
                    <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="p-2 bg-blue-100 rounded-lg">
                            <FileText className="w-6 h-6 text-blue-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {value.split('/').pop()}
                            </p>
                            <a href={value} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-600 hover:underline">
                                View File
                            </a>
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() => onChange('')}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>
            ) : (
                <div className="flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md hover:border-blue-500 transition-colors bg-white">
                    <div className="space-y-1 text-center">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <div className="flex text-sm text-gray-600 justify-center">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                                <span>Upload a file</span>
                                <input type="file" className="sr-only" accept={accept} onChange={handleUpload} disabled={uploading} />
                            </label>
                        </div>
                        <p className="text-xs text-gray-500">PDF up to 10MB</p>
                    </div>
                </div>
            )}
            {uploading && <p className="text-sm text-blue-500 font-medium animate-pulse">Uploading...</p>}
        </div>
    );
}
