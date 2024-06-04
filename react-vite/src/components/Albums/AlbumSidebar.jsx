import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadSingleAlbumThunk } from "../../redux/album";
import "./AlbumSidebar.css";
export function AlbumSideBar({ album }) {
  //This component is gonna have to be 526px wide or less
  //   I will probably fix this to the side of the "Albums" component
  //   console.log({ album });
  return (
    <>
      {album && (
        <div id="album-sidebar-container">
          <img
            src={album?.album_art}
            alt={`${album?.name} cover image`}
            className="album-sidebar-img"
          />
          <span id="album-sidebar-title">{album?.name}</span>
          <span id="album-sidebar-artist"></span>
        </div>
      )}
    </>
  );
}
