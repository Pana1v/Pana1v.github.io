import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { DataStructure, Blog as BlogType } from '../data';
import { Calendar, Tag, ArrowLeft, ChevronRight } from 'lucide-react';

export function Blog({ data }: { data: DataStructure }) {
  const [selectedBlog, setSelectedBlog] = useState<BlogType | null>(null);

  return (
    <section id="blog" className="py-20">
      <div className="container mx-auto px-4">
        <AnimatePresence mode="wait">
          {!selectedBlog ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-16">
                <h2 className="mb-4 text-4xl font-black uppercase tracking-tighter sm:text-5xl">Latest Insights</h2>
                <div className="h-1 w-24 bg-primary"></div>
              </div>

              <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                {data.blogs.map((blog, i) => (
                  <motion.div
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => setSelectedBlog(blog)}
                    className="group cursor-pointer border-2 border-border bg-card transition-all hover:border-primary overflow-hidden"
                  >
                    {blog.image && (
                      <div className="aspect-video w-full overflow-hidden border-b-2 border-border group-hover:border-primary transition-colors">
                        <img 
                          src={blog.image} 
                          alt={blog.title} 
                          className="h-full w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    )}
                    <div className="p-8">
                      <div className="mb-6 flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {blog.date}
                        </div>
                      </div>
                      <h3 className="mb-4 text-2xl font-black uppercase tracking-tighter group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>
                      <p className="mb-8 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                        {blog.excerpt}
                      </p>
                      <div className="flex items-center justify-between border-t border-border pt-6">
                        <div className="flex gap-2">
                          {blog.tags.slice(0, 2).map(tag => (
                            <span key={tag} className="border border-primary/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">
                              {tag}
                            </span>
                          ))}
                        </div>
                        <ChevronRight className="h-4 w-4 text-primary transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="mx-auto max-w-4xl"
            >
              <button
                onClick={() => setSelectedBlog(null)}
                className="mb-12 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                Return_to_Index
              </button>

              <header className="mb-16 border-b-4 border-primary pb-8">
                <div className="mb-6 flex items-center gap-6 text-[10px] font-bold uppercase tracking-widest text-primary">
                  <span className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    {selectedBlog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    {selectedBlog.tags.join(', ')}
                  </span>
                </div>
                <h1 className="text-5xl font-black uppercase tracking-tighter sm:text-7xl">
                  {selectedBlog.title}
                </h1>
              </header>

              {selectedBlog.image && (
                <div className="mb-16 border-4 border-primary bg-muted shadow-[16px_16px_0px_0px_rgba(var(--primary-rgb),0.2)]">
                  <img 
                    src={selectedBlog.image} 
                    alt={selectedBlog.title} 
                    className="w-full grayscale hover:grayscale-0 transition-all duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div className="prose prose-lg dark:prose-invert max-w-none">
                <Markdown
                  remarkPlugins={[remarkMath]}
                  rehypePlugins={[rehypeKatex, rehypeRaw]}
                  components={{
                    code({ node, inline, className, children, ...props }: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    },
                    // Custom rendering for LaTeX blocks if needed
                    p: ({ children }) => <p className="mb-6 leading-relaxed">{children}</p>,
                    h2: ({ children }) => <h2 className="mt-12 mb-6 text-3xl font-bold">{children}</h2>,
                    h3: ({ children }) => <h3 className="mt-8 mb-4 text-2xl font-bold">{children}</h3>,
                  }}
                >
                  {selectedBlog.content}
                </Markdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
