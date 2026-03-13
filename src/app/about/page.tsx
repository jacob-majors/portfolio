import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About Jacob Majors — photographer, engineer, and maker.",
};

export default function AboutPage() {
  return (
    <main className="pt-24 min-h-screen">
      <div className="max-w-3xl mx-auto px-6 py-20">
        <p className="text-[#c8a96e] text-xs tracking-[0.4em] uppercase mb-6">About</p>

        <h1 className="text-5xl md:text-7xl font-light text-white mb-16 leading-tight">
          Jacob Majors
        </h1>

        <div className="space-y-8 text-[#999] text-lg leading-relaxed">
          <p>
            I'm a photographer and engineer based in Sonoma County, California. I shoot action
            sports — mountain bike races, basketball, soccer, and climbing — capturing the
            moments that happen in fractions of a second.
          </p>

          <p>
            On the engineering side, I build things. From 3D-printed accessibility hardware to
            full-stack web applications, I care about making things that actually work for real
            people.
          </p>

          <p>
            This site is a living record of both — the photos I take, the projects I build, and
            the ideas I'm working through.
          </p>
        </div>

        <div className="mt-20 pt-12 border-t border-[#1a1a1a] grid grid-cols-1 sm:grid-cols-3 gap-10">
          <div>
            <p className="text-[#c8a96e] text-[10px] tracking-[0.4em] uppercase mb-3">Photography</p>
            <p className="text-white text-sm leading-relaxed">
              Action sports, mountain biking, basketball, soccer, climbing.
            </p>
          </div>
          <div>
            <p className="text-[#c8a96e] text-[10px] tracking-[0.4em] uppercase mb-3">Engineering</p>
            <p className="text-white text-sm leading-relaxed">
              3D printing, accessibility hardware, full-stack web, embedded systems.
            </p>
          </div>
          <div>
            <p className="text-[#c8a96e] text-[10px] tracking-[0.4em] uppercase mb-3">Contact</p>
            <p className="text-white text-sm leading-relaxed">
              Reach out on Instagram or via email.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
