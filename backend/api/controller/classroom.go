package controller

import (
	"net/http"
	"portal/api/service"
	"portal/models"
	"portal/util"
	"strconv"

	"github.com/gin-gonic/gin"
)

type ClassroomController struct {
	service service.ClassroomService
}

func NewClassroomController(s service.ClassroomService) ClassroomController {
	return ClassroomController{
		service: s,
	}
}

func (cr *ClassroomController) CreateClassroom(c *gin.Context) {
	var classroom models.ClassroomCreation
	var students []models.User

	if err := c.ShouldBind(&classroom); err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	err := cr.service.CreateClassroom(classroom, students)
	if err != nil {
		util.CustomErrorJson(c, http.StatusBadRequest, err.Error())
		return
	}

	util.SuccessJSON(c, http.StatusOK, "Successfully Created Classroom")
}

func (cr ClassroomController) GetClassrooms(c *gin.Context) {
	var classrooms models.Classroom

	keyword := c.Query("keyword")

	data, total, err := cr.service.FindAll(classrooms, keyword)

	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}
	respArr := make([]map[string]interface{}, 0, 0)

	for _, n := range *data {
		resp := n.ResponseMap()
		respArr = append(respArr, resp)
	}

	c.JSON(http.StatusOK, &util.Response{
		Success: true,
		Message: "Post result set",
		Data: map[string]interface{}{
			"rows":       respArr,
			"total_rows": total,
		}})
}

func (cr ClassroomController) FindByTeacherID(c *gin.Context) {
	var classroom models.Classroom
	teacherParam := c.Param("teacherID")
	keyword := c.Query("keyword")
	teacherID, err := strconv.ParseUint(teacherParam, 10, 64) //type conversion string to int64
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	classroom.TeacherID = uint(teacherID)

	classrooms, total, err := cr.service.FindByTeacherID(classroom, keyword)
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}
	respArr := make([]map[string]interface{}, 0, 0)

	for _, n := range classrooms {
		resp := n.ResponseMap()
		respArr = append(respArr, resp)
	}

	c.JSON(http.StatusOK, &util.Response{
		Success: true,
		Message: "Post result set",
		Data: map[string]interface{}{
			"rows":       respArr,
			"total_rows": total,
		}})
}

func (cr ClassroomController) GetStudentsByTeacherID(c *gin.Context) {
	var classroom models.Classroom
	teacherParam := c.Param("teacherID")
	keyword := c.Query("keyword")
	courseId := c.Query("courseId")
	classroomId := c.Query("classroomId")
	teacherID, err := strconv.ParseUint(teacherParam, 10, 64) //type conversion string to int64
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	classroom.TeacherID = uint(teacherID)

	students, err := cr.service.GetStudentsByTeacherID(classroom, keyword, courseId, classroomId)
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}
	respArr := make([]map[string]interface{}, 0, 0)

	var temp uint

	for _, n := range students {
		
		if temp != n.ID {
			resp := n.ResponseStudent()
			respArr = append(respArr, resp)
		}

		temp = n.ID
		
	}

	c.JSON(http.StatusOK, &util.Response{
		Success: true,
		Message: "Post result set",
		Data: map[string]interface{}{
			"rows":       respArr,
	}})
}

func (cr *ClassroomController) GetClassroom(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 64) //type conversion string to int64
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}
	var classroom models.Classroom
	classroom.ID = uint(id)
	foundClassroom, err := cr.service.Find(classroom)
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}
	response := foundClassroom.ResponseMap()

	c.JSON(http.StatusOK, &util.Response{
		Success: true,
		Message: "Result set of Post",
		Data:    &response})

}

func (cr ClassroomController) UpdateClassroom(c *gin.Context) {
	idParam := c.Param("id")

	id, err := strconv.ParseUint(idParam, 10, 64)

	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	var classroom models.ClassroomUpdate
	classroom.ID = uint(id)

	if err := c.ShouldBindJSON(&classroom); err != nil {
		util.CustomErrorJson(c, http.StatusBadRequest, err)
		return
	}

	updatedClassroom, err := cr.service.Update(classroom)
	if err != nil {
		util.CustomErrorJson(c, http.StatusBadRequest, "error in update")
		return
	}

	response := updatedClassroom.ResponseMap()

	c.JSON(http.StatusOK, &util.Response{
		Success: true,
		Message: "Successfully Updated Post",
		Data:    response,
	})
}

func (cr ClassroomController) DeleteByID(c *gin.Context) {

	ClassroomID := c.Param("id")

	err := cr.service.DeleteClassroom(ClassroomID)
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	util.SuccessJSON(c, http.StatusOK, gin.H{
		"message": "deleted",
	})

}

func (cr ClassroomController) FindByStudentID(c *gin.Context) {
	studentID := c.Param("id")
	keyword := c.Query("keyword")

	data, total, err := cr.service.FindByStudentID(studentID, keyword)

	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}
	respArr := make([]map[string]interface{}, 0, 0)

	for _, n := range data {
		resp := n.ResponseMap()
		respArr = append(respArr, resp)
	}

	c.JSON(http.StatusOK, &util.Response{
		Success: true,
		Message: "Post result set",
		Data: map[string]interface{}{
			"rows":       respArr,
			"total_rows": total,
		}})

}