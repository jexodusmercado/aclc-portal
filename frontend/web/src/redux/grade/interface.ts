import { User } from "redux/users/interface";

export interface Grade {
    Teacher:       User;
    created_at:    string;
    grade_periods: GradePeriod[];
    id:            number;
    school_year:   SchoolYearClass;
    student:       User;
    subject:       Subject;
    updated_at:    string;
}

export interface GradePeriod {
    class_standing: number;
    created_at:     string;
    exam:           number;
    id:             number;
    period:         string;
    quiz1:          number;
    quiz2:          number;
    updated_at:     string;
}

export interface SchoolYearClass {
    ID:          number;
    created_at:  string;
    is_active:   boolean;
    school_year: string;
    semester:    string;
    updated_at:  string;
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