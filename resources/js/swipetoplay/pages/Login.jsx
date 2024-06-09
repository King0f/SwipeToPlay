import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { apiStore } from "../store/apiStore/apiStore";
import Header from "../components/Header";
import Footer from "../components/Footer";

function Login() {

  const { localhost, path } = apiStore((state) => ({
    localhost: state.localhost,
    path: state.basename
  }))
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const user = {
      email: formData.email,
      password: formData.password,
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    };

    const url = `${localhost}/api/login`

    fetch(url, options)
      .then(response => response.json())
      .then(resultado => {
        if (resultado.token) {
          localStorage.setItem('token', resultado.token);
          localStorage.setItem('username', 0);
          navigate(path);
        }
      })
      .catch(err => console.log(err));
  };

  return (
    <>
      <Header />
      <div className="relative h-screen bg-cover bg-center flex items-center justify-center">
        <div className="relative z-10 bg-gray-600 bg-opacity-90 p-8 rounded-md shadow-md w-96">
          <h2 className="text-2xl font-bold mb-4 text-white text-center">Inicio sesión</h2>
          <form onSubmit={handleLogin}>
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
              Iniciar sesión
            </button>
          </form>
          <div className="mt-4 text-white text-center">
            ¿Aún no tienes cuenta? <Link to={path + "/Register"} className="text-red-500 font-bold underline">Registrate aquí.</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Login
