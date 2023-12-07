import { Stack } from '@mui/material';
import { list } from './signals';
import { ListItem } from './ListItem';

export const List = () => {
  const listItems = list.value;
  return (
    <Stack direction='row' flexWrap='wrap' gap={1}>
      {listItems.map((item, index) => (
        <ListItem key={item} label={item} index={index} />
      ))}
    </Stack>
  );
};
