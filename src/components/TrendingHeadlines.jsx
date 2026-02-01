import React from 'react';

const TrendingHeadlines = ({ headlines, loading }) => {
    if (loading) return null;
    if (!headlines || headlines.length === 0) return null;

    return (
        <section className="trending-section">
            <div className="section-header">
                <div className="live-indicator">
                    <span className="dot"></span>
                    LIVE TRENDS
                </div>
                <h3>Industry Pulse</h3>
            </div>

            <div className="headlines-scroll">
                <div className="headlines-container">
                    {headlines.map((item, index) => (
                        <a
                            key={index}
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="headline-card"
                        >
                            <span className="headline-source">{item.source}</span>
                            <p className="headline-title">{item.title}</p>
                            <span className="headline-date">{new Date(item.pubDate).toLocaleDateString()}</span>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingHeadlines;
