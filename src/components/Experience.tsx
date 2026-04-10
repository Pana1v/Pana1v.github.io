import { motion } from 'motion/react';
import { DataStructure } from '../data';

export function Experience({ data }: { data: DataStructure }) {
  return (
    <section id="experience" className="section-divider py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Experience */}
          <div>
            <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight">Experience</h2>
            <div className="relative space-y-8 pl-5 before:absolute before:left-0 before:top-1 before:h-[calc(100%-8px)] before:w-px before:bg-gradient-to-b before:from-primary/30 before:via-border before:to-transparent">
              {data.experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className="relative"
                >
                  <div className="absolute -left-5 top-1.5 h-2 w-2 rounded-full border-2 border-primary/50 bg-background" />
                  <p className="mb-1 text-[12px] font-medium uppercase tracking-wider text-muted-foreground/70">{exp.period}</p>
                  <h3 className="font-serif text-lg font-semibold tracking-tight">{exp.role}</h3>
                  <p className="mb-2 text-[14px] font-medium text-primary/80">{exp.company}</p>
                  <p className="text-[14px] leading-[1.7] text-muted-foreground">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight">Education</h2>
            <div className="relative space-y-8 pl-5 before:absolute before:left-0 before:top-1 before:h-[calc(100%-8px)] before:w-px before:bg-gradient-to-b before:from-accent/30 before:via-border before:to-transparent">
              {data.education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.35 }}
                  className="relative"
                >
                  <div className="absolute -left-5 top-1.5 h-2 w-2 rounded-full border-2 border-accent/50 bg-background" />
                  <p className="mb-1 text-[12px] font-medium uppercase tracking-wider text-muted-foreground/70">{edu.period}</p>
                  <h3 className="font-serif text-lg font-semibold tracking-tight">{edu.degree}</h3>
                  <p className="mb-2 text-[14px] font-medium text-primary/80">{edu.institution}</p>
                  <p className="text-[14px] leading-[1.7] text-muted-foreground">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
