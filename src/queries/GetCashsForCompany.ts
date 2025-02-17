import gql from 'graphql-tag'

export const GetCashBidsForCompany = gql`
  query CashBidsForCompany {
    viewer {
      ... on Employee {
        company {
          name
          logo
          cashBids {
            edges {
              node {
                commodity {
                  id
                  name
                }
                location {
                  id
                  name
                }
                price
                basis
                deliveryEnd
                deliveryStart
                futuresMonth
                futuresSymbol
                quote {
                  lastPrice
                  priceChange
                }
              }
            }
          }
        }
      }
    }
  }
`
