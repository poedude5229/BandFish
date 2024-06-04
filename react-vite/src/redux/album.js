const LOAD_ALL_ALBUMS = "albums/LOAD_ALL_ALBUMS";
const LOAD_JUST_ALBUMS = "albums/LOAD_JUST_ALBUMS";
const LOAD_SINGLE_ALBUM = "albums/LOAD_SINGLE_ALBUM";
const LOAD_JUST_PODCASTS = "albums/LOAD_JUST_PODCASTS";
const UPDATE_ALBUM = "albums/UPDATE_ALBUM";
const CREATE_ALBUM = "albums/CREATE_ALBUM";
const loadAllAlbums = (albums) => ({
  type: LOAD_ALL_ALBUMS,
  payload: albums,
});

const loadJustAlbums = (albums) => ({
  type: LOAD_JUST_ALBUMS,
  payload: albums,
});

const loadSingleAlbum = (album) => ({
  type: LOAD_SINGLE_ALBUM,
  payload: album,
});

const loadJustPodasts = (podcasts) => ({
  type: LOAD_JUST_PODCASTS,
  payload: podcasts,
});

const createAlbum = (album) => ({
  type: CREATE_ALBUM,
  payload: album,
});

const editAlbum = (album) => ({
  type: UPDATE_ALBUM,
  album,
});

export const createAlbumThunk = (restaurant) => async (dispatch) => {
  const res = await fetch("/api/albums/new", {
    method: "POST",
    body: restaurant,
  });

  const data = await res.json();
  if (!res.ok) return { errors: data };
  await dispatch(createAlbum(data));
};

export const editAlbumThunk =
  (restaurantId, restaurant) => async (dispatch) => {
    const res = await fetch(`/api/albums/${restaurantId}`, {
      method: "PUT",
      body: restaurant,
    });
    const data = await res.json();

    if (!res.ok) {
      return { errors: data };
    }
  };

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

  await dispatch(loadJustAlbums(data.albums));
  return data;
};

export const loadJustPodcastsThunk = () => async (dispatch) => {
  let res = await fetch("/api/albums/podcasts");
  let data = await res.json();

  if (!res.ok) {
    return { errors: data };
  }

  await dispatch(loadJustPodasts(data.podcasts));
  return data;
};

export const loadSingleAlbumThunk = (id) => async (dispatch) => {
  let res = await fetch(`/api/albums/${id}`);
  let data = await res.json();

  if (!res.ok) {
    return { errors: data };
  }

  await dispatch(loadSingleAlbum(data));
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
    case LOAD_JUST_PODCASTS: {
      const newState = {};
      action.payload.forEach((podcast) => {
        newState[podcast.id] = podcast;
      });
      return newState;
    }

    case LOAD_SINGLE_ALBUM: {
      const newState = {};
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case CREATE_ALBUM: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    default:
      return state;
  }
}

export default albumReducer;
