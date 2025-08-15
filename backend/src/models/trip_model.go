package models

import "time"

type TripDto struct {
	Id            uint `json:"id"`
	UserId        int  `json:"userId"`
	DestinationId int  `json:"destinationId"`
	Title         string
	Notes         string
	StartDate     time.Time
	EndDate       time.Time
}

func (t *Trip) ToDto() TripDto {
	return TripDto{
		Id:            t.ID,
		UserId:        t.UserId,
		DestinationId: t.DestinationId,
		Title:         t.Title,
		Notes:         t.Notes,
		StartDate:     t.StartDate,
		EndDate:       t.EndDate,
	}
}
