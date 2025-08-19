package services

import (
	"travel/backend/src/database"
	"travel/backend/src/models"

	"gorm.io/gorm"
)

type BookingService struct {
	db *gorm.DB
}

func NewBookingService() *BookingService {
	return &BookingService{db: database.Db}
}

func (s *BookingService) CreateBookings(booking *models.Booking) (*models.BookingDto, error) {
	created := booking

	if err := s.db.Create(created).Error; err != nil {
		return nil, err
	}

	if err := s.db.Preload("Destination").Where("id = ?", created.ID).First(&created).Error; err != nil {
		return nil, err
	}

	return created.ToDto(), nil
}

func (s *BookingService) GetBookingsByUserId(userId uint) ([]*models.BookingDto, error) {
	var bookings []models.Booking

	if err := s.db.Preload("Destination").Where("user_id = ?", userId).Find(&bookings).Error; err != nil {
		return nil, err
	}

	result := make([]*models.BookingDto, len(bookings))
	for i, booking := range bookings {
		result[i] = booking.ToDto()
	}

	return result, nil
}
