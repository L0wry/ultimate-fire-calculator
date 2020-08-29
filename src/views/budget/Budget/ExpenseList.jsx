import React, { memo } from 'react';
import clsx from 'clsx';
import {
    List,
    Box,
    Card,
    CardContent,
    Typography,
    Divider,
} from '@material-ui/core';
import ExpenseItem from './ExpenseItem';

const ExpenseList = memo(({ className, items, onItemRemove, onItemCheck, ...rest }) => (

    <Box
        mt={3}
    >
        <Card
            className={clsx(className)}
            {...rest}
        >
            <CardContent>

                <Typography
                    align="left"
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                >
                    Expenses
                    </Typography>
                <Divider />
                {items.length > 0 && (
                    <List style={{ overflow: 'scroll' }}>
                        {items.map((todo, idx) => (
                            <ExpenseItem
                                {...todo}
                                key={`TodoItem.${idx}`}
                                divider={idx !== items.length - 1}
                                onButtonClick={() => onItemRemove(idx)}
                                onCheckBoxToggle={() => onItemCheck(idx)}
                            />
                        ))}
                    </List>
                )}
            </CardContent>
        </Card>
    </Box>

));
export default ExpenseList;