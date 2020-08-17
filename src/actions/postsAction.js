// Creo las "actions types"
export const GET_POSTS = "GET_POSTS";
export const GET_POSTS_SUCCESS = "GET_POSTS_SUCCESS";
export const GET_POSTS_FAILURE = "GET_POSTS_FAILURE";

// Creo las "actions creators" que retornen una accion.
// Son funciones que crean acciones.
export const getPosts = () => ({
  type: GET_POSTS,
});

export const getPostsSuccess = (posts) => ({
  type: GET_POSTS_SUCCESS,
  payload: posts,
});

export const getPostsFailure = () => ({
  type: GET_POSTS_FAILURE,
});

// Despacho.
//Consumiendo una API desde determinado componente en un useEffect. (se ejecuta primero)
export function fetchPosts() {
  return async (dispatch) => {
    dispatch(getPosts());

    try {
      const response = await fetch(
        "https://rickandmortyapi.com/api/character/"
      );
      const data = await response.json();

      dispatch(getPostsSuccess(data.results));
    } catch (error) {
      dispatch(getPostsFailure());
    }
  };
}
