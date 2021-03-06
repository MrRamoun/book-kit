import { combineReducers } from 'redux';
import jwtDecode from 'jwt-decode';
import actionTypes from './constants';

function auth(state = {}, action) {
  switch (action.type) {
    case actionTypes.LOGIN_SUCCESS: {
      localStorage.setItem('idToken', action.token);
      localStorage.setItem('profile', JSON.stringify(action.profile));

      return Object.assign({}, state, {
        isAuthenticated: true,
        profile: action.profile,
        token: action.token,
        error: '',
      });
    }

    case actionTypes.LOGIN_ERROR: {
      return Object.assign({}, state, {
        isAuthenticated: false,
        profile: null,
        error: action.error,
      });
    }

    case actionTypes.LOGOUT_SUCCESS: {
      return Object.assign({}, state, {
        isAuthenticated: false,
        profile: null,
      });
    }

    default: {
      return state;
    }
  }
}

function searchReducer(state = '', action) {
  switch (action.type) {
    case actionTypes.SEARCH_TEXT_CHANGE: {
      return action.text;
    }

    default: {
      return state;
    }
  }
}

function bookmarkReducer(state = [], action) {
  let index;

  switch (action.type) {
    case actionTypes.ADD_BOOKMARK_SUCCESS: {
      const tempArr = state.slice();
      // console.log(action.bookmark, '<<<< BkmrkReducer/ New Bookmark');
      tempArr.unshift(action.bookmark);
      return tempArr;
    }

    case actionTypes.EDIT_FOLDER_SUCCESS: {
      // console.log(action.folder, '<<<< BkmrkReducer/ Updated Folder');
      const tempArr = state.slice();
      tempArr.forEach((value) => {
        if (value.folderid === action.folder.folderid) {
          value.foldername = action.folder.foldername;
        }
      });

      return tempArr;
    }


    case actionTypes.GET_BOOKMARKS_SUCCESS: {
      return action.bookmarks;
    }

    case actionTypes.EDIT_BOOKMARK_SUCCESS: {
      // console.log(action.bookmark, '<<<< BkmrkReducer/ Updated Bookmark');
      const tempArr = state.slice();
      tempArr.forEach((value, i) => {
        if (value.bookmarkid === action.bookmark.bookmarkid) {
          index = i;
        }
      });
      tempArr[index] = action.bookmark;
      return tempArr;
    }

    case actionTypes.DELETE_BOOKMARK_SUCCESS: {
      const tempArr = state.slice();
      tempArr.forEach((value, i) => {
        if (value.bookmarkid === action.bookmark.bookmarkid) {
          index = i;
        }
      });

      tempArr.splice(index, 1);
      return tempArr;
    }

    case actionTypes.DELETE_TAG_SUCCESS: {
      const tempArr = state.slice();
      // console.log(tempArr, '<<< BookmarkReducer/ Current state');
      for (let i = 0; i < tempArr.length; i++) {
        for (let j = 0; j < tempArr[i].tags.length; j++) {
          if (tempArr[i].tags[j] && (tempArr[i].tags[j].tagid === action.tag.tagid)) {
            tempArr[i].tags.splice(j, 1);
            break;
          }
        }
      }

      return tempArr;
    }

    case actionTypes.ADD_BOOKMARK_ERROR:
    case actionTypes.GET_BOOKMARKS_ERROR:
    case actionTypes.EDIT_BOOKMARK_ERROR:
    case actionTypes.DELETE_BOOKMARK_ERROR: {
      return state;
    }

    default: {
      return state;
    }
  }
}

function folderReducer(state = [], action) {
  // This part of the state is an array
  let index;
  switch (action.type) {
    case actionTypes.ADD_FOLDER_SUCCESS: {
      const newState = state.slice();
      newState.push(action.folder);
      return newState;
    }

    case actionTypes.GET_FOLDERS_SUCCESS: {
      return action.folders;
    }

    case actionTypes.SHARE_FOLDER_SUCCESS:
    case actionTypes.EDIT_FOLDER_SUCCESS: {
      // console.log(action.folder, 'Reducer/ updated folder');
      const tempArr = state.slice();
      tempArr.forEach((value, i) => {
        if (value.folderid === action.folder.folderid) {
          index = i;
        }
      });

      tempArr[index] = action.folder;
      return tempArr;
    }

    case actionTypes.DELETE_FOLDER_SUCCESS: {
      // console.log(action.folder, '<<<< Reducers/ deleted folder');

      const tempArr = state.slice();
      tempArr.forEach((value, i) => {
        if (value.folderid === action.folder.folderid) {
          index = i;
        }
      });

      tempArr.splice(index, 1);
      return tempArr;
    }

    case actionTypes.ADD_FOLDER_ERROR:
    case actionTypes.GET_FOLDERS_ERROR:
    case actionTypes.EDIT_FOLDER_ERROR:
    case actionTypes.SHARE_FOLDER_ERROR: {
      // console.log(action.error, 'Reducer/ edit folder error');
      return state;
    }
    case actionTypes.DELETE_FOLDER_ERROR: {
      // console.log(action.error, '<<<< Reducers/ delete folder error');
      return state;
    }

    default: {
      return state;
    }
  }
}

function tagReducer(state = [], action) {
  let index;
  switch (action.type) {
    case actionTypes.ADD_BOOKMARK_SUCCESS: {
      const tempArr = state.slice();
      const tempTags = action.bookmark.tags.slice();
      // console.log(tempArr, '<<< Tag Reducer/ Tag State Before');
      // console.log(tempTags, '<<< tempTags');
      const newArr = tempTags.filter((tag) => {
        for (let i = 0; i < tempArr.length; i++) {
          if (tag.tagid === tempArr[i].tagid) {
            return false;
          }
        }
        return true;
      });

      // console.log(newArr, '<<< newArr');
      return tempArr.concat(newArr);
    }

    case actionTypes.EDIT_BOOKMARK_SUCCESS: {
      const tempArr = state.slice();
      const tempTags = action.bookmark.tags.slice();
      // console.log(tempArr, '<<< Tag Reducer/ Tag State Before');
      // console.log(tempTags, '<<< tempTags');
      const newArr = tempTags.filter((tag) => {
        for (let i = 0; i < tempArr.length; i++) {
          if (tag.tagid === tempArr[i].tagid) {
            return false;
          }
        }
        return true;
      });

      // console.log(newArr, '<<< newArr');
      return tempArr.concat(newArr);
    }

    case actionTypes.GET_TAGS_SUCCESS: {
      // console.log(action.tags, '<=== Reducers/ action.tags');
      return action.tags;
    }

    case actionTypes.EDIT_TAG_SUCCESS: {
      // console.log(action.tag, '<<<< Reducer/ updated tag');
      const tempArr = state.slice();
      tempArr.forEach((value, i) => {
        if (value.tagid === action.tag.tagid) {
          index = i;
        }
      });

      tempArr[index] = action.tag;
      return tempArr;
    }

    case actionTypes.DELETE_TAG_SUCCESS: {
      // console.log(action.tag.tagid, '<<<< Reducers/ deleted tag id');
      const tempArr = state.slice();
      tempArr.forEach((value, i) => {
        if (value.tagid === action.tag.tagid) {
          index = i;
        }
      });

      tempArr.splice(index, 1);
      return tempArr;
    }

    case actionTypes.GET_TAGS_ERROR: {
      return state;
    }

    default: {
      return state;
    }
  }
}

const rootReducer = combineReducers({
  auth,
  bookmarks: bookmarkReducer,
  folders: folderReducer,
  tags: tagReducer,
  search: searchReducer,
});

exports.rootReducer = rootReducer;
