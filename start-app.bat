@echo off
REM Script de démarrage pour l'application de gestion de blanchisserie

REM Lancer l'API backend
cd backend\LaundryAPI\LaundryAPI
start "Backend API" cmd /k "dotnet run"
cd ..\..\..

REM Lancer le frontend Angular
cd frontend\laundry-app
start "Frontend Angular" cmd /k "npm install && ng serve"
cd ..\..

REM Attendre 10 secondes avant d'ouvrir le navigateur
timeout /t 11 > nul
start http://localhost:4200

echo Les serveurs backend et frontend sont en cours d'exécution dans deux fenetres distinctes. Vous pouvez fermer celle-ci.
pause
