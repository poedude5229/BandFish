const LOAD_ALL_ALBUMS = "albums/LOAD_ALL_ALBUMS";
const LOAD_JUST_ALBUMS = "albums/LOAD_JUST_ALBUMS";
const loadAllAlbums = (albums) => ({
  type: LOAD_ALL_ALBUMS,
  payload: albums,
});

const loadJustAlbums = (albums) => ({
  type: LOAD_JUST_ALBUMS,
  payload: albums,
});

export const loadAlbumsThunk = () => async (dispatch) => {
  let res = await fetch("/api/albums/all");
  let data = await res.json();

  if (!res.ok) {
    return { errors: data };
  }

  await dispatch(loadAllAlbums(data.albums_and_podcasts));
  return data;
};

export const loadJustAlbumsThunk = () => async (dispatch) => {
  let res = await fetch("/api/albums/albums");
  let data = await res.json();

  if (!res.ok) {
    return { errors: data };
  }

  await dispatch(loadAlbumsThunk(data.albums));
  return data;
};

function albumReducer(state = {}, action) {
  switch (action.type) {
    case LOAD_ALL_ALBUMS: {
      const newState = {};
      action.payload.forEach((album) => {
        newState[album.id] = album;
      });
      return newState;
    }
    case LOAD_JUST_ALBUMS: {
      const newState = {};
      action.payload.forEach((album) => {
        newState[album.id] = album;
      });
      return newState;
    }
    default:
      return state;
  }
}

export default albumReducer;
