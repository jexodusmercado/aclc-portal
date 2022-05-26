package controller

import (
	"fmt"
	"net/http"
	"portal/api/service"
	"portal/models"
	"portal/util"
	"strconv"

	"github.com/gin-gonic/gin"
)

//ClassroomController struct
type ClassroomController struct {
    service service.ClassroomService
}

//NewClassroomController : NewClassroomController
func NewClassroomController(s service.ClassroomService) ClassroomController {
    return ClassroomController{
        service: s,
    }
}

//CreateClassroom ->  calls CreateClassroom services for validated classroom
func (cr *ClassroomController) CreateClassroom(c *gin.Context) {
    var classroom models.ClassroomCreation
    var students []models.User

    if err := c.ShouldBind(&classroom); err != nil {
        fmt.Println(err)
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    if len(classroom.StudentsID) != 0 {
        for _, student := range classroom.StudentsID {
            var tempModel models.User
            tempModel.ID = student
    
            students = append(students, tempModel)
        }
    }
    
    err := cr.service.CreateClassroom(classroom, students)
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    util.SuccessJSON(c, http.StatusOK, "Successfully Created Classroom")
}

//GetClassrooms : GetClassrooms controller
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

//GetClassroom : get classroom by id
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

//UpdatePost : get update by id
func (cr ClassroomController) UpdateClassroom(c *gin.Context) {
    idParam := c.Param("id")

    id, err := strconv.ParseUint(idParam, 10, 64)

    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    var classroom models.Classroom
    classroom.ID = uint(id)

    classroomRecord, err := cr.service.Find(classroom)
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    if err := c.ShouldBindJSON(&classroomRecord); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    if err := cr.service.Update(classroomRecord); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    
    response := classroomRecord.ResponseMap()

    c.JSON(http.StatusOK, &util.Response{
        Success: true,
        Message: "Successfully Updated Post",
        Data:    response,
    })
}
