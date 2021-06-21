import ConfigInspect from '../components/configInspect';
import logo from '../logo.svg';

const PageHome = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <p>Page Home</p>
    <p>Try Ctrl + .</p>
    <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
      Learn React
    </a>
    <ConfigInspect />
  </header>
);

export default PageHome;
