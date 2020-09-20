import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    Box,
    Card,
    CardContent,
    Typography,
    Divider
} from '@material-ui/core';
const purposeTexts = [
    'Personal finance was not something that was taught me at school or by my parents.It has only been very recently that I have taken an interest in it.',
    'As I started to become more aware of personal finance I found it hard to find the tools online to answer questions like; \n',
    '',
    'If I was to reduce my expenses by X amount and invest the remainder into the market, how would that affect my net work over a given period?',
    'If I was to increase my salary sacrifice by X%, how would that affect my net work over a given period?',
    'How much do others my ages spend on expenses?',
    'How much do others my age invest in the market?',
    '                                         ',
    'This calculator aims to answer some of those questions asked now and I hope at some point it will answer all of them in the future!']

const HelpPage = ({ className, ...rest }) => {

    return (
        <div
            className={clsx(className)}
            {...rest}
        >
            <Card>
                <CardContent>

                    <Typography
                        align="left"
                        color="textPrimary"
                        gutterBottom
                        variant="h3"
                    >
                        Help
                  </Typography>
                    <Divider />
                    <Box mt={3}>
                        <Typography
                            align="left"
                            color="textPrimary"
                            gutterBottom
                            variant="h4"
                        >
                            Purpose
                  </Typography>
                        {purposeTexts.map(purposeText => (
                            <Typography
                                align="left"
                                color="textPrimary"
                                variant="body1"
                            >
                                {purposeText}
                                <br/>
                            </Typography>
                        ))}

                        <Box mt={3}>
                            <Typography
                                align="left"
                                color="textPrimary"
                                gutterBottom
                                variant="h4"
                            >
                                Getting Started
                  </Typography>

                            <Typography
                                align="left"
                                color="textPrimary"
                                variant="body1"
                            >
                                getting started
                  </Typography>
                        </Box>
                    </Box>


                    <Box mt={3}>
                        <Typography
                            align="left"
                            color="textPrimary"
                            gutterBottom
                            variant="h4"
                        >
                            Terminology
                  </Typography>

                        <Typography
                            align="left"
                            color="textPrimary"
                            variant="h5"
                        >
                            Draw down
                  </Typography>
                    </Box>



                    <Box mt={3}>
                        <Typography
                            align="left"
                            color="textPrimary"
                            gutterBottom
                            variant="h4"
                        >
                            Limitations
                  </Typography>

                        <Typography
                            align="left"
                            color="textPrimary"
                            variant="body1"
                        >
                            Geared towards PAYE
                            Only supports tax year 2020 - 20201
                            UK focused
                            Doesn't take into consideration tax free investment types
                            Doesn't take into consideration annual limits on isa, pension etc
                  </Typography>
                    </Box>


                </CardContent>
            </Card>
        </div>
    );
};

HelpPage.propTypes = {
    className: PropTypes.string
};

export default HelpPage;
