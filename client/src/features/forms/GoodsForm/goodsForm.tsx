import { yupResolver } from "@corex/hook-form-yup-resolver";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";
import './goodsForm.css';

// типизация полей
type Inputs = {
    goodsName: string;
};

// Схема валидации
const schema = yup
    .object()
    .shape({
        goodsName: yup.string().required(),
    })

export const GoodsForm = () => {

    const methods = useForm<Inputs>({
        resolver: yupResolver(schema as any),
    });
    const onSubmit = (data: any) => console.log(data);

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
                <div className="goods-form-container">
                    <label>Наименование товара</label>
                    <input id="goodsName" {...methods.register("goodsName")} />
                    {methods.formState.errors.goodsName &&
                        <p style={{ color: "red" }}> {methods.formState.errors.goodsName.message}</p>
                    }

                    <input type="submit" />

                </div>

            </form>
        </FormProvider>
    );
}