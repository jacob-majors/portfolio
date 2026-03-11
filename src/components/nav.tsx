"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { clsx } from "clsx";

const links = [
  { href: "/photography", label: "Photography" },
  { href: "/projects", label: "Engineering" },
  { href: "/blog", label: "Writing" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={clsx(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#1a1a1a]" : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="text-sm font-medium tracking-widest uppercase text-white hover:text-[#c8a96e] transition-colors">
          Jacob Majors
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-10">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "text-sm tracking-wider uppercase transition-colors",
                pathname.startsWith(link.href)
                  ? "text-[#c8a96e]"
                  : "text-[#999] hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={clsx("block w-6 h-px bg-white transition-all duration-300", menuOpen && "translate-y-2 rotate-45")} />
          <span className={clsx("block w-6 h-px bg-white transition-all duration-300", menuOpen && "opacity-0")} />
          <span className={clsx("block w-6 h-px bg-white transition-all duration-300", menuOpen && "-translate-y-2 -rotate-45")} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={clsx(
        "md:hidden overflow-hidden transition-all duration-500",
        menuOpen ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
      )}>
        <div className="px-6 pb-6 flex flex-col gap-6 border-b border-[#1a1a1a]">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={clsx(
                "text-sm tracking-wider uppercase",
                pathname.startsWith(link.href) ? "text-[#c8a96e]" : "text-[#999]"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
