package database

import (
	"fmt"
	"log"
	"travel/backend/src/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var Db *gorm.DB

func Init(config *models.DatabaseConfig) {
	host := config.Host
	user := config.User
	password := config.Password
	dbName := config.Name
	port := config.Port

	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=require TimeZone=Asia/Bangkok", host, port, user, password, dbName)

	var err error

	Db, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil {
		log.Fatalf("Failed to connect to database: %v", err)
	}

}
