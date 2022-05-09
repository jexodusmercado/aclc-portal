package controller

import (
	"net/http"
	"portal/api/service"
	"portal/models"
	"portal/util"
	"strconv"
	"fmt"

	"github.com/gin-gonic/gin"
)

type SchoolYearController struct {
	service service.SchoolYearService
}

func NewSchoolYearController(s service.SchoolYearService) SchoolYearController {
	return SchoolYearController{
		service: s,
	}
}

func (p SchoolYearController) Create(c *gin.Context) {

	var schoolyear models.SchoolYearCreation
	if err := c.ShouldBind(&schoolyear); err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	err := p.service.Create(schoolyear)
	if err != nil {
		util.CustomErrorJson(c, http.StatusBadRequest, err.Error())
		return
	}

	util.SuccessJSON(c, http.StatusOK, "Successfully Created Classroom")
}

func (p SchoolYearController) GetSchoolYears(c *gin.Context) {
	var schoolyears models.SchoolYear

	keyword := c.Query("keyword")

	data, total, err := p.service.FindAll(schoolyears, keyword)

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

func (p SchoolYearController) GetSchoolYear(c *gin.Context) {
	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 64) //type conversion string to int64
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}
	var schoolyear models.SchoolYear
	schoolyear.ID = uint(id)
	foundCourse, err := p.service.Find(schoolyear)
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}
	response := foundCourse.ResponseMap()

	c.JSON(http.StatusOK, &util.Response{
		Success: true,
		Message: "Result set of School Year",
		Data:    &response})

}

func (p SchoolYearController) UpdateSchoolYear(c *gin.Context) {
	idParam := c.Param("id")

	id, err := strconv.ParseUint(idParam, 10, 64)

	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}
	var schoolyear models.SchoolYear
	schoolyear.ID = uint(id)

	schoolyearRecord, err := p.service.Find(schoolyear)
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	if err := c.ShouldBindJSON(&schoolyearRecord); err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	if err := p.service.Update(schoolyearRecord); err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}
	response := schoolyearRecord.ResponseMap()

	c.JSON(http.StatusOK, &util.Response{
		Success: true,
		Message: "Successfully Updated School Year",
		Data:    response,
	})
}

func (p SchoolYearController) ChangeActiveYear(c *gin.Context) {
	idParam := c.Param("id")

	if idParam == "" {
		util.CustomErrorJson(c, http.StatusBadRequest, "Missing string query id")
	}

	id, err := strconv.ParseUint(idParam, 10, 64)

	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	var schoolyear models.SchoolYear

	schoolyear.ID = uint(id)

	schoolyearRecord, err := p.service.Find(schoolyear)


	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	fmt.Println("test")
	fmt.Println(schoolyearRecord)


	if err := p.service.ChangeActiveYear(schoolyearRecord); err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	c.JSON(http.StatusOK, &util.Response{
		Success: true,
		Message: "Successfully Changed Active School year",
	})
}

func (p SchoolYearController) GetActiveYear(c *gin.Context) {

	schoolYearRecord, err := p.service.GetActiveYear()
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	response := schoolYearRecord.ResponseMap()

	c.JSON(http.StatusOK, &util.Response{
		Success: true,
		Message: "Successfully fetched active school year",
		Data:    response,
	})
}
