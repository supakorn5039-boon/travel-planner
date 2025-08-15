package controllers

import (
	"net/http"
	"strconv"
	"travel/backend/src/models"
	"travel/backend/src/server/services"
	"travel/backend/src/utils"

	"github.com/gin-gonic/gin"
)

type DestinationController struct {
	service *services.DestinationService
}

func NewDestinationController(svc *services.DestinationService) *DestinationController {
	return &DestinationController{service: svc}
}

func (dc *DestinationController) GetDestinations(c *gin.Context) {
	var destinations []*models.DestinationDto
	var err error

	destinations, err = dc.service.GetDestinations()

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	c.JSON(http.StatusOK, destinations)
}

func (dc *DestinationController) GetDestinationById(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)

	if err != nil {
		utils.ErrorResponse(c, "Invalid ID", http.StatusBadRequest)
		return
	}

	destination, err := dc.service.GetDestinationById(uint(id))

	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
		return
	}

	utils.SuccessResponse(c, destination)
}
