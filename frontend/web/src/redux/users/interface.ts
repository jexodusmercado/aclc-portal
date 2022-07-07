import { Classroom, Course } from "redux/classroom/interface";

export interface User {
    id:             number;
    student_count:  number;
    email:          string;
    username:       string;
    birthday:       string;
    first_name:     string;
    last_name:      string;
    full_name:      string;
    type:           string;
    created_at:     string;
    updated_at:     string;
    phone:          string;
    image:          string;
    is_active:      boolean;
    school_year:    string;
    course:         Course;
    classroom:      Classroom[];
    classes:        Classroom[];
}