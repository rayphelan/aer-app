import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Header, Navbar } from './components';
import { Home, Portfolios, AddPortfolio } from './features';

function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Navbar />
      </Container>
      <Switch>
        <Route path="/" component={Home} exact={true} />
        <Route path="/portfolios" component={Portfolios} />
        <Route path="/add-portfolio" component={AddPortfolio} />
      </Switch>
    </Router>
  );
}

export default App;
