export function ProcessSection() {
  const steps = [
    {
      num: '01',
      title: 'UNDERSTAND',
      desc: 'I start with the problem,\nnot the interface.'
    },
    {
      num: '02',
      title: 'STRUCTURE',
      desc: 'I turn messy requirements\ninto clear user flows.'
    },
    {
      num: '03',
      title: 'DESIGN',
      desc: 'I translate structure into\nsimple, scalable interfaces.'
    },
    {
      num: '04',
      title: 'VALIDATE',
      desc: 'I test, iterate and refine\nbefore calling it done.'
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6 md:px-12 max-w-[1440px] mx-auto border-b border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 md:mb-16">
        <div className="md:col-span-3">
          <span className="font-mono text-xs tracking-widest uppercase text-muted">05 / How I Work</span>
        </div>
        <div className="md:col-span-9">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12">
            {steps.map((step) => (
              <div key={step.num} className="flex flex-col gap-6">
                <span className="text-4xl md:text-5xl font-medium tracking-tight text-muted/30">{step.num}</span>
                <div className="flex flex-col gap-4">
                  <h3 className="font-mono text-xs tracking-widest uppercase">{step.title}</h3>
                  <p className="text-2xl md:text-3xl font-medium tracking-tight leading-tight whitespace-pre-line">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

