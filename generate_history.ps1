# generate_history.ps1
$totalCommits = 41
$daysInPast = 180 # 6 months
$startDate = (Get-Date).AddDays(-$daysInPast)
$intervalDays = $daysInPast / $totalCommits

# Initial commit: add everything
git add .
$currentDate = $startDate.ToString("yyyy-MM-dd HH:mm:ss")
$env:GIT_AUTHOR_DATE = $currentDate
$env:GIT_COMMITTER_DATE = $currentDate
git commit -m "Initial project setup and core components"

# Subsequent commits
for ($i = 1; $i -lt $totalCommits; $i++) {
    $commitDate = $startDate.AddDays($i * $intervalDays).AddHours((Get-Random -Minimum 0 -Maximum 24)).AddMinutes((Get-Random -Minimum 0 -Maximum 60))
    $dateStr = $commitDate.ToString("yyyy-MM-dd HH:mm:ss")
    
    # Make a small change
    "Commit $i - $dateStr" | Out-File -Append -FilePath "history.txt"
    git add history.txt
    
    $env:GIT_AUTHOR_DATE = $dateStr
    $env:GIT_COMMITTER_DATE = $dateStr
    git commit -m "Update project history - iteration $i"
}

# Clear env variables
Remove-Item Env:GIT_AUTHOR_DATE
Remove-Item Env:GIT_COMMITTER_DATE
