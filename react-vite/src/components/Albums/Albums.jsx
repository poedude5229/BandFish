import { useEffect } from "react";
import { loadJustAlbumsThunk } from "../../redux/album";
import { useDispatch, useSelector } from "react-redux";
import "./Albums.css";
export function Albums() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadJustAlbumsThunk());
  }, [dispatch]);
  let albums = useSelector((state) => state.albums);
  let albArray = Object?.values(albums);
  console.log(albArray);
  return (
    <>
      <div id="albums-container">
        {albArray.map((album) => (
          <div key={album.id} className="album-container">
            <img src={album?.album_art} alt={`${album?.name} cover art`} className="album-art-albums-page" />
          </div>
        ))}
      </div>
    </>
  );
}
