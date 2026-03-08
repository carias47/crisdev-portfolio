import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X, Globe } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import type { Language } from "@/i18n/LanguageContext";

const DARK_MODE_KEY = "portfolio-dark-mode";

function getInitialDarkMode(): boolean {
  try {
    const stored = localStorage.getItem(DARK_MODE_KEY);
    if (stored !== null) return stored === "true";
  } catch { /* noop */ }
  return true;
}

const Navbar = () => {
  const { language, setLanguage, t } = useTranslation();
  const [dark, setDark] = useState(getInitialDarkMode);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.stack, href: "#stack" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.contact, href: "#contact" },
  ];

  const languages: { code: Language; label: string }[] = [
    { code: "en", label: "EN" },
    { code: "es", label: "ES" },
  ];

  const handleMobileNav = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileOpen(false);
    const target = document.querySelector(href);
    if (target) {
      setTimeout(() => target.scrollIntoView({ behavior: "smooth" }), 300);
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem(DARK_MODE_KEY, String(dark));
    } catch { /* noop */ }
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "glass-card shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        <a href="#" className="font-heading text-xl font-bold text-foreground tracking-tight">
          Cris<span className="text-gradient">.</span>Dev
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}

          {/* Language switcher */}
          <div className="flex items-center gap-1 rounded-full bg-secondary border border-border p-0.5">
            <Globe size={14} className="text-muted-foreground ml-2" />
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                  language === lang.code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3">
          {/* Mobile language switcher */}
          <div className="flex items-center gap-0.5 rounded-full bg-secondary border border-border p-0.5">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => setLanguage(lang.code)}
                className={`px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                  language === lang.code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-full bg-secondary text-secondary-foreground"
            aria-label="Toggle theme"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="text-foreground" aria-label="Menu">
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass-card border-t border-border"
          >
            <div className="flex flex-col gap-4 px-6 py-6">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleMobileNav(e, link.href)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
