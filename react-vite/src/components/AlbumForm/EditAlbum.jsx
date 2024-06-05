import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { editAlbumThunk, loadSingleAlbumThunk } from "../../redux/album";
import "./AlbumForm.css";

const AlbumEdit = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { albumId } = useParams();
  const currentUser = useSelector((state) => state.session.user);
  const album = useSelector((state) => state.albums[albumId]);

  const [name, setName] = useState("");
  const [albumArt, setAlbumArt] = useState(null);
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [errorArr, setErrorArr] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    dispatch(loadSingleAlbumThunk(albumId));
  }, [dispatch, albumId]);

  useEffect(() => {
    if (album) {
      setName(album.name);
      setAlbumArt(album.album_art);
      setType(album.type);
      setPrice(album.price);
      setGenre(album.genre);
    }
  }, [album]);

  const validateForm = () => {
    const validationErrors = [];
    if (!name) validationErrors.push("Name is required.");
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
    if (albumArt) {
      formData.append("album_art", albumArt); // Append only if a new file is provided
    }
    formData.append("type", type);
    formData.append("price", price);
    formData.append("genre", genre);

    await dispatch(editAlbumThunk(albumId, formData))
      .then(() => {
        setIsSubmitting(false);
        navigate(`/albums/${albumId}`); 
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
      <h1>Edit Album</h1>
      <ul>
        {errorArr.map((error, idx) => (
          <li key={idx} style={{ color: "red" }}>
            {error}
          </li>
        ))}
      </ul>
      <hr />
      {album && (
        <form
          id="albumForm"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
        >
          <label>
            Album Name
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Title"
            />
          </label>
          <label className="album-art-upload">
            Album Art
            <input
              className="filetypeAlbumArt"
              type="file"
              onChange={(e) => setAlbumArt(e.target.files[0])}
            />
          </label>
          <label>
            Type
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              id="album-form-type-select"
            >
              <option value="Album">Album</option>
              <option value="Podcast">Podcast</option>
            </select>
          </label>
          <label>
            Price
            <input
              type="text"
              value={price}
              onFocus={handlePriceFocus}
              onChange={handlePriceChange}
              onBlur={handlePriceBlur}
            />
          </label>
          <label>
            Genre
            <select
              name="genre"
              id="album-form-genre-select"
              value={genre}
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
            {isSubmitting ? "Submitting..." : "Save Changes"}
          </button>
        </form>
      )}
    </div>
  );
};

export default AlbumEdit;
