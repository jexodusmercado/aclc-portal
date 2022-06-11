package controller

import (
	"net/http"
	"portal/api/service"
	"portal/models"
	"portal/util"
	"strconv"

	"github.com/gin-gonic/gin"
)

//SubjectController struct
type SubjectController struct {
    service service.SubjectService
}

//NewSubjectController : NewSubjectController
func NewSubjectController(s service.SubjectService) SubjectController {
    return SubjectController{
        service: s,
    }
}

//CreateSubject ->  calls CreateSubject services for validated subject
func (s SubjectController) CreateSubject(c *gin.Context) {
    var subject models.SubjectCreation
    if err := c.ShouldBind(&subject); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    err := s.service.CreateSubject(subject)
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    util.SuccessJSON(c, http.StatusOK, "Successfully Created Subject")
}

//GetSubjects : GetSubjects controller
func (s SubjectController) GetSubjects(c *gin.Context) {
    var subjects models.Subject

    keyword := c.Query("keyword")

    data, total, err := s.service.FindAll(subjects, keyword)

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

//GetSubject : get subject by id
func (s SubjectController) GetSubject(c *gin.Context) {
    idParam := c.Param("id")
    id, err := strconv.ParseUint(idParam, 10, 64) //type conversion string to int64
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    var subject models.Subject
    subject.ID = uint(id)
    foundSubject, err := s.service.Find(subject)
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    response := foundSubject.ResponseMap()

    c.JSON(http.StatusOK, &util.Response{
        Success: true,
        Message: "Result set of Post",
        Data:    &response})

}

func (s SubjectController) UpdateSubject(c *gin.Context) {
    idParam := c.Param("id")

    id, err := strconv.ParseUint(idParam, 10, 64)

    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    var subject models.Subject
    subject.ID = uint(id)

    subjectRecord, err := s.service.Find(subject)
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    if err := c.ShouldBindJSON(&subjectRecord); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    if err := s.service.Update(subjectRecord); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    response := subjectRecord.ResponseMap()

    c.JSON(http.StatusOK, &util.Response{
        Success: true,
        Message: "Successfully Updated Post",
        Data:    response,
    })
}

func (p SubjectController) DeleteByID(c *gin.Context) {

	SubjectID := c.Param("id")

	err := p.service.DeleteSubject(SubjectID)
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	util.SuccessJSON(c, http.StatusOK, gin.H{
		"message": "deleted",
	})

}