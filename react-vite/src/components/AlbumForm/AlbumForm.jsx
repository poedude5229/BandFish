import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createAlbumThunk } from "../../redux/album";
import "./AlbumForm.css";
const AlbumCreation = () => {
  let dispatch = useDispatch();
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.session.user);
  const [name, setName] = useState("");
  const [albumArt, setAlbumArt] = useState(null);
  const [type, setType] = useState("Album");
  const [price, setPrice] = useState("0.00");
  const [genre, setGenre] = useState("");
  const [errors, setErrors] = useState({});
  const [errorArr, setErrorArr] = useState([]);
  useEffect(() => {
    if (!currentUser) navigate("/");
  }, [navigate, currentUser]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("album_art", albumArt);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("genre", genre);

    const serverResponse = await dispatch(createAlbumThunk(formData));

    if (serverResponse) {
      setErrors(serverResponse);
    }
  };

  const handlePriceFocus = () => {
    if (price === "0.00") {
      setPrice("");
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const formattedValue = value.replace(/[^0-9.]/g, ""); // Allow only numbers and dots
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
      {errors.server && <p>{errors.server}</p>}
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
            {type == "Album" && (
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
                <option value="Country">Country</option>
                <option value="Pop">Pop</option>
              </>
            )}
            {type == "Podcast" && <option value="Podcast">Podcast</option>}
          </select>
        </label>
        <button id="album-form-submit-button" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default AlbumCreation;
