import devPortrait from "@/assets/developer-portrait.jpg";
import { motion } from "framer-motion";
import { useTranslation } from "@/i18n/LanguageContext";

const About = () => {
  const { t } = useTranslation();

  return (
    <section id="about" className="section-padding max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-16 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <div className="relative w-fit mx-auto md:mx-0">
            <div className="w-55 h-70 md:w-85 md:h-115 rounded-2xl overflow-hidden glow-accent">
              <img src={devPortrait} alt="Developer portrait" className="w-full h-full object-cover" />
            </div>
           
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4">{t.about.label}</p>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            {t.about.titleLine1}
            <br />
            <span className="text-gradient">{t.about.titleHighlight}</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed mb-6">
            {t.about.paragraph1}
          </p>
         

          <div className="flex flex-wrap gap-2">
            {t.about.skills.map((skill, i) => (
              <motion.span
                key={skill}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="px-4 py-1.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border"
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
