package controller

import (
	"net/http"
	"portal/api/service"
	"portal/constants"
	"portal/models"
	"portal/util"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

type GradePeriodController struct {
    service service.GradePeriodService
}

func NewGradePeriodController(s service.GradePeriodService) GradePeriodController {
    return GradePeriodController{
        service: s,
    }
}

func (g GradePeriodController) Create(c *gin.Context) {

	var gradePeriod models.GradePeriodCreation

	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 64) //type conversion string to int64
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

    if err := c.ShouldBind(&gradePeriod); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

	gradePeriod.GradeID = uint(id)

	_, ok := constants.PERIOD_TYPE[strings.ToLower(gradePeriod.Period)]
	
	if !ok {
		util.CustomErrorJson(c, http.StatusBadRequest, "INVALID PERIOD TYPE")
		return
	}

	grade, err := g.service.Create(gradePeriod);
	if err != nil {
		util.CustomErrorJson(c, http.StatusBadRequest, err.Error())
		return
	}

	util.SuccessJSON(c, http.StatusOK, grade.ResponseMap())

}

func (g GradePeriodController) Update(c *gin.Context) {

	var gradePeriod models.GradePeriod

	idParam := c.Param("id")
	id, err := strconv.ParseUint(idParam, 10, 64) //type conversion string to int64
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	gradePeriod.ID = uint(id)

	_, err = g.service.Find(gradePeriod)
	if err != nil {
		util.CustomErrorJson(c, http.StatusBadRequest, "NOT EXISTING")
        return
	}

	if err := c.ShouldBind(&gradePeriod); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }



	response, err := g.service.Update(gradePeriod)
	if err != nil {
		util.CustomErrorJson(c, http.StatusInternalServerError, err.Error())
		return
	}


	util.SuccessJSON(c, http.StatusOK, response.ResponseMap())
}
