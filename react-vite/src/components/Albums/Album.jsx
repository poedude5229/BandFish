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
            contextMenu="disabled"
          ></audio>
        </span>
        <span id="bandfish-filler-text">
          <span style={{ color: "#8d8d8d", fontSize: "32px" }}>
            Digital Album
          </span>
          Includes unlimited streaming via the BandFish website, plus bragging
          rights. Maybe in the future we'll let you download this!
        </span>
      </div>
    </>
  );
}
