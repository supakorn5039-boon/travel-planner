package models

import (
	"time"
)

type BookingDto struct {
	Id               uint      `json:"id"`
	DestinationId    int       `json:"destinationId" binding:"required"`
	DestinationTitle string    `json:"destinationTitle"`
	StartDate        time.Time `json:"startDate" binding:"required"`
	EndDate          time.Time `json:"endDate" binding:"required"`
}

func (b *Booking) ToDto() *BookingDto {
	var destination *Destination
	if b.Destination != nil {
		destination = b.Destination
	} else {
		destination = &Destination{
			Title: "Unknown",
		}
	}

	return &BookingDto{
		Id:               b.ID,
		DestinationId:    b.DestinationId,
		DestinationTitle: destination.Title,
		StartDate:        b.StartDate,
		EndDate:          b.EndDate,
	}
}
