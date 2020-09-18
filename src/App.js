import React, { useState, useEffect } from 'react';
import { Nav, Navbar, NavItem } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import { LinkContainer } from 'react-router-bootstrap';
import './App.css';
import Routes from "./Routes";
import { AppContext } from "./libs/contextLib";
import { Auth } from "aws-amplify";
import { onError } from "./libs/errorLib";


function App() {
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const [userEmail, setUserEmail] = useState('');
  const history = useHistory();

  const handleLogout = async () => {
    await Auth.signOut();
    userHasAuthenticated(false);
    history.push("/login");
  };

  useEffect(() => {
    onLoad();
  }, []);

  async function onLoad() {
    try {
      await Auth.currentSession();
      userHasAuthenticated(true);
    }
    catch (err) {
      if (err !== "No current user") {
        onError(err);
      }
    }
    setIsAuthenticating(false);
  }

  return (
    !isAuthenticating &&
    <div className="App container">
      <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Scratch</Link>
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            {isAuthenticated ?
              <>
                <LinkContainer to="/settings">
                  <NavItem>Settings</NavItem>
                </LinkContainer>
                <NavItem onClick={handleLogout}>Logout</NavItem>
              </>
              :
              <>
                <LinkContainer to="/signup">
                  <NavItem>Sign Up</NavItem>
                </LinkContainer>
                <LinkContainer to="/login">
                  <NavItem>Log In</NavItem>
                </LinkContainer>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <AppContext.Provider value={{ 
        isAuthenticated, 
        userHasAuthenticated,
        userEmail,
        setUserEmail
         }}>
        <Routes />
      </AppContext.Provider>
    </div>
  );
}

export default App;
