import Owner from './Owner';
import Vet from './Vet';

class Reservation {
    ReservationId: string | null;
    Date: string;
    VetId: string;
    OwnerId: string;
    Hour: string;
    Vet: Vet;
    Owner: Owner;

    constructor(
        ReservationId: string | null,
        Date: string,
        VetId: string,
        OwnerId: string,
        Hour: string,
        Vet: Vet,
        Owner: Owner
    ) {
        this.ReservationId = ReservationId;
        this.Date = Date;
        this.VetId = VetId;
        this.OwnerId = OwnerId;
        this.Hour = Hour;
        this.Vet = Vet;
        this.Owner = Owner;
    }
}

export default Reservation;
