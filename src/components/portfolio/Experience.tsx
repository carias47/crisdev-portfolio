import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";

const Experience = () => {
  const { t } = useTranslation();

  return (
    <section id="experience" className="section-padding max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-16"
      >
        <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4">{t.experience.label}</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold">
          {t.experience.titleLine1} <span className="text-gradient">{t.experience.titleHighlight}</span>
        </h2>
      </motion.div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

        {t.experience.items.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.12, duration: 0.6 }}
            className={`relative flex flex-col md:flex-row items-start mb-12 last:mb-0 ${
              i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
            }`}
          >
            {/* Dot */}
            <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary -translate-x-1.5 md:-translate-x-1.5 mt-2 glow-accent z-10" />

            {/* Content */}
            <div className={`ml-12 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
              <span className="text-xs font-medium text-primary tracking-wider">{exp.year}</span>
              <h3 className="font-heading text-lg font-semibold text-foreground mt-1">{exp.role}</h3>
              <p className="text-sm font-medium text-muted-foreground mb-2">{exp.company}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Experience;
