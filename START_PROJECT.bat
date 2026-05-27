@echo off
setlocal

set "PROJECT_DIR=D:\My-Folder\Projects HTML\WebProject\project"

echo Starting NeonTech project...
echo Project directory: %PROJECT_DIR%

start "NeonTech API (json-server)" cmd /k "cd /d ""%PROJECT_DIR%"" && npx json-server --watch db.json --port 3000"
start "NeonTech Web (http-server)" cmd /k "cd /d ""%PROJECT_DIR%"" && npx http-server -p 8000"

timeout /t 3 /nobreak >nul
start "" "http://localhost:8000"

echo Done. API + Web server started, and browser opened.
endlocal
