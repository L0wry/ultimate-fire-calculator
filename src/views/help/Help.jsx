import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
    Box,
    Typography,
    Link
} from '@material-ui/core';
import TopBar from '../../layouts/MainLayout/TopBar.js'



const HelpPage = ({ className, ...rest }) => {
    return (
        <div
            className={clsx(className)}
            {...rest}
        >
            <TopBar header="Help" />

            <Typography
                // align="left"
                color="textPrimary"
                gutterBottom
                variant="h4"
            >
                Purpose
                  </Typography>


                <Typography
                    align="left"
                    color="textSecondary"
                    variant="body1"
                >
Personal finance was not something that was taught me at school. It has only been very recently that I have taken an interest in it and self learn. <br/>
As I started to become more aware of personal finance I found it hard to find the tools online to answer questions like;<br/>
<br/>
If I was to reduce my expenses by X amount and invest the remainder into the market, how would that affect my Net Worth over a given period?<br/>
If I was to increase my salary sacrifice by X%, how would that affect my net worth over a given period?<br/>
How much do others my ages spend on expenses?<br/>
How much do others my age invest in the market?<br/><br/>

This calculator aims to answer some of those questions and hopefully at some point will answer all of them!<br/>

                    <br />
                </Typography>
            

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
                    color="textSecondary"
                    variant="body1"
                >
                    Work your way through each of the tabs on left hand side. <br />
                                I would recommend working through from top to bottom. <br />
                                If your investments are sitting in global index trackers a good return percentage would be 5% - 7% <br />
                                Once you finish entering your finances use the selects on the navigation menu to run predictions over x years.

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
                    color="textSecondary"
                    variant="body1"
                >
                    Geared towards PAYE <br />
                    Only supports tax year 2020 - 20201<br />
                    Focused for Briton<br />
                    Doesn't support tax on withdrawals <br />
                    Doesn't take into consideration SIPP tax relief<br />
                    Doesn't support inflation for the time being<br />
                </Typography>
            </Box>

            <Box mt={3}>
                <Typography
                    align="left"
                    color="textPrimary"
                    gutterBottom
                    variant="h4"
                >
                    Resources
                  </Typography>

                <Typography
                    align="left"
                    color="textSecondary"
                    variant="body1"
                >
                    Not sure where to start with personal finance? Check out <br />

                    <Link href="https://flowchart.ukpersonal.finance/" >
                        UK Personal Finance FlowChart

                            </Link>
                    <br />

                    <Link href="https://www.reddit.com/r/UKPersonalFinance/" >
                        UKPersonalFinance

                            </Link>
                    <br />
                    <Link href="https://www.reddit.com/r/FIREUK/" >
                        FIREUK
                            </Link>
                </Typography>
            </Box>
        </div >
    );
};

HelpPage.propTypes = {
    className: PropTypes.string
};

export default HelpPage;
