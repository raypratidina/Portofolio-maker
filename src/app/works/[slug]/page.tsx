import { notFound } from 'next/navigation';
import { getProjectBySlug, getProjects, getSiteSettings } from '@/lib/content';
import { Navbar } from '@/components/navigation/Navbar';
import { CaseStudyRenderer } from '@/components/case-study/CaseStudyRenderer';
import { ContactSection } from '@/components/contact/ContactSection';
import { ProjectDetailHeroClient } from '@/components/works/ProjectDetailHeroClient';
import { ProjectDetailNavClient } from '@/components/works/ProjectDetailNavClient';

export default async function ProjectDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    // Get all projects for prev/next navigation
    const allProjects = await getProjects();
    const currentIndex = allProjects.findIndex(p => p.slug === slug);
    const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

    const settings = await getSiteSettings();

    // Format project index like "01"
    const projectNumber = String(currentIndex + 1).padStart(2, '0');

    return (
        <div className="min-h-screen bg-background text-foreground antialiased selection:bg-foreground selection:text-background font-sans">
            <Navbar />

            <main className="pb-24 md:pb-40">
                {/* 01 & 02 — ANIMATED PROJECT HEADER & HERO VISUAL */}
                <ProjectDetailHeroClient project={project} projectNumber={projectNumber} />

                {/* 03 & 04 & 05 — STORYTELLING CONTENT (CASE STUDY RENDERER) */}
                <section className="px-6 md:px-12 max-w-[1000px] mx-auto mb-32 md:mb-48 mt-12">
                    <CaseStudyRenderer blocks={project.caseStudyBlocks} />
                </section>

                {/* 16 — ANIMATED PROJECT NAVIGATION */}
                <ProjectDetailNavClient prevProject={prevProject} nextProject={nextProject} />
            </main>

            {/* 17 — CONTACT CTA */}
            <ContactSection settings={settings} />
        </div>
    );
}
