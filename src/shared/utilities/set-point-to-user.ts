import { model } from 'mongoose';

export function setPointToUser(quantity: number) {
  return (quantity % 100);

}

