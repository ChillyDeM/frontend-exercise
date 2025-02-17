import type { CashBidEdge } from './GetCashBidsForCompanyResult'

export interface GroupedCashBids {
  [location: string]: {
    [commodity: string]: CashBidEdge[]
  }
}
