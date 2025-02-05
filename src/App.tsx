import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";
import NewsCard, { NewsCardProps } from "./components/NewsCard";
import SentimentBox from "./components/SentimentBox";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const API_URL = "api/news";

const App: React.FC = () => {
  const [news, setNews] = useState<NewsCardProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => {
        setNews(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching news:", error));
  }, []);

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-4xl font-bold text-white mb-6 text-center neon-text">
        🔥 <Typewriter words={["Trending Topics", "Breaking News", "Hot Updates"]} loop={true} />
      </h1>


      {loading ? (
        <p className="text-gray-400 text-center">Loading news...</p>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {news.map((item, index) => (
            <Row
              key={index}
              gutter={[16, 16]}
              align="middle"
              className="bg-gray-800/60 p-4 rounded-lg shadow-lg"
            >
              <Col span={20}>
                <NewsCard {...item} />
              </Col>

              <Col span={4} className="flex justify-end items-center">
                <SentimentBox score={item.sentiment_score} />
              </Col>
            </Row>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default App;
