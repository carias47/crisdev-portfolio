import { useState } from "react";
import { motion } from "framer-motion";
import { Code2 } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

const DEVICON = "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

interface Tech {
  name: string; 
  categoryKey: "Frontend" | "Backend" | "Tools";
  icon: string;
}

const techs: Tech[] = [
  { name: "Angular", categoryKey: "Frontend", icon: `${DEVICON}/angular/angular-original.svg` },
  { name: "React", categoryKey: "Frontend", icon: `${DEVICON}/react/react-original.svg` },
  { name: "TypeScript", categoryKey: "Frontend", icon: `${DEVICON}/typescript/typescript-original.svg` },
  { name: "JavaScript", categoryKey: "Frontend", icon: `${DEVICON}/javascript/javascript-original.svg` },
  { name: "HTML/CSS", categoryKey: "Frontend", icon: `${DEVICON}/html5/html5-original.svg` },
  { name: "Tailwind", categoryKey: "Frontend", icon: `${DEVICON}/tailwindcss/tailwindcss-original.svg` },
  { name: ".NET", categoryKey: "Backend", icon: `${DEVICON}/dotnetcore/dotnetcore-original.svg` },
  { name: "C#", categoryKey: "Backend", icon: `${DEVICON}/csharp/csharp-original.svg` },
  { name: "SQLServer", categoryKey: "Backend", icon: `${DEVICON}/microsoftsqlserver/microsoftsqlserver-original.svg` },
  { name: "Nest.js", categoryKey: "Backend", icon: `${DEVICON}/nestjs/nestjs-original.svg` },
  { name: "REST", categoryKey: "Backend", icon: "" },
  { name: "Node.js", categoryKey: "Backend", icon: `${DEVICON}/nodejs/nodejs-original.svg` },
  { name: "Git", categoryKey: "Tools", icon: `${DEVICON}/git/git-original.svg` },
  { name: "Docker", categoryKey: "Tools", icon: `${DEVICON}/docker/docker-original.svg` },
  { name: "Azure", categoryKey: "Tools", icon: `${DEVICON}/azure/azure-original.svg` },
  { name: "Firebase", categoryKey: "Tools", icon: `${DEVICON}/firebase/firebase-original.svg` },
  { name: "Jira", categoryKey: "Tools", icon: `${DEVICON}/jira/jira-original.svg` },
  { name: "Supabase", categoryKey: "Tools", icon: `${DEVICON}/supabase/supabase-original.svg` },
];

const categoryKeys = ["Frontend", "Backend", "Tools"] as const;

function TechIcon({ src, name }: { src: string; name: string }) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return <Code2 className="w-9 h-9 text-primary/60" />;
  }

  return (
    <img
      src={src}
      alt={name}
      className="w-9 h-9 object-contain"
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

const Skills = () => {
  const { t } = useTranslation();

  return (
    <section id="stack" className="section-padding max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6 }}
        className="text-center mb-16"
      >
        <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4">{t.skills.label}</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold">
          {t.skills.titleLine1} <span className="text-gradient">{t.skills.titleHighlight}</span>
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {categoryKeys.map((catKey, catIdx) => (
          <motion.div
            key={catKey}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: catIdx * 0.15, duration: 0.6 }}
            className="glass-card rounded-2xl p-8"
          >
            <h3 className="font-heading text-lg font-semibold mb-6 text-foreground">
              {t.skills.categories[catKey]}
            </h3>
            <div className="grid grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {techs
                .filter((tech) => tech.categoryKey === catKey)
                .map((tech) => (
                  <motion.div
                    key={tech.name}
                    whileHover={{ scale: 1.08, y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex flex-col items-center gap-2.5 p-3.5 rounded-xl bg-secondary/50 text-secondary-foreground cursor-default border border-border hover:border-primary/40 hover:bg-secondary hover:glow-accent transition-colors"
                  >
                    <TechIcon src={tech.icon} name={tech.name} />
                    <span className="text-xs font-medium text-center leading-tight">{tech.name}</span>
                  </motion.div>
                ))}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
