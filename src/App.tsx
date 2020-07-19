import React, { useEffect, useState, createContext } from 'react';
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect
} from 'react-router-dom';
import './App.scss';
import TodoPage from './components/TodoPage';
import LoginPage from './components/LoginPage';
import { auth } from './firebase';
import { getUser, resetUser } from './firebase/firestore/user';
import { User } from './interfaces/User';

export const UserContext = createContext<User>(new User());

function App() {
  const [user, setUser] = useState<User>(new User());
  useEffect(() => {
    auth.onAuthStateChanged(async (userAuth) => {
      console.log('State changed');
      if (userAuth?.uid) {
        if (window.location.pathname === '/signup') {
          console.log('signup');
          return setTimeout(async () => {
            console.log('signup after wait');

            const user = await getUser(userAuth.uid);
            if (user) {
              setUser(user);
              console.log(user);
            }
          }, 2000);
        } else {
          const user = await getUser(userAuth.uid);
          if (user) {
            setUser(user);
            console.log(user);
          }
        }
      } else {
        console.log('not logged in');
        setUser(new User());
        resetUser();
        console.log(window.location.pathname);
      }
    });
  }, []);

  return (
    <div className="container">
      <UserContext.Provider value={user}>
        <Router>
          <Switch>
            {user?.uid ? (
              <>
                <Route exact path="/">
                  <TodoPage />
                </Route>
                <Route path="*">
                  <Redirect to="/" />
                </Route>
              </>
            ) : (
              <>
                <Route exact path="/login">
                  <LoginPage />
                </Route>
                <Route exact path="/signup">
                  <LoginPage />
                </Route>
                <Route path="*">
                  <Redirect to="/login" />
                </Route>
              </>
            )}
          </Switch>
        </Router>
      </UserContext.Provider>
    </div>
  );
}

export default App;
