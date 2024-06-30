export interface Reservation {
    reservationId:                 number;
    startDate:                     Date;
    endDate:                       Date;
    totalPrice:                    number;
    state:                         string;
    confirmation:                  boolean;
    userId:                        number;
    roomId:                        number;
}