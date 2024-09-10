import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// типизация полей
type LoginFormFields = {
    login: string;
    password: string;
}

// Валидация
const validationSchem = yup
    .object()
    .shape({
        login: yup.string().required(),
        password: yup.string().max(12).required(),
    })

export const LoginForm = () => {

    const { reset, handleSubmit, register, formState: { errors } } = useForm<LoginFormFields>(
        { resolver: yupResolver(validationSchem) }
    );

    const handleOnSubmit = (data: LoginFormFields) => {
        console.log('Data sended to server' + JSON.stringify(data));
        reset();
    }

    return (
        <form onSubmit={handleSubmit(handleOnSubmit)}>
            <div>
                <label>Логин</label>
                <input id="login" {...register("login")} />
                {errors.login &&
                    <p style={{ color: "red" }}> {errors.login.message}</p>
                }

                <label>Пароль</label>
                <input id="password" {...register("password")} />
                {errors.password &&
                    <p style={{ color: "red" }}> {errors.password.message}</p>
                }

                <input type="submit" />
            </div>
        </form>
    );

}