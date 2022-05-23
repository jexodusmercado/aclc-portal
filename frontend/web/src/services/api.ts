export let BASE_URL: string | undefined = process.env.REACT_APP_API_URL

export const END_POINTS = {
    LOGIN           :   "login",
    REGISTER        :   "register",
    AUTH            :   "auth",
    USERS           :   "users",
    COURSE          :   "course",
    SCHOOL_YEAR     :   "school-year",
    ACTIVE          :   "active",
    CHANGE_ACTIVE   :   "change-active",
    CLASSROOM       :   "classroom",
    CREATE          :   "create"
}