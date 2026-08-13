[System.Reflection.Assembly]::LoadWithPartialName('System.Drawing') | Out-Null
$img = New-Object System.Drawing.Bitmap('d:\HH Goa 2026\public\assets\final-builder-id-template.png')
Write-Host "Template dimensions:" $img.Width "x" $img.Height
$img.Dispose()

$img2 = New-Object System.Drawing.Bitmap('d:\HH Goa 2026\reference\final-builder-id-template.png.png')
Write-Host "Reference template dimensions:" $img2.Width "x" $img2.Height
$img2.Dispose()

$img3 = New-Object System.Drawing.Bitmap('d:\HH Goa 2026\reference\final-builder-id-reference.png.png')
Write-Host "Reference filled dimensions:" $img3.Width "x" $img3.Height
$img3.Dispose()
