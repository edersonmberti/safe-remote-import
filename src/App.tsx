import { useState, useEffect } from 'react'
import FakeRemote from './FakeRemote'

import logo from './logo.svg';
import './App.css';

const importDefaultModule = (path: string, callback: (value: any) => void) => {
  return import(`${path}`)
    .then(module => callback(module))
    .catch(error => console.error(`ERROR to load module ${path}`, error))
}

function App() {
  const [fakeRemoteFunction, setFakeRemoteFunction] = useState<any>()

  const remoteFunctionPath = 'remote/fake-function'
  const appFunctionPath = './app-function'

  useEffect(() => {
    importDefaultModule(remoteFunctionPath, setFakeRemoteFunction)
    importDefaultModule(appFunctionPath, setFakeRemoteFunction)
  }, [])

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
        <p>{fakeRemoteFunction && fakeRemoteFunction?.default()}</p>
      </header>
    </div>
  );
}

export default App;
