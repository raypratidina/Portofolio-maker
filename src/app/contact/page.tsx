import prisma from '@/lib/prisma';
import PublicSidebar from '@/components/PublicSidebar';
import { Mail, MapPin } from 'lucide-react';

async function getUser() {
    return await prisma.user.findFirst();
}

export default async function ContactPage() {
    const user = await getUser();

    return (
        <div className="min-h-screen bg-[#F9F9F9] dark:bg-black">
            <PublicSidebar />

            {/* Mobile Header */}
            <div className="md:hidden p-4 bg-white dark:bg-[#111] border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 z-50">
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden">
                        <img src={user?.avatar || "https://ui-avatars.com/api/?name=Admin&background=0D8ABC&color=fff"} alt="Profile" />
                    </div>
                    <div>
                        <h1 className="font-bold text-sm">Contact</h1>
                    </div>
                </div>
            </div>

            <main className="md:ml-64 p-6 md:p-12 lg:p-16">
                <div className="w-full">
                    <h1 className="text-3xl font-bold bg-gradient-to-r from-sky-500 to-indigo-400 bg-clip-text text-transparent mb-8 w-fit">Get in Touch</h1>
                    <div className="bg-white dark:bg-[#111] rounded-2xl p-8 border border-zinc-200 dark:border-gray-800 w-full">
                        <p className="text-[14px] leading-[21px] text-[#4B4D50] dark:text-gray-400 mb-8 leading-relaxed">
                            I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
                        </p>

                        <div className="space-y-6">
                            <div className="flex items-center space-x-4">
                                <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600">
                                    <Mail className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-[14px] leading-[21px] text-[#4B4D50] dark:text-gray-400">Email me at</p>
                                    <a href={`mailto:${user?.email}`} className="text-[16px] leading-[24px] font-bold text-[#000000] dark:text-white hover:text-blue-600 transition-colors">
                                        {user?.email || 'contact@example.com'}
                                    </a>
                                </div>
                            </div>

                            {user?.country && (
                                <div className="flex items-center space-x-4">
                                    <div className="w-10 h-10 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center text-green-600">
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-[14px] leading-[21px] text-[#4B4D50] dark:text-gray-400">Based in</p>
                                        <p className="text-[16px] leading-[24px] font-bold text-[#000000] dark:text-white">
                                            {user.country}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
