// src/App.jsx
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Form } from 'react-bootstrap';
import Blog from './Blog';
import NavbarComponent from './Navbar';

function App() {
  const API_URL = import.meta.env.VITE_APP_API_URL;

  const [showModal, setShowModal] = useState(false);
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = async () => {
    try {      
      const response = await fetch(`${API_URL}/read?channelName=blogs&limit=10`);
      const data = await response.json();
      
      if (data.messages) {
        setBlogs(data.messages.map(msg => {
          let parsedContent;
          try {
            parsedContent = JSON.parse(msg.content);
          } catch (error) {
            console.error('Error parsing JSON content:', error);
            parsedContent = { content: msg.content }; // Fallback to raw content if parsing fails
          }

          let authorName = '';
          let i = 0;
          const unformattedContent = parsedContent.content;


          while (unformattedContent.substring(i, Math.min(i+2, unformattedContent.length)) != "##" && i < unformattedContent.length) {
            i++;
          } 

          authorName = (i < unformattedContent.length) ? unformattedContent.substring(0, i) : "freedb#5453";
          
          return {
            title: parsedContent.title || parsedContent,
            content: (i < unformattedContent.length) ? parsedContent.content.substring(i + 2): parsedContent.content,
            author: authorName,
            timestamp: parsedContent.date, // Convert timestamp to a readable format
          };
        }));
      }    
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  };

  useEffect(() => {
    fetchBlogs(); // Fetch blogs on component mount
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formattedContent = `${author}##${content}`;
    const blogPost = { title, content: formattedContent, date: new Date().toISOString(), channelName: "blogs" };

    try {
      await fetch(`${API_URL}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(blogPost),
      });
      fetchBlogs(); // Refresh blogs after submitting
      handleClose(); // Close the modal
    } catch (error) {
      console.error('Error sending blog post:', error);
    }
  };

  return (
    <div className="container"  style={{marginTop: '80px'}}>
      <NavbarComponent handleNewBlog={handleShow} />

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>New Blog Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formAuthor">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                placeholder="You are?"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="A cachey title!"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Label>Body</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Flooding of your words..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                maxLength={550}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Nailed it.
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ul>
        {blogs.map((blog, index) => (
          <Blog
            key={index}
            title={blog.title}
            content={blog.content}
            author={blog.author}
            timestamp={blog.timestamp}
        />
        ))}
      </ul>
    </div>
  );
}

export default App;
