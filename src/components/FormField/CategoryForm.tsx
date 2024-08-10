import React, { useContext } from "react";
import { Box } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { InitState, ROOT_STATUS } from "../../context/CategoryContext";
import { DateList } from "../../models";
import AddListField from "./AddListField";
import InputField from "./InputField";
import { Context as CategoryContext } from "../../context/CategoryContext";
import Button from "../common/Button";

// export interface CategoryFormProps {
//   initialValues: Category;
//   onSubmit: (formValue: Category) => void;
// }
export default () => {
  return <></>;
};

// export default ({ initialValues, onSubmit }: CategoryFormProps) => {
//   const { setCurrentStatus } = useContext<InitState>(CategoryContext);

//   const {
//     control,
//     handleSubmit,
//     formState: { isSubmitting },
//   } = useForm<any>({
//     defaultValues: initialValues,
//   });

//   const handleFormSubmit = async (formValue: Category) => {
//     try {
//       await onSubmit?.(formValue);
//     } catch (error) {}
//   };

//   const handleCancelFormSubmit = () => {
//     setCurrentStatus({ currentStatus: ROOT_STATUS.LEARNING });
//   };

//   return (
//     <Box>
//       <form onSubmit={handleSubmit(handleFormSubmit)}>
//         <InputField name="name" control={control} label="Category Name" />

//         <AddListField name="data" control={control} label={"Item List"} />

//         <Box display={"flex"} justifyContent={"flex-end"} mb={3}>
//           <Box mt={1} mr={1}>
//             <Button title="Save" type="submit" disabled={isSubmitting} />
//           </Box>
//           <Box mt={1}>
//             <Button
//               title="Cancel"
//               handleOnClick={handleCancelFormSubmit}
//               disabled={isSubmitting}
//               color={"secondary"}
//             />
//           </Box>
//         </Box>
//       </form>
//     </Box>
//   );
// };
