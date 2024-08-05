import { TypeOfProduct, TypeOfUser } from "./const";
// Вспомогательные функции для вычисления скидки пользователя
// с учетом статуса пользователя и категории товара

// Получение размера скидки по типу пользователя
export const getDiscountByTypeOfUser = (type: TypeOfUser): number => {
    switch (type) {
        case TypeOfUser.STANDARD:
            return 0;
        case TypeOfUser.PREMIUM:
            return 8;
        case TypeOfUser.GOLD:
            return 16;
        case TypeOfUser.FREE:
            return 100;
        default:
            return 0;
    }
}

const getDiscountByTypeOfProductTypeGuard = (type: never): never => {
    throw new Error('Function getDiscountByTypeOfProduct called with new type that it knows nothing about')
}

// Получение размера скидки по типу продукта
export const getDiscountByTypeOfProduct = (type: TypeOfProduct): number => {
    switch (type) {
        case TypeOfProduct.CAR:
            return 3;
        case TypeOfProduct.FOOD:
            return 6;
        case TypeOfProduct.TOY:
            return 9;
        default:
            return getDiscountByTypeOfProductTypeGuard(type);
    }
}

export interface DiscountUnionType {
    type: 'user' | 'product',
    discountType: TypeOfUser | TypeOfProduct,
}

const getTotalDiscountTypeGuard = (type: never): never => {
    throw new Error('Function getTotalDiscount called with new type that it knows nothing about');
}

// Получение общей скидки
export const getTotalDiscount = (allDiscounts: DiscountUnionType[]) => {
    let totalDiscount = 0;

    allDiscounts.forEach(d => {
        switch (d.type) {
            case 'user': {
                totalDiscount += getDiscountByTypeOfUser(d.discountType as TypeOfUser);
                break;
            }

            case 'product': {
                totalDiscount += getDiscountByTypeOfProduct(d.discountType as TypeOfProduct);
                break;
            }
            default:
                getTotalDiscountTypeGuard(d.type);
        }
    });

    if(totalDiscount > 100){
        totalDiscount = 100;
    }

    return totalDiscount;
}

