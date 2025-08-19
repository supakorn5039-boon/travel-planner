package controllers

import (
	"net/http"
	"travel/backend/src/models"
	"travel/backend/src/server/services"
	"travel/backend/src/utils"

	"github.com/gin-gonic/gin"
)

type BookingController struct {
	service *services.BookingService
}

func NewBookingController(svc *services.BookingService) *BookingController {
	return &BookingController{service: svc}
}

func (bc *BookingController) CreateBooking(c *gin.Context) {
	var req models.BookingDto
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": "Missing or invalid booking data"})
		return
	}

	userId, ok := c.MustGet("user_id").(uint)

	if !ok {
		c.JSON(400, gin.H{"error": "User ID not found in token"})
		return
	}

	booking := models.Booking{
		UserId:        int(userId),
		DestinationId: req.DestinationId,
		StartDate:     req.StartDate,
		EndDate:       req.EndDate,
	}

	dto, err := bc.service.CreateBookings(&booking)
	if err != nil {
		utils.ErrorResponse(c, err.Error(), http.StatusBadRequest)
	}

	utils.SuccessResponse(c, dto)
}

func (bc *BookingController) GetBookingsByUserId(c *gin.Context) {
	userId, exist := c.MustGet("user_id").(uint)

	if !exist {
		c.JSON(400, gin.H{"error": "User ID not found"})
		return
	}

	bookings, err := bc.service.GetBookingsByUserId(userId)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, bookings)
}
