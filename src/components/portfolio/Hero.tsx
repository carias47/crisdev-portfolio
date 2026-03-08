import { motion } from "framer-motion";
import heroBg from "@/assets/hero-bg.jpg";
import { useTranslation } from "@/i18n/LanguageContext";

const Hero = () => {
  const { t } = useTranslation();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40 dark:opacity-30" />
        <div className="absolute inset-0 bg-linear-to-b from-background/60 via-background/80 to-background" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/10 blur-3xl animate-float" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl animate-float" style={{ animationDelay: "2s" }} />

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-sm md:text-base font-medium tracking-[0.3em] uppercase text-muted-foreground mb-6"
        >
          {t.hero.role}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] mb-8"
        >
          {t.hero.titleLine1}
          <br />
          <span className="text-gradient">{t.hero.titleHighlight}</span> {t.hero.titleLine2}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="#projects"
            className="px-8 py-3.5 rounded-full bg-primary text-primary-foreground font-medium text-sm tracking-wide hover:opacity-90 transition-opacity glow-accent"
          >
            {t.hero.viewProjects}
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full border border-border text-foreground font-medium text-sm tracking-wide hover:bg-secondary transition-colors"
          >
            {t.hero.contactMe}
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-5 h-9 rounded-full border-2 border-muted-foreground/30 flex justify-center pt-2">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
