$token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzc0MTY5ODQyLCJpYXQiOjE3NzQxNjk1NDIsImp0aSI6ImViYjQ5OTJiYjM4ZjRkNjdhOWE5YzBiMTk2MjYwNmViIiwidXNlcl9pZCI6IjMifQ.JVgGNv-TWEbX1sB49W5XeHmQJUdM86ApKiL0gFWuAkA'
$body = @{ payment_info = @{ card_number='2564526352666666'; expiry_date='05/22'; cvv='123'; card_holder_name='khusi tiwari' }; booking_info = @{ hotel=3; check_in='2026-03-24'; check_out='2026-03-25' } } | ConvertTo-Json
try {
    Invoke-RestMethod -Uri 'http://127.0.0.1:8000/api/bookings/send-payment-otp/' -Method Post -Headers @{Authorization=('Bearer ' + $token)} -ContentType 'application/json' -Body $body
} catch {
    $stream = $_.Exception.Response.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $reader.ReadToEnd()
}
