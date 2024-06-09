import { create } from "zustand";
import { apiStore } from "../apiStore/apiStore";

export const matchStore = create((set, get) => ({
    matches: [],
    getMatches: async () => {
        try {
            const localhost = apiStore.getState().localhost;
            const token = localStorage.getItem('token');
            if (!token) throw new Error('No token found');

            const headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            });
            const response = await fetch(`${localhost}/api/obtenerMatches`, {
                method: 'GET',
                headers: headers
            });
            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();
            set({ matches: data });

        } catch (err) {
            console.error(err)
        }
    },
    delMatch: async (idMatch) => {
        try {
            const localhost = apiStore.getState().localhost;
            const token = localStorage.getItem('token');
            if (!token) throw new Error('Authentication token not found');

            const headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            });

            const response = await fetch(`${localhost}/api/delMatch`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify({ id: idMatch })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(`Failed to delete match: ${errorData.message}`);
            }
            matchStore.setState(state => ({
                matches: state.matches.filter(match => match.id !== idMatch)
            }));

        } catch (err) {
            console.error("Deletion error:", err.message);
        }
    },
}))