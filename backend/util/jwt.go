package util

import (
	"github.com/golang-jwt/jwt"
	// "errors"
	"fmt"
	"os"
)


func ValidateToken(encodedToken string) (*jwt.Token, error) {
	hmacSampleSecret := []byte(os.Getenv("JWT_SECRET"))
	token, err := jwt.Parse(encodedToken, func(token *jwt.Token) (interface{}, error) {
		// Don't forget to validate the alg is what you expect:
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("Unexpected signing method: %v", token.Header["alg"])
		}

		// hmacSampleSecret is a []byte containing your secret, e.g. []byte("my_secret_key")
		return hmacSampleSecret, nil
	})


	return token, err

}