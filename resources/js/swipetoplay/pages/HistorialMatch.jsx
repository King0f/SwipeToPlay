import React, { useEffect, useState } from "react";
import { usuarioStore } from "../store/userStore/usuarioStore";
import Header from '../components/Header';
import LateralNavP from '../components/LateralNavP'
import { useNavigate } from "react-router-dom";
import { apiStore } from "../store/apiStore/apiStore";
import 'boxicons';
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import { matchStore } from "../store/matchStore/matchStore";
import { format, parseISO } from 'date-fns';

const HistorialMatch = () => {
    const navigate = useNavigate();
    const path = apiStore.getState().basename;
    const [selectedMatch, setSelectedMatch] = useState()
    const [users, setUsers] = useState({});
    const [showPopup, setShowPopup] = useState(false);
    const { matches, getMatches, delMatch } = matchStore((state) => ({
        matches: state.matches,
        getMatches: state.getMatches,
        delMatch: state.delMatch,
    }));
    const { usuario,obtenerUsuarioById} = usuarioStore((state) => ({
        usuario: state.usuario,
        obtenerUsuarioById: state.obtenerUsuarioById
    }));

    useEffect(() => {
        getMatches();
    }, []);
    useEffect(() => {
        fetchUsers();
    }, [matches]);
    
    const fetchUsers = async () => {
        const usersData = {};
        for (const match of matches) {
          const displayUserId = match.id_user2 === usuario.id ? match.id_user1 : match.id_user2;
          if (!usersData[displayUserId]) {
            const user = await obtenerUsuarioById(displayUserId);
            if (user) {
              usersData[displayUserId] = user;
            }
          }
        }
        setUsers(usersData);
      };
  

    const getGameName = (gameId) => {
        const gameNames = {
            1: "League of Legends",
            2: "Valorant"
        };
        return gameNames[gameId] || "Unknown Game"; // Default a "Unknown Game" si el id no es reconocido
    };
    const handleClick = (matchId) => {
        setSelectedMatch(matchId)
        setShowPopup(true)
    }
    const handleCancel = () => {
        setShowPopup(false);
      };
      const handleDelete = async () => {
        delMatch(selectedMatch);
        setShowPopup(false);
    };
    return (
        <div className="pt-20">
            <Header />
            <LateralNavP />

            <div className="flex flex-wrap justify-center gap-8 p-4">
                <div className="flex justify-center items-center min-h-3.5 bg-cover bg-center rounded-md" style={{ backgroundImage: `url(../storage/imagenes/background-historialmatch.jpg)` }}>
                    <div className="bg-white bg-opacity-80 rounded-md shadow-lg p-6 mt-4 mb-24 max-w-4xl w-full">
                        <table className="min-w-full divide-y divide-gray-200 md text-center">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fecha de creación</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Usuario</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Juego</th>
                                    <th className="px-6 py-3 bg-gray-50 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Borrar Match</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {matches.map((match) => {
                                     const displayUserId = match.id_user2 === usuario.id ? match.id_user1 : match.id_user2;
                                     const user = users[displayUserId];
                                    return (
                                        <tr key={match.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            {match.created_at ? format(parseISO(match.created_at), 'dd/MM/yyyy') : ''}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {user ? user.username : 'Cargando...'}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {getGameName(match.id_juego)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            <button className="bg-gray-500 text-white p-2 rounded hover:bg-red-500 w-50" onClick={() => {handleClick(match.id)}}>Borrar Match</button>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75">
          <div className="bg-white p-5 rounded shadow-lg text-center">
            <p>¿Deseas eliminar este match?</p>
            <div className="mt-4 flex justify-center space-x-4">
              <button
                onClick={handleDelete}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-red-500"
              >
                Sí
              </button>
              <button
                onClick={handleCancel}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-red-500"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
            <Footer />
        </div>
    );
};

export default HistorialMatch;
