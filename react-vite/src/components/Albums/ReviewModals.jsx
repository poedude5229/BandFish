import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteReviewThunk, loadSingleAlbumThunk } from "../../redux/album";

export function DeleteReviewModal({ albumId, reviewId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const deleteReviewEvent = (e) => {
    e.preventDefault();

    dispatch(deleteReviewThunk(albumId, reviewId));
    navigate(`/albums/${albumId}`);
    dispatch(loadSingleAlbumThunk(albumId));
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
