import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { apiStore } from "../store/apiStore/apiStore";
const RiotUser = () => {
    const {localhost} = apiStore((state) => ({
        localhost: state.localhost,
    }))
    const [riotAccount, setRiotAccount] = useState("");
    const [rango, setRango] = useState("")
    const [juego, setJuego] = useState("")
    const [posicion, setPosicion] = useState("")

    const [termsAccepted, setTermsAccepted] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        const token = localStorage.getItem('token')
        e.preventDefault();
        if (!termsAccepted) {
            alert("Debe aceptar los términos y condiciones para continuar.");
            return;
        }
        // Aquí manejarías el envío del nombre de cuenta y la validación con tu backend
        const url = `${localhost}/api/riotUser`;  
        const payload = {
            riotID: riotAccount,
            juego: juego,
            posicion: posicion
        };

        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        };

        fetch(url, options)
            .then(response => {
                if (response.ok) { // Verifica si la respuesta del servidor es 200-299
                    console.log("Respuesta del servidor: OK");
                    navigate('/'); // Redireccionar a la página principal o dashboard tras el éxito
                } else {
                    throw new Error('Algo salió mal en la solicitud al servidor'); // Lanza un error si la respuesta no es satisfactoria
                }
            })
            .catch(error => {
                console.error("Error al enviar la cuenta de Riot:", error);
                alert("Hubo un problema con su solicitud. Por favor, intente nuevamente.");
            });
    };

    return (
        <div className="h-screen bg-gray-900 flex items-center justify-center">
            <div className="bg-gray-800 bg-opacity-90 p-8 rounded-md shadow-lg w-96">
                <h1 className="text-xl font-bold text-white mb-6">Bienvenido a SwipeToPlay!</h1>
                <p className="text-white mb-4">Por favor, completa los siguientes datos para poder usar la funcionalidad de Match dentro de la página:</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={riotAccount}
                        onChange={(e) => setRiotAccount(e.target.value)}
                        className="w-full px-3 py-2 mb-4 border bg-gray-700 rounded-md text-white"
                        placeholder="Nombre de cuenta de Riot"
                        required
                    />
                    <select
                        value={juego}
                        onChange={(e) => setJuego(e.target.value)}
                        className="w-full px-3 py-2 mb-4 border bg-gray-700 rounded-md text-white"
                        required
                    >
                        <option value="">Selecciona un juego</option>
                        <option value="League of Legends">League of Legends</option>
                        <option value="Valorant">Valorant</option>
                    </select>

                    {/* Dropdown for selecting rank */}
                    { juego === "League of Legends" && (
                        <select
                            value={rango}
                            onChange={(e) => setRango(e.target.value)}
                            className="w-full px-3 py-2 mb-4 border bg-gray-700 rounded-md text-white"
                            required
                        >
                            <option value="">Selecciona un rango</option>
                            <option value="Hierro">Hierro</option>
                            <option value="Bronce">Bronce</option>
                            <option value="Plata">Plata</option>
                            <option value="Oro">Oro</option>
                            <option value="Platino">Platino</option>
                            <option value="Esmeralda">Esmeralda</option>
                            <option value="Diamante">Diamante</option>
                            <option value="Master">Master</option>
                            <option value="GrandMaster">GrandMaster</option>
                            <option value="Challenger">Challenger</option>
                        </select>
                    )}

                    { juego === "Valorant" && (
                        <select
                            value={rango}
                            onChange={(e) => setRango(e.target.value)}
                            className="w-full px-3 py-2 mb-4 border bg-gray-700 rounded-md text-white"
                            required
                        >
                            <option value="">Selecciona tu rango en el juego.</option>
                            <option value="Hierro">Hierro</option>
                            <option value="Bronce">Bronce</option>
                            <option value="Plata">Plata</option>
                            <option value="Oro">Oro</option>
                            <option value="Platino">Platino</option>
                            <option value="Esmeralda">Esmeralda</option>
                            <option value="Diamante">Diamante</option>
                            <option value="Inmortal">Inmortal</option>
                            <option value="Radiant">Radiant</option> 
                        </select>
                    )}

                    {/* Dropdown for selecting position */}
                    { juego === "League of Legends" && (
                        <select
                            value={posicion}
                            onChange={(e) => setPosicion(e.target.value)}
                            className="w-full px-3 py-2 mb-4 border bg-gray-700 rounded-md text-white"
                            required
                        >
                            <option value="">Selecciona tu posición más jugada del juego.</option>
                            <option value="Top">Top</option>
                            <option value="Jungla">Jungla</option>
                            <option value="Medio">Medio</option>
                            <option value="AD Carry">AD Carry</option>
                            <option value="Soporte">Soporte</option>
                        </select>
                    )}

                    { juego === "Valorant" && (
                        <select
                            value={posicion}
                            onChange={(e) => setPosicion(e.target.value)}
                            className="w-full px-3 py-2 mb-4 border bg-gray-700 rounded-md text-white"
                            required
                        >
                            <option value="">Selecciona tu tipo de personaje más jugado del juego.</option>
                            <option value="Duelista">Duelista</option>
                            <option value="Iniciador">Iniciador</option>
                            <option value="Centinela">Centinela</option>
                            <option value="Controlador">Controlador</option>
                        </select>
                    )}

                    <div className="flex items-center mb-4">
                        <input
                            type="checkbox"
                            checked={termsAccepted}
                            onChange={(e) => setTermsAccepted(e.target.checked)}
                            id="termsCheckbox"
                            className="w-4 h-4 text-blue-600 bg-gray-700 rounded border-gray-300 focus:ring-blue-500"
                        />
                        <label htmlFor="termsCheckbox" className="ml-2 text-sm text-white">Acepto las condiciones de la página</label>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-200">
                        Añadir
                    </button>
                </form>
            </div>
        </div>
    );
}


export default RiotUser;