Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile('d:\HH Goa 2026\public\assets\final-builder-id-template.png')
Write-Host "Width: $($img.Width)"
Write-Host "Height: $($img.Height)"
$img.Dispose()
