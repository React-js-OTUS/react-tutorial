import { describe, it, expect, beforeAll} from "@jest/globals"
import { TypeOfProduct, TypeOfUser } from "./const"
import { DiscountUnionType, getTotalDiscount } from "./discountHelper"

describe('Check user and product discounts', () => {
    let discountUserGold : DiscountUnionType;
    let discountUserPremium: DiscountUnionType;

    let discountProductFood: DiscountUnionType;
    let discountProductToy: DiscountUnionType;

    beforeAll(() => {
        discountUserGold = {
            type: 'user',
            discountType: TypeOfUser.GOLD,
        }
        discountUserPremium = {
            type: 'user',
            discountType: TypeOfUser.PREMIUM,
        }

        discountProductFood = {
            type: 'product',
            discountType: TypeOfProduct.FOOD,
        }
        discountProductToy = {
            type: 'product',
            discountType: TypeOfProduct.TOY,
        }

    })

    it('Check user Gold and product Food', () => {
        let allDiscounts : DiscountUnionType[] = [discountUserGold, discountProductFood];
        expect(getTotalDiscount(allDiscounts)).toBe(22);
    });

    it('Check user Premium and product Toy', () => {
        let allDiscounts : DiscountUnionType[] = [discountUserPremium, discountProductToy];
        expect(getTotalDiscount(allDiscounts)).toBe(17);
    });

})