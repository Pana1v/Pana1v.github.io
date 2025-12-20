import React from 'react';
import { motion } from 'framer-motion';

interface ElegantCardProps {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
    delay?: number;
}

export const ElegantCard: React.FC<ElegantCardProps> = ({
    children,
    className = '',
    hover = true,
    delay = 0
}) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay }}
            whileHover={hover ? { y: -3 } : undefined}
            className={`
        bg-white rounded border border-stone-200
        shadow-soft transition-all duration-300
        ${hover ? 'hover:shadow-elevated hover:border-gold-400/30' : ''}
        ${className}
      `}
        >
            {children}
        </motion.div>
    );
};

export default ElegantCard;
