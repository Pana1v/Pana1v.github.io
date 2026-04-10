import { motion } from 'motion/react';
import { DataStructure } from '../data';
import { Briefcase, GraduationCap } from 'lucide-react';

export function Experience({ data }: { data: DataStructure }) {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="mb-4 text-4xl font-black uppercase tracking-tighter sm:text-5xl">Experience & Education</h2>
          <div className="h-1 w-24 bg-primary"></div>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          {/* Experience */}
          <div>
            <div className="mb-8 flex items-center gap-3 border-b border-primary/20 pb-2">
              <Briefcase className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-black uppercase tracking-tight">Professional</h3>
            </div>
            <div className="space-y-12">
              {data.experience.map((exp, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative border-l-2 border-primary/20 pl-8 pb-2"
                >
                  <div className="absolute -left-[9px] top-0 h-4 w-4 border-2 border-primary bg-background"></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">{exp.period}</span>
                  <h4 className="text-2xl font-black uppercase tracking-tighter">{exp.role}</h4>
                  <p className="mb-4 font-mono text-sm text-muted-foreground">{exp.company}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{exp.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div className="mb-8 flex items-center gap-3 border-b border-primary/20 pb-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-black uppercase tracking-tight">Education</h3>
            </div>
            <div className="space-y-12">
              {data.education.map((edu, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="relative border-l-2 border-primary/20 pl-8 pb-2"
                >
                  <div className="absolute -left-[9px] top-0 h-4 w-4 border-2 border-primary bg-background"></div>
                  <span className="text-xs font-bold uppercase tracking-widest text-primary">{edu.period}</span>
                  <h4 className="text-2xl font-black uppercase tracking-tighter">{edu.degree}</h4>
                  <p className="mb-4 font-mono text-sm text-muted-foreground">{edu.institution}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{edu.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
