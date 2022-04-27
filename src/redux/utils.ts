import { IAlbum, IPhoto } from "../types/types";

// export const filterArray = (arr: any, filter: string) => {
//     return arr.filter((element) => element.title.toUpperCase().indexOf(filter.toUpperCase()) > -1 || filter === '');
// } 

export function filterArray<T extends { title: string }>(items: T[], title: string): T[] {
    if (!title) {
        return items;
    }
    return items.filter(item => item.title?.toLowerCase().includes(title.toLowerCase()));
}

export const arrOfPhotosToMap = (arr: IPhoto[]) =>
    arr.reduce((acc: { [key: string]: IPhoto[] }, item) => {
        let album = acc[item.albumId] || {};
        album = { ...album, [item.id]: item };
        return { ...acc, [item.albumId]: album };
    }, {});

export const arrToMap = (arr: IAlbum[]) =>
    arr.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});



// export const arrOfUsersToMap = (arr) =>
//     arr.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

// export const arrOfAlbumsToMap = (arr) =>
//     arr.reduce((acc, item) => {
//         let albumList = acc[item.userId] || {};
//         albumList = { ...albumList, [item.id]: item };
//         return { ...acc, [item.userId]: albumList };
//     }, {});