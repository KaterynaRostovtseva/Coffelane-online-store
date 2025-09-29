import {TabPanel} from "../../TabPanel/TabPanel.jsx";
import {Box, Typography} from "@mui/material";
import {typography} from "../../../theme/typography.js";
import {StyledButton} from "../../UI/StyledButton.js";
import {CustomDivider} from "../../Divider/CustomDivider.jsx";
import {GoogleButton} from "../../UI/StyledGoogleButton.js";
import React from "react";
import {ColoredGoogleIcon} from "../shared/ColoredGoogleIcon/ColoredGoogleIcon.jsx";
import {FormContainer} from "../shared/FormContainer.jsx";
import {FormField} from "../shared/FormField.jsx";
import {PasswordField} from "../shared/PasswordField.jsx";

export const LogIn = ({
                          tabValue, handleSubmit, handleInputChange,
                          setShowPassword, showPassword, formData, errors, onForgotPassword, onGoogleLogin
                      }) => {
    return (
        <TabPanel value={tabValue} index={0}>
            <FormContainer onSubmit={handleSubmit} autoComplete="on">
                <FormField
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange('email')}
                    error={errors.email}
                />

                <PasswordField
                    label="Password"
                    value={formData.password}
                    onChange={handleInputChange('password')}
                    error={errors.password}
                    showPassword={showPassword}
                    onToggleVisibility={() => setShowPassword(!showPassword)}
                />
                <Box sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-end', width: '100%'}}>
                    {/* Forgot Password */}
                    <Typography
                        onClick={onForgotPassword}
                        sx={{
                            color: '#A4795B',
                            cursor: 'pointer',
                            textAlign: 'right',
                            fontSize: typography.h7.fontSize,
                            lineHeight: typography.h7.lineHeight,
                            fontWeight: typography.h7.fontWeight,
                            '&:hover': {textDecoration: 'underline'}
                        }}
                    >
                        Forgot password?
                    </Typography>

                    {/* Divider under text */}
                    <Box
                        sx={{
                            height: '1px',
                            backgroundColor: '#A4795B',
                            width: '120px',
                            marginTop: '4px',
                            marginLeft: 'auto',
                            marginRight: '0',
                        }}
                    />
                </Box>


                <StyledButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ maxWidth: 'none' }}
                >
                    Log in
                </StyledButton>

                <CustomDivider label='OR'/>

                <GoogleButton
                    fullWidth
                    variant="outlined"
                    startIcon={<ColoredGoogleIcon/>}
                    onClick={onGoogleLogin}
                >
                    Sign in with Google
                </GoogleButton>
            </FormContainer>
        </TabPanel>
    )
}