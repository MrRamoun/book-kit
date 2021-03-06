import fetch from 'isomorphic-fetch';
import actionTypes from './constants';

// URL for heroku: https://shrouded-journey-65738.herokuapp.com/
// URL for localhost: https://localhost:5000
const SERVER_URL = window.location.origin;

/* Fetch Helper Function */

function fetchHelp(url, init = {}) {
  return fetch(url, init).then((res) => {
    // console.log(res.status);
    if (res.status < 200 || res.status >= 300) {
      const error = new Error(res.statusText);
      error.response = res;
      throw error;
    }
    // console.log(res.clone().text(), '<<< fetchHelp response');
    // console.log(url, '<< url');
    return res.text().then(text => {
      // console.log(text, '<<< text');
      // console.log(JSON.parse(text), '<<< JSON.parse');
      // console.log(JSON.stringify(JSON.parse(text)), '<<<< JSON stringify');
      return JSON.parse(text);
    });
  });
}

/* Auth Lock Actions */

function loginSuccess(token, profile) {
  return {
    profile,
    token,
    type: actionTypes.LOGIN_SUCCESS,
  };
}

function loginError(error) {
  return {
    error,
    type: actionTypes.LOGIN_ERROR,
  };
}

function logoutSuccess() {
  // console.log('inside logoutsuccess');
  return {
    type: actionTypes.LOGOUT_SUCCESS,
  };
}

function logout() {
  // console.log('inside actions');
  return dispatch => {
    // console.log('inside dispatch');
    localStorage.removeItem('idToken');
    localStorage.removeItem('profile');
    return dispatch(logoutSuccess());
  };
}

/* Redux Action Creators */

function searchTextChange(text) {
  return {
    text,
    type: actionTypes.SEARCH_TEXT_CHANGE,
  };
}

/* BOOKMARK ACTIONS */
// Get Requests
function getBookmarksSuccess(bookmarks) {
  return {
    bookmarks,
    type: actionTypes.GET_BOOKMARKS_SUCCESS,
  };
}

function getBookmarksError(error) {
  return {
    error,
    type: actionTypes.GET_BOOKMARKS_ERROR,
  };
}

function getBookmarks(token) {
  return (dispatch) => {
    const init = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${SERVER_URL}/bookmarks`;
    const newFetch = fetchHelp(url, init);

    newFetch.then((bookmarks) => {
      return dispatch(
        getBookmarksSuccess(bookmarks.reverse())
      );
    }).catch((error) => {
      return dispatch(
        getBookmarksError(error)
      );
    });
  };
}
// Post Requests
function addBookmarkSuccess(newBookmark) {
  return {
    type: actionTypes.ADD_BOOKMARK_SUCCESS,
    bookmark: newBookmark,
    tags: newBookmark.tags,
  };
}

function addBookmarkError(error) {
  return {
    error,
    type: actionTypes.ADD_BOOKMARK_ERROR,
  };
}

function addBookmark(newBookmark, token) {
  // console.log('inside addBookmark, new bookmark ===>', newBookmark);
  return (dispatch) => {
    newBookmark.foldername = newBookmark.foldername[0].foldername;
    // console.log(newBookmark, '<<< new bookmark for request');
    const tempFoldername = newBookmark.foldername;
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify(newBookmark),
    };

    const url = `${SERVER_URL}/bookmarks`;
    const newFetch = fetchHelp(url, init);

    newFetch.then((bookmark) => {
      // bookmark.foldername = tempFoldername;
      // console.log('returned bookmark=====>', bookmark);
      return dispatch(addBookmarkSuccess(bookmark));
    }).catch((error) => {
      // console.log(error);
      return dispatch(addBookmarkError(error));
    });
  };
}

// Put Requests
function editBookmarkSuccess(editedBookmark) {
  return {
    type: actionTypes.EDIT_BOOKMARK_SUCCESS,
    bookmark: editedBookmark,
  };
}

function editBookmarkError(error) {
  return {
    error,
    type: actionTypes.EDIT_BOOKMARK_ERROR,
  };
}

function editBookmark(editedBookmark, token) {
  // console.log(editedBookmark, '<<<< Actions/ edited bookmark');
  return (dispatch) => {
    editedBookmark.foldername = editedBookmark.foldername[0].foldername;
    // console.log(editedBookmark, '<<< new bookmark for request');
    const init = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(editedBookmark),
    };

    const url = `${SERVER_URL}/bookmarks/${editedBookmark.bookmarkid}`;
    const newFetch = fetchHelp(url, init);

    newFetch.then((bookmark) => {
      // console.log(bookmark, '<<< Actions/ returned bookmark');
      // console.log(JSON.stringify(bookmark), '<<< stringify bookmark');
      return dispatch(editBookmarkSuccess(bookmark));
    }).catch((err) => {
      // console.log(err, 'Actions/ error message');
      return dispatch(editBookmarkError(err));
    });
  };
}

// Delete Requests
function deleteBookmarkSuccess(deletedBookmark) {
  return {
    type: actionTypes.DELETE_BOOKMARK_SUCCESS,
    bookmark: deletedBookmark,
  };
}

function deleteBookmarkError(error) {
  return {
    error,
    type: actionTypes.DELETE_BOOKMARK_ERROR,
  };
}

function deleteBookmark(bookmarkid, token) {
  return (dispatch) => {
    const init = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    // console.log(bookmarkid);
    const url = `${SERVER_URL}/bookmarks/${bookmarkid}`;
    const newFetch = fetchHelp(url, init);

    newFetch.then((bookmark) => {
      // console.log('works');
      return dispatch(deleteBookmarkSuccess(bookmark));
    }).catch((error) => {
      // console.log('error');
      return dispatch(deleteBookmarkError(error));
    });
  };
}

/* FOLDER ACTIONS */
// Get Requests
function getFoldersSuccess(folders) {
  return {
    folders,
    type: actionTypes.GET_FOLDERS_SUCCESS,
  };
}

function getFoldersError(error) {
  return {
    error,
    type: actionTypes.GET_FOLDERS_ERROR,
  };
}

function getFolders(token) {
  return (dispatch) => {
    const init = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${SERVER_URL}/folders`;
    const newFetch = fetchHelp(url, init);

    newFetch.then((folders) => {
      return dispatch(
        getFoldersSuccess(folders)
      );
    }).catch((error) => {
      return dispatch(
        getFoldersError(error)
      );
    });
  };
}

// Post Requests
function addFolderSuccess(newFolderName) {
  return {
    type: actionTypes.ADD_FOLDER_SUCCESS,
    folder: newFolderName,
  };
}

function addFolderError(error) {
  return {
    error,
    type: actionTypes.ADD_FOLDER_ERROR,
  };
}

function addFolder(newFolder, token) {
  return (dispatch) => {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        foldername: newFolder,
      }),
    };

    const url = `${SERVER_URL}/folders`;
    const newFetch = fetchHelp(url, init);

    newFetch.then((folder) => {
      // console.log(folder);
      return dispatch(addFolderSuccess(folder));
    }).catch((error) => {
      // console.log(error);
      return dispatch(addFolderError(error));
    });
  };
}

// share folders

function shareFolderSuccess(folder) {
  return {
    folder,
    type: actionTypes.SHARE_FOLDER_SUCCESS,
  };
}

function shareFolderError(error) {
  return {
    error,
    type: actionTypes.SHARE_FOLDER_ERROR,
  };
}

function shareFolder(folderId, email, token) {
  return (dispatch) => {
    const init = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email,
      }),
    };

    const url = `${SERVER_URL}/folders/customers/${folderId}`;
    const newFetch = fetchHelp(url, init);

    newFetch.then((folder) => {
      return dispatch(shareFolderSuccess(folder));
    }).catch((error) => {
      return dispatch(shareFolderError(error));
    });
  };
}

// Put Requests
function editFolderSuccess(editedFolder) {
  return {
    type: actionTypes.EDIT_FOLDER_SUCCESS,
    folder: editedFolder,
  };
}

function editFolderError(error) {
  return {
    error,
    type: actionTypes.EDIT_FOLDER_ERROR,
  };
}

function editFolder(folderId, folderName, token) {
  // console.log(folderId, folderName, '<<<< Actions/ folderId, folderName');
  return (dispatch) => {
    const folder = {
      folderid: folderId,
      foldername: folderName,
    };

    const init = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(folder),
    };
    const url = `${SERVER_URL}/folders/${folderId}`;
    const newFetch = fetchHelp(url, init);

    newFetch.then((editedFolder) => {
      // console.log(editedFolder, '<<<< Actions/ returned edited folder');
      dispatch(editFolderSuccess(editedFolder));
    }).catch((error) => {
      // console.log(error, '<<<< ERROR');
      dispatch(editFolderError(error));
    });
  };
}

// Delete Requests
function deleteFolderSuccess(deletedFolder) {
  return {
    type: actionTypes.DELETE_FOLDER_SUCCESS,
    folder: deletedFolder,
  };
}

function deleteFolderError(error) {
  return {
    error,
    type: actionTypes.DELETE_FOLDER_ERROR,
  };
}

function deleteFolder(folderid, token) {
  return (dispatch) => {
    const init = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${SERVER_URL}/folders/${folderid}`;
    const newFetch = fetchHelp(url, init);

    newFetch.then((folder) => {
      return dispatch(deleteFolderSuccess(folder));
    }).catch((error) => {
      return dispatch(deleteFolderError(error));
    });
  };
}

/* TAGS ACTIONS */
// Get Requests

function getTagsSuccess(tags) {
  return {
    tags,
    type: actionTypes.GET_TAGS_SUCCESS,
  };
}

function getTagsError(error) {
  return {
    error,
    type: actionTypes.GET_TAGS_ERROR,
  };
}

function getTags(token) {
  return (dispatch) => {
    const init = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${SERVER_URL}/tags`;
    const newFetch = fetchHelp(url, init);

    newFetch.then((tags) => {
      return dispatch(
        getTagsSuccess(tags)
      );
    }).catch((error) => {
      return dispatch(
        getTagsError(error)
      );
    });
  };
}

// TODO: add constant types to constants.js
function editTagSuccess(tag) {
  return {
    tag,
    type: actionTypes.EDIT_TAG_SUCCESS,
  };
}

function editTagError(error) {
  return {
    error,
    type: actionTypes.EDIT_TAG_ERROR,
  };
}

function editTag(tagId, tagName, token) {
  // console.log(tagId, tagName, '<<<< actions/ new tagid and tagname');
  return (dispatch) => {
    const tag = {
      tagid: tagId,
      tagname: tagName,
    };

    const init = {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(tag),
    };
    const url = `${SERVER_URL}/tags/${tagId}`;
    const newFetch = fetchHelp(url, init);

    newFetch.then((editedTag) => {
      // console.log(editedTag, '<<<< edited tag response');
      dispatch(editTagSuccess(editedTag));
    }).catch((error) => {
      // console.log(error, '<<<< edit tag ERROR');
      dispatch(editTagError(error));
    });
  };
}

function deleteTagSuccess(tag) {
  return {
    tag,
    type: actionTypes.DELETE_TAG_SUCCESS,
  };
}

function deleteTagError(error) {
  return {
    error,
    type: actionTypes.DELETE_TAG_ERROR,
  };
}

function deleteTag(tagid, token) {
  // console.log('in actions/deleteTag, tagid==>', tagid);
  return (dispatch) => {
    const init = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };

    const url = `${SERVER_URL}/tags/${tagid}`;
    const newFetch = fetchHelp(url, init);

    newFetch.then((tag) => {
      // console.log('response tag===>', tag);
      return dispatch(deleteTagSuccess(tag));
    }).catch((error) => {
      // console.log('error==>', error);
      return dispatch(deleteTagError(error));
    });
  };
}


exports.logout = logout;
exports.loginSuccess = loginSuccess;
exports.loginError = loginError;
exports.searchTextChange = searchTextChange;
exports.addBookmark = addBookmark;
exports.addFolder = addFolder;
exports.shareFolder = shareFolder;
exports.getBookmarks = getBookmarks;
exports.getFolders = getFolders;
exports.getTags = getTags;
exports.editBookmark = editBookmark;
exports.editFolder = editFolder;
exports.deleteBookmark = deleteBookmark;
exports.deleteFolder = deleteFolder;
exports.getTags = getTags;
exports.editTag = editTag;
exports.deleteTag = deleteTag;
