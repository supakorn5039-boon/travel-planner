package models

import (
	"time"

	"github.com/golang-jwt/jwt/v5"
	"gorm.io/gorm"
)

type Claims struct {
	jwt.RegisteredClaims
	Id uint `json:"id"`
}

type User struct {
	gorm.Model
	Role      string `gorm:"not null"`
	Username  string `gorm:"not null"`
	Password  string `gorm:"not null"`
	CreatedAt time.Time
	Trip      int `gorm:"not null"`
}

type Destination struct {
	gorm.Model
	Title       string `gorm:"not null"`
	Description string
	Image       string `gorm:"not null"`
	Country     string `gorm:"not null"`
	City        string `gorm:"not null"`
}
