import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { loadSingleAlbumThunk } from "../../redux/album";
import { NavLink } from "react-router-dom";
import "./Album.css";

export function AlbumDetails() {
  let { albumId } = useParams();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadSingleAlbumThunk(albumId));
  }, [dispatch]);

  let album = useSelector((state) => state.albums);
  let betterAlbum = Object.values({ ...album })[0];
  console.log(betterAlbum?.tracks[0].source);
  useEffect(() => {
    const audioElements = document.querySelectorAll(".audio");
    audioElements.forEach((audioElement) => {
      audioElement.addEventListener("contextmenu", (e) => e.preventDefault());
    });
  }, [betterAlbum]);
  return (
    <>
      <div id="album-details-page-container">
        <h1 id="album-details-page-name">{betterAlbum?.name}</h1>
        <span id="album-details-page-attribution">
          by<span id="album-details-page-author">{betterAlbum?.artist}</span>
        </span>
        <span id="big-audio">
          <span className="downloadHider"></span>
          <audio
            className="audio"
            src={betterAlbum?.tracks[0].source}
            controls
          ></audio>
        </span>
        <span id="bandfish-filler-text">
          <span style={{ color: "#8d8d8d", fontSize: "32px" }}>
            Digital Album
          </span>
          Includes unlimited streaming via the BandFish website, plus bragging
          rights. Maybe in the future we'll let you download this!
        </span>
        <div id="e-commerce-start">
          <span>Buy Digital Album</span>
          <span style={{ display: "flex", gap: "4px" }}>
            <span style={{ color: "white" }}>${betterAlbum?.price}</span>
            <span style={{ color: "#8d8d8d" }}>USD</span>
          </span>
        </div>
        <div id="album-details-page-tracklist">
          {betterAlbum?.tracks.map((track) => (
            <>
              <div>
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
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}
