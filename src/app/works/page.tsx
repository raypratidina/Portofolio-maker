import { Metadata } from 'next';
import { getProjects, getSiteSettings } from '@/lib/content';
import { Navbar } from '@/components/navigation/Navbar';
import { ContactSection } from '@/components/contact/ContactSection';
import { WorksHeader } from '@/components/works/WorksHeader';
import { FeaturedProjects } from '@/components/works/FeaturedProjects';
import { MoreProjects } from '@/components/works/MoreProjects';

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
    const settings = await getSiteSettings();
    return {
        title: `Work | ${settings.siteTitle}`,
        description: 'A curated editorial archive of digital products, interfaces and experiments.',
    };
}

export default async function WorksPage() {
    const projects = await getProjects();
    const settings = await getSiteSettings();

    // Determine Featured Projects
    // If some have featured === true, use them. 
    // Otherwise fallback to taking the top 3 projects as featured based on order.
    let featuredProjects = projects.filter(p => p.featured);
    if (featuredProjects.length === 0 && projects.length > 0) {
        featuredProjects = projects.slice(0, 3);
    }
    
    // The rest go to More Projects
    const moreProjects = projects.filter(p => !featuredProjects.find(fp => fp.id === p.id));

    return (
        <div className="min-h-screen bg-background text-foreground antialiased selection:bg-foreground selection:text-background font-sans">
            <Navbar />

            <main className="pb-24 md:pb-0">
                <WorksHeader />
                <FeaturedProjects projects={featuredProjects} />
                <MoreProjects projects={moreProjects} />
            </main>

            <ContactSection settings={settings} />
        </div>
    );
}
