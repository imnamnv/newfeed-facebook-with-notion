import React from "react";
import { v4 as uuidv4 } from "uuid";
import { Box, Typography } from "@material-ui/core";
import { Control, useFieldArray } from "react-hook-form";
import Button from "../common/Button";
import InputField from "./InputField";

export interface ItemListFieldProps {
  name: string;
  control: Control<any>;
  label: string;
}

export default ({ name, control, label }: ItemListFieldProps) => {
  const { fields, append, remove } = useFieldArray({ name, control });
  return (
    <Box>
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent="space-between"
        marginY={1}
      >
        <Typography variant="h5">{label}</Typography>

        <Button
          title="Add new item"
          handleOnClick={() => {
            append({
              id: uuidv4(),
              front: "",
              back: "",
            });
          }}
        />
      </Box>

      {fields.map((field, idx) => {
        return (
          <Box key={field.id}>
            <Typography variant="subtitle1">Item {idx + 1}</Typography>
            <Box marginY={1}>
              <InputField
                name={`${name}.${idx}.front` as const}
                control={control}
                label="Front"
              />
            </Box>

            <Box marginY={1}>
              <InputField
                name={`${name}.${idx}.back` as const}
                control={control}
                label="Back"
              />
            </Box>

            <Button
              title="Remove"
              color="secondary"
              handleOnClick={() => remove(idx)}
            />
          </Box>
        );
      })}
    </Box>
  );
};
