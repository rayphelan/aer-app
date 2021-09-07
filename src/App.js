import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './features/header/Header';
import Navbar from './features/navbar/Navbar';
import Home from './features/home/Home';
import Portfolios from './features/portfolios/Portfolios';
import AddPortfolio from './features/portfolios/AddPortfolio';

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Navbar />
      </div>
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/portfolios" component={Portfolios} />
        <Route path="/add-portfolio" component={AddPortfolio} />
      </Switch>
    </Router>
  );
}

export default App;
