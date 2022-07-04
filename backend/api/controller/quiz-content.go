package controller

import (
	"net/http"
	"portal/api/service"
	"portal/models"
	"portal/util"
	"strconv"

	"github.com/gin-gonic/gin"
)

type QuizContentController struct {
	service service.QuizContentService
}

func NewQuizContentController(s service.QuizContentService) QuizContentController {
	return QuizContentController{
		service: s,
	}
}

func (g QuizContentController) Find(c *gin.Context) {
	var quiz models.QuizContent

	idParam := c.Param("contentID")

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

func (g QuizContentController) Create(c *gin.Context) {

	var quiz models.QuizContentCreation

	idParam := c.Param("id")

	id, err := strconv.ParseUint(idParam, 10, 64) //type conversion string to int64
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	quiz.QuizID = uint(id)

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

func (g QuizContentController) Answer(c *gin.Context) {

	var quizAnswer models.UserInputQuizContent

	idParam := c.Param("id")
	UserID := c.Keys["UserID"].(float64)

	id, err := strconv.ParseUint(idParam, 10, 64) //type conversion string to int64
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	contentParam := c.Param("contentID")

	contentID, err := strconv.ParseUint(contentParam, 10, 64) //type conversion string to int64
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	quizAnswer.QuizID = uint(id)
	quizAnswer.ID = uint(contentID)
	quizAnswer.UserID = uint(UserID)

	if err := c.ShouldBind(&quizAnswer); err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	err = g.service.Answer(quizAnswer)
	if err != nil {
		util.CustomErrorJson(c, http.StatusBadRequest, err.Error())
		return
	}

	util.SuccessJSON(c, http.StatusOK, "Answered!")
}

func (cr QuizContentController) DeleteByID(c *gin.Context) {

	quizContentID := c.Param("contentID")

	err := cr.service.Delete(quizContentID)
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	util.SuccessJSON(c, http.StatusOK, gin.H{
		"message": "deleted",
	})

}

func (cr QuizContentController) UpdateByID(c *gin.Context) {
	var quizContent models.QuizContentUpdates
	idParam := c.Param("contentID")

	id, err := strconv.ParseUint(idParam, 10, 64) //type conversion string to int64
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}
	
	quizContent.ID = uint(id)
	
	if err := c.ShouldBind(&quizContent); err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}
	

	err = cr.service.Update(quizContent)
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	util.SuccessJSON(c, http.StatusOK, gin.H{
		"message": "updated",
	})
	
	
}
