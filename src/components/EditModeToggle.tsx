import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Pencil, Check, Download, RotateCcw, X } from 'lucide-react';
import { useEditMode } from '../context/EditContext';

export const EditModeToggle: React.FC = () => {
    const { isEditMode, toggleEditMode, exportContent, hasChanges, resetChanges } = useEditMode();
    const [showMenu, setShowMenu] = React.useState(false);

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
            <AnimatePresence>
                {isEditMode && showMenu && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                        className="flex flex-col gap-2"
                    >
                        <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => {
                                exportContent();
                                setShowMenu(false);
                            }}
                            className="flex items-center gap-2 px-4 py-2 bg-gold-400 text-white rounded shadow-lg text-sm font-medium"
                        >
                            <Download className="w-4 h-4" />
                            Export Changes
                        </motion.button>

                        {hasChanges && (
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => {
                                    if (confirm('Reset all changes? This cannot be undone.')) {
                                        resetChanges();
                                        setShowMenu(false);
                                    }
                                }}
                                className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded shadow-lg text-sm font-medium"
                            >
                                <RotateCcw className="w-4 h-4" />
                                Reset Changes
                            </motion.button>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <div className="flex gap-2">
                {isEditMode && (
                    <motion.button
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowMenu(!showMenu)}
                        className="w-10 h-10 rounded-full bg-bronze-400 text-white flex items-center justify-center shadow-lg"
                    >
                        {showMenu ? <X className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                    </motion.button>
                )}

                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleEditMode}
                    className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${isEditMode
                            ? 'bg-green-600'
                            : 'bg-gold-400'
                        } text-white`}
                >
                    <AnimatePresence mode="wait">
                        {isEditMode ? (
                            <motion.div
                                key="check"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <Check className="w-5 h-5" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="edit"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                            >
                                <Pencil className="w-5 h-5" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            {isEditMode && (
                <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs text-gold-500 bg-white px-3 py-1.5 rounded shadow-soft border border-gold-400/20"
                >
                    Click any text to edit
                </motion.div>
            )}
        </div>
    );
};

export default EditModeToggle;
