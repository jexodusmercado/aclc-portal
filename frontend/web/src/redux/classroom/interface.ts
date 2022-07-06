import { Post } from "redux/post/interface";
import { QuizData } from "redux/quiz/interfaces";

export interface Student {
    birthday:       Date;
    classroom:      Classroom[];
    course:         Course;
    created_at:     Date;
    email:          string;
    first_name:     string;
    full_name:      string;
    id:             number;
    image:          string;
    is_active:      boolean;
    last_name:      string;
    phone:          string;
    type:           string;
    updated_at:     Date;
    username:       string;
    totalStudents:  number;
}

export interface Classroom {
    body:          null;
    created_at:    Date;
    grades:        null;
    id:            number;
    posts:         Post[];
    quizzes:       QuizData[];
    student:       Student[];
    subject:       Subject;
    subject_id:    number;
    teacher:       Teacher;
    teacher_id:    number;
    title:         string;
    totalStudents: number;
    updated_at:    Date;
}

// id: comment.id,
// message: comment.message,
// full_name: comment.user.full_name,
// image: comment.user.email,
// createdAt: comment.created_at

export interface Subject {
    ID:         number;
    code:       string;
    created_at: Date;
    is_active:  boolean;
    name:       string;
    unit:       number;
    updated_at: Date;
}

export interface Course {
    ID:          number;
    created_at:  Date;
    description: string;
    is_active:   boolean;
    name:        string;
    updated_at:  Date;
}

export interface Teacher {
    birthday:   Date;
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
