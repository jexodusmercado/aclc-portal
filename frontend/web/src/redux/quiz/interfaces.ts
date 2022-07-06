import { Classroom } from "redux/classroom/interface";

export interface QuizData {
    end_date:        string;
    grade_period_id: number;
    id:              number;
    is_published:    boolean;
    updated_at:      string;
    created_at:      string;
    classroom:       Classroom;
    contents:        Content[];
    created_by:      CreatedBy;
    students:        CreatedBy[];
    subject:         Subject;
    grade_period:    string;
}
export interface Content {
    answer:        string;
    created_at:    string;
    id:            number;
    question:      string;
    question_type: string;
    quiz_id:       number;
    updated_at:    string;
    user_input:    string;
}

export interface CreatedBy {
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