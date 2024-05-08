import React, { useEffect, useState } from "react";
import { chatStore } from "../store/chatStore/chatStore";
import { usuarioStore } from "../store/userStore/usuarioStore";
import ChatComp from "../components/ChatComp";
import Header from "../components/Header";
import { apiStore } from "../store/apiStore/apiStore";

function Chats() {
    const {localhost} = apiStore((state) => ({
        localhost: state.localhost,
    }))
    const { chats, getChats, obtenerMatchPorChat } = chatStore(state => ({
        chats: state.chats,
        getChats: state.getChats,
        obtenerMatchPorChat: state.obtenerMatchPorChat
    }));
    const { usuario, obtenerUsuarioById } = usuarioStore(state => ({
        usuario: state.usuario,
        obtenerUsuarioById: state.obtenerUsuarioById
    }));
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        getChats();
    }, []);
    const photoURL = 'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png'
    useEffect(() => {
        const fetchUserDetails = async () => {
            const details = {};
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
    <>
        <div className="flex h-screen bg-black">
        <div className="w-full  min-[400px]:w-1/2 sm:w-1/4 md:w-1/4 lg:w-1/4 xl:w-1/4 overflow-y-auto">
            {chats.map((chat) => (
                <div
                    key={chat.id}
                    onClick={() => setSelectedChatId(chat.id)}
                    className={`flex items-center p-4 cursor-pointer ${selectedChatId === chat.id ? 'bg-gray-700' : 'bg-gray-800 hover:bg-gray-700'}`}
                >
                    {userDetails[chat.id] ? (
                        <div className="flex items-center space-x-4">
                            <img src={userDetails[chat.id].imagePath || 'https://e7.pngegg.com/pngimages/550/997/png-clipart-user-icon-foreigners-avatar-child-face.png'} alt={`${userDetails[chat.id].username}'s profile`} className="w-10 h-10 rounded-full bg-white"/>
                            <p className="text-white text-lg"><b>{userDetails[chat.id].username}</b></p>
                        </div>
                    ) : "Loading..."}
                </div>
            ))}
        </div>

            <div className="w-3/4 flex justify-center items-center bg-gray-900 text-white">
                {selectedChatId ? (
                    <ChatComp chatId={selectedChatId} />
                ) : (
                    <div>Select a chat to view details</div>
                )}
            </div>
        </div>
    </>
    );
}

export default Chats;

