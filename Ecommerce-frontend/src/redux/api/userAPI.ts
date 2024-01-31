// USING REDUX RTK QUERY

// Importing necessary functions from the RTK Query library
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { server } from "../store";

// createApi: This function takes an object including reducerPath, baseQuery, and endpoints
export const userApi = createApi({
    // This is a string value that represents unique name for the reducer path
    reducerPath: "userApi",

    // fetchBaseQuery: This function creates a base query function that can be used with RTK Query endpoints
    baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/user` }),

    // endpoints: This is an object where each key represents an API endpoint.
    endpoints: (builder) => ({
        // Defining a 'login' endpoint using builder.mutation
        //Mutations typically correspond to operations that modify data on the server, such as creating or updating resources.
        // return type will be string
        login: builder.mutation<string, number>({
            // It takes a parameter user, which presumably contains the data to be sent in the request body.
            query: (user) => ({
                // url: This specifies the endpoint relative to the base URL defined earlier (${server}/api/v1/user). 
                //In this case, it's set to "new".
                // api/v1/user/new
                url: "new",
                method: "POST",
                // This specifies the data to be sent in the request body. 
                //In this case, it's set to the user parameter,
                // which presumably contains the user's credentials or other relevant information needed for authentication or login.
                body: user,
            })
        })
    })
})
