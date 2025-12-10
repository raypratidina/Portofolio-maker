'use client';

import dynamic from 'next/dynamic';
import { useMemo, useRef } from 'react';
import 'react-quill-new/dist/quill.snow.css';

// Dynamic import to avoid SSR issues with Quill
const ReactQuill = dynamic(() => import('react-quill-new'), {
    ssr: false,
    loading: () => <div className="h-64 w-full bg-gray-100 dark:bg-gray-800 animate-pulse rounded-md" />
});

interface RichTextEditorProps {
    value: string;
    onChange: (value: string) => void;
    label?: string;
}

export default function RichTextEditor({ value, onChange, label }: RichTextEditorProps) {
    // Correctly type the ref to access the ReactQuill instance methods
    const quillRef = useRef<any>(null);

    // useMemo to prevent modules from being recreated on every render, causing Quill to re-init
    const modules = useMemo(() => ({
        toolbar: {
            container: [
                [{ 'header': [1, 2, 3, false] }],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                ['link', 'image'],
                ['clean']
            ],
            handlers: {
                image: function () {
                    // Custom image handler to upload to server instead of Base64
                    const input = document.createElement('input');
                    input.setAttribute('type', 'file');
                    input.setAttribute('accept', 'image/*');
                    input.click();

                    input.onchange = async () => {
                        const file = input.files?.[0];
                        if (file) {
                            const formData = new FormData();
                            formData.append('file', file);

                            try {
                                // Show loading placeholder if possible, or simple wait
                                const res = await fetch('/api/upload', {
                                    method: 'POST',
                                    body: formData
                                });

                                if (!res.ok) throw new Error('Upload failed');

                                const data = await res.json();
                                const url = data.url;

                                // Insert image embed
                                // We need to access the quill instance. 
                                // Since this handler is defined inside useMemo, we need access to quillRef.
                                // However, `this` context inside handler refers to the toolbar usually.
                                // But we can use the ref if it's stable.

                                if (quillRef.current) {
                                    const quill = quillRef.current.getEditor();
                                    const range = quill.getSelection(true);
                                    quill.insertEmbed(range.index, 'image', url);
                                }
                            } catch (err) {
                                console.error('Image upload failed:', err);
                                alert('Failed to upload image. Please try again.');
                            }
                        }
                    };
                }
            }
        }
    }), []); // Dependencies empty is fine as long as quillRef is stable.

    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list',
        'link', 'image'
    ];

    return (
        <div className="space-y-2">
            {label && <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</label>}
            <div className="quill-wrapper bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-md overflow-hidden">
                {/* @ts-ignore */}
                <ReactQuill
                    ref={quillRef}
                    theme="snow"
                    value={value}
                    onChange={onChange}
                    modules={modules}
                    formats={formats}
                    className="text-gray-900 dark:text-white"
                />
            </div>
            <style jsx global>{`
                .quill-wrapper .ql-toolbar {
                    border: none;
                    border-bottom: 1px solid #e5e7eb;
                    background-color: #f9fafb;
                }
                .dark .quill-wrapper .ql-toolbar {
                    border-bottom-color: #374151;
                    background-color: #1f2937;
                }
                .dark .quill-wrapper .ql-toolbar .ql-stroke {
                    stroke: #d1d5db;
                }
                .dark .quill-wrapper .ql-toolbar .ql-fill {
                    fill: #d1d5db;
                }
                .dark .quill-wrapper .ql-toolbar .ql-picker {
                    color: #d1d5db;
                }
                .quill-wrapper .ql-container {
                    border: none;
                    fontSize: 1rem;
                    min-height: 300px;
                }
                .dark .quill-wrapper .ql-editor {
                    color: #e5e7eb;
                }
                .dark .quill-wrapper .ql-editor.ql-blank::before {
                    color: #9ca3af;
                }
            `}</style>
        </div>
    );
}
