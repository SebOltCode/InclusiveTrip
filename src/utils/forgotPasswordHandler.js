import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const API_URL = import.meta.env.VITE_APP_INCLUSIVETRIPBE_URL;

export async function handleForgotPasswordSubmit(forgotPasswordEmail, closeModal) {
  try {
    await axios.post(`${API_URL}/auth/forgot-password`, {
      email: forgotPasswordEmail,
    });

    toast.success("Eine E-Mail zur Passwort-Zurücksetzung wurde gesendet. Bitte überprüfen Sie Ihr Postfach.");
  } catch (error) {
    console.error("Fehler beim Senden der E-Mail zur Passwort-Zurücksetzung:", error);
    toast.error("Fehler beim Senden der E-Mail zur Passwort-Zurücksetzung. Bitte versuchen Sie es erneut.");
  } finally {
    closeModal();
  }
}