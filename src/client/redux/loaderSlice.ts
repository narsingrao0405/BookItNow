import  {createSlice} from '@reduxjs/toolkit';

const loaderSlice = createSlice({
	name: 'loader',
	initialState: { isLoading: false },
	reducers: {

        ShowLoader : (state) => {
            state.isLoading = true;
        },
		HideLoader : (state) => {
            state.isLoading = false;
        },

	}
})
export const {ShowLoader, HideLoader} = loaderSlice.actions;
export default loaderSlice.reducer;