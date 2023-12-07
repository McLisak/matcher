import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import {
  closeResult,
  list,
  makeResult,
  result,
  resultLoading,
  resultOpen,
} from './signals';
import {
  ArrowRightAlt,
  Cancel,
  Casino,
  Check,
  ContentCopy,
  Error,
} from '@mui/icons-material';
import { Fragment, useState } from 'react';
import { LoadingOverlay } from './LoadingOverlay';

async function copyToClip() {
  if (!result.value) return Promise.reject(false);
  const text = result.value.reduce((str, entry) => {
    const line = entry.join(' -> ');
    if (str) {
      str += '\n' + line;
    } else {
      str += line;
    }
    return str;
  }, '');

  return window.navigator.clipboard
    .writeText(text)
    .then(() => false)
    .catch(() => false);
}

const CopyButton = () => {
  const [copied, setCopied] = useState<boolean | null>(null);
  const startIcon =
    copied === null ? <ContentCopy /> : copied ? <Check /> : <Error />;

  return (
    <Button
      onClick={async () => {
        setCopied(await copyToClip());
      }}
      disabled={resultLoading.value}
      variant='contained'
      color={copied === false ? 'error' : 'primary'}
      startIcon={startIcon}
    >
      Copy
    </Button>
  );
};

export const Result = () => {
  const resultValue = result.value || [];
  const listLength = list.value.length;
  return (
    <Dialog
      fullWidth
      maxWidth='sm'
      onClose={closeResult}
      open={resultOpen.value}
    >
      <DialogTitle>Matches</DialogTitle>
      <DialogContent>
        <Box
          display='grid'
          width='min-content'
          maxWidth={'100%'}
          margin='auto'
          gridTemplateColumns='minmax(45%, 1fr) min-content minmax(45%, 1fr)'
          gap={1}
          alignItems='center'
          style={{ minHeight: `${listLength}rem` }}
        >
          {resultLoading.value === true && <LoadingOverlay />}
          {resultValue.map(([a, b], i) => (
            <Fragment key={a + i + b + i}>
              <Chip sx={{ fontSize: '1rem' }} label={a} />
              <ArrowRightAlt />
              <Chip sx={{ fontSize: '1rem' }} label={b} />
            </Fragment>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          startIcon={<Casino />}
          disabled={resultLoading.value}
          onClick={makeResult}
        >
          Re-roll
        </Button>
        <Button startIcon={<Cancel />} onClick={closeResult}>
          Close
        </Button>
        <CopyButton />
      </DialogActions>
    </Dialog>
  );
};
