import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // 1. Importamos useLocation
import { useAuth } from '../hooks/useAuth';
import { useFormValidation } from '../hooks/useFormValidation';
import LoginForm from '../components/LoginForm';

/**
 * LoginFeature Component.
 * * This "Smart Component" or orchestrator manages the authentication flow. 
 */
const LoginFeature = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation(); // 2. Inicializamos el hook para leer el estado
  const [isLoading, setIsLoading] = useState(false);

  // 3. Capturamos la ruta de origen que enviamos desde EventDetail
  // Si no existe (el usuario entró directo al login), por defecto va a /profile
  const from = location.state?.from || "/profile";

  const validate = (values) => {
    let errors = {};
    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email format";
    }
    
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }
    
    return errors;
  };

  const { values, errors, handleChange, setErrors, isValid } = useFormValidation(
    { email: '', password: '' },
    validate
  );

  /**
   * Form Submission Handler:
   * Coordinates the asynchronous login process and post-login navigation.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isValid()) return;

    setIsLoading(true);
    try {
      console.log("[LoginFeature]: Attempting login for", values.email);
      
      // Execute the login action from AuthContext
      await login(values);
      
      // 4. ÉXITO: Redirigimos a la ruta 'from' (ej: el detalle del evento)
      // Usamos { replace: true } para que no pueda volver al login con el botón 'atrás'
      navigate(from, { replace: true });
      
    } catch (err) {
      console.error("[LoginFeature Error]:", err);
      setErrors({ global: "Invalid credentials. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <LoginForm 
      values={values} 
      errors={errors} 
      onChange={handleChange} 
      onSubmit={handleSubmit} 
      isLoading={isLoading} 
    />
  );
};

export default LoginFeature;