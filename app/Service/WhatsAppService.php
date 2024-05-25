<?php

declare(strict_types=1);

namespace App\Service;

class WhatsAppService 
{
    private $token;

    private $url;

    public function __construct(string $token, string $url) {
        $this->token = $token;
        $this->url = $url;
    }

    public function enviarMensaje(string $destinatario, string $templateName, string $languageCode, array $datosDinamicos): array {
        $mensaje = json_encode([
            'messaging_product' => 'whatsapp',
            'to' => $destinatario,
            'type' => 'template',
            'template' => [
                'name' => $templateName,
                'language' => [
                    'policy' => 'deterministic',
                    'code' => $languageCode
                ],
                'components' => [
                    [
                        'type' => 'body',
                        'parameters' => array_map(function ($dato) {
                            return ['type' => 'text', 'text' => $dato];
                        }, $datosDinamicos)
                    ]
                ]
            ]
        ]);        

        $header = [
            "Authorization: Bearer " . $this->token,
            "Content-Type: application/json"
        ];

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL, $this->url);
        curl_setopt($curl, CURLOPT_POSTFIELDS, $mensaje);
        curl_setopt($curl, CURLOPT_HTTPHEADER, $header);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

        $response = curl_exec($curl);

        if ($response === false) {
            throw new \Exception('Curl error: ' . curl_error($curl));
        }

        $response_data = json_decode($response, true);

        if (curl_getinfo($curl, CURLINFO_HTTP_CODE) !== 200) {
            throw new \Exception('HTTP Error: ' . curl_getinfo($curl, CURLINFO_HTTP_CODE));
        }

        curl_close($curl);

        return $response_data;
    }
}
