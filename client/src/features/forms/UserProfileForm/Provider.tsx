import React from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

const NestedInput = () => {
  const { register } = useFormContext();
  return <input {...register("test")} />;
};

export const Provider = () => {
  const methods = useForm();
  const onSubmit = (data: any) => console.log(data);

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <NestedInput />
        <input type="submit" />
      </form>
    </FormProvider>
  );
};
