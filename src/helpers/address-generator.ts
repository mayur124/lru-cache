const ADDRESS_LENGTH = 5;
let count = 0;

export function getNodeAddress() {
  count++;
  const countLength = count.toString().length;
  let address = "x";
  const remainingLength = ADDRESS_LENGTH - countLength;
  for (let index = 0; index < remainingLength; index++) {
    address += "0";
  }
  address += count;
  return address;
}
