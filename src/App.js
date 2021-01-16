import { Switch, Route } from "react-router-dom";
import Dashboard from './dashboard/dashboard';
import LoginPanel from './loginPanel/loginPanel';
import Nav from './navigationBar/nav';
import './App.css';

function App() {
  const d = new Date();
  const ye = new Intl.DateTimeFormat('fi', { year: 'numeric' }).format(d);
  const mo = new Intl.DateTimeFormat('fi', { month: '2-digit' }).format(d);
  const da = new Intl.DateTimeFormat('fi', { day: '2-digit' }).format(d);

  sessionStorage.setItem("date", `${da}/${mo}/${ye}`);

  return (
    <div className="App">
      <header className="App-header">
        <Switch>
          <Route path="/dashboard">
            <Nav />
            <Dashboard />
          </Route>
          <Route path="/" exact><LoginPanel /></Route>
        </Switch>
      </header>
    </div>
  );
}

export default App;
