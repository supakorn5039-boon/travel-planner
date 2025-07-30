package server

import (
	"fmt"
	"travel/backend/src/models"
	"travel/backend/src/server/controllers"

	"github.com/gin-gonic/gin"
)

func WebServer(config models.ServerConfig) {
	if config.Production {
		gin.SetMode(gin.ReleaseMode)
	}

	r := gin.Default()
	r.Use(gin.Logger())

	applyCorsMiddleware(r)

	controllers.Routes(r)

	err := r.Run(fmt.Sprintf(":%d", config.Port))
	if err != nil {
		return
	}

}
