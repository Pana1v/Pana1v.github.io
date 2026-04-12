import { motion } from 'motion/react';
import { DataStructure } from '../data';
import { Page } from '../App';
import { ImageIcon } from 'lucide-react';

function extractPreview(content: string, sentences: number = 5): string {
  const plain = content
    .replace(/#{1,6}\s+/g, '')
    .replace(/\$\$[^$]+\$\$/g, '')
    .replace(/\$[^$]+\$/g, '')
    .replace(/[*_`~\[\]()>!|-]/g, '')
    .replace(/\n+/g, ' ')
    .trim();

  const matches = plain.match(/[^.!?]+[.!?]+/g);
  if (!matches) return plain.slice(0, 300);
  return matches.slice(0, sentences).join(' ').trim();
}

export function BlogPreview({ data, onNavigate }: { data: DataStructure; onNavigate: (page: Page) => void }) {
  return (
    <div>
      <h2 className="mb-10 font-serif text-2xl font-semibold tracking-tight">Writing</h2>

      <div className="space-y-6">
        {data.blogs.map((blog, i) => (
          <motion.article
            key={blog.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04, duration: 0.4 }}
            onClick={() => onNavigate('writing')}
            className="group cursor-pointer rounded-xl border border-border/60 bg-card/60 p-5 backdrop-blur-sm shadow-sm shadow-black/[0.02] transition-all duration-300 hover:border-border hover:shadow-md hover:shadow-black/[0.04]"
          >
            {/* Adaptive image / placeholder */}
            <div className="mb-4 overflow-hidden rounded-lg">
              {blog.image ? (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full aspect-[2/1] object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex w-full aspect-[2/1] items-center justify-center bg-muted/60 text-muted-foreground/30">
                  <ImageIcon className="h-10 w-10" />
                </div>
              )}
            </div>

            <div className="flex items-baseline justify-between gap-3 mb-2">
              <h3 className="font-serif text-[16px] font-semibold tracking-tight group-hover:text-primary transition-colors">
                {blog.title}
              </h3>
              <span className="shrink-0 text-[12px] text-muted-foreground">
                {blog.date}
              </span>
            </div>

            <p className="text-[13px] leading-[1.7] text-muted-foreground line-clamp-5">
              {extractPreview(blog.content)}
            </p>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {blog.tags.map(tag => (
                <span key={tag} className="rounded-full bg-muted/60 px-2 py-0.5 text-[11px] text-muted-foreground/70">
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
