import ConfigInspect from '../components/configInspect';
import logo from '../logo.svg';

const PageHome = () => (
  <header className="App-header">
    <img src={logo} className="App-logo" alt="logo" />
    <a className="App-link" href="https://freevision.sk" target="_blank" rel="noopener noreferrer">
      Learn about freevision
    </a>
    <p>Page Home</p>
    <ConfigInspect />
  </header>
);

export default PageHome;
