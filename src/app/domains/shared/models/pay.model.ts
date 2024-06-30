export interface Pay {
    payId:         number;
    paymentDate:   Date;
    amount:        number;
    paymentMethod: string;
    reservationId: number;
}