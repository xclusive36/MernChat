import Footer from "../components/Footer";
import Header from "../components/Header";
import Auth from "../utils/auth.js";

const Login = () => {
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const { token, user } = await response.json();

      Auth.login(token, user);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Header />
      <main className="container is-fluid pt-4">
        <div className="card">
          <div className="card-content">
            <h2>Login</h2>
            <p className="mt-1 mb-4">
              You may Login by filling out the form below with your email
              address and password.
            </p>
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
              By logging in, you agree to our <a href="#">Terms of Use</a>{" "}
              and <a href="#">Privacy Policy</a>.
              <div className="field is-grouped mt-5">
                <div className="control">
                  <button className="button is-link">Submit</button>
                </div>
                <div className="control">
                  <button className="button is-link is-light">Cancel</button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
