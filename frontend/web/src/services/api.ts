export const PUBLIC_PATH = "public"

export let BASE_URL: string | undefined = process.env.REACT_APP_API_URL

export const FILE_PATH: string = BASE_URL + "/"

export const END_POINTS = {
    LOGIN           :   "login",
    REGISTER        :   "register",
    AUTH            :   "auth",
    USER            :   "user",
    COURSE          :   "course",
    SCHOOL_YEAR     :   "school-year",
    ACTIVE          :   "active",
    CHANGE_ACTIVE   :   "change-active",
    CLASSROOM       :   "classroom",
    CREATE          :   "create",
    SUBJECT         :   "subject",
    POST            :   "post",
    DOWNLOAD        :   "download",
    COMMENT         :   "comment",
    TEACHER         :   "teacher",
    QUIZ            :   "quiz",
    CREATOR         :   "creator",
    DELETE          :   "delete",
    CONTENT         :   "content",
    STUDENTS        :   "students",
    STUDENT         :   "student",
    GRADE           :   "grade",
    RANDOM          :   "random",
    ANSWER          :   "answer"
}