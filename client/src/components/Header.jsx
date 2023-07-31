import { useState } from "react";

const Header = () => {
  const [isActive, setisActive] = useState(false);

  const toggleMenu = () => {
    setisActive(!isActive);
    console.log(!isActive);
  };

  return (
    <header className="header">
      <nav className="navbar" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          <a className="navbar-item" href={`/`}>
            <h1 className="title">MernChat</h1>
          </a>

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
                <a className="button is-primary">
                  <strong>Sign up</strong>
                </a>
                <a className="button is-light">Log in</a>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
