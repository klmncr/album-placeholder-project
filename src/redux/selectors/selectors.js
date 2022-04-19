export const albumListSelector = ((state) => state.albumList.albumList);

export const albumPhotosSelector = ((state, id) => state.album.photos[id]);

export const activeAlbumSelector = ((state) => state.album.activeAlbum);
