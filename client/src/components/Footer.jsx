import Auth from "../utils/auth";

const Footer = ({ setIsModalActive }) => {
  const token = Auth.loggedIn() ? Auth.getToken() : null; // define token variable as Auth.loggedIn() ? Auth.getToken() : null

  return (
    <footer className="footer page-footer">
      <nav className="level is-mobile">
        {/* <div className="level-item has-text-centered">
          <div>
            <p className="heading">Tweets</p>
            <p className="title">3,456</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Following</p>
            <p className="title">123</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading">Followers</p>
            <p className="title">456K</p>
          </div>
        </div> */}
        <div className="level-item has-text-centered">
          <div>
            <button
              onClick={() => setIsModalActive(true)}
              className="button is-danger is-rounded"
              disabled={!token}
            >
              <i className="fas fa-plus"></i>
            </button>
          </div>
        </div>
      </nav>

      {/* <div className="has-text-centered">
        <p>
          Copyright &copy; 2023 Joshua Cavell
          <br />
          All rights reserved.
        </p>
      </div> */}
    </footer>
  );
};

export default Footer;
