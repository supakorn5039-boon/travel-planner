package controllers

import (
	"travel/backend/src/server/middleware"
	"travel/backend/src/server/services"

	"github.com/gin-gonic/gin"
)

func Routes(r *gin.Engine) {

	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Hello World"})
	})

	api := r.Group("/api")

	{
		auth := api.Group("/auth")
		{
			auth.POST("/login", Login)
			auth.POST("/register", Register)
			auth.GET("/profile", middleware.Protected(), GetProfile)
		}

		destination := api.Group("/destination")
		destination.Use(middleware.Protected())
		dc := &DestinationController{service: services.NewDestinationService()}
		{
			destination.GET("", dc.GetDestinations)
			destination.GET("/:id", dc.GetDestinationById)
		}
		booking := api.Group("/booking")
		booking.Use(middleware.Protected())
		bc := &BookingController{service: services.NewBookingService()}
		{
			booking.POST("", bc.CreateBooking)
			booking.GET("", bc.GetBookingsByUserId)
		}

	}

	r.NoRoute(func(c *gin.Context) {
		c.JSON(404, gin.H{
			"error":  "Route not found",
			"path":   c.Request.URL.Path,
			"method": c.Request.Method,
		})
	})

}
