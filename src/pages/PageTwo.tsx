import ConfigInspect from '../components/configInspect';
import logo from '../logo.svg';

const PageTwo = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>Page Two</p>
    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
      Learn React
    </a>
    <ConfigInspect />
  </header>
);

export default PageTwo;
