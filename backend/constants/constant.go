package constants

//USER TYPE
var USER_TYPE = map[string]string {
	"admin" 	: "ADMIN",
	"student" 	: "STUDENT",
	"faculty"	: "FACULTY",
}

var PERIOD_TYPE = map[string]string {
	"PRELIM"	: "PRELIM",
	"MIDTERM"	: "MIDTERM",
	"PREFINAL"	: "PREFINAL",
	"FINAL"		: "FINAL",
}

const USER_TYPE_ADMIN	= "ADMIN"
const USER_TYPE_STUDENT = "STUDENT"
const USER_TYPE_FACULTY = "FACULTY"

const DATE_LAYOUT = "2006-01-02"
// const DATE_LAYOUT = time.RFC3339[:len("1994-12-17")]

const PUBLIC_DIR =  "public/"