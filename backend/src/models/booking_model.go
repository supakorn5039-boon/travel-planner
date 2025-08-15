package models

import "time"

type BookingDto struct {
	Id            uint      `json:"id"`
	UserId        int       `json:"userId"`
	DestinationId int       `json:"destinationId"`
	TripId        int       `json:"tripId"`
	TotalPrice    int       `json:"totalPrice"`
	BookingDate   time.Time `json:"bookingDate"`
	Status        string    `json:"status"`
}

func (b *Booking) ToDto() BookingDto {
	return BookingDto{
		Id:            b.ID,
		UserId:        b.UserId,
		DestinationId: b.DestinationId,
		TripId:        b.TripId,
		TotalPrice:    b.TotalPrice,
		BookingDate:   b.BookingDate,
		Status:        b.Status,
	}
}
