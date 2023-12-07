import {
  Button,
  ButtonProps,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
  Zoom,
} from '@mui/material';
import { Input } from './Input';
import { List } from './List';
import { Casino, Delete } from '@mui/icons-material';
import {
  canMatch,
  list,
  makeResult,
  resultLoading,
  resultOpen,
} from './signals';
import { FC, MouseEventHandler, useCallback } from 'react';

const MatchButton = () => {
  const showLoader = resultLoading.value && !resultOpen.value;

  return (
    <Stack direction='row' marginTop='-1rem' justifyContent={'center'}>
      <Button
        color='primary'
        variant='contained'
        disabled={!canMatch.value}
        onClick={() => makeResult()}
        sx={{
          minWidth: 'min-content',
          fontSize: '3rem',
          borderRadius: '50%',
          top: '2.5rem',
          padding: '1rem',
          boxShadow: (theme) => theme.shadows[15],
          position: 'relative',
        }}
      >
        <Zoom in={showLoader}>
          <CircularProgress
            color='inherit'
            size={'inherit'}
            sx={{ position: 'absolute', inset: 0, padding: 'inherit' }}
          />
        </Zoom>
        <Zoom appear={false} in={!showLoader}>
          <Casino
            sx={{
              fontSize: '1em',
            }}
          />
        </Zoom>
      </Button>
    </Stack>
  );
};

const ClearButton: FC<ButtonProps> = (allProps) => {
  const { onClick, ...props } = allProps;
  const _onClick = useCallback<MouseEventHandler<HTMLButtonElement>>(
    (...args) => {
      list.value = [];
      if (onClick && typeof onClick === 'function') {
        onClick(...args);
      }
    },
    [onClick],
  );

  return (
    <Button
      onClick={_onClick}
      disabled={!list.value.length}
      {...props}
      endIcon={<Delete />}
    >
      Clear
    </Button>
  );
};

export const PeopleCard = () => {
  return (
    <Card
      elevation={4}
      sx={{
        width: '100%',
        margin: '0 auto',
        maxWidth: (theme) => theme.breakpoints.values.sm,
        overflow: 'visible',
      }}
    >
      <CardContent sx={{ oveflow: 'auto' }}>
        <Stack direction={'row'} justifyContent={'space-between'}>
          <Typography variant='h5'>List</Typography>
          <ClearButton />
        </Stack>
        <Stack gap={2}>
          <Input />
          <List />
        </Stack>
      </CardContent>
      <MatchButton />
    </Card>
  );
};
