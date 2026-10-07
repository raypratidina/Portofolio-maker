export function PhilosophySection() {
  const principles = [
    {
      num: '01',
      title: 'COMPLEXITY',
      desc: "Complex business requirements shouldn&apos;t become complex user experiences. I distill complicated workflows into intuitive interactions."
    },
    {
      num: '02',
      title: 'SYSTEMS',
      desc: "Good interfaces need systems behind them, not isolated screens. I design with scalability, tokens, and components in mind."
    },
    {
      num: '03',
      title: 'COLLABORATION',
      desc: "Design doesn&apos;t happen in a vacuum. It works best when designers, product, and engineering speak the same language."
    },
    {
      num: '04',
      title: 'ITERATION',
      desc: "The first solution is rarely the best one. I test, validate with real users, and refine continuously."
    }
  ];

  return (
    <section className="py-24 md:py-40 px-6 md:px-12 max-w-[1440px] mx-auto bg-foreground text-background">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-3">
          <span className="font-mono text-xs tracking-widest uppercase text-muted">02 / Philosophy</span>
        </div>
        
        <div className="md:col-span-9">
          <h2 className="text-[12vw] md:text-8xl lg:text-9xl font-medium tracking-tighter leading-[0.85] uppercase">
            GOOD INTERFACES
            <br />
            AREN&apos;T ABOUT
            <br />
            MAKING THINGS
            <br />
            LOOK GOOD. THEY
            <br />
            ARE ABOUT MAKING
            <br />
            SURE PEOPLE DON&apos;T
            <br />
            HAVE TO THINK.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16 border-t border-border/20 pt-16">
            {principles.map((p) => (
              <div key={p.num} className="flex flex-col gap-4">
                <div className="flex items-center gap-4 border-b border-border/20 pb-4">
                  <span className="font-mono text-xs tracking-widest text-muted">{p.num}</span>
                  <h3 className="font-mono text-xs tracking-widest uppercase">{p.title}</h3>
                </div>
                <p className="text-lg text-muted/90 leading-relaxed max-w-sm">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
