package main

import (
	"fmt"
	"log"
	"travel/backend/src/config"
	"travel/backend/src/models"
	"travel/backend/src/security"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func main() {
	appConfig := config.NewAppConfig()

	if err := appConfig.Load(".env"); err != nil {
		panic(err)
	}

	host := appConfig.Config.Database.Host
	port := appConfig.Config.Database.Port
	user := appConfig.Config.Database.User
	password := appConfig.Config.Database.Password
	dbName := appConfig.Config.Database.Name

	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable TimeZone=Asia/Bangkok", host, port, user, password, dbName)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatalf("failed to connect database: %v", err)
	}

	err = db.Migrator().DropTable(&models.User{})
	if err != nil {
		log.Fatalf("failed to drop tables: %v", err)
	}

	if err = db.AutoMigrate(&models.User{}); err != nil {
		log.Fatalf("failed to migrate tables: %v", err)
	}

	log.Println("Migration successfully!")

	hashedPassword, err := security.HashPasword("admin")
	if err != nil {
		log.Fatalf("failed to hash password: %v", err)
	}

	mockUpUser := []models.User{
		{
			Username: "admin",
			Password: hashedPassword,
			Role:     "admin",
		},
	}

	if err = db.Create(&mockUpUser).Error; err != nil {
		log.Fatalf("failed to create mock up user: %v", err)
	}

}
