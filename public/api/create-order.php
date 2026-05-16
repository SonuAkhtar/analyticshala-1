<?php
header('Content-Type: application/json');

$origin  = $_SERVER['HTTP_ORIGIN'] ?? '';
$allowed = ['https://analyticshala.in', 'https://www.analyticshala.in'];
if (in_array($origin, $allowed, true)) {
    header("Access-Control-Allow-Origin: $origin");
} else {
    header('Access-Control-Allow-Origin: http://localhost:5173');
}
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { exit(0); }

define('RZP_KEY_ID',     'rzp_live_PASTE_YOUR_KEY_ID_HERE');
define('RZP_KEY_SECRET', 'PASTE_YOUR_KEY_SECRET_HERE');

$input  = json_decode(file_get_contents('php://input'), true) ?? [];
$amount = intval($input['amount'] ?? 0);
$itemId = preg_replace('/[^a-zA-Z0-9_-]/', '', $input['itemId'] ?? 'order');

if ($amount <= 0) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Invalid amount']);
    exit;
}

$payload = json_encode([
    'amount'   => $amount,
    'currency' => 'INR',
    'receipt'  => 'rcpt_' . $itemId . '_' . time(),
]);

$ch = curl_init('https://api.razorpay.com/v1/orders');
curl_setopt_array($ch, [
    CURLOPT_RETURNTRANSFER => true,
    CURLOPT_POST           => true,
    CURLOPT_POSTFIELDS     => $payload,
    CURLOPT_USERPWD        => RZP_KEY_ID . ':' . RZP_KEY_SECRET,
    CURLOPT_HTTPHEADER     => ['Content-Type: application/json'],
    CURLOPT_TIMEOUT        => 15,
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

$data = json_decode($response, true);

if ($httpCode === 200 && !empty($data['id'])) {
    echo json_encode([
        'success' => true,
        'orderId' => $data['id'],
        'amount'  => $data['amount'],
    ]);
} else {
    http_response_code(500);
    $msg = $data['error']['description'] ?? 'Order creation failed';
    echo json_encode(['success' => false, 'message' => $msg]);
}
