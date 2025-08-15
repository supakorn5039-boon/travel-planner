package models

import "time"

type PaymentsDto struct {
	Id            uint      `json:"id"`
	UserId        int       `json:"userId"`
	BookingId     int       `json:"bookingId"`
	Amount        int       `json:"amount"`
	Status        string    `json:"status"`
	PaymentMethod string    `json:"paymentMethod"`
	CreatedAt     time.Time `json:"createdAt"`
}

func (p *Payments) ToDto() PaymentsDto {
	return PaymentsDto{
		Id:            p.ID,
		UserId:        p.UserId,
		BookingId:     p.BookingId,
		Amount:        p.Amount,
		Status:        p.Status,
		PaymentMethod: p.PaymentMethod,
		CreatedAt:     p.CreatedAt,
	}
}
