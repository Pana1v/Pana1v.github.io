import React from 'react';
import { motion } from 'motion/react';
import { DataStructure } from '../data';

export function Experience({ data }: { data: DataStructure }) {
  const maxLen = Math.max(data.experience.length, data.education.length);

  return (
    <section id="experience" className="section-divider py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16">
          {/* Headings */}
          <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight">Experience</h2>
          <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight max-lg:hidden">Education</h2>

          {/* Paired entries */}
          {Array.from({ length: maxLen }).map((_, i) => {
            const exp = data.experience[i];
            const edu = data.education[i];
            return (
              <React.Fragment key={i}>
                {/* Experience entry */}
                <div className={`relative pl-5 pb-8 ${exp ? 'border-l border-border/60' : ''}`}>
                  {exp && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                    >
                      <div className="absolute left-0 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full border-2 border-primary/50 bg-background" />
                      <p className="mb-1 text-[12px] font-medium uppercase tracking-wider text-muted-foreground/70">{exp.period}</p>
                      <h3 className="font-serif text-lg font-semibold tracking-tight">{exp.role}</h3>
                      <p className="mb-2 text-[14px] font-medium text-primary/80">{exp.company}</p>
                      <p className="text-[14px] leading-[1.7] text-muted-foreground">{exp.description}</p>
                    </motion.div>
                  )}
                </div>

                {/* Education entry — show heading on mobile before first entry */}
                <div className={`relative pl-5 pb-8 ${edu ? 'border-l border-border/60' : ''}`}>
                  {i === 0 && (
                    <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight lg:hidden">Education</h2>
                  )}
                  {edu && (
                    <motion.div
                      initial={{ opacity: 0, x: -8 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06, duration: 0.35 }}
                    >
                      <div className="absolute left-0 top-1.5 h-2 w-2 -translate-x-1/2 rounded-full border-2 border-accent/50 bg-background" />
                      <p className="mb-1 text-[12px] font-medium uppercase tracking-wider text-muted-foreground/70">{edu.period}</p>
                      <h3 className="font-serif text-lg font-semibold tracking-tight">{edu.degree}</h3>
                      <p className="mb-2 text-[14px] font-medium text-primary/80">{edu.institution}</p>
                      <p className="text-[14px] leading-[1.7] text-muted-foreground">{edu.description}</p>
                    </motion.div>
                  )}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
