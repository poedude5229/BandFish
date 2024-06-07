import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import {
  deleteReviewThunk,
  loadSingleAlbumThunk,
  postReviewForAlbumThunk,
  editReviewForAlbumThunk,
} from "../../redux/album";
import { useEffect, useState } from "react";
import "./Modals.css";

export function DeleteReviewModal({ albumId, reviewId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const deleteReviewEvent = async (e) => {
    e.preventDefault();

    await dispatch(deleteReviewThunk(albumId, reviewId));
    await dispatch(loadSingleAlbumThunk(albumId)).then(
      navigate(`/albums/${albumId}`)
    );
    closeModal();
  };

  return (
    <>
      <div className="delete-review-modal">
        <div className="delete-modal-container">
          <h1 id="delete-review-confirm">
            Would you like to delete this review? This cannot be undone
          </h1>
          <div className="delete-review-button-container">
            <button
              id="confirm-delete-review-button"
              onClick={deleteReviewEvent}
            >
              Yes {"(Delete Review)"}
            </button>
            <button id="cancel-delete-review-button" onClick={closeModal}>
              No {"(Keep Review)"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export function CreateReviewModal({ albumId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    const errors = {};

    if (title.length < 2 || title.length > 60) {
      errors.title =
        "Review title is required and must be between 2 and 60 characters";
    }
    if (body.length < 2 || body.length > 254) {
      errors.body =
        "Review body is required and must be between 2 and 254 characters";
    }
    setValidationErrors(errors);
  }, [title, body]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("body", body);

    await dispatch(postReviewForAlbumThunk(albumId, formData));
    await dispatch(loadSingleAlbumThunk(albumId));
    navigate(`/albums/${albumId}`);
    closeModal();
  };

  return (
    <div className="create-review-modal">
      <h1>Leave a review</h1>
      <div className="create-review-container">
        <label>
          Put a witty title for your review here
          <input
            type="text"
            className="review-title-input"
            value={title}
            maxLength="60"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        {validationErrors.title && (
          <p className="form-errors" style={{ color: "red" }}>
            {validationErrors.title}
          </p>
        )}
        <label>
          Write a thoughtful description of this album
          <textarea
            className="review-body-input"
            value={body}
            maxLength="254"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </label>
        {validationErrors.body && (
          <p className="form-errors" style={{ color: "red" }}>
            {validationErrors.body}
          </p>
        )}
        <button
          onClick={handleSubmit}
          className="submit-dat-review"
          disabled={Object.values(validationErrors).length > 0}
        >
          Submit Review
        </button>
      </div>
    </div>
  );
}

export function UpdateModal({ reviewId, albumId, review }) {
  //   let individualReview = useSelector((state) =>
  //     state.albums[0].reviews?.find((review) => review?.id === parseInt(reviewId))
  //   );
  const { closeModal } = useModal();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [title, setTitle] = useState(review?.title || "");
  const [body, setBody] = useState(review?.body || "");
  const [validationErrors, setValidationErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (review) {
      setTitle(review.title || "");
      setBody(review.body || "");
    }
  }, [review]);

  useEffect(() => {
    const errors = {};

    if (title.length < 2 || title.length > 60) {
      errors.title =
        "Review title is required and must be between 2 and 60 characters";
    }
    if (body.length < 2 || body.length > 254) {
      errors.body =
        "Review body is required and must be between 2 and 254 characters";
    }
    setValidationErrors(errors);
  }, [title, body]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    const formData = new FormData();

    formData.append("title", title);
    formData.append("body", body);

    await dispatch(editReviewForAlbumThunk(albumId, formData, reviewId));
    await dispatch(loadSingleAlbumThunk(albumId));
    navigate(`/albums/${albumId}`);
    closeModal();
  };

  return (
    <div className="create-review-modal" style={{ borderRadius: "5px" }}>
      <h1>Update your review</h1>
      <div className="create-review-container" style={{ borderRadius: "5px" }}>
        <label>
          Put a witty title for your review here
          <input
            type="text"
            className="review-title-input"
            value={title}
            maxLength="60"
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        {validationErrors.title && (
          <p className="form-errors" style={{ color: "red" }}>
            {validationErrors.title}
          </p>
        )}
        <label>
          Write a thoughtful description of this album
          <textarea
            className="review-body-input"
            value={body}
            maxLength="254"
            onChange={(e) => setBody(e.target.value)}
          ></textarea>
        </label>
        {validationErrors.body && (
          <p className="form-errors" style={{ color: "red" }}>
            {validationErrors.body}
          </p>
        )}
        <button
          onClick={handleSubmit}
          className="submit-dat-review"
          disabled={Object.values(validationErrors).length > 0}
        >
          Update Your Review
        </button>
      </div>
    </div>
  );
}
