import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function Reader({ article }) {
    if (!article) {
        return (
            <div className="reader-view">
                <h2 style={{ fontFamily: 'var(--font-serif)', textAlign: 'center', marginTop: '100px' }}>
                    Select an article from the archive to begin reading.
                </h2>
            </div>
        );
    }

    return (
        <div className="reader-view">
            <header className="article-header">
                <div className="category-tag" style={{ fontSize: '1rem', color: 'var(--accent-red)' }}>
                    {article.type}
                </div>
                <h1 className="main-headline">{article.title}</h1>
                <div className="byline">
                    By {article.author} | {article.date}
                </div>
            </header>

            <article className="markdown-body">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {article.content}
                </ReactMarkdown>
            </article>

            <div style={{ textAlign: 'center', marginTop: '60px', borderTop: '1px solid var(--ink-black)', paddingTop: '20px' }}>
                <p style={{ fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>*** End of Article ***</p>
            </div>
        </div>
    );
}
