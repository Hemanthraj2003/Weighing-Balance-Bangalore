@echo off
title Weighing Balance Bangalore - Database Migration

echo ========================================================
echo   Weighing Balance Bangalore - Database Migration Tool
echo ========================================================
echo.

node -v >nul 2>&1
if errorlevel 1 (
    echo [ERROR] Node.js is not installed or not found in system PATH.
    echo Please install Node.js from https://nodejs.org to run this script.
    echo.
    pause
    exit /b 1
)

if "%1"=="" (
    node scripts\migrate_to_new_db.mjs
) else (
    node scripts\migrate_to_new_db.mjs %*
)

echo.
pause
