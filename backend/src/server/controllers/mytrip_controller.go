package controllers

import (
	"net/http"
	"travel/backend/src/server/services"
	"travel/backend/src/utils"

	"github.com/gin-gonic/gin"
)

type MyTripController struct {
	service *services.MyTripService
}

func NewMyTripController(svc *services.MyTripService) *MyTripController {
	return &MyTripController{service: svc}
}

func (mc *MyTripController) GetMyTrips(c *gin.Context) {
	userId := c.MustGet("user_id").(uint)

	trips, err := mc.service.GetMyTrips(userId)

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	c.JSON(http.StatusOK, trips)
}
