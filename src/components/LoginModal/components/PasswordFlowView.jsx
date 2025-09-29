import React from 'react';
import { ForgotPassword } from '../screens/ForgotPassword.jsx';
import { ResetPassword } from '../screens/ResetPassword.jsx';
import { PasswordChangedSuccess } from '../screens/PasswordChangedSuccess.jsx';

export const PasswordFlowView = ({
    showForgotPassword,
    showResetPassword,
    showPasswordChangedSuccess,
    onBackToLogin,
    onSendEmail,
    onResetPassword,
    onAutoLogin,
}) => {
    if (showForgotPassword) {
        return (
            <ForgotPassword
                onBackToLogin={onBackToLogin}
                onSendEmail={onSendEmail}
            />
        );
    }

    if (showResetPassword) {
        return (
            <ResetPassword
                onBackToLogin={onBackToLogin}
                onResetPassword={onResetPassword}
            />
        );
    }

    if (showPasswordChangedSuccess) {
        return (
            <PasswordChangedSuccess
                onBackToLogin={onBackToLogin}
                onAutoLogin={onAutoLogin}
            />
        );
    }

    return null;
};
