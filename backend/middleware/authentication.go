package middleware

import (
	// "portal/models"
	"portal/util"

	"github.com/golang-jwt/jwt"
	"github.com/gin-gonic/gin"
	"net/http"
	"fmt"

)

func Authenticate() gin.HandlerFunc {
	return func (c *gin.Context) {
		
		const BEARER_SCHEMA = "Bearer"
		authHeader := c.GetHeader("Authorization")

		
		if len(authHeader) == 0 { 
			fmt.Println("No auth")
			c.AbortWithStatus(http.StatusUnauthorized)
		}

		tokenString := authHeader[len(BEARER_SCHEMA):]

		fmt.Println(tokenString)

		token, err := util.ValidateToken(util.TrimSpaces(tokenString))
		if token.Valid {
			claims, ok := token.Claims.(jwt.MapClaims)
			if !ok {
				fmt.Println("Error in claims")
			}
			c.Set("UserID", claims["UserID"])
			c.Set("FirstName", claims["FirstName"])
			c.Set("LastName", claims["LastName"])
		} else {
			fmt.Println("error")
			fmt.Println(err)
			c.AbortWithStatus(http.StatusUnauthorized)
		}
	}
}