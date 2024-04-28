<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>SwipeToPlay</title>
    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
</head>
<body>
    <div id="app">
        <h1>Consulta de Invocador</h1>
        <form id="searchForm">
            <label for="nombreInvocador">Nombre del Invocador:</label>
            <input type="text" id="nombreInvocador" name="nombreInvocador" required>
            <label for="region">Región:</label>
            <select id="region" name="region" required>
                <option value="europe">Europa</option>
            </select>
            <button type="submit">Buscar</button>
        </form>
        <div id="resultado">
        </div>
    </div>

    <script>
        const API_KEY = 'RGAPI-56d05df7-381c-4387-9dba-9e8a67280e4f';

        async function obtenerDatosInvocador(nombreInvocador, region) {
            const summonerUrl = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${nombreInvocador}`;
            const params = {
                api_key: API_KEY
            };

            try {
                const response = await axios.get(`${summonerUrl}`, { params });
                if (!response.data) {
                    throw new Error('Error al obtener información del invocador.');
                }
                const summonerInfo = response.data;
                const summonerId = summonerInfo.puuid;

                const matchHistoryUrl = `https://${region}.api.riotgames.com/lol/match/v4/matchlists/by-puuid/${summonerId}`;
                params.queue = 420;
                params.endIndex = 10;
                const matchResponse = await axios.get(`${matchHistoryUrl}`, { params });
                if (!matchResponse.data) {
                    throw new Error('Error al obtener historial de partidas.');
                }
                const matchHistory = matchResponse.data;

                return { summonerInfo, matchHistory };
            } catch (error) {
                console.error(error);
                return null;
            }
        }

        document.getElementById('searchForm').addEventListener('submit', async (event) => {
            event.preventDefault();
            const nombreInvocador = document.getElementById('nombreInvocador').value;
            const region = document.getElementById('region').value;
            const resultado = document.getElementById('resultado');

            resultado.innerHTML = '<p>Cargando...</p>';

            try {
                const data = await obtenerDatosInvocador(nombreInvocador, region);
                if (data) {
                    resultado.innerHTML = `
                        <h2>Información del Invocador:</h2>
                        <pre>${JSON.stringify(data.summonerInfo, null, 2)}</pre>
                        <h2>Historial de Partidas:</h2>
                        <pre>${JSON.stringify(data.matchHistory, null, 2)}</pre>
                    `;
                } else {
                    resultado.innerHTML = '<p>Error al obtener datos del invocador.</p>';
                }
            } catch (error) {
                console.error(error);
                resultado.innerHTML = '<p>Ocurrió un error al procesar la solicitud.</p>';
            }
        });
    </script>
</body>
</html>
