#!/bin/bash

# ResumeCraft Netlify 部署腳本

echo "🚀 開始部署 ResumeCraft 到 Netlify..."

# 檢查 Node.js 版本
echo "📋 檢查 Node.js 版本..."
node --version

# 安裝依賴
echo "📦 安裝依賴..."
npm install

# 建置專案
echo "🔨 建置專案..."
npm run build

# 檢查建置結果
if [ $? -eq 0 ]; then
    echo "✅ 建置成功！"
    echo "📁 建置檔案位於 .next 目錄"
    echo ""
    echo "🌐 部署到 Netlify:"
    echo "1. 登入 Netlify"
    echo "2. 點擊 'New site from Git'"
    echo "3. 選擇您的 Git 倉庫"
    echo "4. 設定建置命令: npm run build"
    echo "5. 設定發布目錄: .next"
    echo "6. 設定環境變數:"
    echo "   - NEXT_PUBLIC_USE_BACKEND_PDF=false"
    echo "   - EMAIL_USER=your-email@gmail.com"
    echo "   - EMAIL_PASS=your-app-password"
    echo "   - NEXTAUTH_URL=https://your-site.netlify.app"
    echo "   - NEXTAUTH_SECRET=your-secret-key"
    echo ""
    echo "📖 詳細部署指南請參考 NETLIFY_DEPLOYMENT.md"
else
    echo "❌ 建置失敗！"
    exit 1
fi 