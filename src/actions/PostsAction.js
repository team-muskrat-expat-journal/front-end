import axiosWithAuth from '../utils/axiosWithAuth';

export const FETCH_POSTS_START = 'FETCH_POSTS_START';
export const FETCH_POSTS_SUCCESS = 'FETCH_POSTS_SUCCESS';
export const FETCH_POSTS_ERROR = 'FETCH_POSTS_ERROR';

export const fetchPosts = (id) => (dispatch) => {
    dispatch({ type: FETCH_POSTS_START });
    axiosWithAuth()
        .get('api/journal')
            .then(res => {
                dispatch({ type: FETCH_POSTS_SUCCESS, payload: res.data });
            })
            .catch(err => {
                dispatch({ type: FETCH_POSTS_ERROR, payload: err.message });
            });
};

export const POST_ADD = 'POST_ADD';
export const POST_ADD_ERROR = 'POST_ADD_ERROR';

export const addPost = (newPost, history, setForm, initialForm) => (
    dispatch
) => {
    axiosWithAuth()
        .post('api/journal', newPost)
            .then(res => {
                console.log(res);
                dispatch({ type: POST_ADD, payload: res.data.posts });
                history.push('/home');
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: POST_ADD_ERROR, payload: err.message });
            })
            .finally(() => {
                setForm(initialForm);
            });
};

export const POST_DELETE = 'POST_DELETE';
export const POST_DELETE_ERROR = 'POST_DELETE_ERROR';

export const deletePost = (id) => (dispatch) => {
    axiosWithAuth()
        .delete(`api/journal/${id}`)
            .then(res => {
                console.log(res);
                dispatch({ type: POST_DELETE, payload: res.data });
            })
            .catch(err => {
                console.log(err)
                dispatch({ type: POST_DELETE_ERROR, payload: err.message });
            });
};

export const POST_EDIT = 'POST_EDIT';
export const POST_EDIT_ERROR = 'POST_EDIT_ERROR';

export const editPost = (id, data) => (dispatch) => {
    axiosWithAuth()
        .put(`api/journal/${id}`, data)
            .then(res => {
                console.log(res);
                dispatch({ type: POST_EDIT, payload: res.data.post });
            })
            .catch(err => {
                console.log(err);
                dispatch({ type: POST_EDIT_ERROR, payload: err.message });
            });
};