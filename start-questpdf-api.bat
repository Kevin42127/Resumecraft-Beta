@echo off
echo ========================================
echo QuestPDF API 啟動腳本
echo ========================================
echo.

REM 檢查 .NET SDK 是否安裝
echo 檢查 .NET SDK...
dotnet --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 錯誤: 未找到 .NET SDK，請先安裝 .NET 8.0 SDK
    echo 下載地址: https://dotnet.microsoft.com/download
    pause
    exit /b 1
)

echo .NET SDK 已安裝
echo.

REM 檢查項目目錄是否存在
if not exist "QuestPdfApi" (
    echo 錯誤: QuestPdfApi 目錄不存在
    pause
    exit /b 1
)

echo 進入 QuestPdfApi 目錄...
cd QuestPdfApi

REM 還原 NuGet 包
echo 還原 NuGet 包...
dotnet restore
if %errorlevel% neq 0 (
    echo 錯誤: NuGet 包還原失敗
    pause
    exit /b 1
)

REM 構建項目
echo 構建項目...
dotnet build
if %errorlevel% neq 0 (
    echo 錯誤: 項目構建失敗
    pause
    exit /b 1
)

echo.
echo ========================================
echo QuestPDF API 啟動中...
echo ========================================
echo.
echo API 端點:
echo - 健康檢查: http://localhost:5000/api/pdf/health
echo - Swagger UI: http://localhost:5000/swagger
echo - 測試端點: http://localhost:5000/api/pdf/test
echo.
echo 按 Ctrl+C 停止服務
echo.

REM 啟動服務
dotnet run

pause 