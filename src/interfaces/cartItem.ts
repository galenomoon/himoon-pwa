import { IProduct } from 'admoon'

export interface ICartItem {
  product: IProduct
  quantity: number
  total: number
}
