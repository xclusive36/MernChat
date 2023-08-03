import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../utils/mutations";
import { Link } from "react-router-dom";

import Footer from "../components/Footer";
import Header from "../components/Header";
import Auth from "../utils/auth.js";

const Signup = () => {
  const [addUser, { error, data }] = useMutation(ADD_USER);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  // the passwordpattern requires at least one number, one lowercase letter, one uppercase letter, and one special character
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/; // regex pattern for password validation

  // the namepattern only allows letters, no spaces, no numbers, no special characters
  const namePattern = /^[a-zA-Z]+$/; // regex pattern for name validation

  // the emailpattern requires a valid email address
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex pattern for email validation

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const firstName = form[0].value.trim();
    const lastName = form[1].value.trim();
    const username = form[2].value.trim();
    const email = form[3].value.trim();
    const password = form[4].value.trim();
    const passwordConfirm = form[5].value.trim();
    const checkBox = form[6].checked;

    // do the passwords match?
    if (password !== passwordConfirm) {
      // if not, display an alert
      alert("Passwords do not match!");
      return;
    }

    // is the password at least 8 characters long?
    if (password.length < 8) {
      // if not, display an alert
      alert("Password must be at least 8 characters long!");
      return;
    }

    // does the password contain at least one number, one lowercase letter, and one uppercase letter, and one special character?
    if (!passwordPattern.test(password)) {
      // if not, display an alert
      alert(
        "Password must contain at least one number, one lowercase letter, one uppercase letter, and one special character!"
      );
      return;
    }

    // does the first name, lastname, and username contain only letters?
    if (
      !namePattern.test(firstName) ||
      !namePattern.test(lastName) ||
      !namePattern.test(username)
    ) {
      // if not, display an alert
      alert("Name and username must contain only letters!");
      return;
    }

    // has the checkbox been checked?
    if (!checkBox) {
      // if not, display an alert
      alert("You must agree to the Terms of Use and Privacy Policy!");
      return;
    }

    // does email match a valid email pattern?
    if (!emailPattern.test(email)) {
      // if not, display an alert
      alert("Invalid email address!");
      return;
    }

    // if all is well, attempt to send the data to the server
    try {
      // execute addUser mutation and pass in variable data from form
      const { data } = await addUser({
        variables: { firstName, lastName, username, email, password },
      });

      // once the mutation is complete, sign the user in
      Auth.login(data.addUser.token);

      // once complete, clear all form fields
      form.reset();
      setFirstName("");
      setLastName("");
      setUserName("");
      setEmail("");
      setPassword("");
      setPasswordConfirm("");
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
            <h2 className="has-text-white m-4">Signup</h2>
          </div>
          <div className="card-content">
            {data ? (
              <p>
                Success! You may now head{" "}
                <Link to="/">back to the homepage.</Link>
              </p>
            ) : (
              <>
                <p className="mt-1 mb-4">
                  Create a new account by filling out the form below.
                </p>
                <form onSubmit={handleFormSubmit}>
                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">First Name</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            type="text"
                            placeholder="First Name"
                            name="firstName"
                            onBlur={(event) => setFirstName(event.target.value)}
                            required
                          />
                        </div>
                        {firstName && !namePattern.test(firstName) && (
                          <p className="help is-danger">This name is invalid</p>
                        )}
                      </div>
                    </div>
                    <div className="column">
                      <div className="field">
                        <label className="label">Last Name</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            type="text"
                            placeholder="Last Name"
                            name="lastName"
                            onBlur={(event) => setLastName(event.target.value)}
                            required
                          />
                        </div>
                        {lastName && !namePattern.test(lastName) && (
                          <p className="help is-danger">This name is invalid</p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">Username</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            type="text"
                            placeholder="Username"
                            name="username"
                            onBlur={(event) => setUserName(event.target.value)}
                            required
                          />
                        </div>
                        {username && !namePattern.test(username) && (
                          <p className="help is-danger">
                            This username is invalid
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="column">
                      <div className="field">
                        <label className="label">Email Address</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            type="email"
                            placeholder="Email"
                            name="email"
                            onBlur={(event) => setEmail(event.target.value)}
                            required
                          />
                        </div>
                        {email && !emailPattern.test(email) && (
                          <p className="help is-danger">
                            This email is invalid
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="columns">
                    <div className="column">
                      <div className="field">
                        <label className="label">Password</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            type="password"
                            name="password"
                            onBlur={(event) => setPassword(event.target.value)}
                            required
                          />
                        </div>
                        {password && !passwordPattern.test(password) && (
                          <>
                            <p className="help is-danger">
                              This password is invalid
                            </p>
                            <p className="help">
                              Password must contain at least one number, one
                              lowercase letter, one uppercase letter, and one
                              special character!
                            </p>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="column">
                      <div className="field">
                        <label className="label">Confirm Password</label>
                        <div className="control">
                          <input
                            className="input is-small"
                            type="password"
                            name="passwordConfirm"
                            onBlur={(event) =>
                              setPasswordConfirm(event.target.value)
                            }
                            required
                          />
                        </div>
                        {passwordConfirm && password !== passwordConfirm && (
                          <p className="help is-danger">
                            This password does not match
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <label className="checkbox">
                        <input
                          type="checkbox"
                          className="mx-4"
                          name="checkBox"
                          required
                        />
                        I agree to the <Link to="#">Terms of Use</Link> and{" "}
                        <Link to="#">Privacy Policy</Link>.
                      </label>
                    </div>
                  </div>
                  <div className="field is-grouped">
                    <div className="control">
                      <button className="button is-link">Submit</button>
                    </div>
                    <div className="control">
                      <button className="button is-link is-light">
                        Cancel
                      </button>
                    </div>
                  </div>
                </form>
                {error && <p className="help is-danger">{error.message}</p>}
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Signup;
