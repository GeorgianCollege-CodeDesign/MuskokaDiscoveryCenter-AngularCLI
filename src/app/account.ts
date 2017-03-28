/**
 * Created by Esat IBIS on 2017-03-28.
 * Project: muskoka-discovery-center.
 * @author: Esat IBIS <esat.taha.ibis@gmail.com>
 */

export class Account {
  _id: {
    $oid: string
  };
  salt: string;
  hash: string;
  username: string;
  role: string;
}
