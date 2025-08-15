package services

import (
	"travel/backend/src/database"
	"travel/backend/src/models"

	"gorm.io/gorm"
)

type MyTripService struct {
	db *gorm.DB
}

func NewMyTripService() *MyTripService {
	return &MyTripService{db: database.Db}
}

func (s *MyTripService) GetMyTrips(userId uint) ([]*models.TripDto, error) {
	var trips []models.Trip

	if err := s.db.Find(&trips, "user_id = ?", userId).Error; err != nil {
		return nil, err
	}

	result := make([]*models.TripDto, len(trips))

	for i, trip := range trips {
		dto := trip.ToDto()
		result[i] = &dto
	}

	return result, nil
}
