import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


const RiotUser = () => {
    const [riotAccount, setRiotAccount] = useState("");
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
        const url = "http://localhost/SwipeToPlay/public/api/riotUser";  
        const payload = {
            riotID: riotAccount
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
                <p className="text-white mb-4">En esta página usamos cuentas de Riot para realizar algunas de las funcionalidades de la página como la función Match! Por favor, inserte el nombre de su cuenta de Riot:</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={riotAccount}
                        onChange={(e) => setRiotAccount(e.target.value)}
                        className="w-full px-3 py-2 mb-4 border bg-gray-700 rounded-md text-white"
                        placeholder="Nombre de cuenta de Riot"
                        required
                    />
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