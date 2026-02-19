import React from 'react';

export default function ArticleList({ articles, onSelect, currentId }) {
    return (
        <div className="article-list">
            <div className="sidebar-title">Archive</div>
            {articles.map((article) => (
                <div
                    key={article.id}
                    className={`list-item ${article.id === currentId ? 'active' : ''}`}
                    onClick={() => onSelect(article.id)}
                >
                    <span className="category-tag">{article.type}</span>
                    <h3 className="list-headline">{article.title}</h3>
                    <p className="list-summary">{article.summary}</p>
                    <div className="masthead-meta" style={{ borderTop: 'none', fontSize: '0.8rem' }}>
                        {article.date} | {article.author}
                    </div>
                </div>
            ))}
        </div>
    );
}
