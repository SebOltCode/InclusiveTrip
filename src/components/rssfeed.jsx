import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function RssFeed() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;
        const fetchFeed = async () => {
            try {
                const response = await axios.get(`${API_URL}/rss/rss-feed`);
                setItems(response.data.feed);
            } catch (error) {
                console.error('Fehler beim Laden des RSS-Feeds:', error);
                setError('Fehler beim Laden des RSS-Feeds');
            } finally {
                setLoading(false);
            }
        };

        fetchFeed();
    }, []);

    if (loading) return <p className="text-center text-blue-500">Laden...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">RSS Feed</h2>
            <ul className="space-y-4">
                {items.map((item, index) => (
                    <li key={index} className="p-4 bg-white shadow-md rounded-lg">
                        <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                            <h3 className="text-lg font-semibold">{item.title}</h3>
                        </a>
                        <p className="text-gray-600">{item.description}</p>
                        <small className="text-gray-400">{new Date(item.pubDate).toLocaleString()}</small>
                    </li>
                ))}
            </ul>
        </div>
    );
}
