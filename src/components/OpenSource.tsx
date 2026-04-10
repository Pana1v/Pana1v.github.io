import { motion } from 'motion/react';
import { DataStructure } from '../data';
import { ExternalLink } from 'lucide-react';

export function OpenSource({ data }: { data: DataStructure }) {
  return (
    <section id="opensource" className="section-divider py-16">
      <div className="container mx-auto max-w-4xl px-4">
        <h2 className="mb-10 font-serif text-2xl font-semibold tracking-tight">Open Source</h2>

        <div className="space-y-4">
          {data.openSource.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.35 }}
              className="flex items-start justify-between gap-4 rounded-xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm shadow-sm shadow-black/[0.02] transition-all duration-300 hover:border-primary/25 hover:shadow-md hover:shadow-primary/[0.03]"
            >
              <div>
                <h3 className="mb-1.5 font-serif text-lg font-semibold tracking-tight">
                  {item.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
              {item.link && (
                <a href={item.link} target="_blank" rel="noopener noreferrer" className="shrink-0 rounded-lg p-2 text-muted-foreground transition-all duration-200 hover:text-foreground hover:bg-muted/60">
                  <ExternalLink className="h-4 w-4" />
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
