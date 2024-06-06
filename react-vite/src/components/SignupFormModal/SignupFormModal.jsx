import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { thunkSignup } from "../../redux/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState(null);
  const [profileBanner, setProfileBanner] = useState(null);
  const [errors, setErrors] = useState({});
  const [errValids, setErrValids] = useState({});
  const { closeModal } = useModal();
  useEffect(() => {
    // let errorObj = {};
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });

      // errorObj["confirmPassword"] =
      //   "Confirm Password field must be the same as the Password field";
    }

    const formData = new FormData();
    formData.append("email", email);
    formData.append("username", username);
    formData.append("password", password);
    formData.append("firstname", firstname);
    formData.append("lastname", lastname);
    if (profilePic) {
      formData.append("profile_pic", profilePic);
    }
    if (profileBanner) {
      formData.append("profile_banner", profileBanner);
    }

    const serverResponse = await dispatch(thunkSignup(formData));

    if (serverResponse) {
      setErrors(serverResponse);
    } else {
      closeModal();
    }
  };

  return (
    <div
      style={{
        zIndex: "1000",
        backgroundColor: "#d9d9d9",
        borderRadius: "5%",
      }}
    >
      <h1 style={{ fontSize: "60px", marginLeft: "12px" }}>Sign Up</h1>
      {errors.server && <p>{errors.server}</p>}
      <form
        id="signupFormModal"
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label>
          First Name
          <input
            type="text"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </label>
        <label>
          Last Name
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </label>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <div id="container-for-profile-uploads">
          <label>
            Profile Picture
            <input
              className="filetypeSignup"
              style={{ backgroundColor: "#d9d9d9" }}
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
              required
            />
          </label>
          <label>
            Profile Banner
            <input
              className="filetypeSignup"
              style={{ backgroundColor: "#d9d9d9" }}
              type="file"
              onChange={(e) => setProfileBanner(e.target.files[0])}
            />
          </label>
        </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
