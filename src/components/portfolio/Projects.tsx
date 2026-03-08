import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";

interface ProjectData {
  techs: string[];
  liveUrl?: string;
  githubUrl?: string;
}

const projectsData: ProjectData[] = [
  { techs: ["Angular", ".NET", "SQL Server"] },
  { techs: ["React", "Node.js", "TypeScript"] },
  { techs: ["Angular", "C#", "REST APIs"] },
  { techs: ["React", ".NET", "Azure"] },
];

const allTechs = Array.from(new Set(projectsData.flatMap((p) => p.techs)));

const Projects = () => {
  const [filter, setFilter] = useState<string | null>(null);
  const { t } = useTranslation();

  const projects = projectsData.map((data, i) => ({
    ...data,
    title: t.projects.items[i].title,
    description: t.projects.items[i].description,
  }));

  const filtered = filter ? projects.filter((p) => p.techs.includes(filter)) : projects;

  return (
    <section id="projects" className="section-padding max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        className="text-center mb-12"
      >
        <p className="text-sm font-medium tracking-[0.2em] uppercase text-primary mb-4">{t.projects.label}</p>
        <h2 className="font-heading text-3xl md:text-5xl font-bold">
          {t.projects.titleLine1} <span className="text-gradient">{t.projects.titleHighlight}</span>
        </h2>
      </motion.div>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        <button
          onClick={() => setFilter(null)}
          className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
            !filter ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
          }`}
        >
          {t.projects.filterAll}
        </button>
        {allTechs.map((tech) => (
          <button
            key={tech}
            onClick={() => setFilter(tech)}
            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filter === tech ? "bg-primary text-primary-foreground" : "bg-secondary text-secondary-foreground hover:bg-muted"
            }`}
          >
            {tech}
          </button>
        ))}
      </div>

      {/* Grid */}
      <motion.div layout className="grid md:grid-cols-2 gap-6">
        <AnimatePresence mode="popLayout">
          {filtered.map((project) => (
            <motion.div
              key={project.title}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="group glass-card rounded-2xl p-8 hover:border-primary/30 transition-colors"
            >
              <h3 className="font-heading text-xl font-semibold mb-3 text-foreground group-hover:text-gradient transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{project.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.techs.map((tech) => (
                  <span key={tech} className="px-3 py-1 rounded-full text-xs bg-secondary text-secondary-foreground border border-border">
                    {tech}
                  </span>
                ))}
              </div>
              {(project.liveUrl || project.githubUrl) && (
                <div className="flex gap-4">
                  {project.liveUrl && (
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-primary hover:opacity-80 transition-opacity">
                      <ExternalLink size={14} /> {t.projects.liveDemo}
                    </a>
                  )}
                  {project.githubUrl && (
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors">
                      <Github size={14} /> {t.projects.source}
                    </a>
                  )}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Projects;
