package util

import (
    "github.com/gin-gonic/gin"
    "github.com/go-playground/validator/v10"
    "errors"
)

// Response struct
type Response struct {
    Success bool        `json:"success"`
    Message string      `json:"message"`
    Data    interface{} `json:"data"`
}
type ErrorMsg struct {
    Field string `json:"field"`
    Message   string `json:"message"`
}

// ErrorJSON : json error response function
func ErrorJSON(c *gin.Context, statusCode int, err error) {
    var ve validator.ValidationErrors
        if errors.As(err, &ve) {
            out := make([]ErrorMsg, len(ve))
            for i, fe := range ve {
                out[i] = ErrorMsg{fe.Field(), getErrorMsg(fe)}
            }
        c.JSON(statusCode, gin.H{"errors": out})
    }
}

func getErrorMsg(fe validator.FieldError) string {
    switch fe.Tag() {
        case "required":
            return "This field is required"
        case "lte":
            return "Should be less than " + fe.Param()
        case "gte":
            return "Should be greater than " + fe.Param()
        case "email":
            return "Must be in email format"
    }
    return "Unknown error"
}

func CustomErrorJson(c *gin.Context, statusCode int, data interface{}) {
    c.JSON(statusCode, gin.H{"error": data})
}

// SuccessJSON : json error response function
func SuccessJSON(c *gin.Context, statusCode int, data interface{}) {
    c.JSON(statusCode, gin.H{"msg": data})
}
