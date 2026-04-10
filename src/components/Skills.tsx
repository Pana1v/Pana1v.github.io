import { motion } from 'motion/react';
import { DataStructure } from '../data';

export function Skills({ data }: { data: DataStructure }) {
  return (
    <section id="research" className="section-divider py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="mb-8 font-serif text-2xl font-semibold tracking-tight">Research Interests & Skills</h2>

        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, i) => (
            <motion.span
              key={skill}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.03, duration: 0.3 }}
              className="rounded-full border border-border/70 bg-card/80 px-3.5 py-1.5 text-[13px] text-muted-foreground shadow-sm shadow-black/[0.02] backdrop-blur-sm transition-all duration-200 hover:border-primary/40 hover:text-foreground hover:shadow-md hover:shadow-primary/[0.04] hover:-translate-y-px"
            >
              {skill}
            </motion.span>
          ))}
        </div>
      </div>
    </section>
  );
}
