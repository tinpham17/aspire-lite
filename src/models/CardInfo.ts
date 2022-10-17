export interface CardInfo {
  id: string;
  name: string;
  number: string;
  thru: string;
  type: string;
  frozen: boolean;
  transactions: {
    id: string;
    message: string;
    amount: number;
    date: string;
    service: string;
  }[];
}
