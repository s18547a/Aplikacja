import Owner from "./Owner";
import Vet from "./Vet";

class Reservation {
  ReservationId: string | undefined;
  Date: string | undefined;
  VetId: number | undefined;
  OwnerId: number | undefined;
  Hour: string | undefined;
  Vet: Vet | undefined | null;
  Owner: Owner | undefined | null;

  constructor(
    ReservationId: string | undefined,
    Date: string | undefined,
    VetId: number | undefined,
    OwnerId: number | undefined,
    Hour: string | undefined,
    Vet: Vet | undefined | null,
    Owner: Owner | undefined | null
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
