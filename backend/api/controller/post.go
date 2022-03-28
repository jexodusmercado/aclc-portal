package controller

import (
    "portal/api/service"
    "portal/models"
    "portal/util"
    "net/http"
	"strconv"

    "github.com/gin-gonic/gin"
)

//PostController struct
type PostController struct {
    service service.PostService
}

//NewPostController : NewPostController
func NewPostController(s service.PostService) PostController {
    return PostController{
        service: s,
    }
}

//CreateClassroom ->  calls CreateClassroom services for validated classroom
func (p *PostController) CreatePost(c *gin.Context) {
	idParam := c.Param("id")
    id, err := strconv.ParseUint(idParam, 10, 64) //type conversion string to int64
	if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    var post models.PostCreation
    if err := c.ShouldBind(&post); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

	UserID := c.Keys["UserID"].(float64)

	post.UserID = uint(UserID)
	post.ClassroomID = uint(id)

    err = p.service.Create(post)
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    util.SuccessJSON(c, http.StatusOK, "Successfully Created Classroom")
}

//GetPosts : Get all posts controller
func (p PostController) GetPosts(c *gin.Context) {
    var posts models.Post

    keyword := c.Query("keyword")

    data, total, err := p.service.FindAll(posts, keyword)

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

//GetPost : get post by id
func (p *PostController) GetPost(c *gin.Context) {
    idParam := c.Param("id")
    id, err := strconv.ParseUint(idParam, 10, 64) //type conversion string to int64
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    var post models.Post
    post.ID = uint(id)
    foundPost, err := p.service.Find(post)
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    response := foundPost.ResponseMap()

    c.JSON(http.StatusOK, &util.Response{
        Success: true,
        Message: "Result set of Post",
        Data:    &response})

}

//UpdatePost : get update by id
func (p PostController) UpdatePost(c *gin.Context) {
    idParam := c.Param("id")

    id, err := strconv.ParseUint(idParam, 10, 64)

    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    var post models.Post
    post.ID = uint(id)

    postRecord, err := p.service.Find(post)
    if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    if err := c.ShouldBindJSON(&postRecord); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    if err := p.service.Update(postRecord); err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }
    response := postRecord.ResponseMap()

    c.JSON(http.StatusOK, &util.Response{
        Success: true,
        Message: "Successfully Updated Post",
        Data:    response,
    })
}
