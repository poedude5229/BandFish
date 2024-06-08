import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { deleteAlbumThunk, loadAlbumsThunk } from "../../redux/album";
import "./Modals.css";
function DeleteAlbumModal({ id }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const deleteAlbumEvent = (e) => {
    e.preventDefault();
    dispatch(deleteAlbumThunk(id));
    dispatch(loadAlbumsThunk());
    navigate(`/`);
    closeModal();
  };
  return (
    <>
      <div className="delete-album-modal">
        <h1>Confirm Deletion</h1>
        <p style={{ fontSize: "32px" }}>Would you like to delete this album?</p>
        <div className="delete-album-button-container">
          <button
            id="del-alb-btn"
            style={{ backgroundColor: "#01001a" }}
            onClick={deleteAlbumEvent}
          >
            Yes {"(Delete Album)"}
          </button>
          <button id="del-alb-cancel" onClick={closeModal}>
            No {"(Keep Album)"}
          </button>
        </div>
      </div>
    </>
  );
}

export default DeleteAlbumModal;
