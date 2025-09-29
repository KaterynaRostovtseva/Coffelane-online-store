import { validation } from '../utils/validation.js';

export const useFormHandlers = (state, authActions, onClose) => {
    const {
        tabValue,
        formData,
        errors,
        setErrors,
        setShowWelcome,
        setShowForgotPassword,
        setShowResetPassword,
        setShowPasswordChangedSuccess,
        setResetPasswordData,
    } = state;

    const { handleRegistration, handleLogin, handleGoogleLogin } = authActions;

    const handleInputChange = (field) => (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
        state.setFormData(prev => ({...prev, [field]: value}));

        // Clear error when user starts typing
        if (errors[field]) {
            setErrors(prev => ({...prev, [field]: ''}));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validation(tabValue, formData);
        setErrors(newErrors);
        
        if (Object.keys(newErrors).length === 0) {
            if (tabValue === 1) { // Sign up tab
                const error = await handleRegistration(formData, () => setShowWelcome(true));
                if (error) {
                    setErrors({ general: error });
                }
            } else { // Login tab
                const error = await handleLogin(formData, onClose);
                if (error) {
                    setErrors({ general: error });
                }
            }
        }
    };

    const handleGoogleLoginClick = async () => {
        const error = await handleGoogleLogin(onClose);
        if (error) {
            setErrors({ general: error });
        }
    };

    const handleForgotPassword = () => {
        setShowForgotPassword(true);
    };

    const handleSendEmail = (email) => {
        setResetPasswordData(prev => ({ ...prev, email }));
        setShowForgotPassword(false);
        setShowResetPassword(true);
    };

    const handleResetPassword = (newPassword) => {
        setResetPasswordData(prev => ({ ...prev, newPassword }));
        setShowResetPassword(false);
        setShowPasswordChangedSuccess(true);
    };

    return {
        handleInputChange,
        handleSubmit,
        handleGoogleLoginClick,
        handleForgotPassword,
        handleSendEmail,
        handleResetPassword,
    };
};
