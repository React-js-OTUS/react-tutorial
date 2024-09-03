import React from "react";
import {
  useController,
  useForm,
  Control,
  FieldValues,
  Controller,
} from "react-hook-form";

type Props = {
  control: Control<FieldValues>;
  name: string;
};

export const Input = ({ control, name }: Props) => {
  const {
    field,
    fieldState: { invalid, isTouched, isDirty },
    formState: { touchedFields, dirtyFields },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <input
      onChange={field.onChange}
      value={field.value}
      name={field.name}
      ref={field.ref}
    />
  );
};
