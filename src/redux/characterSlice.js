import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    statusLoadingData: 1, //0 - not loaded, 1 - is loading, 2 - loaded, 3 - error loading
    data: {
        info: {},
        results: [],
    },
    characterInfo: {},
    checkLoading: false,
};

const characterSlice = createSlice({
    name: "characters",
    initialState,
    reducers: {
        charactersUpdate: (state, action) => {
            const { info, results } = action.payload;
            results.forEach((character) => {
                state.data.results.push(character);
            });
            state.data.info = info;
        },
        statusUpdate: (state, action) => {
            state.statusLoadingData = action.payload;
        },
        characterInfoUpdate: (state, action) => {
            state.characterInfo = action.payload;
        },
        checkLoadingUpdate: (state, action) => {
            state.checkLoading = action.payload;
        },
    },
});

export const {
    charactersUpdate,
    statusUpdate,
    characterInfoUpdate,
    checkLoadingUpdate,
} = characterSlice.actions;
export default characterSlice.reducer;

export const dataload = (url) => {
    return async (dispatch, getState) => {
        if (!url) {
            const {
                characters: {
                    data: { info },
                },
            } = getState();
            url = info.next;
        }

        if (!url) return;

        try {
            const response = await fetch(url);
            dispatch(statusUpdate(1));
            if (response.ok) {
                const data = await response.json();
                dispatch(statusUpdate(2));
                dispatch(charactersUpdate(data));
            }
        } catch (error) {
            dispatch(statusUpdate(3));
            console.log(error);
        } finally {
            dispatch(checkLoadingUpdate(false));
        }
    };
};

export const characterData = (id) => {
    return async (dispatch) => {
        try {
            const response = await fetch(
                `https://rickandmortyapi.com/api/character/${id}`
            );
            if (response.ok) {
                const characterInfo = await response.json();
                dispatch(characterInfoUpdate(characterInfo));
            }
        } catch (error) {
            console.log("Error" + error);
        }
    };
};
