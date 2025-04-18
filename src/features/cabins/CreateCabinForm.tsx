import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";


import FormRow from "../../ui/FormRow";
import useCabinCreate from "./useCabinCreate";
import useCabinUpdate from "./useCabinUpdate";


function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });
  const { errors } = formState
  const { isCreating, createCabin } = useCabinCreate();
  const { isUpdating, updateCabin } = useCabinUpdate();
  const isWorking = isCreating || isUpdating
  
  const onSubmit = (data) => {
    const image = typeof data.image === 'string' ? data.image : data.image[0]
    if (isEditSession) updateCabin({ newCabinData: { ...data, image }, id: editId }, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      },
    });
    else createCabin({ ...data, image: image }, {
      onSuccess: () => {
        reset();
        onCloseModal?.();
      }
    })
  }

  const onError = (errors) => {
    console.log(errors)
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)} type={onCloseModal ? "modal" : "regular"}>
      <FormRow
        label="Cabin Name"
        error={errors?.name?.message}
      >
        <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", {
            required: "This field is required"
          })} />
      </FormRow>

      <FormRow
        label="Maximum Capacity"
        error={errors?.maxCapacity?.message}
      >
        <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", {
            required: "This field is required",
            valueAsNumber: true, 
            min: {
              value: 1,
              message: "Capacity should at least be 1"
            }
          })} />
      </FormRow>

      <FormRow
        label="Regular Price"
        error={errors?.regularPrice?.message}
      >
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", {
            valueAsNumber: true,
            required: "This field is required"
          })} />
      </FormRow>

      <FormRow
        label="Discount"
        error={errors?.discount?.message}
      >
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required. (Enter 0 if no discount)",
            valueAsNumber: true,
            validate: (value) => {
              if (value < 0) return ( "Discount cannot be less than zero")
              if (value >= getValues().regularPrice) return ( "Discount should be less than the regular price")
            }
          })} />
      </FormRow>

      <FormRow
        label="Description for Website"
        error={errors?.description?.message}
      >
        <Textarea
          id="description"
          disabled={isWorking}
          defaultValue=""
          {...register("description")} />
      </FormRow>

      <FormRow
        label="Cabin Photo"
        error={errors?.image?.message}
      >
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditSession ? false : "This field is required.",
          })} />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset" onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button onClick={() => onCloseModal?.()} disabled={isWorking}>Edit cabin</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
