const LOAD_ALL_ALBUMS = "albums/LOAD_ALL_ALBUMS";
const LOAD_JUST_ALBUMS = "albums/LOAD_JUST_ALBUMS";
const LOAD_SINGLE_ALBUM = "albums/LOAD_SINGLE_ALBUM";
const LOAD_JUST_PODCASTS = "albums/LOAD_JUST_PODCASTS";
const UPDATE_ALBUM = "albums/UPDATE_ALBUM";
const CREATE_ALBUM = "albums/CREATE_ALBUM";
const DELETE_ALBUM = "albums/DELETE_ALBUM";

const CREATE_REVIEW = "albums/CREATE_REVIEW";
const EDIT_REVIEW = "albums/EDIT_REVIEW";
const DELETE_REVIEW = "albums/DELETE_REVIEW";

const ADD_TRACK = "albums/ADD_TRACK";
const MODIFY_TRACK = "albums/MODIFY_TRACK";
const DELETE_TRACK = "albums/DELETE_TRACK";

const ADD_WISHLIST = "albums/ADD_WISHLIST";
const REMOVE_WISHLIST = "albums/REMOVE_WISHLIST";

// ALBUM ACTIONS
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

const deleteAlbum = (albumId) => ({
  type: DELETE_ALBUM,
  payload: albumId,
});

// REVIEW ACTIONS
const createReview = (review) => ({
  type: CREATE_REVIEW,
  payload: review,
});

const editReview = (review) => ({
  type: EDIT_REVIEW,
  payload: review,
});

const deleteReview = (reviewId) => ({
  type: DELETE_REVIEW,
  payload: reviewId,
});

// WISHLIST ACTIONS
const addWishlist = (albumId) => ({
  type: ADD_WISHLIST,
  payload: albumId,
});

const delWishlist = (wishlistId) => ({
  type: REMOVE_WISHLIST,
  payload: wishlistId,
});

// TRACK ACTIONS
const addTrackForAlbum = (track) => ({
  type: ADD_TRACK,
  payload: track,
});

const modifyTrackForAlbum = (track) => ({
  type: MODIFY_TRACK,
  track,
});

const deleteTrackForAlbum = (trackId) => ({
  type: DELETE_TRACK,
  payload: trackId,
});

// Review Thunks
export const postReviewForAlbumThunk =
  (albumId, review) => async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}/reviews/new`, {
      method: "POST",
      body: review,
    });
    const data = await res.json();
    // console.log(data);
    if (!res.ok) return { errors: data };
    await dispatch(createReview(data));
    return data;
  };

export const editReviewForAlbumThunk =
  (albumId, review, reviewId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}/reviews/${reviewId}`, {
      method: "PUT",
      body: review,
    });
    const data = await res.json();
    if (!res.ok) {
      return { errors: data };
    }
    await dispatch(editReview(data));
    return data;
  };

export const deleteReviewThunk = (albumId, reviewId) => async (dispatch) => {
  const res = await fetch(`/api/albums/${albumId}/reviews/${reviewId}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) {
    return { errors: data };
  }
  await dispatch(deleteReview(reviewId));
};

// Wishlist Thunks
export const addAlbumToWishlist = (albumId) => async (dispatch) => {
  const res = await fetch(`/api/albums/${albumId}/wishlists/new`, {
    method: "POST",
  });
  const data = await res.json();
  if (!res.ok) {
    return { errors: data };
  }
  await dispatch(addWishlist(albumId));
};

export const removeAlbumFromWishlist =
  (albumId, wishlistId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}/wishlists/${wishlistId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) {
      return { errors: data };
    }
    await dispatch(delWishlist(wishlistId));
  };

// Album Thunks
export const createAlbumThunk = (album) => async (dispatch) => {
  const res = await fetch("/api/albums/new", {
    method: "POST",
    body: album,
  });

  const data = await res.json();
  if (!res.ok) return { errors: data };
  await dispatch(createAlbum(data));
};

export const editAlbumThunk = (albumId, album) => async (dispatch) => {
  const res = await fetch(`/api/albums/${albumId}`, {
    method: "PUT",
    body: album,
  });
  const data = await res.json();

  if (!res.ok) {
    return { errors: data };
  }
  await dispatch(editAlbum(data));
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

export const deleteAlbumThunk = (id) => async (dispatch) => {
  let res = await fetch(`/api/albums/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  if (!res.ok) {
    return { errors: data };
  }
  await dispatch(deleteAlbum(id));
};

// Track Thunks
export const addTrackForAlbumThunk = (albumId, track) => async (dispatch) => {
  let res = await fetch(`/api/albums/${albumId}/tracks/new`, {
    method: "POST",
    body: track,
  });
  const data = await res.json();

  if (!res.ok) return { errors: data };
  await dispatch(addTrackForAlbum(data));
  return data;
};

export const updateTrackForAlbumThunk =
  (albumId, track, trackId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}/tracks/${trackId}`, {
      method: "PUT",
      body: track,
    });

    const data = await res.json();
    if (!res.ok) return { errors: data };
    await dispatch(modifyTrackForAlbum(track));
  };

export const deleteTrackForAlbumThunk =
  (albumId, trackId) => async (dispatch) => {
    const res = await fetch(`/api/albums/${albumId}/tracks/${trackId}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!res.ok) return { errors: data };
    await dispatch(deleteTrackForAlbum(trackId));
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
    case UPDATE_ALBUM: {
      return { ...state, [action.album.id]: action.album };
    }
    case DELETE_ALBUM: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    case CREATE_REVIEW: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }

    case EDIT_REVIEW: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_REVIEW: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    case ADD_WISHLIST: {
      const newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case REMOVE_WISHLIST: {
      const newState = { ...state };
      delete newState[action.payload];
      return newState;
    }
    default:
      return state;
  }
}

export default albumReducer;
