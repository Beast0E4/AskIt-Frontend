import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
    downloadedAnswers: [],
    solutionList: [[]],
    currentAnswer: {}
};

export const getAllSolutions = createAsyncThunk('solutions/getAllSolutions', async (data) => {
    try {
        const response = data;
        if(!response) toast.error('Something went wrong');
        return await response;
    } catch (error) {
        console.log(error);
    }
});

export const getSolutionByQuestion = createAsyncThunk('solutions/solutionByQuestion', async (quesId) => {
    try {
        const response = axiosInstance.get(`solutionByQuestion/${quesId}`, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        if(!response) toast.error('Something went wrong');
        return await response;
    } catch (error) {
        console.log(error);
    }
});

export const getSolution = createAsyncThunk('solution', async(solId) => {
    try {
        const response = axiosInstance.get(`solution/${solId}`, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        if(!response) toast.error('Something went wrong');
        return await response;
    } catch (error) {
        console.log(error);
    }
})

export const createAnswer = createAsyncThunk('answer/createAnswer', async (answer) => {
    try {
        const response = axiosInstance.post(`solution/submit`, answer, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        toast.promise(response, {
            success: 'Successfully created the answer',
            loading: 'Creating the answer...',
            error: 'Something went wrong'
        });
        return await response;
    } catch (error) {
        console.log(error);
    }
});

export const updateAnswer = createAsyncThunk('answer/updateAnswer', async ({id, solution}) => {
    try {
        const response = axiosInstance.patch(`solution/updateSolution/${id}`, solution, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        });
        if(!response) toast.error('Something went wrong');
        return await response;
    } catch (error) {
        console.log(error);
    }
});

export const deleteSol = createAsyncThunk('/sol/delete', async(id) => {
    try {
        const response = axiosInstance.delete(`solution/deleteSolution/${id}`, {
            headers: {
                'x-access-token': localStorage.getItem('token')
            }
        })
        toast.promise(response, {
            loading: 'Deleting the solution',
            success: 'Successfully deleted the solution',
            error: 'Something went wrong, try again'
        });
        return await response;
    } catch (error) {
        console.log(error);
    }
})

const answerSlice = createSlice({
    name: 'answer',
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(getSolutionByQuestion.fulfilled, (state, action) => {
            if(!action?.payload?.data) return;
            state.solutionList = action?.payload?.data?.data;
        })
        .addCase(getAllSolutions.fulfilled, (state, action) => {
            if(!action?.payload) return;
            state.solutionList = action?.payload;
        })
        .addCase(createAnswer.fulfilled, (state, action) => {
            console.log(action.payload.data);
            if(action?.payload?.data === undefined) return;
        })
        .addCase(getSolution.fulfilled, (state, action) => {
            if(!action?.payload?.data) return;
            state.currentAnswer = action?.payload?.data?.data;
        })
    }
});

export default answerSlice.reducer;