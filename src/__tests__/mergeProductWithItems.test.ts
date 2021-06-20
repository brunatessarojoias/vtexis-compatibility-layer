import { mergeProductWithItems } from '../mergeProductWithItems'
import { itemsWithSimulationResponseMock } from './mock/itemsWithSimulationResponse'
import { vtexProductMock } from './mock/vtexProduct'

describe('mergeProductWithItems', () => {
  it('should be able to merge the results from the itemsWithSimulation query', () => {
    const mergedProduct = mergeProductWithItems(vtexProductMock, itemsWithSimulationResponseMock)

    const [mergedItem] = mergedProduct.items
    const [mergedSeller] = mergedItem.sellers
    const [sellerFromSimulation] = itemsWithSimulationResponseMock[0].sellers

    expect(mergedSeller.commertialOffer).toMatchObject(sellerFromSimulation.commertialOffer)
  })

  it('should merge sellers with price zero as unavailable', () => {
    const mergedProduct = mergeProductWithItems(vtexProductMock, itemsWithSimulationResponseMock)

    const [, mergedItem] = mergedProduct.items
    const [mergedSeller] = mergedItem.sellers

    expect(mergedSeller.commertialOffer.AvailableQuantity).toBe(0)
  })
})
