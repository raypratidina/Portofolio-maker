import Link from 'next/link';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import PublicSidebar from '@/components/PublicSidebar';
import { ArrowLeft, ExternalLink } from 'lucide-react';

async function getProject(slug: string) {
    return await prisma.project.findUnique({
        where: { slug },
        include: { media: true }
    });
}

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await getProject(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            <PublicSidebar />

            {/* Mobile Header */}
            <div className="md:hidden p-4 bg-white dark:bg-[#111] border-b border-gray-100 dark:border-gray-800 flex items-center justify-between sticky top-0 z-50">
                <Link href="/" className="flex items-center text-gray-600 dark:text-gray-400">
                    <ArrowLeft className="w-5 h-5 mr-2" />
                    Back
                </Link>
            </div>

            <main className="md:ml-72">
                <div className="max-w-5xl mx-auto px-6 py-12 md:py-20">

                    {/* Header Section */}
                    <div className="max-w-3xl mb-16">
                        <h1 className="text-4xl md:text-5xl font-bold text-blue-600 mb-6">{project.title}</h1>
                        <p className="text-[14px] leading-[21px] text-[#4B4D50] dark:text-gray-400 leading-relaxed">
                            {project.descriptionShort}
                        </p>
                    </div>

                    {/* Hero Image */}
                    {project.thumbnail && (
                        <div className="rounded-xl overflow-hidden mb-20 border border-gray-100 dark:border-gray-800">
                            <img src={project.thumbnail} alt={project.title} className="w-full h-auto" />
                        </div>
                    )}

                    {/* Project Details Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 border-b border-gray-100 dark:border-gray-800 pb-12">
                        <div>
                            <h3 className="text-[14px] leading-[21px] font-bold text-[#4B4D50] dark:text-white uppercase tracking-wider mb-2">Role</h3>
                            <p className="text-[16px] leading-[24px] font-bold text-[#000000] dark:text-gray-400">{project.role || '-'}</p>
                        </div>
                        <div>
                            <h3 className="text-[14px] leading-[21px] font-bold text-[#4B4D50] dark:text-white uppercase tracking-wider mb-2">Year</h3>
                            <p className="text-[16px] leading-[24px] font-bold text-[#000000] dark:text-gray-400">{project.year || '-'}</p>
                        </div>
                        <div>
                            <h3 className="text-[14px] leading-[21px] font-bold text-[#4B4D50] dark:text-white uppercase tracking-wider mb-2">Type</h3>
                            <p className="text-[16px] leading-[24px] font-bold text-[#000000] dark:text-gray-400">{project.category || '-'}</p>
                        </div>
                        <div>
                            <h3 className="text-[14px] leading-[21px] font-bold text-[#4B4D50] dark:text-white uppercase tracking-wider mb-2">Link</h3>
                            {project.link ? (
                                <a href={project.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center">
                                    Visit Site <ExternalLink className="w-3 h-3 ml-1" />
                                </a>
                            ) : (
                                <span className="text-gray-400">-</span>
                            )}
                        </div>
                    </div>

                    {/* Main Content (Rich Text) */}
                    <div className="prose prose-lg max-w-none text-gray-600 dark:text-gray-400 prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-white prose-a:text-blue-600 prose-strong:text-gray-900 dark:prose-strong:text-white prose-img:rounded-xl prose-img:shadow-lg prose-img:w-full prose-img:my-8 prose-h2:mt-12 prose-h2:mb-6 prose-p:leading-relaxed">
                        <div dangerouslySetInnerHTML={{ __html: project.descriptionLong || '' }} />
                    </div>

                    {/* Additional Media Gallery */}
                    {project.media && project.media.length > 0 && (
                        <div className="mt-20 space-y-12">
                            {project.media.map((media) => (
                                <div key={media.id} className="rounded-xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
                                    <img src={media.url} alt="" className="w-full h-auto" />
                                </div>
                            ))}
                        </div>
                    )}

                </div>
            </main>
        </div>
    );
}
