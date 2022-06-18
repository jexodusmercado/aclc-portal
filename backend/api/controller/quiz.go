package controller

import (
	"net/http"
	"portal/api/service"
	"portal/models"
	"portal/util"

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

    result, err := g.service.Create(quiz)
    if err != nil {
        util.CustomErrorJson(c, http.StatusBadRequest, err.Error())
        return
    }

    util.SuccessJSON(c, http.StatusOK, result.ResponseMap())
}
