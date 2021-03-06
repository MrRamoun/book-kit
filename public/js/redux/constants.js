/* Auth Lock Actions */
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_ERROR = 'LOGIN_ERROR';
const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_ERROR = 'LOGOUT_ERROR';

/* Redux Action Names */
const SEARCH_TEXT_CHANGE = 'SEARCH_TEXT_CHANGE';

/* POST HTTP requests */
const ADD_BOOKMARK_SUCCESS = 'ADD_BOOKMARK_SUCCESS'; // '/bookmark'
const ADD_BOOKMARK_ERROR = 'ADD_BOOKMARK_ERROR';
const ADD_FOLDER_SUCCESS = 'ADD_FOLDER_SUCCESS'; // '/folder'
const ADD_FOLDER_ERROR = 'ADD_FOLDER_ERROR';
const SHARE_FOLDER_SUCCESS = 'SHARE_FOLDER_SUCCESS';
const SHARE_FOLDER_ERROR = 'SHARE_FOLDER_ERROR';

/* GET HTTP requests */
const GET_BOOKMARKS_SUCCESS = 'GET_BOOKMARKS_SUCCESS'; // '/bookmarks'
const GET_BOOKMARKS_ERROR = 'GET_BOOKMARKS_ERROR';
const GET_FOLDERS_SUCCESS = 'GET_FOLDERS_SUCCESS'; // '/folders'
const GET_FOLDERS_ERROR = 'GET_FOLDERS_ERROR';
const GET_TAGS_SUCCESS = 'GET_TAGS_SUCCESS'; // '/tags'
const GET_TAGS_ERROR = 'GET_TAGS_ERROR';

/* PUT HTTP requests */
const EDIT_BOOKMARK_SUCCESS = 'EDIT_BOOKMARK_SUCCESS'; // '/bookmark/:id'
const EDIT_BOOKMARK_ERROR = 'EDIT_BOOKMARK_ERROR';
const EDIT_FOLDER_SUCCESS = 'EDIT_FOLDER_SUCCESS'; // '/bookmark/:id'
const EDIT_FOLDER_ERROR = 'EDIT_FOLDER_ERROR';
const EDIT_TAG_SUCCESS = 'EDIT_TAG_SUCCESS';
const EDIT_TAG_ERROR = 'EDIT_TAG_ERROR';

/* DELETE HTTP requests */
const DELETE_BOOKMARK_SUCCESS = 'DELETE_BOOKMARK_SUCCESS'; // '/bookmark/:id'
const DELETE_BOOKMARK_ERROR = 'DELETE_BOOKMARK_ERROR';
const DELETE_FOLDER_SUCCESS = 'DELETE_FOLDER_SUCCESS'; // '/bookmark/:id'
const DELETE_FOLDER_ERROR = 'DELETE_FOLDER_ERROR';
const DELETE_TAG_SUCCESS = 'DELETE_TAG_SUCCESS';
const DELETE_TAG_ERROR = 'DELETE_TAG_ERROR';

exports.LOGIN_SUCCESS = LOGIN_SUCCESS;
exports.LOGIN_ERROR = LOGIN_ERROR;
exports.LOGOUT_REQUEST = LOGOUT_REQUEST;
exports.LOGOUT_SUCCESS = LOGOUT_SUCCESS;
exports.LOGOUT_ERROR = LOGOUT_ERROR;

exports.SEARCH_TEXT_CHANGE = SEARCH_TEXT_CHANGE;

/* POST HTTP requests */
exports.ADD_BOOKMARK_SUCCESS = ADD_BOOKMARK_SUCCESS; // /bookmark
exports.ADD_BOOKMARK_ERROR = ADD_BOOKMARK_ERROR;
exports.ADD_FOLDER_SUCCESS = ADD_FOLDER_SUCCESS; // /folder
exports.ADD_FOLDER_ERROR = ADD_FOLDER_ERROR;
exports.SHARE_FOLDER_SUCCESS = SHARE_FOLDER_SUCCESS;
exports.SHARE_FOLDER_ERROR = SHARE_FOLDER_ERROR;

/* GET HTTP requests */
exports.GET_BOOKMARKS_SUCCESS = GET_BOOKMARKS_SUCCESS; // /bookmarks
exports.GET_BOOKMARKS_ERROR = GET_BOOKMARKS_ERROR;
exports.GET_FOLDERS_SUCCESS = GET_FOLDERS_SUCCESS; // /folders
exports.GET_FOLDERS_ERROR = GET_FOLDERS_ERROR;
exports.GET_TAGS_SUCCESS = GET_TAGS_SUCCESS; // /tags
exports.GET_TAGS_ERROR = GET_TAGS_ERROR;

/* PUT HTTP requests */
exports.EDIT_BOOKMARK_SUCCESS = EDIT_BOOKMARK_SUCCESS; // /bookmark/:id
exports.EDIT_BOOKMARK_ERROR = EDIT_BOOKMARK_ERROR;
exports.EDIT_FOLDER_SUCCESS = EDIT_FOLDER_SUCCESS; // /bookmark/:id
exports.EDIT_FOLDER_ERROR = EDIT_FOLDER_ERROR;
exports.EDIT_TAG_SUCCESS = EDIT_TAG_SUCCESS;
exports.EDIT_TAG_ERROR = EDIT_TAG_ERROR;

/* DELETE HTTP requests */
exports.DELETE_BOOKMARK_SUCCESS = DELETE_BOOKMARK_SUCCESS; // /bookmark/:id
exports.DELETE_BOOKMARK_ERROR = DELETE_BOOKMARK_ERROR;
exports.DELETE_FOLDER_SUCCESS = DELETE_FOLDER_SUCCESS; // /bookmark/:id
exports.DELETE_FOLDER_ERROR = DELETE_FOLDER_ERROR;
exports.DELETE_TAG_SUCCESS = DELETE_TAG_SUCCESS;
exports.DELETE_TAG_ERROR = DELETE_TAG_ERROR;
