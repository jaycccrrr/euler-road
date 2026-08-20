$ErrorActionPreference = 'Stop'
$envFile = 'D:\学习\欧拉之路\my-app\.env.local'
$tokenLine = Get-Content $envFile | Where-Object { $_ -match '^GITHUB_TOKEN=' } | Select-Object -First 1
$token = ($tokenLine -replace '^GITHUB_TOKEN=','').Trim()
$repo = 'jaycccrrr/euler-road'
$tag = 'textbooks'
$proxy = 'http://127.0.0.1:7897'
$api = "https://api.github.com/repos/$repo"
$uploadBase = "https://uploads.github.com/repos/$repo"

# 查找 release id
$releaseJson = curl.exe -sS --proxy $proxy -H "Authorization: Bearer $token" -H "Accept: application/vnd.github+json" "$api/releases/tags/$tag"
$releaseId = ($releaseJson | ConvertFrom-Json).id
Write-Host "Release id: $releaseId"

$files = Get-ChildItem 'D:\学习\欧拉之路\教材' -Filter *.pdf | Sort-Object Name
$ok = 0
foreach ($f in $files) {
  $encoded = [uri]::EscapeDataString($f.Name)
  $url = "$uploadBase/releases/$releaseId/assets?name=$encoded"
  $success = $false
  for ($i = 1; $i -le 6; $i++) {
    Write-Host "上传中: $($f.Name) ($([math]::Round($f.Length/1MB,1))MB) 尝试 $i ..."
    curl.exe -sS --proxy $proxy -X POST -o NUL -H "Authorization: Bearer $token" -H "Content-Type: application/pdf" --data-binary "@$($f.FullName)" $url
    if ($LASTEXITCODE -eq 0) { $success = $true; Write-Host "  OK"; break }
    Start-Sleep -Seconds 8
  }
  if ($success) { $ok++ } else { Write-Host "  FAIL: $($f.Name)" }
}
Write-Host "完成：$ok/$($files.Count)"
if ($ok -gt 0) { Write-Host "下载前缀: https://github.com/$repo/releases/download/$tag/" }