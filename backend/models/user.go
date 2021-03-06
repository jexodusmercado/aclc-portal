package models

import (
	"portal/constants"

	"gorm.io/gorm"
)

//User -> User struct to save user on database
type User struct {
	gorm.Model
	FirstName  		string     		`form:"first_name" json:"first_name"`
	LastName   		string     		`form:"last_name" json:"last_name"`
	Email      		string     		`gorm:"unique;default:null;" form:"email" json:"email"`
	Username   		string     		`gorm:"unique" form:"username" json:"username"`
	Image      		string    		`gorm:"default:null;" form:"image" json:"image"`
	Phone			string			`form:"phone" json:"phone"`
	Password   		string     		`form:"password" json:"password"`
	Birthday   		string	  		`form:"birthday" json:"birthday"`
	Type       		string     		`form:"type" json:"type"`
	IsActive   		bool       		`form:"is_active" json:"is_active"`
	Subjects   		[]*Subject 		`gorm:"many2many:user_subjects;"`
	CourseID   		uint          	`gorm:"default:null;" form:"course_id" json:"course_id"`
	SchoolYear 		[]*SchoolYear 	`gorm:"many2many:user_schoolyear" json:"school_year"`
	Classroom  		[]*Classroom  	`gorm:"many2many:students_classroom"`
	TeacherRoom		[]*Classroom	`gorm:"foreignKey:TeacherID"`
	Course     		Course			
}


func (user *User) TableName() string {
	return "user"
}

type UserLogin struct {
	Username 	string 	`form:"username" json:"username" binding:"required"`
	Password 	string 	`form:"password" json:"password" binding:"required"`
}

type AddUserClass struct {
	UserID      	uint 	`form:"user_id" json:"user_id" binding:"required"`
	ClassroomID 	uint 	`form:"classroom_id" json:"classroom_id" binding:"required"`
}

type UserRegister struct {
	Username     	string    	`form:"username" json:"username" binding:"required"`
	Password     	string    	`form:"password" json:"password"`
	FirstName    	string    	`form:"first_name" json:"first_name" binding:"required"`
	LastName     	string    	`form:"last_name" json:"last_name" binding:"required"`
	Birthday     	string 		`form:"birthday" json:"birthday" binding:"required"`
	Type         	string    	`form:"type" json:"type" binding:"required"`
	Phone			string		`form:"phone" json:"phone" binding:"required"`	
	Email        	string    	`form:"email" json:"email"`
	SchoolYearID 	uint     	`form:"schoolyear_id" json:"schoolyear_id" binding:"required"`
	Image		 	string		`form:"image" json:"image"`

}

type StudentRegister struct {
	Username     	string    	`form:"username" json:"username" binding:"required"`
	Password     	string    	`form:"password" json:"password"`
	FirstName    	string    	`form:"first_name" json:"first_name" binding:"required"`
	LastName     	string    	`form:"last_name" json:"last_name" binding:"required"`
	Birthday     	string 		`form:"birthday" json:"birthday" binding:"required"`
	Type         	string    	`form:"type" json:"type" binding:"required"`
	Phone			string		`form:"phone" json:"phone" binding:"required"`	
	Email        	string    	`form:"email" json:"email"`
	CourseID     	uint      	`form:"course_id" json:"course_id"`
	SchoolYearID 	uint      	`form:"schoolyear_id" json:"schoolyear_id" binding:"required"`
	Image		 	string		`form:"image" json:"image"`

}

func (user *User) ResponseMap() map[string]interface{} {
	resp := make(map[string]interface{})
	var image string
	var activeSchoolYear uint

	for _, v := range user.SchoolYear {
		if(v.IsActive) {
			activeSchoolYear = v.ID
		}
	}

	if len(user.Image) == 0 {
		image = ""
	} else {
		image = constants.PUBLIC_DIR + user.Image
	}

	resp["id"] 					= user.ID
	resp["email"] 				= user.Email
	resp["username"] 			= user.Username
	resp["birthday"] 			= user.Birthday
	resp["first_name"] 			= user.FirstName
	resp["last_name"] 			= user.LastName
	resp["full_name"] 			= user.FirstName + " " + user.LastName
	resp["phone"]				= user.Phone
	resp["type"] 				= user.Type
	resp["is_active"] 			= user.IsActive
	resp["created_at"] 			= user.CreatedAt
	resp["updated_at"] 			= user.UpdatedAt
	resp["course"] 				= user.Course.ResponseMap()
	resp["school_year"]			= activeSchoolYear
	resp["image"]				= image

	return resp
}

func (user *User) BasicUserAndIDResponse() map[string]interface{} {
	resp := make(map[string]interface{})
	var image string

	if len(user.Image) == 0 {
		image = ""
	} else {
		image = constants.PUBLIC_DIR + user.Image
	}


	resp["id"] 			= user.ID
	resp["email"] 		= user.Email
	resp["username"] 	= user.Username
	resp["first_name"] 	= user.FirstName
	resp["last_name"] 	= user.LastName
	resp["full_name"] 	= user.FirstName + " " + user.LastName
	resp["birthday"] 	= user.Birthday
	resp["type"] 		= user.Type
	resp["phone"]		= user.Phone
	resp["image"]		= image

	return resp
}

func (user *User) ResponseStudent() map[string]interface{} {
	resp := make(map[string]interface{})
	var image string
	var classroom []map[string]interface{}

	for _, v := range user.Classroom {
		classroom = append(classroom, v.BasicResponse())
	}

	if len(user.Image) == 0 {
		image = ""
	} else {
		image = constants.PUBLIC_DIR + user.Image
	}

	resp["id"] 			= user.ID
	resp["email"] 		= user.Email
	resp["username"] 	= user.Username
	resp["birthday"] 	= user.Birthday
	resp["first_name"] 	= user.FirstName
	resp["last_name"] 	= user.LastName
	resp["full_name"] 	= user.FirstName + " " + user.LastName
	resp["type"] 		= user.Type
	resp["is_active"] 	= user.IsActive
	resp["created_at"] 	= user.CreatedAt
	resp["updated_at"] 	= user.UpdatedAt
	resp["phone"]		= user.Phone
	resp["course"] 		= user.Course.ResponseMap()
	resp["classroom"]	= classroom
	resp["image"]		= image


	return resp
}

func (user *User) ResponseFaculty() map[string]interface{} {
	resp := make(map[string]interface{})
	var image string
	var classroom []map[string]interface{}
	
	studentCount := 0

	for _, v := range user.TeacherRoom {
		classroom = append(classroom, v.SubjectAndStudentsResponse())
		studentCount += len(v.Students)
	}

	if len(user.Image) == 0 {
		image = ""
	} else {
		image = constants.PUBLIC_DIR + user.Image
	}

	resp["id"] 				= user.ID
	resp["email"] 			= user.Email
	resp["username"] 		= user.Username
	resp["birthday"] 		= user.Birthday
	resp["first_name"] 		= user.FirstName
	resp["last_name"] 		= user.LastName
	resp["full_name"] 		= user.FirstName + " " + user.LastName
	resp["type"] 			= user.Type
	resp["is_active"] 		= user.IsActive
	resp["created_at"] 		= user.CreatedAt
	resp["updated_at"] 		= user.UpdatedAt
	resp["phone"]			= user.Phone
	resp["classes"]			= classroom
	resp["image"]			= image
	resp["student_count"]	= studentCount

	return resp
}