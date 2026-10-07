'use client';

import { Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function DeleteProjectButton({ id }: { id: string }) {
    const router = useRouter();

    const handleDelete = async () => {
        if (!confirm('Are you sure you want to delete this project?')) return;

        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                router.refresh();
            } else {
                alert('Failed to delete project');
            }
        } catch (error) {
            console.error('Error deleting project:', error);
            alert('Error deleting project');
        }
    };

    return (
        <button type="button" aria-label="Delete project" onClick={handleDelete} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full text-muted hover:bg-red-500/10 hover:text-red-600">
            <Trash2 className="w-5 h-5" />
        </button>
    );
}
