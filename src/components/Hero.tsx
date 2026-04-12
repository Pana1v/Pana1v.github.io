import { motion } from 'motion/react';
import { DataStructure } from '../data';
import { Mail, Github, Linkedin, MapPin } from 'lucide-react';

export function Hero({ data }: { data: DataStructure }) {
  return (
    <section className="section-divider py-20 lg:py-28">
      <div className="container mx-auto max-w-4xl px-4">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:gap-16">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="shrink-0"
          >
            <div className="relative">
              <div className="photo-vignette" />
              <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-primary/20 via-transparent to-accent/20 blur-sm" />
              <img
                src={data.profilePhoto}
                alt={data.name}
                className="relative h-36 w-36 rounded-full object-cover ring-1 ring-border/80 shadow-lg shadow-black/5"
                referrerPolicy="no-referrer"
              />
            </div>
          </motion.div>

          {/* Info */}
          <div className="flex-1">
            <motion.h1
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="mb-2.5 font-serif text-3xl font-semibold tracking-tight sm:text-4xl"
            >
              {data.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.06, duration: 0.4 }}
              className="mb-1.5 text-[15px] text-primary font-medium"
            >
              {data.title}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12, duration: 0.4 }}
              className="mb-7 max-w-xl text-[15px] leading-[1.75] text-muted-foreground"
            >
              {data.bio}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-[13px] text-muted-foreground"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5" />
                {data.contact.location}
              </span>
              <a href={`mailto:${data.contact.email}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-200">
                <Mail className="h-3.5 w-3.5" />
                {data.contact.email}
              </a>
              <a href={`https://${data.contact.github}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-200">
                <Github className="h-3.5 w-3.5" />
                GitHub
              </a>
              <a href={`https://${data.contact.linkedin}`} className="flex items-center gap-1.5 hover:text-foreground transition-colors duration-200">
                <Linkedin className="h-3.5 w-3.5" />
                LinkedIn
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
