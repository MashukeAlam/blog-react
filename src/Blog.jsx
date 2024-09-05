// src/Blog.jsx
import React, { useState } from 'react';
import { Card } from 'react-bootstrap';
import './Blog.css';

const Blog = ({ title, content, author, timestamp, onClick }) => {
  // Show the first 10 words of the content
  const [long, setLong] = useState(false);
  const blogLength = content.length;

  const handleShowFull = () => {
    setLong(true);
  }

  return (
    <Card className="my-3 blog-single blog-card" onClick={onClick}>
      <Card.Body>
        <Card.Title className="blog-title">{title}</Card.Title>
        <Card.Text className="blog-content">{!long ? content.split(' ').slice(0, 30).join(' ') + '...' : content}{!long && blogLength > 30 ? <span onClick={handleShowFull} style={{cursor: 'pointer', color: 'purple'}}>Show full</span> : '' }</Card.Text>
        <Card.Subtitle className="mb-2 blog-footer">
          Posted by {author} on {new Date(timestamp).toLocaleString()}
        </Card.Subtitle>
      </Card.Body>
    </Card>
  );
};

export default Blog;
