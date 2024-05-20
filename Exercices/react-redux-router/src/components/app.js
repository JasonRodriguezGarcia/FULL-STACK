import React, { Component } from 'react';
// import moment from "moment";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// import PortfolioContainer from './portfolio/portfolio-container';
import NavigationContainer from './navigation/navigation-container';
import Home from './pages/home';
import About from './pages/about';
import Contact from './pages/contact';
import Blog from './pages/blog';
import PortfolioDetail from './portfolio/portfolio-detail';
import NoMatch from './pages/no-match';

export default class App extends Component {
  render() {
    return (
      <div className='container'>
        <Router>
          <div>
            <NavigationContainer />

            <Switch>
              <Route exact path="/" component={Home} /> {/*main path first with exact */}
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/blog" component={Blog} />
              {/* Following exact path is to avoid /portfolio/xxxxx and /portfolio/xxx/xxx to be acepted */}
              <Route exact path="/portfolio/:slug" component={PortfolioDetail} />
               {/* When paths don't match*/}
              <Route component={NoMatch} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}
