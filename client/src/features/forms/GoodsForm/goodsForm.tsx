// import { yupResolver } from "@corex/hook-form-yup-resolver";
import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import './goodsForm.css';

// типизация полей
type Inputs = {
    goodsName: string;
};

// Схема валидации
const schema = yup.object({
    goodsName: yup.string().max(12).required(),
});

export const GoodsForm = () => {

    const { handleSubmit, reset, register, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(schema),
    });
    const onSubmit = (data: Inputs) => {
        console.log('Sended to server: ' + JSON.stringify(data));
        reset();
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="goods-form-container">
                <label>Наименование товара</label>
                <input id="goodsName" {...register("goodsName")} />
                {errors.goodsName &&
                    <p style={{ color: "red" }}> {errors.goodsName.message}</p>
                }

                <input type="submit" />
            </div>
        </form>
    );
}