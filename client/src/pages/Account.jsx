import Auth from "../utils/auth";

const Account = () => {
  const token = localStorage.getItem("id_token");
  if (!token) {
    window.location.assign("/login");
  }

  const user = Auth.getProfile().data;

  return (
    <div>
      <h1>Account</h1>
      <p style={{"wordWrap": "break-word"}}>{JSON.stringify(user)}</p>

      <button onClick={() => Auth.logout()}>Logout</button>
    </div>
  );
};

export default Account;