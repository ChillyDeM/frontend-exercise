export interface Company {
  name: string
  logo: string
}

export interface Commodity {
  id: string
  name: string
}

export interface Location {
  id: string
  name: string
}

export interface Quote {
  lastPrice: number
  priceChange: number
}

export interface CashBid {
  commodity: Commodity
  location: Location
  price: number
  basis: number
  deliveryEnd: string
  deliveryStart: string
  futuresMonth: string
  futuresSymbol: string
  quote: Quote
}

export interface CashBidEdge {
  node: CashBid
}

export interface CashBidList {
  edges: CashBidEdge[]
}

export interface Viewer {
  company: Company & { cashBids: CashBidList }
}

export interface Result {
  viewer: Viewer
}
