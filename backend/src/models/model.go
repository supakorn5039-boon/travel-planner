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
	Role       string `gorm:"not null"`
	Username   string `gorm:"not null"`
	Password   string `gorm:"not null"`
	TripsCount int64  `gorm:"-"`
	CreatedAt  time.Time
}

type Destination struct {
	gorm.Model
	Title       string `gorm:"not null"`
	Description string
	Image       string `gorm:"not null"`
	Country     string `gorm:"not null"`
	City        string `gorm:"not null"`
	Price       int    `gorm:"not null"`
	Booking     []Booking
}

type Booking struct {
	gorm.Model
	UserId        int          `gorm:"not null"`
	DestinationId int          `gorm:"not null"`
	StartDate     time.Time    `gorm:"not null"`
	EndDate       time.Time    `gorm:"not null"`
	Destination   *Destination `gorm:"foreignKey:DestinationId;references:ID"`
}
