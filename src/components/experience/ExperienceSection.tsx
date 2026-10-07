import type { Experience } from '@/types/content';

function formatYearRange(start: string, end: string | null | undefined) {
  const startYear = new Date(start).getFullYear();
  const endYear = end ? new Date(end).getFullYear() : 'PRESENT';
  return startYear === endYear ? `${startYear}` : `${startYear} — ${endYear}`;
}

export function ExperienceSection({ experiences }: { experiences: Experience[] }) {
  if (!experiences || experiences.length === 0) return null;

  return (
    <section id="experience" className="py-16 md:py-24 px-6 md:px-12 max-w-[1440px] mx-auto border-b border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <span className="font-mono text-xs tracking-widest uppercase text-muted">03 / Experience</span>
        </div>
        
        <div className="md:col-span-9 flex flex-col gap-16">
          {experiences.map((exp, index) => (
            <div key={exp.id} className={`grid grid-cols-1 md:grid-cols-12 gap-8 ${index !== experiences.length - 1 ? 'border-b border-border pb-16' : ''}`}>
              <div className="md:col-span-4">
                <span className="font-mono text-xs tracking-widest uppercase text-muted">
                  {formatYearRange(exp.startDate, exp.endDate)}
                </span>
              </div>
              
              <div className="md:col-span-8 flex flex-col gap-6">
                <div>
                  <h3 className="text-2xl font-medium tracking-tight uppercase mb-1">{exp.company}</h3>
                  <span className="font-mono text-xs tracking-widest uppercase text-muted">{exp.position}</span>
                </div>
                
                {exp.description && (
                  <div className="text-muted leading-relaxed text-sm max-w-2xl">
                    {exp.description.split(/(?:^|[\r\n]+)\s*[-•]\s*|(?:\.\s+)[-•]\s*|(?:\s+)-/)
                      .filter(item => item.trim().length > 2)
                      .length > 0 ? (
                      <ul className="space-y-2">
                        {exp.description.split(/(?:^|[\r\n]+)\s*[-•]\s*|(?:\.\s+)[-•]\s*|(?:\s+)-/)
                          .filter(item => item.trim().length > 2)
                          .map((item, i) => (
                            <li key={i} className="flex items-start gap-3">
                              <span className="text-muted mt-1.5">—</span>
                              <span>{item.trim().replace(/^-/, '')}</span>
                            </li>
                          ))}
                      </ul>
                    ) : (
                      <p>{exp.description}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

