interface CardInfo {
  bankName: string;
  bankCode: string;
  cardBin: string;
  cardType: string;
  cardTypeName: string;
  length: number;
}

type Options = {
  filter?: (data: CardInfo) => object;
  format?: (data: CardInfo) => any;
  maxCacheCount?: number;
}

type SearchReturn = CardInfo | CardInfo[] | null;

interface ValidateCardInfoReturn extends Partial<CardInfo> {
  validated: boolean;
  errorCode: string;
  message: string;
}

declare class CardBin {
  constructor(options: Options);
  searchCardBin(cardNo: string, multiple?: boolean): SearchReturn;
  validateCardInfo(cardNo: string): ValidateCardInfoReturn;
}

type bank = Record<string, string>;
type cardType = Record<string, string>;
type getAllCard = () => CardInfo[];

export type {
  bank,
  cardType,
  getAllCard
}

export default CardBin;