export const validatePasswords = ({currentPassword, newPassword, repeatNewPassword}) => {
  const errors = {};

  if (!currentPassword?.trim()) {
    errors.currentPassword = "Current password is required";
  }else if (currentPassword.length < 6) {
    errors.currentPassword = "Password must be at least 6 characters";
  }

  if (!newPassword?.trim()) {
    errors.newPassword = "New password is required";
  } else if (newPassword.length < 6) {
    errors.newPassword = "Password must be at least 6 characters";
  }

  if (!repeatNewPassword?.trim()) {
    errors.repeatNewPassword = "Repeat new password is required";
  } else if (newPassword !== repeatNewPassword) {
    errors.repeatNewPassword = "Passwords do not match";
  }

  return errors;
};
