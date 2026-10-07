import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../api/auth/[...nextauth]/route';
import AdminSidebar from '@/components/admin/Sidebar';

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect('/admin/login');
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-background">
            <AdminSidebar />
            <main className="flex-1 min-w-0 px-5 py-8 sm:px-8 lg:p-12 xl:p-16">
                <div className="max-w-6xl mx-auto">{children}</div>
            </main>
        </div>
    );
}
