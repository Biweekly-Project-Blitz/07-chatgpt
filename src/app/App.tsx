import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import './App.css';

import LogFeed from './components/LogFeed/LogFeed';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App(): JSX.Element {
  const [text, setText] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(false);
  const [apiResponses, setResponses] = useState([
    {
      id: 0,
      responseString: 'App initialized',
    },
  ]);

  function appendToLog(logItem){
    setResponses((apiResponses) => [
      ...apiResponses,
      {
        id: apiResponses.length,
        responseString: logItem,
      },
    ]);
  }

  function handleApiKeychange(event: React.ChangeEvent<HTMLInputElement>) {
    setApiKey(event.target.value);
  }

  function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  async function handleApiKeySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!apiKey) {
      console.log(apiResponses);
      appendToLog("Validation error: No API key provided");
    } else {
      console.log(`API key saved! ${apiKey}`);
      // TODO: test key validity using /models/ endpoint
      try {
        const response = await axios.post('/api/input', {
          key: apiKey,
        });
        console.log(response);
        setAuth(true);
      } catch (error) {
        appendToLog(`HTTP Error: ${error.message} `);
      } finally {
        appendToLog('Request /api/input completed');
      }
    }
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    console.log(`Sending to server! ${text} using API key ${apiKey}`);
    setLoading(false);
  }

  /*
  async function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('/api/my-endpoint', {
        // Request body data goes here
      });
      // Handle response data here
    } catch (error) {
      // Handle error here
    } finally {
      setLoading(false);
    }
  }
  */

  return (
    <Router>
      <div className="App">
        <div className="wrapper">
          <div className="one">
            API Key:
            <form onSubmit={handleApiKeySubmit}>
              <input type="text" value={apiKey} onChange={handleApiKeychange} />
              <button type="submit">Submit</button>
            </form>
            Input text:
            <div>
              {auth ? (
                <form onSubmit={handleSubmit}>
                  <input type="text" value={text} onChange={handleTextChange} />
                  <button type="submit">Submit</button>
                </form>
              ) : (
                <p>Please provide a valid OpenAPI key</p>
              )}
            </div>
          </div>
          <div className="two">Response from API goes here!</div>
          <div className="three">
            <LogFeed apiResponses={apiResponses} />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
