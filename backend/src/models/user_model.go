package models

import "time"

type UserDto struct {
	Id         uint      `json:"-"`
	Username   string    `json:"username"`
	Password   string    `json:"-"`
	Role       string    `json:"role"`
	TripsCount int64     `json:"tripsCount"`
	CreatedAt  time.Time `json:"createdAt"`
}

type CreadentialDto struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

func (u *User) ToDto() UserDto {
	return UserDto{
		Id:         u.ID,
		Username:   u.Username,
		Password:   u.Password,
		Role:       u.Role,
		TripsCount: u.TripsCount,
		CreatedAt:  u.CreatedAt,
	}
}
