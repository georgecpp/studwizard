import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom'; 
import { Container } from 'semantic-ui-react';

import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import MenuBar from './components/MenuBar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SinglePost from './pages/SinglePost';
import RegisterUser from './pages/RegisterUser';
import RegisterMeditator from './pages/RegisterMeditator';
import Profile from './pages/Profile';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ background: "linear-gradient(#83a4d4 , #b6fbff)" }}>
          <Container>
            <MenuBar />
            <Route exact path='/' component={Home} />
            <AuthRoute exact path='/login' component={Login} />
            <AuthRoute exact path='/register' component={Register} />
            <AuthRoute exact path='/register/user' component={RegisterUser} />
            <AuthRoute exact path='/register/meditator' component={RegisterMeditator} />
            <Route exact path='/profile/:username' component={Profile} />
            <Route exact path="/posts/:postId" component={SinglePost} />
          </Container>
        </div>

      </Router>
    </AuthProvider>
  );
}

export default App;
