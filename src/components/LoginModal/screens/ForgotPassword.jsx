import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { StyledButton } from '../../UI/StyledButton.js';
import { typography } from '../../../theme/typography.js';
import passwordResetImage from '../../../assets/images/sign-up/password-reset.png';
import { FormContainer } from '../shared/FormContainer.jsx';
import { FormField } from '../shared/FormField.jsx';
import { BackLink } from '../shared/BackLink.jsx';

export const ForgotPassword = ({ onBackToLogin, onSendEmail }) => {
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulation of API call
        setTimeout(() => {
            setIsLoading(false);
            onSendEmail(email);
        }, 1000);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const isFormValid = () => {
        return email && email.trim() !== '';
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            padding: 0,
            width: '100%'
        }}>
            {/* Password Reset Illustration */}
            <Box sx={{
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Box
                    component="img"
                    src={passwordResetImage}
                    alt="Password Reset"
                    sx={{
                        width: '100%',
                        height: 'auto',
                        objectFit: 'contain',
                        margin: 0,
                        padding: 0
                    }}
                />
            </Box>

            {/* Main Heading */}
            <Typography sx={{
                ...typography.h3,
                color: '#3E3027',
                textAlign: 'center'
            }}>
                Forgot your password?
            </Typography>

            {/* Instructional Text */}
            <Typography sx={{
                ...typography.h5,
                color: '#3E3027',
                textAlign: 'center'
            }}>
                Enter your email to receive a password reset link.
            </Typography>

            {/* Form */}
            <FormContainer onSubmit={handleSubmit} gap={4}>
                <FormField
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                />

                <StyledButton
                    fullWidth
                    type="submit"
                    variant="contained"
                    disabled={isLoading || !isFormValid()}
                    sx={{ 
                        maxWidth: 'none',
                        ...typography.h6
                    }}
                >
                    {isLoading ? 'Sending...' : 'Send Email'}
                </StyledButton>
            </FormContainer>

            <BackLink onClick={onBackToLogin} />
        </Box>
    );
};
