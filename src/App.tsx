import { BrowserRouter } from 'react-router-dom';
import { AppConfigContextProvider } from './components/hooks/useConfig';
import { Route } from 'react-router';
import { Switch } from 'react-router';
import './App.css';
import Omnibar from './components/omnibar';
import PageHome from './pages/PageHome';
import PageOne from './pages/PageOne';
import PageTwo from './pages/PageTwo';

function App() {
  return (
    <BrowserRouter>
      <AppConfigContextProvider>
        <div className="App">
          <Switch>
            <Route path="/one" component={PageOne} />
            <Route path="/two" component={PageTwo} />
            <Route component={PageHome} />
          </Switch>
          <Omnibar />
        </div>
      </AppConfigContextProvider>
    </BrowserRouter>
  );
}

export default App;
