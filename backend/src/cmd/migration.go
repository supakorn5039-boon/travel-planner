package main

import (
	"fmt"
	"log"
	"time"
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

	err = db.Migrator().DropTable(&models.User{}, &models.Destination{})
	if err != nil {
		log.Fatalf("failed to drop tables: %v", err)
	}

	if err = db.AutoMigrate(&models.User{}, &models.Destination{}); err != nil {
		log.Fatalf("failed to migrate tables: %v", err)
	}

	log.Println("Migration successfully!")

	hashedPassword, err := security.HashPasword("admin")
	if err != nil {
		log.Fatalf("failed to hash password: %v", err)
	}

	mockUpUser := []models.User{
		{
			Username:  "admin",
			Password:  hashedPassword,
			Role:      "admin",
			CreatedAt: time.Time{},
			Trip:      0,
		},
	}

	if err = db.Create(&mockUpUser).Error; err != nil {
		log.Fatalf("failed to create mock up user: %v", err)
	}

	mockUpDestination := []models.Destination{
		{
			Title:       "Tokyo, Japan",
			Description: "Discover the vibrant city of Tokyo, known for its modern architecture and bustling nightlife.",
			Image:       "https://images.squarespace-cdn.com/content/v1/64203d9600825f68e2488772/1716816992846-66PLMU3JHPHYP0O5CB3V/199A6070.jpg",
			Country:     "Japan",
			City:        "Tokyo",
		},
		{
			Title:       "Zurich, Switzerland",
			Description: "Discover the charming city of Zurich, surrounded by the Swiss Alps and a hub for banking and finance.",
			Image:       "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2023/11/29111159/lauterbrunnen.jpeg",
			Country:     "Switzerland",
			City:        "Zurich",
		},
		{
			Title:       "Amsterdam, Netherlands",
			Description: "Explore the picturesque city of Amsterdam, known for its canals, art museums, and vibrant nightlife.",
			Image:       "https://media-cdn.tripadvisor.com/media/photo-m/1280/28/74/c9/cf/caption.jpg",
			Country:     "Netherlands",
			City:        "Amsterdam",
		},
	}

	if err = db.Create(&mockUpDestination).Error; err != nil {
		log.Fatalf("failed to create mock up destination: %v", err)
	}

}
