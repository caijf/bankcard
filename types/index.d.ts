declare namespace bankcard {
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

  export class CardBin {
    constructor(options: Options);
    searchCardBin(cardNo: string, multiple?: boolean): SearchReturn;
    validateCardInfo(cardNo: string): ValidateCardInfoReturn;
  }

  export const bank: Record<string, string>;
  export const cardType: Record<string, string>;
  export const getAllCard: () => CardInfo[];

  export default CardBin;
}

export as namespace bankcard;

export = bankcard;