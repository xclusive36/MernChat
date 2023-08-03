import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Auth from "../utils/auth.js";

const Login = () => {
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form[0].value.trim();
    const password = form[1].value.trim();

    try {
      const { data } = await login({
        variables: { email, password },
      });

      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <main className="container is-fluid pt-4">
        <div className="card">
          <div className="card-header has-background-primary-dark">
            <h2 className="has-text-white m-4">Login</h2>
          </div>
          <div className="card-content">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <div className="columns">
                  <div className="column">
                    <div className="field">
                      <label className="label">Email Address</label>
                      <div className="control">
                        <input
                          className="input is-small"
                          type="email"
                          placeholder="Email"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="column">
                    <div className="field">
                      <label className="label">Password</label>
                      <div className="control">
                        <input className="input is-small" type="password" />
                      </div>
                    </div>
                  </div>
                </div>
                By logging in, you agree to our <a href="#">Terms of Use</a> and{" "}
                <a href="#">Privacy Policy</a>.
                <div className="field is-grouped mt-5">
                  <div className="control">
                    <button className="button is-link">Submit</button>
                  </div>
                  <div className="control">
                    <button className="button is-link is-light">Cancel</button>
                  </div>
                </div>
              </form>
            )}
            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
