import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RssFeed = () => {
    const [feed, setFeed] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFeed = async () => {
            try {
                const response = await axios.get('/rss/rss-feed'); // Backend-Route für den RSS-Feed
                setFeed(response.data.feed); // Feed aus dem Backend speichern
            } catch (error) {
                console.error('Fehler beim Laden des RSS-Feeds:', error);
                setError('Fehler beim Laden des RSS-Feeds');
            } finally {
                setLoading(false);
            }
        };

        fetchFeed();
    }, []);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h2>RSS Feed</h2>
            <ul>
                {feed.map((item, index) => (
                    <li key={index}>
                        <a href={item.link} target="_blank" rel="noopener noreferrer">{item.title}</a>
                        <p>{item.description}</p>
                        <small>{new Date(item.pubDate).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default RssFeed;
