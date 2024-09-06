import { yupResolver } from "@corex/hook-form-yup-resolver";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as yup from "yup";

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

    const methods = useForm<LoginFormFields>(
        { resolver: yupResolver(validationSchem as any) }
    );

    const handleOnSubmit = (data: LoginFormFields) => {
        console.log(data);

        methods.reset();
    }

    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(handleOnSubmit)}>
                <div>
                    <label>Логин</label>
                    <input id="login" {...methods.register("login")} />
                    {methods.formState.errors.login &&
                        <p style={{ color: "red" }}> {methods.formState.errors.login.message}</p>
                    }

                    <label>Пароль</label>
                    <input id="password" {...methods.register("password")} />
                    {methods.formState.errors.password &&
                        <p style={{ color: "red" }}> {methods.formState.errors.password.message}</p>
                    }

                    <input type="submit" />
                </div>
            </form>
        </FormProvider>

    );

}