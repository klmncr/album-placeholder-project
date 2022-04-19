export const filterArray = (arr, filter) => {
    return arr.filter((element) => element.title.toUpperCase().indexOf(filter.toUpperCase()) > -1 || filter === '');
}

export const arrOfPhotosToMap = (arr) =>
    arr.reduce((acc, item) => {
        let album = acc[item.albumId] || {};
        album = { ...album, [item.id]: item };
        return { ...acc, [item.albumId]: album };
    }, {});


export const arrToMap = (arr) =>
    arr.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});


    
// export const arrOfUsersToMap = (arr) =>
//     arr.reduce((acc, item) => ({ ...acc, [item.id]: item }), {});

// export const arrOfAlbumsToMap = (arr) =>
//     arr.reduce((acc, item) => {
//         let albumList = acc[item.userId] || {};
//         albumList = { ...albumList, [item.id]: item };
//         return { ...acc, [item.userId]: albumList };
//     }, {});