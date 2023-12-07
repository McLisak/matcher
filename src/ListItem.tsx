import { Chip, ChipProps } from '@mui/material';
import { FC } from 'react';
import { list } from './signals';

export type ListItemProps = ChipProps & {
  index: number;
};
export const ListItem: FC<ListItemProps> = (allProps) => {
  const { sx, index, ...props } = allProps;

  const onDelete = () => {
    const newList = [...list.value];
    newList.splice(index, 1);
    list.value = newList;
  };

  return (
    <Chip {...props} sx={{ fontSize: '1rem', ...sx }} onDelete={onDelete} />
  );
};
