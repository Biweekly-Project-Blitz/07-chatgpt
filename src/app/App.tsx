import React, { useState } from 'react';
import axios from 'axios';
import logo from './logo.svg';
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App(): JSX.Element {
  const [text, setText] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useState(false);
  const [apiResponses, setResponses] = useState([]);


  function handleApiKeychange(event: React.ChangeEvent<HTMLInputElement>) {
    setApiKey(event.target.value);
  }

  function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  async function handleApiKeySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(`API key saved! ${apiKey}`)
    // TODO: test key validity using /models/ endpoint
    try {
      const response = await axios.post('/api/input', {
        "key":apiKey
      });
      console.log(response);
    } catch (error){
      console.error(error);
    } finally {
      console.log('API test call complete')
    }
    setAuth(true); 
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    console.log(`Sending to server! ${text} using API key ${apiKey}`)
    setLoading(false);
  }

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

  return (
    <Router>
    <div className="App">
    <div className="wrapper">
    <div className="one">
    API Key:
    <form onSubmit={handleApiKeySubmit}>
    <input type="text" value={apiKey} onChange={handleApiKeychange}/>
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
    API Response: {loading ? "Loading..." : "Submit"}
    </div>
    </div>
    </div>
    </Router>
  );
}

export default App;
