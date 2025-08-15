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
}

type Trip struct {
	gorm.Model
	UserId        int    `gorm:"not null"`
	DestinationId int    `gorm:"not null"`
	Title         string `gorm:"not null"`
	Notes         string
	StartDate     time.Time   `gorm:"not null"`
	EndDate       time.Time   `gorm:"not null"`
	Destination   Destination `gorm:"foreignKey:DestinationId;references:ID"`
}

type Booking struct {
	gorm.Model
	UserId        int       `gorm:"not null"`
	DestinationId int       `gorm:"not null"`
	TripId        int       `gorm:"not null"`
	TotalPrice    int       `gorm:"not null"`
	BookingDate   time.Time `gorm:"not null"`
	Status        string    `gorm:"not null"`
}

type Payments struct {
	gorm.Model
	UserId        int     `gorm:"not null"`
	BookingId     int     `gorm:"not null"`
	Booking       Booking `gorm:"foreignKey:BookingId;references:ID"`
	Amount        int     `gorm:"not null"`
	Status        string  `gorm:"not null"`
	PaymentMethod string  `gorm:"not null"`
	CreatedAt     time.Time
}
