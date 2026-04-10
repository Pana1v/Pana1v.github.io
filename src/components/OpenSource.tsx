import { motion } from 'motion/react';
import { DataStructure } from '../data';
import { Github, ExternalLink } from 'lucide-react';

export function OpenSource({ data }: { data: DataStructure }) {
  return (
    <section id="opensource" className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="mb-4 text-4xl font-black uppercase tracking-tighter sm:text-5xl">Open_Source_Contributions</h2>
          <div className="h-1 w-24 bg-primary"></div>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.openSource.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group border-2 border-border bg-card p-8 transition-all hover:border-primary"
            >
              <div className="mb-6 flex items-center justify-between">
                <Github className="h-8 w-8 text-primary" />
                {item.link && (
                  <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                    <ExternalLink className="h-5 w-5" />
                  </a>
                )}
              </div>
              <h3 className="mb-4 text-2xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted-foreground">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
