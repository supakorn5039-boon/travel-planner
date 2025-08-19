package main

import (
	"fmt"
	"log"
	"os"
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

	dbSSL := os.Getenv("DB_SSL")
	var sslmode string
	if dbSSL == "true" {
		sslmode = "require"
	} else {
		sslmode = "disable"
	}

	dsn := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=%s TimeZone=Asia/Bangkok", host, port, user, password, dbName, sslmode)

	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {

		log.Fatalf("failed to connect database: %v", err)
	}

	err = db.Migrator().DropTable(
		&models.User{},
		&models.Destination{},
		&models.Booking{},
	)
	if err != nil {
		log.Fatalf("failed to drop tables: %v", err)
	}

	if err = db.AutoMigrate(
		&models.User{},
		&models.Destination{},
		&models.Booking{},
	); err != nil {
		log.Fatalf("failed to migrate tables: %v", err)
	}

	log.Println("Migration successfully!")

	hashedPassword, err := security.HashPassword("admin")
	if err != nil {
		log.Fatalf("failed to hash password: %v", err)
	}

	mockUpUser := models.User{
		Username:  "admin",
		Password:  hashedPassword,
		Role:      "admin",
		CreatedAt: time.Now(),
	}

	if err = db.Create(&mockUpUser).Error; err != nil {
		log.Fatalf("failed to create mock up user: %v", err)
	}

	mockUpDestinations := []models.Destination{
		{
			Title:       "Tokyo, Japan",
			Description: "Discover the vibrant city of Tokyo, known for its modern architecture and bustling nightlife.",
			Image:       "https://images.squarespace-cdn.com/content/v1/64203d9600825f68e2488772/1716816992846-66PLMU3JHPHYP0O5CB3V/199A6070.jpg",
			Country:     "Japan",
			City:        "Tokyo",
			Price:       1000,
		},
		{
			Title:       "Zurich, Switzerland",
			Description: "Discover the charming city of Zurich, surrounded by the Swiss Alps and a hub for banking and finance.",
			Image:       "https://images.travelandleisureasia.com/wp-content/uploads/sites/2/2023/11/29111159/lauterbrunnen.jpeg",
			Country:     "Switzerland",
			City:        "Zurich",
			Price:       1500,
		},
		{
			Title:       "Amsterdam, Netherlands",
			Description: "Explore the picturesque city of Amsterdam, known for its canals, art museums, and vibrant nightlife.",
			Image:       "https://media-cdn.tripadvisor.com/media/photo-m/1280/28/74/c9/cf/caption.jpg",
			Country:     "Netherlands",
			City:        "Amsterdam",
			Price:       1200,
		},
		{
			Title:       "Paris, France",
			Description: "Discover the romantic city of Paris, known for its iconic Eiffel Tower and the Louvre Museum.",
			Image:       "https://media.istockphoto.com/id/635758088/photo/sunrise-at-the-eiffel-tower-in-paris-along-the-seine.jpg?s=612x612&w=0&k=20&c=rdy3aU1CDyh66mPyR5AAc1yJ0yEameR_v2vOXp2uuMM=",
			Country:     "France",
			City:        "Paris",
			Price:       1500,
		},
		{
			Title:       "New York, USA",
			Description: "Discover the bustling city of New York, known for its iconic Central Park, Times Square, and the Statue of Liberty.",
			Image:       "https://www.learningcurve-th.com/wp-content/uploads/2015/03/New-York.jpg",
			Country:     "USA",
			City:        "New York",
			Price:       2000,
		},
		{
			Title:       "Sydney, Australia",
			Description: "Discover the vibrant city of Sydney, known for its iconic Opera House, Sydney Harbour Bridge, and the Sydney Opera House.",
			Image:       "https://www.hilton.com/im/en/NoHotel/18167842/shutterstock-523437463.jpg?impolicy=crop&cw=4200&ch=2800&gravity=NorthWest&xposition=0&yposition=0&rw=1280&rh=856",
			Country:     "Australia",
			City:        "Sydney",
			Price:       1800,
		},
	}

	if err = db.Create(&mockUpDestinations).Error; err != nil {
		log.Fatalf("failed to create mock up destination: %v", err)
	}

	mockUpBooking := []models.Booking{
		{
			UserId:        int(mockUpUser.ID),
			DestinationId: int(mockUpDestinations[0].ID),
			StartDate:     time.Now(),
			EndDate:       time.Now().AddDate(0, 0, 7),
		},
		{
			UserId:        int(mockUpUser.ID),
			DestinationId: int(mockUpDestinations[1].ID),
			StartDate:     time.Now(),
			EndDate:       time.Now().AddDate(0, 0, 7),
		},
	}

	if err = db.Create(&mockUpBooking).Error; err != nil {
		log.Fatalf("failed to create mock booking: %v", err)
	}

	log.Println("Seeding complete!")
}
