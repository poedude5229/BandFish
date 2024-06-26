import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Profile.css";
import { useEffect, useState } from "react";
import { loadAlbumsThunk, removeAlbumFromWishlist } from "../../redux/album";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteAlbumModal from "./DeleteModal";
import { thunkAuthenticate } from "../../redux/session";
import { DeleteWishlistModal } from "./DeleteWishlistModal";
function Profile() {
  const currentUser = useSelector((state) => state.session.user);
  const allAlbums = Object.values(useSelector((state) => state.albums));
  // const [unWishlisted, setUnWishlisted] = useState(false);
  const [wishlistActive, setWishlistActive] = useState(false);
  const [contentActive, setContentActive] = useState(true);
  const [toggle1, setToggle1] = useState(0);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(thunkAuthenticate());
  }, [dispatch]);

  useEffect(() => {
    dispatch(loadAlbumsThunk());
  }, [toggle1]);
  const ownedAlbums = allAlbums?.filter(
    (album) => album?.artist_id == currentUser?.id
  );

  // const [collectionActive, setCollectionActive] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      navigate("/");
    }
  }, [currentUser, navigate]);

  const wishlisted = currentUser?.wishlists;
  // console.log(wishlisted);
  //   const handleCollectionClick = () => {
  //     setCollectionActive(true);
  //     setWishlistActive(false);
  //     setContentActive(false);
  //   };

  const handleWishlistClick = () => {
    // setCollectionActive(false);
    setWishlistActive(true);
    setContentActive(false);
  };

  const handleContentClick = () => {
    // setCollectionActive(false);
    setWishlistActive(false);
    setContentActive(true);
  };

  return (
    <>
      <div id="profile-page-photo-container">
        <img
          id="profile-page-banner"
          src={currentUser?.profile_banner}
          alt={`${currentUser?.username}'s banner`}
        />
      </div>
      <img
        id="profile-page-avatar"
        src={currentUser?.profile_pic}
        alt={`${currentUser?.username}'s avatar`}
      />
      <div id="sappy-container">
        <p id="your-username-big">{currentUser?.username}</p>
        <p id="profile-page-welcome">Welcome, {currentUser?.firstname}!</p>
      </div>
      <div id="profile-things-container">
        <span
          onClick={handleContentClick}
          style={contentActive ? { color: "white" } : { color: "#8d8d8d" }}
          className="profile-section-selector"
        >
          Your content
        </span>
        {/* <span
          onClick={handleCollectionClick}
          style={collectionActive ? { color: "white" } : { color: "#8d8d8d" }}
          className="profile-section-selector"
        >
          Your collection
        </span> */}
        <span
          onClick={handleWishlistClick}
          style={wishlistActive ? { color: "white" } : { color: "#8d8d8d" }}
          className="profile-section-selector"
        >
          Your wishlist
        </span>
      </div>
      <hr id="profile-section-top-divider" />
      {contentActive && (
        <div id="content-holder">
          {ownedAlbums?.map((album) => (
            <div className="user-content-album-block" key={album?.id}>
              <img
                className="user-content-album-block-art"
                src={album?.album_art}
                alt="An album cover"
                onClick={() => navigate(`/albums/${album?.id}`)}
              />
              <span
                className="user-content-album-name"
                style={{
                  color: "white",
                  fontSize: "25px",
                  width: "185px",
                  marginTop: "10px",
                }}
                onClick={() => navigate(`/albums/${album?.id}`)}
              >
                {album?.name}
              </span>
              <div className="user-content-album-buttons-container">
                <button
                  onClick={() => navigate(`/albums/${album?.id}/edit`)}
                  className="user-content-album-button user-content-album-update"
                >
                  Update Album
                </button>
                <OpenModalMenuItem
                  itemText={
                    <button className="user-content-album-delete">
                      Delete Album
                    </button>
                  }
                  modalComponent={<DeleteAlbumModal id={album?.id} />}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {wishlistActive && (
        <div id="wishlist-holder">
          {wishlisted?.map((album) => (
            <div key={album?.id} className="user-content-album-block">
              <img
                className="user-content-album-block-art"
                src={album?.product?.album_art}
                alt="An album cover"
                onClick={() => navigate(`/albums/${album?.product_id}`)}
              />
              <span
                className="user-content-album-name"
                style={{
                  color: "white",
                  fontSize: "25px",
                  width: "185px",
                  marginTop: "10px",
                }}
                onClick={() => navigate(`/albums/${album?.product_id}`)}
              >
                {album?.product?.name}
              </span>
              <div className="user-content-album-buttons-container">
                <OpenModalMenuItem
                  itemText={<button>remove from wishlist</button>}
                  modalComponent={
                    <DeleteWishlistModal
                      albumid={album?.product_id}
                      wishlistId={album?.id}
                      setToggle1={setToggle1}
                    />
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default Profile;
