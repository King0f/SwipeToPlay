<?php

declare(strict_types=1);

namespace App\Service;

class BrevoEmailService 
{
    private $apiKey;

    private $url;

    public function __construct(string $apiKey, string $url) {
        $this->apiKey = $apiKey;
        $this->url = $url;
    }

    public function enviarCampaña(string $fromName, string $fromEmail, string $htmlContentBase,array $htmlContentVersions, array $users): array {
        $messageVersions = [];
        foreach ($users as $index => $user) {
            $messageVersions[] = [
                "to" => [
                    ["email" => $user->getEmail(), "name" => $user->getUser()]
                ],
                "htmlContent" => $htmlContentVersions[$index],
                "subject" => "Licencia de conducir"
            ];
        }

        $payload = [
            "sender" => ["email" => $fromEmail, "name" => $fromName],
            "subject" => "Licencia de conducir",
            "htmlContent" => $htmlContentBase,
            "messageVersions" => $messageVersions
        ];

        $jsonPayload = json_encode($payload);

        $curl = curl_init();
        curl_setopt_array($curl, [
            CURLOPT_URL => $this->url,
            CURLOPT_POSTFIELDS => $jsonPayload,
            CURLOPT_HTTPHEADER => [
                "api-key: " . $this->apiKey,
                "Content-Type: application/json"
            ],
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_POST => true
        ]);

        $response = curl_exec($curl);

        if ($response === false) {
            throw new \Exception('Curl error: ' . curl_error($curl));
        }

        $response_data = json_decode($response, true);

        if (curl_getinfo($curl, CURLINFO_HTTP_CODE) !== 200 && curl_getinfo($curl, CURLINFO_HTTP_CODE) !== 201) {
            throw new \Exception('HTTP Error: ' . curl_getinfo($curl, CURLINFO_HTTP_CODE));
        }

        curl_close($curl);

        return $response_data;
    }
}