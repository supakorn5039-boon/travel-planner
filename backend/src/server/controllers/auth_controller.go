package controllers

import (
	"net/http"
	"travel/backend/src/models"
	"travel/backend/src/security"
	"travel/backend/src/server/services"
	"travel/backend/src/utils"

	"github.com/gin-gonic/gin"
)

func Login(c *gin.Context) {
	var body models.CreadentialDto

	if err := c.ShouldBind(&body); err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	authService := services.NewAuthenticateService()
	user, err := authService.Login(body.Username, body.Password)

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	token, err := security.GenerateJWT(user.Id)

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusInternalServerError)
		return
	}

	utils.SuccessResponse(c, gin.H{
		"user": user, "token": token,
	})

}

func Register(c *gin.Context) {
	var body *models.CreadentialDto

	if err := c.ShouldBind(&body); err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	hashOasswird, err := security.HashPasword(body.Password)

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusInternalServerError)
		return
	}

	authService := services.NewAuthenticateService()
	user, err := authService.Register(body.Username, hashOasswird)

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	token, err := security.GenerateJWT(user.Id)

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusInternalServerError)
		return
	}

	utils.SuccessResponse(c, gin.H{
		"user": user, "token": token,
	})
}

func Getprofile(c *gin.Context) {

	authHeader := c.GetHeader("Authorization")
	if authHeader == "" {
		utils.ErrorResponse(c, "Authorization header missing", http.StatusUnauthorized)
		return
	}

	token := authHeader
	if len(authHeader) > 7 && authHeader[:7] == "Bearer " {
		token = authHeader[7:]
	}

	authService := services.NewAuthenticateService()
	user, err := authService.GetProfile(token)
	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusUnauthorized)
		return
	}

	utils.SuccessResponse(c, user)
}
