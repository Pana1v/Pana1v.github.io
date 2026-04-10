import { motion } from 'motion/react';
import { DataStructure } from '../data';
import { Github, ExternalLink, Code2 } from 'lucide-react';

export function Projects({ data }: { data: DataStructure }) {
  return (
    <section id="projects" className="bg-muted/30 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="mb-4 text-4xl font-black uppercase tracking-tighter sm:text-5xl">Featured Projects</h2>
          <div className="h-1 w-24 bg-primary"></div>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
          {data.projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group border-2 border-border bg-card transition-all hover:border-primary"
            >
              <div className="relative aspect-video overflow-hidden border-b-2 border-border">
                <img
                  src={project.image}
                  alt={project.title}
                  className="h-full w-full object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-8">
                <div className="mb-6 flex flex-wrap items-center gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="border border-primary/30 bg-primary/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                      {tag}
                    </span>
                  ))}
                  {project.status && (
                    <span className="ml-auto border-2 border-primary bg-primary px-2 py-0.5 text-[10px] font-black uppercase tracking-widest text-primary-foreground">
                      {project.status}
                    </span>
                  )}
                </div>
                <h3 className="mb-4 text-3xl font-black uppercase tracking-tighter">{project.title}</h3>
                <p className="mb-8 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>

                {project.interactiveHtml && (
                  <div className="mb-8 border-2 border-dashed border-primary/20 bg-muted/50 p-6">
                    <div className="mb-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-primary">
                      <Code2 className="h-3 w-3" />
                      <span>Interactive_Simulation_Module</span>
                    </div>
                    <div dangerouslySetInnerHTML={{ __html: project.interactiveHtml }} />
                  </div>
                )}

                <div className="flex items-center gap-6">
                  {project.github && (
                    <a
                      href={project.github}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4"
                    >
                      <Github className="h-4 w-4" />
                      Source_Code
                    </a>
                  )}
                  {project.demo && (
                    <a
                      href={project.demo}
                      className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Live_System
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
