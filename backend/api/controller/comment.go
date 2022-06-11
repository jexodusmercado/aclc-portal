package controller

import (
	"net/http"
	"portal/api/service"
	"portal/models"
	"portal/util"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CommentController struct {
	service service.CommentService
}

func NewCommentController(s service.CommentService) CommentController {
	return CommentController{
		service: s,
	}
}

func (cr *CommentController) CreateComment(c *gin.Context) {
	var comment models.CommentCreation

	PostID := c.Param("id")
	UserID := c.Keys["UserID"].(float64)

	convPostID, err := strconv.ParseUint(PostID, 10, 64)

	comment.PostID = uint(convPostID)
	comment.UserID = uint(UserID)

	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	if err := c.ShouldBind(&comment); err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	err = cr.service.CreateComment(comment)
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	util.SuccessJSON(c, http.StatusOK, "Created comment")
}

func (cr *CommentController) UpdateComment(c *gin.Context) {
	var comment models.Comment

	CommentID := c.Param("id")
	UserID := c.Keys["UserID"].(float64)

	convCommentID, err := strconv.ParseUint(CommentID, 10, 64)
	comment.ID = uint(convCommentID)
	comment.UserID = uint(UserID)

	if err := c.ShouldBind(&comment); err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	err = cr.service.UpdateComment(comment)
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	util.SuccessJSON(c, http.StatusOK, gin.H{
		"message": "Updated!",
	})
}

func (cr *CommentController) FindAllByPostID(c *gin.Context) {

	PostID := c.Param("id")

	data, total, err := cr.service.FindAllByPostID(PostID)
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

func (cr *CommentController) DeleteByID(c *gin.Context) {

	CommentID := c.Param("id")

	err := cr.service.DeleteComment(CommentID)
	if err != nil {
		util.ErrorJSON(c, http.StatusBadRequest, err)
		return
	}

	util.SuccessJSON(c, http.StatusOK, gin.H{
		"message": "deleted",
	})

}
