package controller

import (
	"fmt"
	"net/http"
	"os"
	"path/filepath"
	"portal/api/service"
	"portal/models"
	"portal/util"
	"strconv"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/twinj/uuid"
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
	var newFileName string
    var extension string
    var noDotExtension string
    
    idParam := c.Param("id")
    
    id, err := strconv.ParseUint(idParam, 10, 64) //type conversion string to int64
	if err != nil {
        util.ErrorJSON(c, http.StatusBadRequest, err)
        return
    }

    title       := c.PostForm("title")
    body        := c.PostForm("body")
    file, err   := c.FormFile("file")

    newPath := filepath.Join(".", "public")
    err = os.MkdirAll(newPath, os.ModePerm)

    if title == "" || body == "" {
        c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
            "message": "Unable to create post",
        })
        return
    }

    if err != nil {
        c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
            "message": "Unable to create path",
        })
        return
    }

    if err == nil {
        fmt.Println(err)

        extension = filepath.Ext(file.Filename)
        newFileName = uuid.NewV4().String() + extension
        noDotExtension = strings.Replace(extension, ".", "", -1)

        if err := c.SaveUploadedFile(file, "./public/" + newFileName); err != nil{
            c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
                "message": "Unable to save the file",
            })
            return
        }
    }

    var post models.PostCreation
    // if err := c.ShouldBind(&post); err != nil {
    //     util.ErrorJSON(c, http.StatusBadRequest, err)
    //     return
    // }

	UserID := c.Keys["UserID"].(float64)

	post.UserID         = uint(UserID)
	post.ClassroomID    = uint(id)
    post.Filename       = newFileName
    post.Extension      = noDotExtension
    post.Body           = body
    post.Title          = title

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

//Test upload
func (p PostController) TestUpload (c *gin.Context) {
    file, err := c.FormFile("file")

    if err != nil {
        c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
            "message":"No file is received",
        })
        return
    }

    newPath := filepath.Join(".", "public")
    err = os.MkdirAll(newPath, os.ModePerm)
    if err != nil {
        c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
            "message": "Unable to create path",
        })
    }

    extension := filepath.Ext(file.Filename)
    newFileName := uuid.NewV4().String() + extension

    if err := c.SaveUploadedFile(file, "./public/" + newFileName); err != nil{
        c.AbortWithStatusJSON(http.StatusBadRequest, gin.H{
            "message": "Unable to save the file",
        })
        return
    }

    c.JSON(http.StatusOK, gin.H{
        "message" : "uploaded",
    })
}

func (p PostController) DownloadFile (c *gin.Context) {
    // httpRouter.GET("/download/:filename", func (c *gin.Context) {
    filename := c.Param("filename")
    path := filepath.Join(".", "public", filename)
    c.File(path)
    // })
}