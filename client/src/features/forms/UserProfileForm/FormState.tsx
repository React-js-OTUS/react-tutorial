import React from "react";
import { useForm, useFormState, Control } from "react-hook-form";

type Props = {
  control: Control<{ firstName: string }>;
};

const Child = ({ control }: Props) => {
  const { dirtyFields } = useFormState({
    control,
  });

  return dirtyFields.firstName ? <p>Field is dirty.</p> : null;
};

export const FormState = () => {
  const { register, handleSubmit, control } = useForm({
    defaultValues: {
      firstName: "firstName",
    },
  });
  const onSubmit = (data: any) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("firstName")} placeholder="First Name" />
      <Child control={control} />

      <button type="submit">отправить</button>
    </form>
  );
};
