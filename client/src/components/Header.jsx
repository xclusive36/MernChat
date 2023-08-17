import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Auth from "../utils/auth.js";

const Header = () => {
  const [isActive, setisActive] = useState(false);
  const location = useLocation();

  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const toggleMenu = () => {
    setisActive(!isActive);
  };

  return (
    <header className="header">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          {location.pathname !== "/" && (
            <Link to={`/`} className="navbar-item">
              <i className="fas fa-arrow-left"></i>
            </Link>
          )}
          <Link to={`/`} className="navbar-item">
            <h1 className="title">MernChat</h1>
          </Link>
          <a
            role="button"
            className={isActive ? "navbar-burger is-active" : "navbar-burger"}
            aria-label="menu"
            aria-expanded="false"
            data-target="navbarBasicExample"
            onClick={toggleMenu}
          >
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </a>
        </div>
        <div
          id="navbarBasicExample"
          className={isActive ? "navbar-menu is-active" : "navbar-menu"}
        >
          <div className="navbar-end">
            <div className="navbar-item">
              <div className="buttons">
                {Auth.loggedIn() ? ( // if logged in show my account & logout buttons
                  <>
                    <Link to={`/`} className="button is-primary">
                      My Account
                    </Link>
                    <Link to={`/`} className="button is-link" onClick={logout}>
                      Log out
                    </Link>
                  </>
                ) : (
                  // if logged out show signup and login buttons
                  <>
                    <Link
                      to={`/signup`}
                      className={
                        location.pathname === "/signup"
                          ? "button is-primary"
                          : "button is-light"
                      }
                    >
                      Sign up
                    </Link>
                    <Link
                      to={`/login`}
                      className={
                        location.pathname === "/login"
                          ? "button is-primary"
                          : "button is-light"
                      }
                    >
                      Log in
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
