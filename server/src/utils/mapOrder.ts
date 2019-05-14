import { User } from "../entity/User";
import { Business } from "../entity/Business";

// Ordering values
// https://gist.github.com/ecarter/1423674
export default function mapOrder(
  array: Array<User | Business>,
  order: string[],
  key: string
) {
  array.sort((a: any, b: any) => {
    const A = a[key];
    const B = b[key];

    if (
      order.indexOf(A) > order.indexOf(B) ||
      order.indexOf(A) === -1 ||
      order.indexOf(B) === -1
    ) {
      return 1;
    } else {
      return -1;
    }
  });

  return array;
}
