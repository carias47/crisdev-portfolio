import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Github, ShoppingCart, ListTodo, BarChart3, FileCode2 } from "lucide-react";
import { useTranslation } from "@/i18n/LanguageContext";
import limpiafacil from "@/assets/limpiafacil.jpg";
import  mappx from "@/assets/mappx.jpg";
import spotlight from "@/assets/spotlight.jpg";
import Shop from "@/assets/shop.jpg";

interface ProjectData {
  techs: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  gradient: string;
  icon: React.ElementType;
}

const projectsData: ProjectData[] = [
  {
    techs: ["React", "Nest.js", "REST APIs", "Redis"],
    gradient: "from-cyan-500/20 via-blue-500/20 to-indigo-500/20",
    icon: ShoppingCart,
    image: spotlight
  },
  {
    techs: ["Angular", ".NET", "SQL Server", "Azure"],
    gradient: "from-violet-500/20 via-purple-500/20 to-fuchsia-500/20",
    icon: ListTodo,
    liveUrl: "https://limpiafy.co",
    image: limpiafacil,
  },
  {
    techs: ["React", "Nest.js", "REST APIs"],
    gradient: "from-blue-500/20 via-indigo-500/20 to-violet-500/20",
    icon: BarChart3,
    image: Shop,
  },
  {
    techs: ["Angular", "SQL Server", "REST APIs"],
    gradient: "from-emerald-500/20 via-teal-500/20 to-cyan-500/20",
    icon: FileCode2,
    liveUrl: "https://mappx.netlify.app/#/mapas/mapa",
    image: mappx,
  },
];

const allTechs = Array.from(new Set(projectsData.flatMap((p) => p.techs)));

function ProjectImage({ project }: { project: ProjectData & { title: string } }) {
  const Icon = project.icon;

  if (project.image) {
    return (
      <img
        src={project.image}
        alt={project.title}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
    );
  }

  return (
    <div className={`w-full h-full bg-linear-to-br ${project.gradient} flex items-center justify-center transition-transform duration-500 group-hover:scale-105`}>
      <div className="flex flex-col items-center gap-3 opacity-60">
        <Icon size={48} className="text-foreground/40" strokeWidth={1.2} />
        <div className="flex gap-1.5">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-2 h-2 rounded-full bg-foreground/20" />
          ))}
        </div>
      </div>
    </div>
  );
}

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
              className="group glass-card rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-300 hover:shadow-[0_0_40px_-10px_var(--glow)]"
            >
              <div className="relative aspect-video overflow-hidden">
                <ProjectImage project={project} />
                <div className="absolute inset-0 bg-linear-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-5 sm:p-6">
                <h3 className="font-heading text-lg sm:text-xl font-semibold mb-2 text-foreground group-hover:text-gradient transition-colors">
                  {project.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.techs.map((tech) => (
                    <span key={tech} className="px-2.5 py-0.5 rounded-full text-[11px] bg-secondary text-secondary-foreground border border-border">
                      {tech}
                    </span>
                  ))}
                </div>

                {(project.liveUrl || project.githubUrl) && (
                  <div className="flex gap-4 pt-2 border-t border-border">
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
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default Projects;
