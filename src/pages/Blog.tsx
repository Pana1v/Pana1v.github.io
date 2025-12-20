import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Clock } from 'lucide-react';
import { ElegantCard } from '../components/GlassCard';
import { useEditMode } from '../context/EditContext';

interface Article {
    guid: string;
    title: string;
    pubDate: string;
    link: string;
    description: string;
}

const Blog = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { content } = useEditMode();

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('https://api.rss2json.com/v1/api.json', {
                    params: {
                        rss_url: `https://medium.com/feed/@${content.personal.mediumUrl.split('@')[1] || 'praajarpit'}`,
                    },
                });
                setArticles(response.data.items || []);
                setError(null);
            } catch (err) {
                console.error('Error fetching articles:', err);
                setError('Unable to load articles.');
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, [content.personal.mediumUrl]);

    const stripHtml = (html: string) => {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return tmp.textContent || tmp.innerText || '';
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getReadTime = (content: string) => {
        const words = stripHtml(content).split(/\s+/).length;
        return Math.ceil(words / 200);
    };

    return (
        <div className="min-h-screen pt-24 pb-12 bg-parchment-100">
            <div className="max-w-3xl mx-auto px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-3xl font-serif text-ink-700 mb-4">Journal</h1>
                    <p className="text-ink-700/70 mb-6">
                        Thoughts on robotics, technology, and engineering
                    </p>
                    <a
                        href={content.personal.mediumUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary inline-flex items-center gap-2"
                    >
                        <ExternalLink className="w-4 h-4" />
                        Visit Medium
                    </a>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className="space-y-6">
                        {[1, 2, 3].map((i) => (
                            <ElegantCard key={i} hover={false}>
                                <div className="p-6 animate-pulse">
                                    <div className="h-6 bg-parchment-200 rounded w-3/4 mb-4" />
                                    <div className="h-4 bg-parchment-200 rounded w-1/4 mb-4" />
                                    <div className="space-y-2">
                                        <div className="h-4 bg-parchment-200 rounded w-full" />
                                        <div className="h-4 bg-parchment-200 rounded w-5/6" />
                                    </div>
                                </div>
                            </ElegantCard>
                        ))}
                    </div>
                )}

                {/* Error State */}
                {error && !loading && (
                    <ElegantCard hover={false}>
                        <div className="p-8 text-center">
                            <p className="text-ink-700/70 mb-4">{error}</p>
                            <a
                                href={content.personal.mediumUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-primary inline-flex items-center gap-2"
                            >
                                <ExternalLink className="w-4 h-4" />
                                Go to Medium
                            </a>
                        </div>
                    </ElegantCard>
                )}

                {/* Articles */}
                {!loading && !error && articles.length > 0 && (
                    <div className="space-y-6">
                        {articles.map((article, index) => (
                            <motion.div
                                key={article.guid}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                            >
                                <ElegantCard>
                                    <article className="p-6">
                                        <a
                                            href={article.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group"
                                        >
                                            <h2 className="text-xl font-serif text-ink-700 group-hover:text-gold-400 transition-colors mb-3">
                                                {article.title}
                                            </h2>
                                        </a>

                                        <div className="flex items-center gap-4 text-sm text-ink-700/50 mb-4">
                                            <span className="flex items-center gap-1">
                                                <Calendar className="w-4 h-4" />
                                                {formatDate(article.pubDate)}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-4 h-4" />
                                                {getReadTime(article.description)} min read
                                            </span>
                                        </div>

                                        <p className="text-ink-700/70 line-clamp-3 mb-4">
                                            {stripHtml(article.description).slice(0, 250)}...
                                        </p>

                                        <a
                                            href={article.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-gold-400 hover:text-gold-500 transition-colors text-sm uppercase tracking-wider"
                                        >
                                            Read more
                                            <ExternalLink className="w-3 h-3" />
                                        </a>
                                    </article>
                                </ElegantCard>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {!loading && !error && articles.length === 0 && (
                    <ElegantCard hover={false}>
                        <div className="p-8 text-center">
                            <p className="text-ink-700/70">No articles found. Check back soon!</p>
                        </div>
                    </ElegantCard>
                )}
            </div>
        </div>
    );
};

export default Blog;
