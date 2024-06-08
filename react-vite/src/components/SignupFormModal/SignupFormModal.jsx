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
  const [profilePicPreview, setProfilePicPreview] = useState(null);
  const [profileBannerPreview, setProfileBannerPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [errValids, setErrValids] = useState([]);
  const { closeModal } = useModal();

  useEffect(() => {
    const errorArr = [];
    if (firstname.length < 4 || firstname.length > 40) {
      errorArr.push("First name must be between 4 and 40 characters");
    }
    if (lastname.length < 4 || lastname.length > 40) {
      errorArr.push("Last name must be between 4 and 40 characters");
    }
    if (username.length < 4 || username.length > 25) {
      errorArr.push("Username must be between 4 and 25 characters");
    }
    if (
      email.length < 4 ||
      !email.includes("@") ||
      !email.includes(".") ||
      email.length > 255
    ) {
      errorArr.push(
        "Please provide a valid email. Your email should be between 4 and 255 characters"
      );
    }
    if (password.length < 8) {
      errorArr.push("Please provide a password at least 8 characters long.");
    }
    setErrValids(errorArr);
  }, [firstname, lastname, email, username, password]);

  useEffect(() => {
    if (profilePic) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicPreview(reader.result);
      };
      reader.readAsDataURL(profilePic);
    } else {
      setProfilePicPreview(null);
    }
  }, [profilePic]);

  useEffect(() => {
    if (profileBanner) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileBannerPreview(reader.result);
      };
      reader.readAsDataURL(profileBanner);
    } else {
      setProfileBannerPreview(null);
    }
  }, [profileBanner]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setErrors({
        confirmPassword:
          "Confirm Password field must be the same as the Password field",
      });
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
    <div className="signup-modal">
      <h1 className="signup-title">Sign Up</h1>
      {errors.server && <p className="errValids-message">{errors.server}</p>}
      <form
        id="signupFormModal"
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
        {errValids.find((error) => error.includes("First")) && (
          <p className="errValids-message">
            {errValids.find((error) => error.includes("First"))}
          </p>
        )}
        <label>
          Last Name
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </label>
        {errValids.find((error) => error.includes("Last")) && (
          <p className="errValids-message">
            {errValids.find((error) => error.includes("Last"))}
          </p>
        )}
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className="errValids-message">{errors.email}</p>}
        {errValids.find((error) => error.includes("mail")) && (
          <p className="errValids-message">
            {errValids.find((error) => error.includes("mail"))}
          </p>
        )}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && (
          <p className="errValids-message">{errors.username}</p>
        )}
        {errValids.find((error) => error.includes("ser")) && (
          <p className="errValids-message">
            {errValids.find((error) => error.includes("ser"))}
          </p>
        )}
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {errors.password && (
          <p className="errValids-message">{errors.password}</p>
        )}
        {errValids.find((error) => error.includes("ass")) && (
          <p className="errValids-message">
            {errValids.find((err) => err.includes("ass"))}
          </p>
        )}
        <label style={{ marginBottom: "12px" }}>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && (
          <p className="errValids-message">{errors.confirmPassword}</p>
        )}
        <div id="container-for-profile-uploads">
          <label className="custom-file-upload">
            Profile Picture {"*\n(REQUIRED!)"}
            <input
              className="filetypeSignup"
              type="file"
              onChange={(e) => setProfilePic(e.target.files[0])}
              required
            />
            {profilePicPreview && (
              <img
                src={profilePicPreview}
                alt="Profile Preview"
                className="image-preview"
              />
            )}
          </label>
          <label className="custom-file-upload">
            Profile Banner
            <input
              className="filetypeSignup"
              type="file"
              onChange={(e) => setProfileBanner(e.target.files[0])}
            />
            {profileBannerPreview && (
              <img
                src={profileBannerPreview}
                alt="Banner Preview"
                className="image-preview"
              />
            )}
          </label>
        </div>
        <button
          type="submit"
          disabled={errValids.length > 0}
          className="submit-button"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignupFormModal;
