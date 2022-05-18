import './App.css';
import {
  BrowserRouter,
  Switch,
  Route,
  Link
} from "react-router-dom";
import React, { useState } from 'react';
import ShowAllAuthors from './components/ShowAllAuthors';
import CreateForm from './components/CreateForm';
import EditForm from './components/EditAuthor';
import Error from './components/Error';

function App() {
  return (
    <BrowserRouter>
    <div className="App container">
        <h1>Favorite Authors</h1>
        <Switch>
          <Route exact path="/">
            <ShowAllAuthors></ShowAllAuthors>
          </Route>
          <Route exact path="/create">
            <CreateForm></CreateForm>
          </Route>
          <Route exact path="/edit/:id">
            <EditForm></EditForm>
          </Route>
          <Route exact path="/error">
            <Error></Error>
          </Route>
        </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
