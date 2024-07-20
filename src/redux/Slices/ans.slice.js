import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../config/axiosInstance";

const initialState = {
    downloadedAnswers: [],
    solutionList: [[]],
    currentAnswer: {
        ans: ""
    }
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

export const getSolutions = createAsyncThunk('solutions/getSolutions', async (quesId) => {
    try {
        const response = axiosInstance.get(`solution/${quesId}`, {
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

// export const currQues = createAsyncThunk('currQues', async (data) => {
//     try {
//         const response = axiosInstance.get(`question/${data}`, {
//             headers: {
//                 'x-access-token': localStorage.getItem('token')
//             }
//         });
//         if(!response) toast.error('Something went wrong');
//         return await response;
//     } catch (error) {
//         console.log(error);
//     }
// })

// export const getAllCreatedQuestionsForTheUser = createAsyncThunk('Questions/getAllCreatedQuestionsForTheUser', async () => {
//     try {
//         const response = axiosInstance.get('getMyCreatedQuestions', {
//             headers: {
//                 'x-access-token': localStorage.getItem('token')
//             }
//         });
//         toast.promise(response, {
//             success: 'Successfully loaded all the Questions',
//             loading: 'Fetching Questions belonging to you',
//             error: 'Something went wrong'
//         });
//         return await response;
//     } catch (error) {
//         console.log(error);
//     }
// });

// export const updateQuestion = createAsyncThunk('Questions/updateQuestion', async (Question) => {
//     try {
//         const response = axiosInstance.patch(`Question/${Question._id}`, Question, {
//             headers: {
//                 'x-access-token': localStorage.getItem('token')
//             }
//         });
//         toast.promise(response, {
//             success: 'Successfully update the Question',
//             loading: 'Updating the Question...',
//             error: 'Something went wrong'
//         });
//         return await response;
//     } catch (error) {
//         console.log(error);
//     }
// });

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

const answerSlice = createSlice({
    name: 'answer',
    initialState,
    reducers: {
        // filterQuestion: (state, action) => {
        //     let status = action.payload.status.toLowerCase();
        //     if(status === "in progress") status = "inProgress";
        //     if(status === "on hold") status = "onHold";
        //     state.questionList = state.downloadedQuestions.filter((Question) => Question.status === status);
        // },
        resetQuestionList: (state) => {
            state.questionList = state.downloadedQuestions; 
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(getSolutions.fulfilled, (state, action) => {
            if(!action?.payload?.data) return;
            state.solutionList = action?.payload?.data?.data;
        })
        .addCase(getAllSolutions.fulfilled, (state, action) => {
            if(!action?.payload) return;
            state.solutionList = action?.payload;
        })
        // .addCase(updateQuestion.fulfilled, (state, action) => {
        //     console.log(action.payload);
        //     const updatedQuestion = action.payload.data.result;
        //     state.QuestionList = state.QuestionList.map((Question) => {
        //         if(Question._id === updatedQuestion._id) return updatedQuestion;
        //         return Question;
        //     });
        //     state.downloadedQuestions = state.downloadedQuestions.map((Question) => {
        //         if(Question._id === updatedQuestion._id) return updatedQuestion;
        //         return Question;
        //     });
        //     state.QuestionDistribution = {
        //         open: 0,
        //         inProgress: 0,
        //         onHold: 0,
        //         cancelled: 0,
        //         resolved: 0
        //     };
        //     state.downloadedQuestions.forEach(Question => {
        //         state.QuestionDistribution[Question.status] += 1;
        //     });
        // })
        .addCase(createAnswer.fulfilled, (state, action) => {
            console.log(action.payload.data);
            if(action?.payload?.data === undefined) return;
        })
        // .addCase(getAllCreatedQuestionsForTheUser.fulfilled, (state, action) => {
        //     if(!action?.payload?.data) return;
        //     state.QuestionList = action?.payload?.data?.result;
        //     const Questions = action?.payload?.data?.result;
        //     state.downloadedQuestions = action?.payload?.data?.result;
        //     state.QuestionDistribution = {
        //         open: 0,
        //         inProgress: 0,
        //         onHold: 0,
        //         cancelled: 0,
        //         resolved: 0
        //     };
        //     Questions.forEach(Question => {
        //         state.QuestionDistribution[Question.status] += 1;
        //     });
        // })
    }
});

export const { resetQuestionList } = answerSlice.actions;

export default answerSlice.reducer;