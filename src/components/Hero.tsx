import { motion } from 'motion/react';
import { DataStructure } from '../data';
import { Mail, MapPin, Github, Linkedin } from 'lucide-react';

export function Hero({ data }: { data: DataStructure }) {
  return (
    <section className="relative border-b bg-card py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_350px]">
          {/* Left Side: Info */}
          <div className="flex flex-col justify-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-5xl font-black uppercase tracking-tighter sm:text-7xl lg:text-8xl"
            >
              {data.name}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-8 max-w-2xl text-xl font-medium leading-tight text-muted-foreground sm:text-2xl"
            >
              {data.bio}
            </motion.p>

            {/* Contact Grid */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-1 gap-4 border-t border-border pt-8 sm:grid-cols-2"
            >
              <div className="flex items-center gap-3 font-mono text-sm">
                <Mail className="h-4 w-4 text-primary" />
                <span>{data.contact.email}</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-sm">
                <MapPin className="h-4 w-4 text-primary" />
                <span>{data.contact.location}</span>
              </div>
              <div className="flex items-center gap-3 font-mono text-sm">
                <Github className="h-4 w-4 text-primary" />
                <a href={`https://${data.contact.github}`} className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4">
                  {data.contact.github}
                </a>
              </div>
              <div className="flex items-center gap-3 font-mono text-sm">
                <Linkedin className="h-4 w-4 text-primary" />
                <a href={`https://${data.contact.linkedin}`} className="hover:text-primary transition-colors underline decoration-primary/30 underline-offset-4">
                  {data.contact.linkedin}
                </a>
              </div>
            </motion.div>
          </div>

          {/* Right Side: Profile Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative"
          >
            <div className="aspect-square overflow-hidden border-4 border-primary bg-muted shadow-[8px_8px_0px_0px_rgba(var(--primary-rgb),0.2)]">
              <img
                src={data.profilePhoto}
                alt={data.name}
                className="h-full w-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Decorative Elements */}
            <div className="absolute -bottom-4 -left-4 h-12 w-12 border-b-4 border-l-4 border-primary"></div>
            <div className="absolute -right-4 -top-4 h-12 w-12 border-r-4 border-t-4 border-primary"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
