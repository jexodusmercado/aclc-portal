import { StudentUser } from "redux/users/interface";

export interface Post {
    author:     Author;
    body:       string;
    comments:   Comment[];
    created_at: string;
    extension:  string;
    filename:   string;
    id:         number;
    is_active:  boolean;
    title:      string;
    updated_at: string;
    user_id:    number;
}

export interface Author {
    birthday:   string;
    email:      string;
    first_name: string;
    full_name:  string;
    id:         number;
    image:      string;
    last_name:  string;
    phone:      string;
    type:       string;
    username:   string;
}

export interface Comment {
    id:             number;
    post_id:        number;
    user:           StudentUser;
    message:        string;
    created_at:     string;
    updatedt_at:    string;
}