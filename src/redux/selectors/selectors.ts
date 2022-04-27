import { RootState } from "../store";

export const albumListSelector = ((state: RootState) => state.albumList.albumList);

export const albumPhotosSelector = ((state: RootState, id: number) => state.album.photos[id]);

export const activeAlbumSelector = ((state: RootState) => state.album.activeAlbum);
