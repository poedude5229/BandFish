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
        validationErrors.push("Track must be an mp3 file.");
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
      setHasSubmitted(true);
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
          style={{
            fontSize: "36px",
            display: "flex",
            flexDirection: "column",
            marginLeft: "12px",
          }}
        >
          What&apos;s the name of this track?
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              backgroundColor: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "24px",
              width: "470px",
              paddingLeft: "12px",
            }}
          />
        </label>
        <label
          style={{
            fontSize: "30px",
            marginLeft: "12px",
            marginTop: "24px",
            display: "flex",
            flexDirection: "column",
            marginBottom: "24px",
          }}
        >
          {" "}
          Choose file
          <input
            style={{ fontSize: "24px" }}
            type="file"
            onChange={(e) => setSource(e.target.files[0])}
          />
        </label>
        <button
          type="submit"
          style={{
            backgroundColor: "#01001a",
            height: "70px",
            width: "120px",
            border: "none",
            borderRadius: "5px",
            color: "white",
            fontSize: "32px",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "12px",
            cursor: "pointer",
            transitionDuration: "500ms",
          }}
          id="addtrackSubmitButton"
        >
          {submitted ? "Submitting.." : "Add Track"}
        </button>
        {submitted && (
          <p
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              fontSize: "32px",
              marginBottom: "12px",
            }}
          >
            Please wait for this pop up to close
          </p>
        )}
      </form>
    </div>
  );
}

export function DeleteTrackModal({ albumId, trackId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const deleteTrackEvent = async (e) => {
    e.preventDefault();

    await dispatch(deleteTrackForAlbumThunk(albumId, trackId));
    await dispatch(loadSingleAlbumThunk(albumId)).then(
      navigate(`/albums/${albumId}`)
    );
    closeModal();
  };

  return (
    <>
      <div className="delete-track-modal">
        <div className="delete-track-modal-container">
          <h1 id="track-delete-confirm">
            Would you like to delete this track? This cannot be undone.
          </h1>
          <div className="delete-track-button-container">
            <button id="confirm-delete-track-button" onClick={deleteTrackEvent}>
              Yes {"(Delete Track)"}
            </button>
            <button id="cancel-delete-track-button" onClick={closeModal}>
              No {"(Keep Track)"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function UpdateTrack({ trackId, albumid, track }) {
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState(track?.title || "");
  const [source, setSource] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [errorArr, setErrorArr] = useState([]);

  useEffect(() => {
    if (!source) {
      setSource(track.source);
    }
  }, [track, source]);

  const validateForm = () => {
    const validationErrors = [];
    if (!title) {
      validationErrors.push(
        "Title is required for song and must be less than 256 characters"
      );
    }
    return validationErrors;
  };

  const updateTrackEvent = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    setErrorArr([]);

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrorArr(validationErrors);
      setSubmitted(false);
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    if (source) {
      formData.append("source", source);
    }

    await dispatch(updateTrackForAlbumThunk(albumid, formData, trackId))
      .then(() => {
        setSubmitted(false);
        dispatch(loadSingleAlbumThunk(albumid));
        navigate(`/albums/${albumid}`);
        closeModal();
      })
      .catch((err) => {
        setErrorArr([err.message]);
        setSubmitted(false);
      });
  };

  return (
    <div id="updateTrackFormContainer" style={{ width: "500px" }}>
      <h1 style={{ fontSize: "50px", marginLeft: "24px" }}>Edit track</h1>
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
        onSubmit={updateTrackEvent}
        style={{ display: "flex", flexDirection: "column" }}
        encType="multipart/form-data"
      >
        <label
          style={{
            fontSize: "36px",
            display: "flex",
            flexDirection: "column",
            marginLeft: "12px",
          }}
        >
          What's the name of this track?
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              backgroundColor: "white",
              border: "none",
              borderRadius: "5px",
              fontSize: "24px",
              width: "470px",
              paddingLeft: "12px",
            }}
          />
        </label>
        <label
          style={{
            fontSize: "30px",
            marginLeft: "12px",
            marginTop: "24px",
            display: "flex",
            flexDirection: "column",
            marginBottom: "24px",
          }}
        >
          Choose file
          <input
            style={{ fontSize: "24px" }}
            type="file"
            onChange={(e) => setSource(e.target.files[0])}
          />
        </label>
        <button
          type="submit"
          id="updatetrackSubmitButton"
          style={{
            backgroundColor: "#01001a",
            height: "70px",
            width: "120px",
            border: "none",
            borderRadius: "5px",
            color: "white",
            fontSize: "32px",
            marginLeft: "auto",
            marginRight: "auto",
            marginBottom: "12px",
            cursor: "pointer",
            transitionDuration: "500ms",
          }}
        >
          {submitted ? "Submitting...." : "Submit edit"}
        </button>
        {submitted && (
          <p
            style={{
              marginLeft: "12px",
              fontSize: "32px",
              marginBottom: "12px",
            }}
          >
            Please wait for this pop up to close
          </p>
        )}
      </form>
    </div>
  );
}
