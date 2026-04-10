import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { DataStructure, Blog as BlogType } from '../data';
import { Calendar, ArrowLeft } from 'lucide-react';

export function Blog({ data }: { data: DataStructure }) {
  const [selectedBlog, setSelectedBlog] = useState<BlogType | null>(null);

  return (
    <div className="min-h-[80vh] py-20">
      <div className="container mx-auto max-w-4xl px-4">
        <AnimatePresence mode="wait">
          {!selectedBlog ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-12">
                <h1 className="mb-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">Writing</h1>
                <p className="text-[15px] text-muted-foreground">Notes on robotics, algorithms, and things I'm learning.</p>
              </div>

              <div className="space-y-1">
                {data.blogs.map((blog, i) => (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                    onClick={() => setSelectedBlog(blog)}
                    className="group -mx-4 cursor-pointer rounded-xl px-4 py-4 transition-all duration-200 hover:bg-muted/50"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-serif text-lg font-medium tracking-tight group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>
                      <span className="shrink-0 text-[13px] text-muted-foreground">
                        {blog.date}
                      </span>
                    </div>
                    <p className="mt-1 text-[14px] text-muted-foreground line-clamp-1">
                      {blog.excerpt}
                    </p>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mx-auto max-w-3xl"
            >
              <button
                onClick={() => setSelectedBlog(null)}
                className="mb-10 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
                All posts
              </button>

              <header className="mb-12">
                <div className="mb-4 flex items-center gap-4 text-[13px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5" />
                    {selectedBlog.date}
                  </span>
                  <span className="text-border">|</span>
                  <span>{selectedBlog.tags.join(', ')}</span>
                </div>
                <h1 className="font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                  {selectedBlog.title}
                </h1>
              </header>

              {selectedBlog.image && (
                <div className="mb-12 overflow-hidden rounded-lg">
                  <img
                    src={selectedBlog.image}
                    alt={selectedBlog.title}
                    className="w-full"
                    referrerPolicy="no-referrer"
                  />
                </div>
              )}

              <div className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-serif prose-headings:tracking-tight prose-p:leading-[1.8] prose-p:text-[15px]">
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
                          className="!rounded-lg !text-[13px]"
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
                    p: ({ children }) => <p className="mb-6 leading-[1.8]">{children}</p>,
                    h2: ({ children }) => <h2 className="mt-12 mb-4 text-2xl font-semibold">{children}</h2>,
                    h3: ({ children }) => <h3 className="mt-8 mb-3 text-xl font-semibold">{children}</h3>,
                  }}
                >
                  {selectedBlog.content}
                </Markdown>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
