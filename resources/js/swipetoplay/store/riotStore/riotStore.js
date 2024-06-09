import { create } from "zustand";

export const riotStore = create((set) => ({
    summoner: [],
    obtenerDatosInvocador: async (nombreInvocador, region) => {
        const summonerUrl = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nombreInvocador}`;
        const params = {
            api_key: "RGAPI-d942330a-473a-458a-b63c-e1f313625559"
        };

        try {
            const response = await fetch(`${summonerUrl}?${new URLSearchParams(params)}`);
            if (!response.ok) {
                throw new Error('Error al obtener información del invocador.');
            }
            const summonerInfo = await response.json();
            const summonerId = summonerInfo.puuid;

            const EncryptedIdUrl = `https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-puuid/${summonerId}`;

            const EncryptedIdResponse = await fetch(`${EncryptedIdUrl}?${new URLSearchParams(params)}`);
            if (!EncryptedIdResponse.ok) {
                throw new Error('Error al obtener historial de partidas.');
            }
            const EncryptedId = await EncryptedIdResponse.json();
            const summonerIdEncrypted = EncryptedId.id;

            const SummonerUrl = `https://${region}.api.riotgames.com/lol/league/v4/entries/by-summoner/${summonerIdEncrypted}`;

            const SummonerResponse = await fetch(`${SummonerUrl}?${new URLSearchParams(params)}`);
            if (!SummonerResponse.ok) {
                throw new Error('Error al obtener historial de partidas.');
            }
            const Summoner = await SummonerResponse.json();
            set({ summoner: Summoner });
        } catch (error) {
            console.error(error);
            return null;
        }
    }
}))
