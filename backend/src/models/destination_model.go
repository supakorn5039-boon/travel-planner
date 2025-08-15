package models

type DestinationDto struct {
	Id          uint   `json:"id"`
	Title       string `json:"title"`
	Description string `json:"description"`
	Image       string `json:"image"`
	Country     string `json:"country"`
	City        string `json:"city"`
	Price       int    `json:"price"`
}

func (d *Destination) ToDto() DestinationDto {
	return DestinationDto{
		Id:          d.ID,
		Title:       d.Title,
		Description: d.Description,
		Image:       d.Image,
		Country:     d.Country,
		City:        d.City,
		Price:       d.Price,
	}
}
