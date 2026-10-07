
'use client';

import { useState } from 'react';
import { Star } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ToggleFeaturedButtonProps {
    id: string;
    initialFeatured: boolean;
}

export default function ToggleFeaturedButton({ id, initialFeatured }: ToggleFeaturedButtonProps) {
    const [featured, setFeatured] = useState(initialFeatured);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const toggleFeatured = async () => {
        setLoading(true);
        try {
            const res = await fetch(`/api/projects/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ featured: !featured }),
            });

            if (res.ok) {
                setFeatured(!featured);
                router.refresh();
            } else {
                console.error('Failed to update featured status');
            }
        } catch (error) {
            console.error('Error updating featured status:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={toggleFeatured}
            disabled={loading}
            className={`inline-flex min-h-11 min-w-11 items-center justify-center rounded-full transition-colors ${featured ? 'text-foreground hover:text-muted' : 'text-muted hover:text-foreground'
                }`}
            aria-pressed={featured}
            aria-label={featured ? "Remove from featured projects" : "Feature project"}
            title={featured ? 'Unfeature' : 'Feature'}
        >
            {featured ? <Star className="w-5 h-5 fill-current" /> : <Star className="w-5 h-5" />}
        </button>
    );
}
