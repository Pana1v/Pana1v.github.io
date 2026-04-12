import { motion } from 'motion/react';
import { DataStructure } from '../data';
import { Github, ExternalLink, Code2 } from 'lucide-react';

export function Projects({ data }: { data: DataStructure }) {
  return (
    <div>
      <h2 className="mb-10 font-serif text-2xl font-semibold tracking-tight">Selected Projects</h2>

      <div className="space-y-6">
        {data.projects.map((project, i) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04, duration: 0.4 }}
              className="group rounded-xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm shadow-sm shadow-black/[0.02] transition-all duration-300 hover:border-border hover:shadow-md hover:shadow-black/[0.04]"
            >
              <div className="flex flex-col gap-5 sm:flex-row">
                <div className="shrink-0 overflow-hidden rounded-lg sm:w-44">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover aspect-video sm:aspect-[4/3] transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="font-serif text-lg font-semibold tracking-tight">{project.title}</h3>
                    {project.status && (
                      <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                        {project.status}
                      </span>
                    )}
                  </div>

                  <p className="mb-3 text-[14px] leading-relaxed text-muted-foreground">
                    {project.description}
                  </p>

                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[12px] text-muted-foreground/60">
                        {tag}{project.tags.indexOf(tag) < project.tags.length - 1 ? ' ·' : ''}
                      </span>
                    ))}
                  </div>

                  {project.interactiveHtml && (
                    <div className="mb-3 rounded-lg border border-border/50 bg-muted/40 p-4">
                      <div className="mb-2 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                        <Code2 className="h-3 w-3" />
                        <span>Interactive Demo</span>
                      </div>
                      <div dangerouslySetInnerHTML={{ __html: project.interactiveHtml }} />
                    </div>
                  )}

                  <div className="flex items-center gap-4">
                    {project.github && (
                      <a
                        href={project.github}
                        className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        <Github className="h-3.5 w-3.5" />
                        Source
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        className="inline-flex items-center gap-1.5 text-[13px] text-muted-foreground hover:text-foreground transition-colors duration-200"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
  );
}
