import { create } from "zustand";
export const apiStore = create((set) => ({
    //RUTA PARA LOCALHOST: "http://localhost/SwipeToPlay/public" 
    //RUTA PARA PLESK: ""
    localhost: "http://localhost/SwipeToPlay/public",
    //RUTA PARA LOCALHOST: "/SwipeToPlay/public/swipetoplay" 
    //RUTA PARA PLESK: "/swipetoplay"
    basename: "/SwipeToPlay/public/swipetoplay"
}))
