import { useState } from "react";
import "./App.css";

import Status from "./statusComponent/Status.js";

function App() {
  const [text, setText] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [loading, setLoading] = useState(false);

  function handleApiKeychange(event: React.ChangeEvent<HTMLInputElement>) {
    setApiKey(event.target.value);
  }

  function handleTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    setText(event.target.value);
  }

  function handleApiKeySubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log(`API key saved! ${apiKey}`)
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    console.log(`Sending to server! ${text}`)
    setLoading(false);
  }
  return (
    <div className="App">
      <div className="wrapper">
        <div className="one">
          API Key:
          <form onSubmit={handleApiKeySubmit}>
            <input type="text" value={apiKey} onChange={handleApiKeychange}/>
            <button type="submit">Submit</button>
          </form>
          Input text:
          <form onSubmit={handleSubmit}>
            <input type="text" value={text} onChange={handleTextChange} />
            <button type="submit">Submit</button>
          </form>
        </div>
        <div className="two">Response from API goes here!</div>
        <div className="three">
          API Response: {loading ? "Loading..." : "Submit"}
          <Status statusCode=""/>
        </div>
      </div>
    </div>
  );
}

export default App;
