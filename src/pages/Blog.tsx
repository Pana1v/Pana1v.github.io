// filepath: /c:/Users/praaj/Documents/GitHub/Pana1v.github.io/src/pages/Blog.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './index.css';

const Blog = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get('https://api.rss2json.com/v1/api.json', {
                    params: {
                        rss_url: 'https://medium.com/feed/@praajarpit',
                    },
                });
                setArticles(response.data.items);
            } catch (error) {
                console.error('Error fetching Medium articles:', error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div className="blog-container">
            <h1>Blog</h1>
            <a href="https://medium.com/@praajarpit" target="_blank" rel="noopener noreferrer" className="medium-link-button">
                Visit my Medium
            </a>
            {articles.length > 0 ? (
                articles.map((article) => (
                    <React.Fragment key={article.guid}>
                        <Article article={article} />
                        <hr className="article-divider" />
                    </React.Fragment>
                ))
            ) : (
                <p>Loading articles...</p>
            )}
        </div>
    );
};

const Article = ({ article }) => (
    <div className="medium-article">
        <h2>{article.title}</h2>
        <p className="article-date">{new Date(article.pubDate).toLocaleDateString()}</p>
        <div className="article-content" dangerouslySetInnerHTML={{ __html: article.description }} />
        <a href={article.link} target="_blank" rel="noopener noreferrer" className="read-more-link">
            Read more
        </a>
    </div>
);

export default Blog;
