import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadJustPodcastsThunk } from "../../redux/album";
import "../Albums/Albums.css";
import { AlbumSideBar } from "../Albums/AlbumSidebar";
function truncateTitle(text) {
  if (text.length > 30) {
    return text.slice(0, 30) + "...";
  }
  return text;
}

export function Podcasts() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadJustPodcastsThunk());
  }, [dispatch]);
  let albums = useSelector((state) => state.albums);
  let podArray = Object?.values(albums);
  const [selected2, setSelected2] = useState(undefined);

  return (
    <>
      <div id="albums-container">
        {podArray.map((podcast) => (
          <div key={podcast?.id} className="album-container">
            <img
              src={podcast?.album_art}
              alt={`${podcast?.name} cover art`}
              className="album-art-albums-page"
              onClick={() => setSelected2(podcast)}
            />
            <p className="albums-page-album-title">
              {truncateTitle(podcast?.name)}
            </p>
            <p className="albums-page-album-artist">by {podcast?.artist}</p>
          </div>
        ))}
      </div>
      <AlbumSideBar album={selected2} />
    </>
  );
}
