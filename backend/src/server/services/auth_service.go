package services

import (
	"fmt"
	"travel/backend/src/database"
	"travel/backend/src/models"
	"travel/backend/src/security"

	"gorm.io/gorm"
)

type AuthenticateService struct {
	db *gorm.DB
}

func NewAuthenticateService() *AuthenticateService {
	return &AuthenticateService{db: database.Db}
}

func (s *AuthenticateService) Login(username, password string) (*models.UserDto, error) {

	var user models.User

	if err := s.db.Where("username = ?", username).First(&user).Error; err != nil {
		return nil, fmt.Errorf("invalid Username")
	}

	if ok := security.VerifyPassword(user.Password, password); !ok {
		return nil, fmt.Errorf("invalid Password")
	}

	dto := user.ToDto()
	return &dto, nil

}

func (s *AuthenticateService) Register(username, password string) (*models.UserDto, error) {
	var existing models.User

	err := s.db.Model(&models.User{}).Where("username = ?", username).First(&existing).Error

	if err == nil {
		return nil, fmt.Errorf("username already exists")
	}

	newUser := models.User{
		Username: username,
		Password: password,
		Role:     "user",
	}

	if err := s.db.Create(&newUser).Error; err != nil {
		return nil, fmt.Errorf("failed to create user: %v", err)
	}

	dto := newUser.ToDto()

	return &dto, nil

}

func (s *AuthenticateService) GetProfile(token string) (*models.UserDto, error) {

	userId, err := security.ParseJWT(token)
	if err != nil {
		return nil, fmt.Errorf("invalid token: %v", err)
	}

	var user models.User

	if err := s.db.First(&user, userId).Error; err != nil {
		return nil, fmt.Errorf("user not found: %v", err)
	}

	dto := user.ToDto()
	return &dto, nil

}
