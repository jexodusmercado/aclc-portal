package controller

import (
    "portal/api/service"
    "portal/models"
    "portal/util"
    "net/http"
	"strconv"
    "fmt"

    "github.com/gin-gonic/gin"
)

type CourseController struct {
    service service.CourseService
}

func NewCourseController(s service.CourseService) CourseController {
    return CourseController{
        service: s,
    }
}

func (p CourseController) Create(c *gin.Context) {

    var course models.CourseCreation
    if err := c.ShouldBind(&course); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    err := p.service.Create(course)
    fmt.Println(err)
    if err != nil {
        util.CustomErrorJson(c, http.StatusBadRequest, err.Error())
        return
    }

    util.SuccessJSON(c, http.StatusOK, "Successfully Created Classroom")
}

func (p CourseController) GetCourses(c *gin.Context) {
    var courses models.Course

    keyword := c.Query("keyword")

    data, total, err := p.service.FindAll(courses, keyword)

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
        Message: "Course result set",
        Data: map[string]interface{}{
            "rows":       respArr,
            "total_rows": total,
        }})
}

func (p CourseController) GetCourse(c *gin.Context) {
    idParam := c.Param("id")
    id, err := strconv.ParseUint(idParam, 10, 64) //type conversion string to int64
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    var course models.Course
    course.ID = uint(id)
    foundCourse, err := p.service.Find(course)
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    response := foundCourse.ResponseMap()

    c.JSON(http.StatusOK, &util.Response{
        Success: true,
        Message: "Result set of Course",
        Data:    &response})

}

func (p CourseController) UpdateCourse(c *gin.Context) {
    idParam := c.Param("id")

    id, err := strconv.ParseUint(idParam, 10, 64)

    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    var course models.Course
    course.ID = uint(id)

    courseRecord, err := p.service.Find(course)
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    if err := c.ShouldBindJSON(&courseRecord); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    if err := p.service.Update(courseRecord); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    response := courseRecord.ResponseMap()

    c.JSON(http.StatusOK, &util.Response{
        Success: true,
        Message: "Successfully Updated Course",
        Data:    response,
    })
}
