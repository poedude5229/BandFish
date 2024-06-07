import { useEffect, useState } from "react";
import { loadJustAlbumsThunk } from "../../redux/album";
import { useDispatch, useSelector } from "react-redux";
import "./Albums.css";
import { AlbumSideBar } from "./AlbumSidebar";
import { useNavigate } from "react-router-dom";

function truncateTitle(text) {
  if (text.length > 30) {
    return text.slice(0, 30) + "...";
  }
  return text;
}

export function Albums() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadJustAlbumsThunk());
  }, [dispatch]);
  let albums = useSelector((state) => state.albums);
  let albArray = Object?.values(albums);
  const [selected, setSelected] = useState(undefined);
  //   console.log(selected);
  useEffect(() => {
    setSelected(albums[2]);
  }, [albums]);
  let navigate = useNavigate();
  return (
    <>
      <div id="albums-container">
        {albArray.map((album) => (
          <div key={album?.id} className="album-container">
            <img
              src={album?.album_art}
              alt={`${album?.name} cover art`}
              className="album-art-albums-page"
              onClick={() => setSelected(album)}
            />
            <p
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/albums/${album?.id}`)}
              className="albums-page-album-title"
            >
              {truncateTitle(album?.name)}
            </p>
            <p className="albums-page-album-artist">by {album?.artist}</p>
          </div>
        ))}
      </div>
      {/* <div id="album-sidebar-container">
        <img
          src={selected?.album_art}
          alt={`${selected?.name} cover image`}
          className="album-sidebar-img"
        />
      </div> */}
      <AlbumSideBar album={selected} />
    </>
  );
}
