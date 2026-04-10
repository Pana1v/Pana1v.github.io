import { motion } from 'motion/react';
import { DataStructure } from '../data';

export function Skills({ data }: { data: DataStructure }) {
  return (
    <section id="skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="mb-4 text-4xl font-black uppercase tracking-tighter sm:text-5xl">Technical_Stack</h2>
          <div className="h-1 w-24 bg-primary"></div>
        </div>

        <div className="flex flex-wrap gap-4">
          {data.skills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="border-2 border-border bg-card px-6 py-3 font-mono text-sm font-bold uppercase tracking-widest transition-all hover:border-primary hover:text-primary"
            >
              {skill}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
