import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useModal } from "../../context/Modal";
import { loadAlbumsThunk, removeAlbumFromWishlist } from "../../redux/album";
import { thunkAuthenticate } from "../../redux/session";

export function DeleteWishlistModal({ albumid, wishlistId, setToggle1 }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { closeModal } = useModal();

  const delWishlistEvent = async (e) => {
    e.preventDefault();
    await dispatch(removeAlbumFromWishlist(albumid, wishlistId));
    setToggle1(1);
    await dispatch(loadAlbumsThunk());
    await dispatch(thunkAuthenticate());
    closeModal();
    navigate(`/profile`);
  };
  return (
    <>
      <div className="delete-wishlist-modal">
        <div className="delete-wishlist-modal-container">
          <h1 id="delete-wishlist-confirm">
            Would you like to remove this album from your wishlist?
          </h1>
          <div className="delete-wishlist-button-container">
            <button
              id="confirm-delete-wishlist-button"
              onClick={delWishlistEvent}
            >
              Yes {"(Remove from Wishlist)"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
