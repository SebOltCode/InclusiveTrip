import React, { useState, useEffect } from "react";
import axios from "axios";
import parse from "html-react-parser";

export default function RssFeed() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedItems, setExpandedItems] = useState({});

  useEffect(() => {
    const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;
    const fetchFeed = async () => {
      try {
        const response = await axios.get(`${API_URL}/rss/rss-feed`);
        setItems(response.data.feed);
      } catch (error) {
        console.error("Fehler beim Laden des RSS-Feeds:", error);
        setError("Fehler beim Laden des RSS-Feeds");
      } finally {
        setLoading(false);
      }
    };

    fetchFeed();
  }, []);

  const toggleExpand = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  if (loading) return <p className="text-center text-blue-500">Laden...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">
        Blog Einträge unseres Partners barrierefrei-aufgerollt.at
      </h2>
      <div className="overflow-y-auto max-h-96 sm:max-h-full">
        <ul className="space-y-4">
          {items.map((item, index) => (
            <li key={index} className="p-4 bg-white shadow-md rounded">
              <a
                href="#"
                className="text-blue-600 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  toggleExpand(index);
                }}
              >
                <h3 className="text-lg font-semibold">{item.title}</h3>
              </a>
              <div
                className={`text-gray-600 ${
                  expandedItems[index] ? "" : "line-clamp-2"
                }`}
              >
                {parse(item.description)}
              </div>
              {expandedItems[index] && (
                <>
                  <small className="text-gray-400">
                    {new Date(item.pubDate).toLocaleString()}
                  </small>
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline block mt-2"
                  >
                    ..mehr lesen
                  </a>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
