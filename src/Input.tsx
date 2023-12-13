import { Add } from '@mui/icons-material';
import { Button, FormGroup, TextField } from '@mui/material';
import { FormEventHandler, useRef, useState } from 'react';
import { list } from './signals';

const ITEM_EXIST_ERROR = 'The item already exists';

export const Input = () => {
  const $input = useRef<HTMLInputElement>(null);
  const $field = useRef<HTMLDivElement>(null);
  const [error, setError] = useState('');

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    if (!$input.current || !$field.current) return;
    const itemVal = $input.current.value;
    if (!itemVal) return;
    if (list.value.some((val) => val === itemVal)) {
      setError(ITEM_EXIST_ERROR);
      return;
    } else if (error) {
      setError('');
    }

    list.value = [...list.value, itemVal];
    $input.current.value = '';
    $field.current.focus();
  };

  return (
    <form onSubmit={onSubmit}>
      <FormGroup>
        <TextField
          error={!!error}
          helperText={error}
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
