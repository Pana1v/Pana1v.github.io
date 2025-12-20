import React, { useState, useRef, useEffect } from 'react';
import { useEditMode } from '../context/EditContext';
import { motion, AnimatePresence } from 'framer-motion';

interface EditableTextProps {
    path: string;
    as?: keyof JSX.IntrinsicElements;
    className?: string;
    multiline?: boolean;
    children?: React.ReactNode;
}

export const EditableText: React.FC<EditableTextProps> = ({
    path,
    as: Component = 'span',
    className = '',
    multiline = false,
    children
}) => {
    const { isEditMode, content, updateField } = useEditMode();
    const [isEditing, setIsEditing] = useState(false);
    const [editValue, setEditValue] = useState('');
    const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

    // Get nested value from content using path
    const getValue = (): string => {
        const keys = path.split('.');
        let value: any = content;
        for (const key of keys) {
            if (value && typeof value === 'object') {
                value = value[key];
            } else {
                return '';
            }
        }
        return typeof value === 'string' ? value : String(value ?? '');
    };

    const currentValue = getValue();

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isEditing]);

    const handleClick = () => {
        if (isEditMode && !isEditing) {
            setEditValue(currentValue);
            setIsEditing(true);
        }
    };

    const handleSave = () => {
        updateField(path, editValue);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !multiline) {
            handleSave();
        }
        if (e.key === 'Escape') {
            setIsEditing(false);
        }
    };

    const handleBlur = () => {
        handleSave();
    };

    // Render the display element
    const displayElement = React.createElement(
        Component,
        {
            className: `${className} ${isEditMode ? 'cursor-pointer relative group' : ''}`,
            onClick: handleClick
        },
        <>
            {children || currentValue}
            {isEditMode && !isEditing && (
                <span className="absolute -inset-1 border-2 border-dashed border-gold-400/50 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            )}
        </>
    );

    if (!isEditMode) {
        return displayElement;
    }

    return (
        <AnimatePresence mode="wait">
            {isEditing ? (
                <motion.div
                    initial={{ scale: 0.98, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.98, opacity: 0 }}
                    className="relative inline-block w-full"
                >
                    {multiline ? (
                        <textarea
                            ref={inputRef as React.RefObject<HTMLTextAreaElement>}
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            className={`${className} w-full bg-white border-2 border-gold-400 rounded px-2 py-1 text-ink-700 focus:outline-none focus:ring-2 focus:ring-gold-400/30 resize-y min-h-[100px]`}
                            style={{ font: 'inherit' }}
                        />
                    ) : (
                        <input
                            ref={inputRef as React.RefObject<HTMLInputElement>}
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            onBlur={handleBlur}
                            onKeyDown={handleKeyDown}
                            className={`${className} w-full bg-white border-2 border-gold-400 rounded px-2 py-1 text-ink-700 focus:outline-none focus:ring-2 focus:ring-gold-400/30`}
                            style={{ font: 'inherit' }}
                        />
                    )}
                    <div className="absolute -top-6 left-0 text-xs text-gold-500 bg-white px-2 py-0.5 rounded border border-gold-400/30">
                        Press Enter to save, Esc to cancel
                    </div>
                </motion.div>
            ) : (
                displayElement
            )}
        </AnimatePresence>
    );
};

export default EditableText;
