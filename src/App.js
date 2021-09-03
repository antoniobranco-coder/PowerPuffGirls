import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import styled from 'styled-components';
import ShowDetails from "./ShowDetails";
import EpisodeDetails from './EpisodeDetails';

function App() {
  return (
    <div className="App">
      <HomePage href='/main'>Powerpuff Girls</HomePage>
      <Router>
        <Switch>
          <Route path='/episodes/:id'>
            <EpisodeDetails />
          </Route>
          <Route exact path="/">
            <Redirect to="/main" />
          </Route>
          <Route exact path='/main'>
            <ShowDetails />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

const HomePage = styled.a`
    margin-bottom: 20px;
    font-family:fantasy;
    font-size: 40px;
    color: #fc7f94;
    text-decoration:none;
    padding-top: 20px;
    align-items:center;
    padding-left: 30px;
    padding-right: 30px;
`


export default App;
