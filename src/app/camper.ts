  /**
 * Created by Esat IBIS on 2017-03-27.
 * Project: muskoka-discovery-center.
 * @author: Esat IBIS <esat.taha.ibis@gmail.com>
 */

export class Camper {
    _id: string;
    camperFirstName: string;
    camperLastName: string;
    parentFirstName: string;
    parentLastName: string;
    parentPhoneNumber : string;
    paymentDays: number;
    camperAge: number;
    camperNotes : string;
    camperPickupList : Array<any>;
    startDate: number;
    endDate: number;
    absenceDays: Array<any>;
    isActive: boolean;
    pickupHistory: Array<any>;
}
