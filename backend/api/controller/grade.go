package controller

import (
	"net/http"
	"portal/api/service"
	"portal/models"
	"portal/util"
	"strconv"

	"github.com/gin-gonic/gin"
)

type GradeController struct {
    service service.GradeService
}

func NewGradeController(s service.GradeService) GradeController {
    return GradeController{
        service: s,
    }
}

func (g GradeController) Create(c *gin.Context) {

    var grade models.GradeCreation

    if err := c.ShouldBind(&grade); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    result, err := g.service.Create(grade)
    if err != nil {
        util.CustomErrorJson(c, http.StatusBadRequest, err.Error())
        return
    }

    util.SuccessJSON(c, http.StatusOK, result.ResponseMap())
}

func (g GradeController) Find(c *gin.Context) {

	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 64) //type conversion string to int64
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}
	var gradeModel models.Grade
	gradeModel.ID = uint(id)
	grade, err := g.service.Find(gradeModel)
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}
	response := grade.ResponseMap()

	util.SuccessJSON(c, http.StatusOK, response)
}

func (g GradeController) FindByStudentIdAndClassroomId (c *gin.Context) {
	
	studentIdParam := c.Param("studentId")
	studentId, err := strconv.ParseUint(studentIdParam, 10, 64) //type conversion string to int64
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}
	classroomIdParam := c.Param("classroomId")
	classroomId, err := strconv.ParseUint(classroomIdParam, 10, 64) //type conversion string to int64
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}
	var gradeModel models.Grade
	gradeModel.StudentID = uint(studentId)
	gradeModel.ClassroomID = uint(classroomId)
	grade, err := g.service.Find(gradeModel)
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}
	response := grade.ResponseMap()

	util.SuccessJSON(c, http.StatusOK, response)
}