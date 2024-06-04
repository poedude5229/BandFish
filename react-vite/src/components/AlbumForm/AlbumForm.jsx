import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAlbumThunk } from "../../redux/album";
import "./AlbumForm.css";

const AlbumCreation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [albumArt, setAlbumArt] = useState(null);
  const [type, setType] = useState("Album");
  const [price, setPrice] = useState("1.00");
  const [genre, setGenre] = useState("Rock");
  const [errorArr, setErrorArr] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!currentUser) navigate("/");
  }, [navigate, currentUser]);

  const validateForm = () => {
    const validationErrors = [];
    if (!name) validationErrors.push("Name is required.");
    if (!albumArt) {
      validationErrors.push("Album art is required.");
    } else {
      const validFileTypes = ["image/jpeg", "image/png", "image/jpg"];
      if (!validFileTypes.includes(albumArt.type)) {
        validationErrors.push("Album art must be a JPG or PNG image.");
      }
    }
    if (!type) validationErrors.push("Type is required.");
    if (!price || isNaN(price) || parseFloat(price) < 0.99) {
      validationErrors.push("Price must be greater than 0.99 moneys.");
    }
    if (!genre) validationErrors.push("Genre is required.");
    return validationErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorArr([]);
    setIsSubmitting(true);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrorArr(validationErrors);
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("album_art", albumArt);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("genre", genre);

    await dispatch(createAlbumThunk(formData))
      .then(() => {
        setIsSubmitting(false);
        navigate("/");
      })
      .catch((err) => {
        setErrorArr([err.message]);
        setIsSubmitting(false);
      });
  };

  const handlePriceFocus = () => {
    if (price === "0.00") {
      setPrice("");
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/[^0-9.]/g, "");
    setPrice(formattedValue);
  };

  const handlePriceBlur = () => {
    if (price === "" || isNaN(price)) {
      setPrice("0.00");
    } else {
      setPrice(parseFloat(price).toFixed(2));
    }
  };

  return (
    <div id="albumFormContainer">
      <h1>Add your Content</h1>
      <ul>
        {errorArr.map((error, idx) => (
          <li key={idx} style={{ color: "red" }}>
            {error}
          </li>
        ))}
      </ul>
      <hr />
      <form
        id="albumForm"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label>
          What's your content's name?
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Title"
          />
        </label>
        <label className="album-art-upload">
          Upload image for media{" "}
          <input
            type="file"
            className="filetypeAlbumArt"
            onChange={(e) => setAlbumArt(e.target.files[0])}
          />
        </label>
        <label>
          Is it an album or podcast?
          <select
            name="type"
            id="album-form-type-select"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="" disabled>
              Please select a type
            </option>
            <option value="Album">Album</option>
            <option value="Podcast">Podcast</option>
          </select>
        </label>
        <label>
          How much would you like to sell it for?
          <input
            type="text"
            value={price}
            onFocus={handlePriceFocus}
            onChange={handlePriceChange}
            onBlur={handlePriceBlur}
          />
        </label>
        <label>
          {type.length > 1 && "What genre is your media?"}
          <select
            name="genre"
            id="album-form-genre-select"
            onChange={(e) => setGenre(e.target.value)}
          >
            {type === "Album" && (
              <>
                <option value="Rock">Rock</option>
                <option value="Reggae">Reggae</option>
                <option value="Ska">Ska</option>
                <option value="Dancehall">Dancehall</option>
                <option value="Dub">Dub</option>
                <option value="Punk">Punk</option>
                <option value="Jazz">Jazz</option>
                <option value="Hip-Hop">Hip-Hop</option>
                <option value="Soul/RnB">Soul or RNB</option>
                <option value="Soundtrack">Soundtrack</option>
                <option value="Electronic">Electronic</option>
                <option value="Latin">Latin</option>
                <option value="Blues">Blues</option>
                <option value="Classical">Classical</option>
                <option value="Indie">Indie</option>
                <option value="Folk">Folk</option>
                <option value="Funk">Funk</option>
              </>
            )}
            {type === "Podcast" && (
              <>
                <option value="Fiction">Fiction</option>
                <option value="True Crime">True Crime</option>
                <option value="News">News</option>
                <option value="Sports">Sports</option>
                <option value="History">History</option>
                <option value="Comedy">Comedy</option>
                <option value="Education">Education</option>
                <option value="Science">Science</option>
                <option value="Business">Business</option>
              </>
            )}
          </select>
        </label>
        <button
          type="submit"
          id="album-form-submit-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting..." : "Create"}
        </button>
      </form>
    </div>
  );
};

export default AlbumCreation;
