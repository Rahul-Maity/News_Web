import "./App.css";
import React, { Component } from "react";
import Navbar from "./components/Navbar";
import News from "./components/News";
import LoadingBar from 'react-top-loading-bar'
// import {BrowserRouter} from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//Class based component

export default class App extends Component {
  apiKey = process.env.REACT_APP_NEWS_API
  pageSize = 5;
  state = {
    progress: 0
  }
  setProgress=(progress)=> {
    this.setState({progress:progress})
  }
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <LoadingBar
        color='#f11946'
        progress={this.state.progress}
      />
          <Routes>
            <Route
              exact
              path="/"
              element={<News  setProgress={this.setProgress} key="general" apiKey={this.apiKey} pageSize={this.pageSize} category="general" />}
            />
            <Route
              exact
              path="/newsapp"
              element={<News  setProgress={this.setProgress} key="general" apiKey={this.apiKey} pageSize={this.pageSize} category="general" />}
            />
            <Route
              exact
              path="/sports"
              element={<News setProgress={this.setProgress} key="sports" apiKey={this.apiKey} pageSize={this.pageSize} category="sports" />}
            />
            <Route
              exact
              path="/science"
              element={<News setProgress={this.setProgress} key="science" apiKey={this.apiKey} pageSize={this.pageSize} category="science" />}
            />
            <Route
              exact
              path="/entertainment"
              element={<News setProgress={this.setProgress} key="entertainment" apiKey={this.apiKey} pageSize={this.pageSize} category="entertainment" />}
            />
            <Route
              exact
              path="/business"
              element={<News setProgress={this.setProgress} key="business" apiKey={this.apiKey} pageSize={this.pageSize} category="business" />}
            />
            <Route
              exact
              path="/technology"
              element={<News setProgress={this.setProgress} key="technology" apiKey={this.apiKey} pageSize={this.pageSize} category="technology" />}
            />
            <Route
              exact
              path="/health"
              element={<News setProgress={this.setProgress} key="health" apiKey={this.apiKey} pageSize={this.pageSize} category="health" />}
            />
          </Routes>
        </Router>
      </div>
    );
  }
}
