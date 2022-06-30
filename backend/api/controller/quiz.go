package controller

import (
	"fmt"
	"net/http"
	"portal/api/service"
	"portal/constants"
	"portal/models"
	"portal/util"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
)

type QuizController struct {
	service service.QuizService
}

func NewQuizController(s service.QuizService) QuizController {
	return QuizController{
		service: s,
	}
}

func (g QuizController) Create(c *gin.Context) {

    var quiz models.QuizCreation

    if err := c.ShouldBind(&quiz); err != nil {

        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

	quiz.GradePeriod = strings.ToUpper(quiz.GradePeriod)

	fmt.Println("---")
	fmt.Println("---")
	fmt.Println(constants.PERIOD_TYPE[quiz.GradePeriod])

	if constants.PERIOD_TYPE[quiz.GradePeriod] == "" {
		util.CustomErrorJson(c, http.StatusBadRequest, "INCORRECT GRADE PERIOD")
		return
	}
	
    result, err := g.service.Create(quiz)
    if err != nil {
        util.CustomErrorJson(c, http.StatusBadRequest, err.Error())
        return
    }

    util.SuccessJSON(c, http.StatusOK, result.ResponseMap())
}

func (g QuizController) Find(c *gin.Context) {
    var quiz models.Quiz

    idParam := c.Param("id")
    id, err := strconv.ParseUint(idParam, 10, 64) //type conversion string to int64
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

    quiz.ID = uint(id)

    result, err := g.service.Find(quiz)
    if err != nil {
        util.CustomErrorJson(c, http.StatusBadRequest, err.Error())
        return
    }
    
    util.SuccessJSON(c, http.StatusOK, result.ResponseMap())
}

func (g QuizController) FindAll(c *gin.Context) {


    result, numOfRows, err := g.service.FindAll()
    if err != nil {
        util.CustomErrorJson(c, http.StatusBadRequest, err.Error())
        return
    }

	respArr := make([]map[string]interface{}, 0, 0)

	for _, n := range result {
		resp := n.ResponseMap()
		respArr = append(respArr, resp)
	}
    
    util.SuccessJSON(c, http.StatusOK, &util.Response{
		Success: true,
		Message: "Fetch Successfully",
		Data: map[string]interface{}{
			"rows":  respArr,
			"totalOfRows": numOfRows,
		}})
}

func (g QuizController) FindByClassroomID(c *gin.Context) {
    var quiz models.Quiz

    idParam := c.Param("id")
    id, err := strconv.ParseUint(idParam, 10, 64) //type conversion string to int64
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

    quiz.ClassroomID = uint(id)

    data, err := g.service.FindByClassroomID(quiz)
    if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

    respArr := make([]map[string]interface{}, 0, 0)

	for _, n := range data {
		resp := n.ResponseMap()
		respArr = append(respArr, resp)
	}

	util.SuccessJSON(c, http.StatusOK, respArr)

}

func (g QuizController) FindByCreatorID(c *gin.Context) {
    var quiz models.Quiz

    idParam := c.Param("id")
    id, err := strconv.ParseUint(idParam, 10, 64) //type conversion string to int64
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

    quiz.CreatorID = uint(id)

    data, err := g.service.FindByCreatorID(quiz)
    if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

    respArr := make([]map[string]interface{}, 0, 0)

	for _, n := range data {
		resp := n.ResponseMap()
		respArr = append(respArr, resp)
	}

	util.SuccessJSON(c, http.StatusOK, respArr)

}