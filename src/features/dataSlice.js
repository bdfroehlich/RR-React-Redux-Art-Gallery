//import createSlice method
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    objectId: 10245,
    apiData: {}
}

export const dataSlice = createSlice({
    name:'data',
    initialState,
    reducers: {
        incrementId: state => {
            //spread operator ...state gets access to the current state 
            return {...state, objectId: state.objectId + 1 }
        },
        decrementId: state => {
            return {...state, objectId: state.objectId - 1 }
        },
        customId: (state, action) => {
            return {...state, objectId: state.objectId + action.payload }
        },
        clearData: () => {
            return initialState
        },
        setData: (state, action) => {
            return {...state, apiData : action.payload}
        }
    }
})

export const { incrementId, decrementId, customId, clearData, setData  } = dataSlice.actions;

export const fetchData = () => {
    const fetchDataThunk = async (dispatch, getState) => {
        //retrieve current state
        let state = getState()
        //API call
        const response = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${state.data.objectId}`)
        const resData = await response.json()
        dispatch(setData(resData))
    }
    return fetchDataThunk
}

export default dataSlice.reducer
    
