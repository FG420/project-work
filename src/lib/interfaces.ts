export interface Items {
  ASIN: string;
  Title: string;
  Giacenza: number;
  CategoriaID: number;
}

export interface Categorie {
  CategoriaID: number;
  Categoria: string;
}

export interface Fornitori {
  FornitoreID: number;
  Fornitore: string;
}

export interface Acquisti {
  AcquistoID: number;
  FornitoreID: number;
  DataFattura: Date;
  NumeroFattura: string;
}

export interface AcquistiItems {
  AcquistoItemID: number;
  AcquistoID: number;
  ASIN: number;
  QuantitaAcquistata: number;
  PrezzoUnitarioAcquisto: number;
}

// TODO: Da definire TUsers | TOrders | TOrdersItems
