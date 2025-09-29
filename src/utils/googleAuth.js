// Google OAuth 2.0 utility functions

// Load Google API script
const loadGoogleAPI = () => {
  return new Promise((resolve, reject) => {
    if (window.google) {
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.onload = () => {
      window.gapi.load('auth2', () => {
        resolve();
      });
    };
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Initialize Google Auth
export const initializeGoogleAuth = async () => {
  try {
    await loadGoogleAPI();
    
    const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;
    
    if (!clientId) {
      throw new Error('Google Client ID not found in environment variables');
    }

    await window.gapi.auth2.init({
      client_id: clientId,
    });

    return true;
  } catch (error) {
    console.error('Failed to initialize Google Auth:', error);
    return false;
  }
};

// Sign in with Google
export const signInWithGoogle = async () => {
  try {
    const authInstance = window.gapi.auth2.getAuthInstance();
    
    if (!authInstance) {
      throw new Error('Google Auth not initialized');
    }

    const googleUser = await authInstance.signIn();
    const profile = googleUser.getBasicProfile();
    const idToken = googleUser.getAuthResponse().id_token;

    return {
      email: profile.getEmail(),
      token: idToken,
      name: profile.getName(),
      picture: profile.getImageUrl()
    };
  } catch (error) {
    console.error('Google sign-in failed:', error);
    throw error;
  }
};
