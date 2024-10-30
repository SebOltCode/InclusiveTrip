import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import i18n from '../i18n';

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

export async function handleForgotPasswordSubmit(forgotPasswordEmail, closeModal) {
  try {
    await axios.post(`${API_URL}/auth/forgot-password`, {
      email: forgotPasswordEmail,
    });

    toast.success(i18n.t("loginpage.password_reset_email_sent"));
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail zur Passwort-Zurücksetzung:", error);
    toast.error(i18n.t("forgotPasswordHandler.error_sending_email"));
  } finally {
    closeModal();
  }
}