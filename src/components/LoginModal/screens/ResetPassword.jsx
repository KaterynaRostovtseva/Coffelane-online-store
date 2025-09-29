import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { StyledButton } from '../../UI/StyledButton.js';
import { typography } from '../../../theme/typography.js';
import passwordResetImage from '../../../assets/images/sign-up/password-reset.png';
import { FormContainer } from '../shared/FormContainer.jsx';
import { PasswordField } from '../shared/PasswordField.jsx';

export const ResetPassword = ({ onBackToLogin, onResetPassword }) => {
    const [formData, setFormData] = useState({
        newPassword: '',
        repeatPassword: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errors, setErrors] = useState({});

    // Password validation regex
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handleInputChange = (field) => (event) => {
        const value = event.target.value;
        setFormData(prev => ({ ...prev, [field]: value }));
        
        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        // Validate new password
        if (!formData.newPassword) {
            newErrors.newPassword = 'New password is required';
        } else if (!passwordRegex.test(formData.newPassword)) {
            newErrors.newPassword = 'Password must be at least 8 characters with uppercase, lowercase, number, and special character';
        }

        // Validate repeat password
        if (!formData.repeatPassword) {
            newErrors.repeatPassword = 'Please repeat your password';
        } else if (formData.newPassword !== formData.repeatPassword) {
            newErrors.repeatPassword = 'Passwords do not match';
        }

        return newErrors;
    };

    const isFormValid = () => {
        return formData.newPassword && 
               formData.repeatPassword &&
               !errors.newPassword &&
               !errors.repeatPassword;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();
        setErrors(newErrors);

        if (Object.keys(newErrors).length === 0) {
            setIsLoading(true);
            // Simulate API call
            setTimeout(() => {
                setIsLoading(false);
                onResetPassword(formData.newPassword);
            }, 1000);
        }
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
                    alt="Reset Password"
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
                Reset password
            </Typography>

            {/* Instructional Text */}
            <Typography sx={{
                ...typography.h5,
                color: '#3E3027',
                textAlign: 'center'
            }}>
                Enter your new password below.
            </Typography>

            {/* Form */}
            <FormContainer onSubmit={handleSubmit} gap={4}>
                <PasswordField
                    label="New password"
                    value={formData.newPassword}
                    onChange={handleInputChange('newPassword')}
                    error={errors.newPassword}
                    showPassword={showPassword}
                    onToggleVisibility={() => setShowPassword(!showPassword)}
                />

                <PasswordField
                    label="Repeat new password"
                    value={formData.repeatPassword}
                    onChange={handleInputChange('repeatPassword')}
                    error={errors.repeatPassword}
                    showPassword={showRepeatPassword}
                    onToggleVisibility={() => setShowRepeatPassword(!showRepeatPassword)}
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
                    {isLoading ? 'Resetting...' : 'Reset Password'}
                </StyledButton>
            </FormContainer>
        </Box>
    );
};
