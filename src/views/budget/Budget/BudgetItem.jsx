import React, { memo } from 'react';
import {
  List,
  ListItem,
  Checkbox,
  IconButton,
  ListItemText,
  ListItemSecondaryAction,
} from '@material-ui/core';
import DeleteOutlined from '@material-ui/icons/DeleteOutlined';

export const TodoListItem = memo(props => (
  <ListItem divider={props.divider}>
    <Checkbox
      onClick={props.onCheckBoxToggle}
      checked={props.checked}
      disableRipple
    />
    <ListItemText primary={props.text} />
    <ListItemText primary={props.value} />
    <ListItemSecondaryAction>
      <IconButton aria-label="Delete Item" onClick={props.onButtonClick}>
        <DeleteOutlined />
      </IconButton>
    </ListItemSecondaryAction>
  </ListItem>
));
 