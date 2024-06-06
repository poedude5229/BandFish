import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  addTrackForAlbumThunk,
  deleteTrackForAlbumThunk,
  loadSingleAlbumThunk,
  updateTrackForAlbumThunk,
} from "../../redux/album";
import "./AddTrackForm.css";
import { useModal } from "../../context/Modal";

export function AddTrackModal({ albumId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const [submitted, setHasSubmitted] = useState(false);
  const [title, setTitle] = useState("");
  const [source, setSource] = useState(null);
  const [errorArr, setErrorArr] = useState([]);

  const validateForm = () => {
    const validationErrors = [];
    if (!title) {
      validationErrors.push(
        "Title is required for song and must be less than 256 characters"
      );
    }
    if (!source) {
      validationErrors.push("File for track is required");
    } else {
      const validFileTypes = ["audio/mpeg", "audio/mp3"];
      if (!validFileTypes.includes(source.type)) {
        validationErrors.push("Album art must be an mp3 file.");
      }
    }
    return validationErrors;
  };
  const addTrackEvent = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    setErrorArr([]);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrorArr(validationErrors);
      setHasSubmitted(false);
      return;
    }
    const formData = new FormData();
    formData.append("title", title);
    formData.append("source", source);

    await dispatch(addTrackForAlbumThunk(albumId, formData))
      .then(() => {
        setHasSubmitted(false);
        dispatch(loadSingleAlbumThunk(albumId));
        navigate(`/albums/${albumId}`);
        closeModal();
      })
      .catch((err) => {
        setErrorArr([err.message]);
        setHasSubmitted(false);
      });
  };
  return (
    <div id="addTrackFormContainer" style={{ width: "500px" }}>
      <h1 style={{ fontSize: "50px", marginLeft: "24px" }}>Add a track</h1>
      {/* <ul style={{ listStyle: "none", fontSize: "24px" }}></ul> */}
      <hr
        style={{
          height: "4px",
          backgroundColor: "black",
          border: "none",
          width: "470px",
          marginTop: "-40px",
        }}
      />
      <form
        className="trackForm"
        onSubmit={addTrackEvent}
        style={{ display: "flex", flexDirection: "column" }}
        encType="multipart/form-data"
      >
        <label
          style={{ fontSize: "24px", display: "flex", flexDirection: "column" }}
        >
          What's the name of this track?
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          <input type="file" onChange={(e) => setSource(e.target.files[0])} />
        </label>
        <button type="submit">Add Track</button>
      </form>
    </div>
  );
}
