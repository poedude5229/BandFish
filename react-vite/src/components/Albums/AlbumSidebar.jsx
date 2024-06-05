import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadSingleAlbumThunk } from "../../redux/album";
import "./AlbumSidebar.css";
import { useNavigate } from "react-router-dom";
export function AlbumSideBar({ album }) {
  //This component is gonna have to be 526px wide or less
  //   I will probably fix this to the side of the "Albums" component
  //   console.log({ album });
  let navigate = useNavigate();
  return (
    <>
      {album && (
        <div id="album-sidebar-container">
          <img
            src={album?.album_art}
            alt={`${album?.name} cover image`}
            className="album-sidebar-img"
          />
          <div id="album-sidebar-details-container">
            <span
              id="album-sidebar-title"
              onClick={() => navigate(`/albums/${album?.id}`)}
              style={{ cursor: "pointer" }}
            >
              {album?.name}
            </span>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <img
                id="album-sidebar-artist-pfp"
                src={album["artist-pfp"]}
                alt={`${album?.artist} picture`}
              />
              <span id="album-sidebar-artist">{album?.artist}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
