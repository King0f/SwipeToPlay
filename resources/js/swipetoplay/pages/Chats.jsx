import React, { useEffect, useState } from "react";
import { chatStore } from "../store/chatStore/chatStore";
import { usuarioStore } from "../store/userStore/usuarioStore";
import ChatComp from "../components/ChatComp";
import {ToastContainer} from 'react-toastify'
import Header from "../components/Header";
import Footer from "../components/Footer";

function Chats() {
    const { chats, getChats, obtenerMatchPorChat } = chatStore(state => ({
        chats: state.chats,
        getChats: state.getChats,
        obtenerMatchPorChat: state.obtenerMatchPorChat
    }));
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { usuario, obtenerUsuarioById } = usuarioStore(state => ({
        usuario: state.usuario,
        obtenerUsuarioById: state.obtenerUsuarioById
    }));
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        getChats();
    }, []);
    useEffect(() => {
        const fetchUserDetails = async () => {
            const details = {};
            console.log(chats)
            for (const chat of chats) {
                const usernames = await obtenerMatchPorChat(chat.id)
                const otherUserId = usernames.id_user1 === usuario.id ? usernames.id_user2 : usernames.id_user1;
                const user = await obtenerUsuarioById(otherUserId);
                if (user) {
                    const imagePath = user.imagen;
                    details[chat.id] = {
                        username: user.username,
                        imagePath: imagePath
                    };
                }
            }
            setUserDetails(details);
        };
        
        if (chats.length) {
            fetchUserDetails();
        }
    }, [chats]);

    return (
    <div className="h-screen bg-black">
    <Header />
    <ToastContainer pauseOnFocusLoss={false} limit={3} />
    <div className="h-[93.05vh] sm:h-[90.05vh] tres:h-[90.4vh] 390:h-[92.4vh] cuatro:h-[92.9vh] 430:h-[93.1vh] 360:h-[91.4vh]  md:h-[93.75vh] lg:h-[95.3vh] xl:h-[93vh] w-full bg-black">
        <div className="flex h-[92.4vh] md:h-[92vh] lg:h-[91vh] tres:h-[89.9vh] 390:h-[92vh] 360:h-[90.9vh] cuatro:h-[92vh] 430:h-[92.5vh] lg:h-[94.5vh] xl:h-[91.4vh] bg-black">
            {/* Botón de menú (visible solo en móviles) */}
            <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="p-2 text-white z-50 block md:hidden focus:outline-none"
            >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                </svg>
            </button>

            {/* Menú lateral */}
            <div className={`fixed top-15 md:left-0 left-0 h-full bg-black transition-transform transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} w-full sm:w-1/4 md:relative md:translate-x-0 md:w-2/4 lg:w-1/4 overflow-y-auto`}>
                <div className="mt-3">
                    {chats?.map((chat) => (
                        <div
                        key={chat?.id}
                        onClick={() => {
                            setSelectedChatId(chat?.id);
                            setIsMenuOpen(!isMenuOpen);
                        }}
                        className={`flex items-center p-4 cursor-pointer ${selectedChatId === chat?.id ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}
                    >
                            {userDetails[chat?.id] ? (
                                <div className="flex items-center space-x-4">
                                    <img src={userDetails[chat?.id].imagePath || 'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png'} alt={`${userDetails[chat.id].username}'s profile`} className="w-10 h-10 rounded-full bg-white"/>
                                    <p className="text-white text-lg"><b>{userDetails[chat?.id].username}</b></p>
                                </div>
                            ) : "Loading..."}
                        </div>
                    ))}
                    <div className="flex items-center p-4 bg-gray-800">
                        <div className="flex items-center space-x-4">
                            <p className="text-white text-lg"><b>Número de mensajes restantes: {usuario.lvl_premium === 2 ? '∞' : usuario.n_mensajes}</b></p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-center items-center bg-[#1a1115] text-white">
                {selectedChatId ? (
                    <ChatComp chatId={selectedChatId} urlReceived={userDetails[selectedChatId].imagePath || 'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png'} />
                ) : (
                    <div>Selecciona uno de los chats de la bandeja</div>
                )}
            </div>
        </div>
        </div>
    </div>
    );
}

export default Chats;

