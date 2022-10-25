import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import { Clients } from './pages/Clients';
import { NewClient } from './pages/newClient/NewClient';
import MainNavigation from './components/Navigation/MainNavigation';
import ClientInfo from './pages/ShowClient.js/ClientInfo';
import { UpdateClient } from './pages/updateClient/updateClient';

function App() {
  return (
    <Router>
      <MainNavigation />
      <main>
        <Route exact path="/">
          <Clients />
        </Route>
        <Route path="/newClient">
          <NewClient />
        </Route>
        <Route path="/ClientInfo/:clientId" >
          <ClientInfo />
        </Route>
        <Route path="/addClient">
          <NewClient />
        </Route>
        <Route path="/updateClient/:cid">
          <UpdateClient />
        </Route>
        <Redirect to="/"></Redirect>
      </main>
    </Router>
  );
}

export default App;
