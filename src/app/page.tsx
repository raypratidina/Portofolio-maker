import { getAbout, getExperience, getProjects, getSiteSettings } from '@/lib/content';
import { Navbar } from '@/components/navigation/Navbar';
import { HeroSection } from '@/components/hero/HeroSection';

import { AboutSection } from '@/components/about/AboutSection';
import { ProjectsSection } from '@/components/projects/ProjectsSection';
import { ExperienceSection } from '@/components/experience/ExperienceSection';
import { ContactSection } from '@/components/contact/ContactSection';

export default async function HomePage() {
  const [about, experiences, projects, settings] = await Promise.all([
    getAbout(),
    getExperience(),
    getProjects(),
    getSiteSettings()
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-foreground selection:text-background font-sans">
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[60] focus:bg-background focus:text-foreground focus:px-4 focus:py-3">Skip to content</a>
      <Navbar />

      <main id="main-content">
        <HeroSection />

        <ProjectsSection projects={projects} />
        <AboutSection about={about} />
        <ExperienceSection experiences={experiences} />
        <ContactSection settings={settings} />
      </main>
    </div>
  );
}
