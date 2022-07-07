export interface AuthState {
    user:          AuthUser;
    authenticated: boolean;
}

export interface AuthUser {
    id:            number;
    birthday:      string;
    created_at:    string;
    email:         string;
    first_name:    string;
    full_name:     string;
    is_active:     boolean;
    last_name:     string;
    image:         string;
    phone:         string;
    type:          string;
    updated_at:    string;
    username:      string;
    schoolyear:    string;
    student_count: number;
    classes:       Class[];
}

export interface Class {
    body:       string;
    created_at: string;
    id:         number;
    students:   Student[];
    subject:    Subject;
    title:      string;
    updated_at: string;
}

export interface Student {
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

export interface Subject {
    ID:         number;
    code:       string;
    created_at: string;
    is_active:  boolean;
    name:       string;
    unit:       number;
    updated_at: string;
}