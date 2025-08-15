package services

import (
	"travel/backend/src/database"
	"travel/backend/src/models"

	"gorm.io/gorm"
)

type DestinationService struct {
	db *gorm.DB
}

func NewDestinationService() *DestinationService {
	return &DestinationService{db: database.Db}
}

func (s *DestinationService) GetDestinations() ([]*models.DestinationDto, error) {
	var destinations []models.Destination

	if err := s.db.Find(&destinations).Error; err != nil {
		return nil, err
	}

	result := make([]*models.DestinationDto, len(destinations))

	for i, desdestinations := range destinations {
		dto := desdestinations.ToDto()
		result[i] = &dto
	}

	return result, nil
}

func (s *DestinationService) GetDestinationById(id uint) (*models.DestinationDto, error) {
	var destinations models.Destination

	if err := s.db.First(&destinations, id).Error; err != nil {
		return nil, err
	}

	dto := destinations.ToDto()

	return &dto, nil

}
