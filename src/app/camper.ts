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
  paymentType : string;
  camperAge: number;
  camperNotes : string;
  camperPickupList : [
    {
      firstName: string,
      lastName: string,
      _id: string
    }
  ]
}
