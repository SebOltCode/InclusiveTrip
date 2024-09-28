import React, { useState, useEffect } from 'react';

export default function RssFeed() {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Add error state

    useEffect(() => {
        fetch('/api/feed/')
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.text();
            })
            .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
            .then(data => {
                const items = Array.from(data.querySelectorAll("item")).map(item => ({
                    title: item.querySelector("title").textContent,
                    link: item.querySelector("link").textContent,
                    description: item.querySelector("description").textContent,
                }));
                setItems(items);
            })
            .catch(error => {
                console.error('Error fetching RSS feed:', error);
                setError(error.message); // Set error state
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="p-4 mx-auto">
            {loading ? (
                <p>Loading...</p>
            ) : error ? ( // Check for error state
                <p>Error fetching RSS feed: {error}</p>
            ) : items.length === 0 ? (
                <p>No items found.</p>
            ) : (
                <ul className="space-y-4">
                    {items.map((item, index) => (
                        <li key={index} className="border border-gray-200 p-4 rounded-lg shadow-md">
                            <h2 className="text-xl font-bold">
                                <a href={item.link} target="_blank" rel="noopener noreferrer" className="bg-[#C1DCDC] hover:underline">
                                    {item.title}
                                </a>
                            </h2>
                            <div className="mt-2 text-gray-700" dangerouslySetInnerHTML={{ __html: item.description }} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}