import React from "react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@corex/hook-form-yup-resolver";
import * as yup from "yup";

// типизация полей
type Inputs = {
  name: string;
  age: string;
  document: string;
  infoMethod: string;
};

// валидация полей
const schema = yup
  .object()
  .shape({
    name: yup.string().required(),
    age: yup.number().required(),
    document: yup.string().required(),
    infoMethod: yup.string().required(),
  })
  .required();

export const UserProfileForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
    getValues,
  } = useForm<Inputs>({
    mode: "onSubmit",
    defaultValues: {
      name: "",
      age: "",
      document: "Паспорт",
      infoMethod: "",
    },
    resolver: yupResolver(schema as any),
  });

  const customHandleSubmit = (values: any) => {
    console.log("values: ", values);

    reset();
  };

  // Отслеживаем значение поля с именем
  const nameField = watch("name");

  useEffect(() => {
    console.log("nameField: ", nameField);
  }, [nameField]);
  // =================================

  return (
    <form onSubmit={handleSubmit(customHandleSubmit)}>
      <label htmlFor="name">Имя</label>
      <input
        id="name"
        type="text"
        {...register("name", {
          min: {
            value: 3,
            message: "error message",
          },
        })}
      />
      {errors.name && <p style={{ color: "red" }}>{errors.name.message}</p>}

      <label htmlFor="age">Возраст</label>
      <input id="age" type="number" {...register("age")} />
      {errors.age && <p style={{ color: "red" }}>{errors.age.message}</p>}

      <hr />
      <select {...register("document")}>
        <option>Паспорт</option>
        <option>Удостоверение</option>
      </select>

      <hr />
      <input
        type="radio"
        id="infoMethodPhone"
        // почему важно указывать value?
        value="phone"
        {...register("infoMethod")}
      />
      <label htmlFor="infoMethodPhone">Phone</label>

      <input
        type="radio"
        id="infoMethodPhoneMail"
        // почему важно указывать value?
        value="mail"
        {...register("infoMethod")}
      />
      <label htmlFor="infoMethodPhoneMail">Mail</label>

      <hr />
      <button type="button" onClick={() => reset()}>
        Сбросить
      </button>
      
      <button type="submit">Отправить</button>

    </form>
  );
};
