import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Carousel.css";
import { useNavigate } from "react-router-dom";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { loadAlbumsThunk } from "../redux/album";

function truncateTitle(text) {
  if (text.length > 27) {
    return text.slice(0, 25) + "...";
  }
  return text;
}

export function Carousel() {
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadAlbumsThunk());
  }, [dispatch]);
  let albums = useSelector((state) => state.albums);
  let albArray = Object.values(albums);
  // console.log(albArray);
  let navigate = useNavigate();
  const carouselRef = useRef(null);
  const scrollLeft = () => {
    carouselRef.current.scrollBy({ left: -200, behavior: "smooth" });
  };
  const scrollRight = () => {
    carouselRef.current.scrollBy({ left: 200, behavior: "smooth" });
  };
  return (
    <div className="carousel-wrapper">
      <button className="carousel-button left" onClick={scrollLeft}>
        {<SlArrowLeft />}
      </button>
      <button className="carousel-button right" onClick={scrollRight}>
        {<SlArrowRight />}
      </button>
      <section className="carousel-container" ref={carouselRef}>
        {albArray?.reverse().map((album) => (
          <div
            key={album?.id}
            className="carousel-item-container"
            onClick={() => navigate(`/albums/${album.id}`)}
          >
            <img
              className="carousel_album_art"
              src={album?.album_art}
              alt={`${album?.name} cover`}
            />
            <span className="carousel-item-title">
              {truncateTitle(album?.name)}
            </span>
            <span className="carousel-item-subtitle">by {album?.artist}</span>
          </div>
        ))}
      </section>
    </div>
  );
}
