import { useState } from "react";
import { thunkLogin } from "../../redux/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serverResponse = await dispatch(
      thunkLogin({
        email,
        password,
      })
    );

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div id="loginModalFormContainer">
      <h1>Log In</h1>
      <form id="loginModalForm" onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p style={{textAlign: "center", color: "red", fontSize:"20px"}}>{errors.email}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p style={{textAlign: "center", color: "red", fontSize:"20px"}}>{errors.password}</p>}
        <button type="submit">Log In</button>
        <div style={{ display: "flex", width: "300px", alignItems: "center" }}>
          <hr
            style={{
              width: "100px",
              height: "2px",
              border: "1px solid black",
              backgroundColor: "black",
            }}
          />
          <p style={{ fontSize: "24px" }}>or</p>
          <hr
            style={{
              width: "100px",
              height: "2px",
              border: "1px solid black",
              backgroundColor: "black",
            }}
          />
        </div>
        <button
          onClick={() =>
            setEmail("indianajones@bababooey.com", setPassword("raiders333"))
          }
          type="submit"
          style={{ marginBottom: "24px", color: "white", width: "90px" }}
        >
          Log in as Demo User
        </button>
      </form>
    </div>
  );
}

export default LoginFormModal;
