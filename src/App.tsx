import FakeRemote from './FakeRemote'

import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <FakeRemote />
        <a
          className="App-link"
          href="https://www.youtube.com/c/JackHerrington"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Module Federation
        </a>
      </header>
    </div>
  );
}

export default App;
