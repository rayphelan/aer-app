import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Container, Header, Navbar } from './components';
import {
  Home,
  Portfolios,
  AddPortfolio,
  ViewPortfolio,
  EditPortfolio,
  DeletePortfolio,
} from './features';

function App() {
  return (
    <Router>
      <Container>
        <Header />
        <Navbar />
      </Container>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/portfolios" component={Portfolios} />
        <Route path="/add-portfolio" component={AddPortfolio} />
        <Route path="/portfolio/:portfolioId" component={ViewPortfolio} exact />
        <Route
          path="/portfolio/edit/:portfolioId"
          component={EditPortfolio}
          exact
        />
        <Route
          path="/portfolio/delete/:portfolioId"
          component={DeletePortfolio}
          exact
        />
      </Switch>
    </Router>
  );
}

export default App;
