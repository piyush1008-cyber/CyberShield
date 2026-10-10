@echo off
echo ========================================================
echo        Starting CyberShield AI Platform (2026)
echo ========================================================
echo.

echo Starting CyberShield Server on port 5000...
start "CyberShield Backend (Port 5000)" cmd /k "cd server && npm run dev"

timeout /t 2 >nul

echo Starting CyberShield Client on port 5173...
start "CyberShield Frontend (Port 5173)" cmd /k "cd client && npm run dev"

echo.
echo ========================================================
echo  Both servers started!
echo  Frontend: http://localhost:5173
echo  Backend:  http://localhost:5000
echo ========================================================
pause
