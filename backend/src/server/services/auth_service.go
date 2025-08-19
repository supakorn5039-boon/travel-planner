package services

import (
	"fmt"
	"log"
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

	err := s.db.Where("username = ?", username).First(&user).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {

			log.Printf("Login failed for username '%s': user not found", username)
			return nil, fmt.Errorf("invalid username or password")
		}

		log.Printf("Database error during login for username '%s': %v", username, err)
		return nil, fmt.Errorf("internal server error")
	}

	if ok := security.VerifyPassword(user.Password, password); !ok {

		log.Printf("Login failed for username '%s': invalid password", username)
		return nil, fmt.Errorf("invalid username or password")
	}

	dto := user.ToDto()
	return &dto, nil
}

func (s *AuthenticateService) Register(username, password string) (*models.UserDto, error) {
	var existing models.User

	err := s.db.Where("username = ?", username).First(&existing).Error
	if err == nil {
		return nil, fmt.Errorf("username already exists")
	}

	hashedPassword, err := security.HashPassword(password)
	if err != nil {
		return nil, fmt.Errorf("failed to hash password: %v", err)
	}

	newUser := models.User{
		Username: username,
		Password: hashedPassword,
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

	var bookingCounts int64

	s.db.Model(&models.Booking{}).Where("user_id = ?", userId).Count(&bookingCounts)

	dto := models.UserDto{
		Id:         user.ID,
		Username:   user.Username,
		Role:       user.Role,
		CreatedAt:  user.CreatedAt,
		TripsCount: bookingCounts,
	}

	return &dto, nil
}
