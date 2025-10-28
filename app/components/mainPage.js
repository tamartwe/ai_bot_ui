"use client"

import React, { useState } from 'react';
import './MainPageStyles.css';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import 'github-markdown-css/github-markdown.css';
import 'highlight.js/styles/github.css';


const MainPage = () => {
  const [inputText, setInputText] = useState('');
  const [responseText, setResponseText] = useState('');

  const handleButtonClick = async () => {
    try {
      // Make a POST request to the server with the user input
      const response = await axios.post('http://localhost:8080/api/question', 
        { "userQuestion" : inputText }
      );

      const responseData = response.data;
      setResponseText(responseData.answer)
    } catch (error) {
      console.error('Error sending request:', error);
    }
  };

  return (
    <div className="main-container">
      <h1 className="title">AI Bot Demo</h1>
      <input 
        type="text" 
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="Type your text here"
        className="text-input" // Apply the 'text-input' class to the input element
      />
      <button onClick={handleButtonClick} className="btn">Send Request</button>
      {responseText && (
        <div className="response-text markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeHighlight]}>
            {responseText}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default MainPage;