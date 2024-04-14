import './bootstrap';

const API_KEY = 'RGAPI-4054863a-f547-4dff-b39f-90cae10b866e';

async function obtenerDatosInvocador(nombreInvocador, region) {
    const summonerUrl = `https://${region}.api.riotgames.com/riot/account/v1/accountss/by-riot-id/${nombreInvocador}`;
    const params = {
        api_key: API_KEY
    };

    try {
        const response = await fetch(`${summonerUrl}?${new URLSearchParams(params)}`);
        if (!response.ok) {
            throw new Error('Error al obtener información del invocador.');
        }
        const summonerInfo = await response.json();
        const summonerId = summonerInfo.puuid;

        const matchHistoryUrl = `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-puuid/${summonerId}`;
        params.queue = 420;
        params.endIndex = 10;
        const matchResponse = await fetch(`${matchHistoryUrl}?${new URLSearchParams(params)}`);
        if (!matchResponse.ok) {
            throw new Error('Error al obtener historial de partidas.');
        }
        const matchHistory = await matchResponse.json();

        return { summonerInfo, matchHistory };
    } catch (error) {
        console.error(error);
        return null;
    }
}

const nombreInvocador = 'Hefesto/ARC';
const region = 'europe';
obtenerDatosInvocador(nombreInvocador, region)
    .then((data) => {
        console.log('Información del invocador:');
        console.log(data.summonerInfo);
        console.log('Historial de partidas:');
        console.log(data.matchHistory);
    })
    .catch((error) => console.error(error));
