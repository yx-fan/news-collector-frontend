import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Row, Col } from "antd";

export interface NewsCardProps {
    title: string;
    url: string;
    source: string;
    summary: string;
    content: string;
    published_at: string;
    sentiment_score: number;
}
  
// Format date to human-readable format
const formatDate = (dateString: string) => {
    const date = new Date(dateString);
        return date.toLocaleString("en-US", {
            weekday: "short",
            month: "short",
            day: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }
    );
};

const NewsCard: React.FC<NewsCardProps> = ({
    title,
    url,
    source,
    summary,
    content,
    published_at,
}) => {
    const [expanded, setExpanded] = useState(false);

    return (
        <motion.div
            className={`news-card bg-gray-800/70 p-4 rounded-md`}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05, rotateX: 5 }}
            >

            <h2 className="text-2xl font-bold text-white relative z-10 flex items-center">
                {title}
            </h2>

            <p className="text-gray-400 text-sm mt-1">{formatDate(published_at)}</p>

            <p className="text-gray-300 mt-2 relative z-10">{summary}</p>

            <div className="relative z-10 w-full">
                <AnimatePresence>
                {expanded && (
                    <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="expanded-content bg-gray-800/70 p-4 mt-3 rounded-md"
                    >
                    <Typewriter
                        words={[content]}
                        typeSpeed={20}
                        cursor
                        cursorBlinking
                    />
                    </motion.div>
                )}
                </AnimatePresence>
            </div>

            <Row gutter={[16, 16]} justify="space-between" className="mt-4 w-full text-center items-center justify-center">
                <Col>
                    <button
                        onClick={() => setExpanded(!expanded)}
                        className="px-4 py-2 text-white bg-gray-700 rounded-md hover:bg-gray-600 transition"
                    >
                        {expanded ? "Read Less ▲" : "Read More ▼"}
                    </button>
                </Col>
                
                <Col className="flex justify-end items-center w-full mt-2 text-center">
                    <a
                        href={url}
                        className="text-blue-400 hover:underline transition center mt-2 block text-center w-full"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Read on {source} →
                    </a>
                </Col>
            </Row>
        </motion.div>
    );
};

export default NewsCard;
