export function SystemsSection() {
  return (
    <section className="py-16 md:py-24 px-6 md:px-12 max-w-[1440px] mx-auto border-b border-border">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 mb-12 md:mb-16">
        <div className="md:col-span-3">
          <span className="font-mono text-xs tracking-widest uppercase text-muted">03 / Design Systems</span>
        </div>
        <div className="md:col-span-9">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.1] max-w-4xl">
            I DON&apos;T JUST DESIGN SCREENS.
            <br className="hidden md:block" />
            I BUILD SYSTEMS THAT SCALE.
          </h2>
        </div>
      </div>

      {/* Abstract Design System Representation */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-px bg-border/40 p-px">
        {/* Typography System */}
        <div className="md:col-span-4 bg-background p-8 flex flex-col gap-12">
          <div className="font-mono text-xs tracking-widest text-muted uppercase">Tokens / Typography</div>
          <div className="flex flex-col gap-6">
            <div className="flex items-end justify-between border-b border-border pb-2">
              <span className="text-4xl font-medium">Display</span>
              <span className="font-mono text-xs text-muted">96px / 1.0</span>
            </div>
            <div className="flex items-end justify-between border-b border-border pb-2">
              <span className="text-2xl font-medium">Heading</span>
              <span className="font-mono text-xs text-muted">48px / 1.2</span>
            </div>
            <div className="flex items-end justify-between border-b border-border pb-2">
              <span className="text-lg">Body</span>
              <span className="font-mono text-xs text-muted">18px / 1.6</span>
            </div>
            <div className="flex items-end justify-between border-b border-border pb-2">
              <span className="text-xs font-mono tracking-widest uppercase">Metadata</span>
              <span className="font-mono text-xs text-muted">12px / 1.4</span>
            </div>
          </div>
        </div>

        {/* Grid & Spacing System */}
        <div className="md:col-span-4 bg-background p-8 flex flex-col gap-12">
          <div className="font-mono text-xs tracking-widest text-muted uppercase">Grid / Layout</div>
          <div className="flex-1 flex flex-col justify-center gap-4">
            <div className="flex gap-2 h-16 w-full">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex-1 bg-muted/10 border border-muted/20"></div>
              ))}
            </div>
            <div className="grid grid-cols-2 gap-2 w-full h-12">
              <div className="bg-foreground/5 border border-foreground/10"></div>
              <div className="bg-foreground/5 border border-foreground/10"></div>
            </div>
            <div className="w-full h-8 bg-foreground/10 border border-foreground/20"></div>
          </div>
        </div>

        {/* Colors & Variables */}
        <div className="md:col-span-4 bg-background p-8 flex flex-col gap-12">
          <div className="font-mono text-xs tracking-widest text-muted uppercase">Tokens / Color</div>
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#111111] border border-border shrink-0"></div>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold uppercase">Foreground</span>
                <span className="font-mono text-xs text-muted">#111111 / --foreground</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#F9F9F7] border border-border shrink-0"></div>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold uppercase">Background</span>
                <span className="font-mono text-xs text-muted">#F9F9F7 / --background</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-[#737373] border border-border shrink-0"></div>
              <div className="flex flex-col">
                <span className="font-mono text-xs font-bold uppercase">Muted</span>
                <span className="font-mono text-xs text-muted">#737373 / --muted</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

