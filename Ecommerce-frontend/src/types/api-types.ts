import {User} from "./types.ts"

export type MessageResponse = {
    success: boolean,
    message: string
}

// getUserById API at backend.
export type UserResponse ={
    success:boolean,
    user: User
}