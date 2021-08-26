import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'
import ShowDetails from "./ShowDetails";
import EpisodeDetails from './EpisodeDetails';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/episodes/:id'>
            <EpisodeDetails />
          </Route>
          <Route exact path='/main'>
            <ShowDetails />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
