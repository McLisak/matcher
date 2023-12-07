import { Add } from '@mui/icons-material';
import { Button, FormGroup, TextField } from '@mui/material';
import { FormEventHandler, useRef } from 'react';
import { list } from './signals';

export const Input = () => {
  const $input = useRef<HTMLInputElement>(null);
  const $field = useRef<HTMLDivElement>(null);

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!$input.current || !$field.current) return;
    const itemVal = $input.current.value;
    if (!itemVal) return;
    // TODO: Set error
    if (list.value.some((val) => val === itemVal)) return;

    list.value = [...list.value, itemVal];
    $input.current.value = '';
    $field.current.focus();
  };

  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <TextField
          ref={$field}
          label='Add item'
          name='item'
          variant='standard'
          inputProps={{ ref: $input }}
          InputProps={{
            endAdornment: (
              <Button endIcon={<Add />} type='submit' color='primary'>
                Add
              </Button>
            ),
          }}
        />
      </FormGroup>
    </form>
  );
};
