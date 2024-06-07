import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadSingleAlbumThunk } from "../../redux/album";
import { BsExplicitFill } from "react-icons/bs";
// import { NavLink } from "react-router-dom";
import OpenModalMenuItem from "../Navigation/OpenModalMenuItem";
import DeleteAlbumModal from "./DeleteModal.jsx";
import { useNavigate } from "react-router-dom";
import {
  CreateReviewModal,
  DeleteReviewModal,
  UpdateModal,
} from "./ReviewModals.jsx";
import "./Album.css";
import {
  AddTrackModal,
  DeleteTrackModal,
  UpdateTrack,
} from "../AlbumForm/AddTrackForm.jsx";

export function AlbumDetails() {
  const { albumId } = useParams();
  let dispatch = useDispatch();
  let navigate = useNavigate();
  useEffect(() => {
    dispatch(loadSingleAlbumThunk(albumId));
  }, [dispatch, albumId]);
  let currentUser = useSelector((state) => state.session.user);
  let album = useSelector((state) => state.albums);
  if (!album) {
    () => dispatch(loadSingleAlbumThunk(albumId));
  }
  let betterAlbum = Object?.values({ ...album })?.[0];
  let betterAlbReviewsIds = [];
  betterAlbum?.reviews?.forEach((review) =>
    betterAlbReviewsIds.push(review?.user_id)
  );
  // console.log(betterAlbReviewsIds);
  //   console.log(betterAlbum?.tracks?.[0].source);
  useEffect(() => {
    const audioElements = document.querySelectorAll(".audio");
    audioElements.forEach((audioElement) => {
      audioElement.addEventListener("contextmenu", (e) => e.preventDefault());
    });
  }, [betterAlbum]);
  return (
    <>
      <div id="album-details-page-container">
        <h1 id="album-details-page-name">
          {betterAlbum?.name}
          <BsExplicitFill style={{ width: "30px" }} />
        </h1>
        {currentUser && currentUser?.id == betterAlbum?.artist_id && (
          <ul id="managerial-component">
            <li onClick={() => navigate(`/albums/${betterAlbum?.id}/edit`)}>
              <button className="managerial-component-button managerial-update">
                Update Album
              </button>
            </li>
            <OpenModalMenuItem
              itemText={
                <button className="managerial-component-button managerial-delete">
                  Delete Album
                </button>
              }
              modalComponent={<DeleteAlbumModal id={betterAlbum?.id} />}
            />
            <OpenModalMenuItem
              itemText={<button className="track-add">Add a track</button>}
              modalComponent={<AddTrackModal albumId={betterAlbum?.id} />}
            />
          </ul>
        )}
        <span id="album-details-page-attribution">
          by<span id="album-details-page-author">{betterAlbum?.artist}</span>
        </span>
        {betterAlbum?.tracks?.length > 0 && (
          <>
            <p id="big-track-title">{betterAlbum?.tracks?.[0]?.title}</p>
            <span id="big-audio">
              <span className="downloadHider"></span>
              <audio
                className="audio"
                src={betterAlbum?.tracks?.[0]?.source}
                controls
              ></audio>
            </span>
          </>
        )}
        <span id="bandfish-filler-text">
          <span style={{ color: "#8d8d8d", fontSize: "32px" }}>
            Digital Album
          </span>
          Includes unlimited streaming via the BandFish website, plus bragging
          rights. Maybe in the future we&apos;ll let you download this!
        </span>
        <div id="e-commerce-start">
          <span>Buy Digital Album</span>
          <span style={{ display: "flex", gap: "4px" }}>
            <span style={{ color: "white" }}>${betterAlbum?.price}</span>
            <span style={{ color: "#8d8d8d" }}>USD</span>
          </span>
        </div>
        <div id="album-details-page-tracklist">
          {betterAlbum?.tracks?.length > 0 &&
            betterAlbum?.tracks?.map((track) => (
              <>
                <div id="album-track-item">
                  <label>{track?.title}</label>
                  <span
                    style={{
                      width: "300px",
                      backgroundColor: "#f1f3f4",
                      height: "54px",
                      display: "flex",
                      borderRadius: "5px",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span className="downloadBlockerSmall"></span>
                    <audio
                      className="audio"
                      src={track?.source}
                      style={{
                        width: "100%",
                        height: "40px",
                        border: "none",
                        outline: "none",
                        backgroundColor: "rgba(0,0,0,0)",
                      }}
                      controls
                    ></audio>
                  </span>
                  {currentUser && currentUser?.id == betterAlbum?.artist_id && (
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <OpenModalMenuItem
                        modalComponent={
                          <DeleteTrackModal
                            albumId={betterAlbum?.id}
                            trackId={track?.id}
                          />
                        }
                        itemText={
                          <button
                            className="del-tracko"
                            style={{
                              backgroundColor: "#8d8d8d",
                              fontSize: "24px",
                            }}
                          >
                            Delete Track
                          </button>
                        }
                      />
                      <OpenModalMenuItem
                        modalComponent={
                          <UpdateTrack
                            trackId={track?.id}
                            albumid={betterAlbum?.id}
                            track={track}
                          />
                        }
                        itemText={
                          <button
                            className="del-tracko update-tracko"
                            style={{
                              backgroundColor: "#8d8d8d",
                              fontSize: "24px",
                            }}
                          >
                            Update Track
                          </button>
                        }
                      />
                    </div>
                  )}
                </div>
              </>
            ))}
        </div>
      </div>
      <div id="album-details-page-sidebar">
        <div id="album-details-page-sidebar-photo-container">
          <img
            id="album-details-page-sidebar-art"
            src={betterAlbum?.album_art}
            alt={`${betterAlbum?.name} album art`}
          />
          <div id="album-reviews-container">
            <span style={{ fontSize: "24px", paddingBottom: "12px" }}>
              {betterAlbum?.reviews?.length > 0
                ? "Supported by"
                : currentUser && currentUser.id !== betterAlbum?.artist_id
                ? "Be the first to review this album!"
                : "No reviews for this album yet..."}
            </span>
            <div id="reviews-list">
              {betterAlbum?.reviews?.map((review) => (
                <div key={review?.id} className="album-review">
                  <img className="review-pfp" src={review?.user_pfp} alt="" />{" "}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginTop: "-36px",
                      backgroundColor: "rgba(0,0,0,0)",
                      marginLeft: "12px",
                      width: "400px",
                    }}
                  >
                    <p style={{ fontSize: "30px" }}>{review?.user}</p>
                    <p style={{ fontSize: "22px" }}>{review?.title}</p>
                  </div>
                  <p className="album-review-body">{review?.body}</p>
                  {currentUser && review?.user_id == currentUser.id && (
                    <div style={{ marginTop: "" }}>
                      <OpenModalMenuItem
                        modalComponent={
                          <UpdateModal
                            reviewId={review?.id}
                            albumId={betterAlbum?.id}
                            review={review}
                          />
                        }
                        itemText={
                          <button className="update-review-button">
                            Update Review
                          </button>
                        }
                      />
                      <OpenModalMenuItem
                        itemText={
                          <button className="delete-dialog-trigger-button">
                            Delete Review
                          </button>
                        }
                        modalComponent={
                          <DeleteReviewModal
                            albumId={betterAlbum?.id}
                            reviewId={review?.id}
                          />
                        }
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              id="album-details-page-sidebar-artist-pfp"
              src={betterAlbum?.artist_pfp}
              alt={`${betterAlbum?.artist} pfp`}
            />
            <span
              style={{ color: "white", fontSize: "32px", textAlign: "center" }}
            >
              {betterAlbum?.artist}
            </span>
          </div>
        </div>
        {currentUser &&
          !betterAlbReviewsIds.includes(currentUser?.id) &&
          currentUser?.id !== betterAlbum?.artist_id && (
            <div id="album-details-page-sidebar-review-post">
              <OpenModalMenuItem
                itemText={<button>Leave a Review!</button>}
                modalComponent={<CreateReviewModal albumId={betterAlbum?.id} />}
              />
            </div>
          )}
      </div>
    </>
  );
}
