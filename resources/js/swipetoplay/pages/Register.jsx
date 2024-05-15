import React, { useState } from "react";
import { Link, useNavigate} from "react-router-dom";
import { apiStore } from "../store/apiStore/apiStore";

function Register() {

  const {localhost, path} = apiStore((state) => ({
    localhost: state.localhost,
    path: state.basename
}))
    const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    });

    const navigate = useNavigate();
   /**
   * La función `handleInputChange` se utiliza para actualizar el objeto `formData` con el nuevo valor
   * del campo de entrada que desencadenó el evento.
   */
    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleLogin = (e) => {
      e.preventDefault();

     //Creando el objeto usuario con los datos del formulario
      const user = {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      };

      /* El objeto `const options` se utiliza para configurar la solicitud HTTP que se enviará al
      servidor al registrar un usuario. */
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      };

     /* La variable `const url` almacena el punto final de la URL al que se enviarán los datos de
     registro. En este caso, se establece en "http://localhost/TareaRestaurante2/public/api/register".
     Esta URL se utiliza en la función `fetch` para realizar una solicitud POST al servidor y registrar un nuevo usuario. */
      const url = `${localhost}/api/register`;

      /* El código está realizando una solicitud POST a la URL especificada con las opciones proporcionadas. */
      fetch(url, options)
      .then(response => response.json())
      .then(resultado => {
        if(resultado.token) {
          localStorage.setItem('token', resultado.token); // Guarda el token en localStorage
          localStorage.setItem('username', 0);
           navigate(path + '/RiotUser'); // Redirige al inicio usando navigate
        }
      })
      .catch(err => console.log(err));
    };

    return (
      <>
        <div className="relative h-screen bg-cover bg-center flex items-center justify-center bg-white">
          <div className="relative z-10 bg-gray-600 p-8 rounded-md shadow-md w-96 text-white">
            <h2 className="text-2xl font-bold mb-4 text-white ml-28">Registro</h2>
            <form onSubmit={handleLogin}>
            <div className="mb-4">
                <label htmlFor="username" className="block text-white text-sm font-medium mb-2">Username:</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border bg-gray-700 rounded-md text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-white text-sm font-medium mb-2">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border bg-gray-700 rounded-md text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-white text-sm font-medium mb-2">Contraseña:</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border bg-gray-700 rounded-md text-white"
                />
              </div>
              <button type="submit" className="w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300">
                Registrarse
              </button>
            </form>
            <div className="mt-4 text-white text-center">
              ¿Ya tienes cuenta? <Link to={path + "/Login"} className="text-red-500 underline font-bold">Inicia sesión aquí.</Link>
            </div>
          </div>
        </div>
      </>
    );
  }

export default Register
