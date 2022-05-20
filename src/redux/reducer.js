const initialState = {
    allMovie: [],
    favMovie: [],

}

export const reducer = (state = initialState, action) => {
    let allMovie, favMovie, id;
    switch (action.type) {
        case "DELETE_MOVIE":
            allMovie = []
            return { ...state, allMovie }
        case "ADD_MOVIE":
            allMovie = [...state.allMovie, action.payload]
            return { ...state, allMovie }
        case "ADD_TO_FAVORITE":
            const r = state.favMovie.find((item) => item.imdbID === action.payload.imdbID);
            if (r === undefined) {
                favMovie = [...state.favMovie, action.payload]
                return { ...state, favMovie }
            }
            return state
        case "DELETE_FROM_FAVORITE":
            id = action.payload;
            favMovie = state.favMovie.filter((item) => item.imdbID !== id)
            return { ...state, favMovie }
        default:
            return state
    }
}