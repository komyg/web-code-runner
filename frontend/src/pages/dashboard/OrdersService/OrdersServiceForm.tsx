import { Box, Button, TextField } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';

interface Props {
  numReplicas: number;
}

const validationSchema = yup.object({
  numReplicas: yup
    .number()
    .required('Number of replicas is required')
    .min(1, 'Number of replicas must be greater than 0'),
});

export function OrdersServiceForm({ numReplicas }: Props) {
  const formik = useFormik({
    initialValues: {
      numReplicas,
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          variant="standard"
          id="numReplicas"
          name="numReplicas"
          label="Number of Replicas"
          value={formik.values.numReplicas}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.touched.numReplicas && Boolean(formik.errors.numReplicas)
          }
          helperText={formik.touched.numReplicas && formik.errors.numReplicas}
        />
        <Button type="submit" variant="contained">
          Update
        </Button>
      </Box>
    </form>
  );
}
