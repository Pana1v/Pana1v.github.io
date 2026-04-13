import React from 'react';
import { motion } from 'motion/react';
import { DataStructure } from '../data';

function ExpEntry({ exp, i }: { exp: { period: string; role: string; company: string; description: string }; i: number }) {
  return (
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
  );
}

function EduEntry({ edu, i }: { edu: { period: string; degree: string; institution: string; description: string }; i: number }) {
  return (
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
  );
}

export function Experience({ data }: { data: DataStructure }) {
  const maxLen = Math.max(data.experience.length, data.education.length);

  return (
    <section id="experience" className="section-divider py-16">
      <div className="container mx-auto max-w-4xl px-4">
        {/* Desktop: paired grid */}
        <div className="hidden lg:grid grid-cols-2 gap-x-16">
          <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight">Experience</h2>
          <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight">Education</h2>

          {Array.from({ length: maxLen }).map((_, i) => {
            const exp = data.experience[i];
            const edu = data.education[i];
            return (
              <React.Fragment key={i}>
                <div className={`relative pl-5 pb-8 ${exp ? 'border-l border-border/60' : ''}`}>
                  {exp && <ExpEntry exp={exp} i={i} />}
                </div>
                <div className={`relative pl-5 pb-8 ${edu ? 'border-l border-border/60' : ''}`}>
                  {edu && <EduEntry edu={edu} i={i} />}
                </div>
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile: stacked columns */}
        <div className="lg:hidden space-y-12">
          <div>
            <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight">Experience</h2>
            {data.experience.map((exp, i) => (
              <div key={i} className="relative pl-5 pb-8 border-l border-border/60">
                <ExpEntry exp={exp} i={i} />
              </div>
            ))}
          </div>
          <div>
            <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight">Education</h2>
            {data.education.map((edu, i) => (
              <div key={i} className="relative pl-5 pb-8 border-l border-border/60">
                <EduEntry edu={edu} i={i} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
