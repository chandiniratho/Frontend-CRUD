import { useForm } from 'react-hook-form';
import Input from './Input';
import Button from './Button';

const ItemForm = ({ initialValues = {}, onSubmit }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: initialValues, // Ensuring initialValues are passed correctly
  });

  // After the form is submitted, reset to initial values or clear for add item
  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset(initialValues); // Reset the form to initial values after submit
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <Input {...register('name')} placeholder="Name" required />
      <Input {...register('description')} placeholder="Description" required />
      <Input {...register('status')} placeholder="Status" required />
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default ItemForm;
