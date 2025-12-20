import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    opacity: number;
}

export const AnimatedBackground: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const particlesRef = useRef<Particle[]>([]);
    const animationRef = useRef<number>();

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Initialize particles
        const particleCount = 50;
        particlesRef.current = Array.from({ length: particleCount }, () => ({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.2
        }));

        const animate = () => {
            if (!canvas || !ctx) return;

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw grid
            ctx.strokeStyle = 'rgba(0, 245, 255, 0.03)';
            ctx.lineWidth = 1;
            const gridSize = 50;

            for (let x = 0; x < canvas.width; x += gridSize) {
                ctx.beginPath();
                ctx.moveTo(x, 0);
                ctx.lineTo(x, canvas.height);
                ctx.stroke();
            }
            for (let y = 0; y < canvas.height; y += gridSize) {
                ctx.beginPath();
                ctx.moveTo(0, y);
                ctx.lineTo(canvas.width, y);
                ctx.stroke();
            }

            // Update and draw particles
            particlesRef.current.forEach((particle, i) => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around screen
                if (particle.x < 0) particle.x = canvas.width;
                if (particle.x > canvas.width) particle.x = 0;
                if (particle.y < 0) particle.y = canvas.height;
                if (particle.y > canvas.height) particle.y = 0;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(0, 245, 255, ${particle.opacity})`;
                ctx.fill();

                // Draw connections
                particlesRef.current.slice(i + 1).forEach(other => {
                    const dx = particle.x - other.x;
                    const dy = particle.y - other.y;
                    const dist = Math.sqrt(dx * dx + dy * dy);

                    if (dist < 150) {
                        ctx.beginPath();
                        ctx.moveTo(particle.x, particle.y);
                        ctx.lineTo(other.x, other.y);
                        ctx.strokeStyle = `rgba(0, 245, 255, ${0.1 * (1 - dist / 150)})`;
                        ctx.stroke();
                    }
                });
            });

            animationRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current);
            }
        };
    }, []);

    return (
        <>
            <canvas
                ref={canvasRef}
                className="fixed inset-0 pointer-events-none z-0"
                style={{ background: 'linear-gradient(135deg, #0a0a0f 0%, #0f0a1a 50%, #0a0f14 100%)' }}
            />
            {/* Scanline overlay */}
            <div
                className="fixed inset-0 pointer-events-none z-10 opacity-[0.02]"
                style={{
                    background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)'
                }}
            />
            {/* Gradient orbs */}
            <motion.div
                animate={{
                    x: [0, 100, 0],
                    y: [0, -50, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="fixed top-1/4 left-1/4 w-96 h-96 rounded-full opacity-20 blur-[100px] pointer-events-none z-0"
                style={{ background: 'radial-gradient(circle, rgba(0,245,255,0.4) 0%, transparent 70%)' }}
            />
            <motion.div
                animate={{
                    x: [0, -80, 0],
                    y: [0, 80, 0],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="fixed bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-[80px] pointer-events-none z-0"
                style={{ background: 'radial-gradient(circle, rgba(255,0,170,0.4) 0%, transparent 70%)' }}
            />
        </>
    );
};

export default AnimatedBackground;
