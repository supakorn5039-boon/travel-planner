package config

import (
	"os"
	"strconv"
	"travel/backend/src/models"

	"github.com/joho/godotenv"
)

type AppConfig struct {
	Config *models.Config
}

func NewAppConfig() *AppConfig {
	return &AppConfig{}
}

func (a *AppConfig) Load(path string) error {

	if err := godotenv.Load(path); err != nil {
		return err
	}

	portStr := os.Getenv("PORT")
	port, err := strconv.Atoi(portStr)
	if err != nil {
		return err
	}

	dbPortStr := os.Getenv("DB_PORT")
	dbPort, err := strconv.Atoi(dbPortStr)
	if err != nil {
		return err
	}

	config := &models.Config{
		Server: models.ServerConfig{
			Port: port,
		},
		Database: models.DatabaseConfig{
			Host:     os.Getenv("DB_HOST"),
			User:     os.Getenv("DB_USER"),
			Password: os.Getenv("DB_PASS"),
			Name:     os.Getenv("DB_NAME"),
			Port:     dbPort,
		},
	}

	a.Config = config
	return nil
}
