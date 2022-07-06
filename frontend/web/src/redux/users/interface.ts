import { Classroom, Course } from "redux/classroom/interface";

export interface StudentUser {
    id:         number;
    email:      string;
    username:   string;
    birthday:   string;
    first_name: string;
    last_name:  string;
    full_name:  string;
    type:       string;
    is_active:  boolean;
    created_at: string;
    updated_at: string;
    phone:      string;
    course:     Course;
    classroom:  Classroom;
    image:      string;
}

export interface FacultyUser {
    id:             number;
    email:          string;
    username:       string;
    birthday:       string;
    first_name:     string;
    last_name:      string;
    full_name:      string;
    type:           string;
    is_active:      boolean;
    created_at:     string;
    updated_at:     string;
    phone:          string;
    classes:        Classroom[];
    image:          string;
    student_count:  number;
}
