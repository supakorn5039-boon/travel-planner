package main

import (
	"travel/backend/src/app"
	"travel/backend/src/config"
)

func main() {
	appConfig := config.NewAppConfig()

	if err := appConfig.Load(".env"); err != nil {
		panic(err)
	}

	a := app.NewApp(appConfig.Config)
	a.WebServer()
}
