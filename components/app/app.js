import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from '../header';
import {
  HomePage,
  QuestionDetailsPage,
  QuestionAddPage,
  LoginPage,
  AdminQuestionsPage } from '../pages';

const App = () => {
    return (
        <>
            <Header/>
            <Switch>
                <Route path="/" exact component={HomePage} />
                <Route path="/login" component={LoginPage} />
                <Route path="/questions/:id" component={QuestionDetailsPage} />
                <Route path="/add-question" component={QuestionAddPage} />
                <Route path="/admin/questions" component={AdminQuestionsPage} />
            </Switch>
        </>
    );
};

export default App;