package controllers

import (
	"travel/backend/src/server/middleware"

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
			auth.GET("/profile", middleware.Protected(), Getprofile)
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
