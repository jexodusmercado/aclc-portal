
export interface QuizData {
    end_date:        Date;
    grade_period_id: number;
    id:              number;
    is_published:    boolean;
    updated_at:      Date;
    created_at:      Date;
    classroom:       Classroom;
    contents:        Content[];
    created_by:      CreatedBy;
    students:        CreatedBy[];
    subject:         Subject;
}

export interface Classroom {
    body:       string;
    created_at: Date;
    id:         number;
    title:      string;
    updated_at: Date;
}

export interface Content {
    answer:        string;
    created_at:    Date;
    id:            number;
    question:      string;
    question_type: string;
    quiz_id:       number;
    updated_at:    Date;
    user_input:    string;
}

export interface CreatedBy {
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

export interface Subject {
    ID:         number;
    code:       string;
    created_at: Date;
    is_active:  boolean;
    name:       string;
    unit:       number;
    updated_at: Date;
}