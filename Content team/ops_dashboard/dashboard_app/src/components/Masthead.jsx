import React from 'react';

export default function Masthead() {
    const today = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    return (
        <header className="masthead-inner">
            <div className="masthead-meta">
                <span>Vol. I, No. 1</span>
                <span>{today}</span>
                <span>Price: Attention</span>
            </div>
            <h1 className="masthead-title">The Content Gazette</h1>
            <div className="masthead-meta" style={{ justifyContent: 'center', borderTop: 'none' }}>
                <span>Analyzing the Architecture of Intelligence</span>
            </div>
        </header>
    );
}
