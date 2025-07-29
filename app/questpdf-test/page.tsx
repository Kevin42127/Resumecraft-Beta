'use client';

import { useState, useEffect } from 'react';
import { useQuestPdfExport, QuestPdfConfig, QuestStyleConfig } from '../../hooks/useQuestPdfExport';
import ExportErrorModal from '../../components/ExportErrorModal';

export default function QuestPdfTestPage() {
  const {
    isLoading,
    error,
    apiStatus,
    checkQuestPdfStatus,
    getServiceInfo,
    getDefaultConfig,
    getDefaultStyles,
    validateHtml,
    exportWithQuestPdf,
    downloadPdf,
    exportResume,
    clearError,
    defaultQuestPdfConfig,
    defaultQuestStyleConfig,
  } = useQuestPdfExport();

  const [serviceInfo, setServiceInfo] = useState<any>(null);
  const [testHtml, setTestHtml] = useState<string>('');
  const [customConfig, setCustomConfig] = useState<QuestPdfConfig>(defaultQuestPdfConfig);
  const [customStyles, setCustomStyles] = useState<QuestStyleConfig>(defaultQuestStyleConfig);
  const [validationResult, setValidationResult] = useState<boolean | null>(null);

  // 檢查 API 狀態
  useEffect(() => {
    checkQuestPdfStatus();
  }, [checkQuestPdfStatus]);

  // 生成測試 HTML
  const generateTestHtml = () => {
    const html = `
      <html>
        <head>
          <style>
            body { 
              font-family: 'Microsoft YaHei', Arial, sans-serif; 
              margin: 20px; 
              line-height: 1.6;
              color: #333;
            }
            h1 { 
              color: #2c3e50; 
              border-bottom: 2px solid #3498db;
              padding-bottom: 10px;
            }
            h2 { 
              color: #34495e; 
              margin-top: 30px;
            }
            .section { 
              margin: 20px 0; 
              padding: 15px;
              background-color: #f8f9fa;
              border-radius: 5px;
            }
            .highlight { 
              background-color: #fff3cd; 
              padding: 10px;
              border-left: 4px solid #ffc107;
            }
            ul { 
              margin: 10px 0; 
            }
            li { 
              margin: 5px 0; 
            }
            .feature-grid {
              display: grid;
              grid-template-columns: repeat(2, 1fr);
              gap: 15px;
              margin: 20px 0;
            }
            .feature-item {
              background: #e8f4fd;
              padding: 15px;
              border-radius: 8px;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <h1>🎯 QuestPDF 測試文檔</h1>
          
          <div class="highlight">
            <p><strong>QuestPDF</strong> 是一個強大的開源 C# PDF 生成庫，提供卓越的性能和品質。</p>
          </div>

          <div class="section">
            <h2>✨ 主要特性</h2>
            <div class="feature-grid">
              <div class="feature-item">
                <h3>🚀 高性能</h3>
                <p>比 IronPDF 更快的生成速度</p>
              </div>
              <div class="feature-item">
                <h3>🪶 輕量級</h3>
                <p>更少的記憶體使用和依賴</p>
              </div>
              <div class="feature-item">
                <h3>🎨 現代化</h3>
                <p>聲明式、強類型的 API 設計</p>
              </div>
              <div class="feature-item">
                <h3>🌏 中文支援</h3>
                <p>完整的中文字體支援</p>
              </div>
            </div>
          </div>

          <div class="section">
            <h2>🔧 技術優勢</h2>
            <ul>
              <li><strong>開源免費</strong>: 基於 MIT 授權，無需付費</li>
              <li><strong>原生 C#</strong>: 專為 .NET 設計，完美整合</li>
              <li><strong>響應式佈局</strong>: 支援多種紙張大小和方向</li>
              <li><strong>自定義樣式</strong>: 豐富的樣式配置選項</li>
              <li><strong>流式處理</strong>: 減少記憶體使用，提高性能</li>
              <li><strong>活躍社群</strong>: 持續更新和改進</li>
            </ul>
          </div>

          <div class="section">
            <h2>📊 性能對比</h2>
            <table style="width: 100%; border-collapse: collapse; margin: 15px 0;">
              <tr style="background-color: #f8f9fa;">
                <th style="border: 1px solid #dee2e6; padding: 10px;">特性</th>
                <th style="border: 1px solid #dee2e6; padding: 10px;">QuestPDF</th>
                <th style="border: 1px solid #dee2e6; padding: 10px;">IronPDF</th>
              </tr>
              <tr>
                <td style="border: 1px solid #dee2e6; padding: 10px;">授權</td>
                <td style="border: 1px solid #dee2e6; padding: 10px;">✅ 開源免費</td>
                <td style="border: 1px solid #dee2e6; padding: 10px;">❌ 商業授權</td>
              </tr>
              <tr>
                <td style="border: 1px solid #dee2e6; padding: 10px;">性能</td>
                <td style="border: 1px solid #dee2e6; padding: 10px;">🚀 更快</td>
                <td style="border: 1px solid #dee2e6; padding: 10px;">🐌 較慢</td>
              </tr>
              <tr>
                <td style="border: 1px solid #dee2e6; padding: 10px;">記憶體</td>
                <td style="border: 1px solid #dee2e6; padding: 10px;">🪶 更少</td>
                <td style="border: 1px solid #dee2e6; padding: 10px;">📦 較多</td>
              </tr>
            </table>
          </div>

          <div class="section">
            <h2>🎯 使用場景</h2>
            <ul>
              <li><strong>履歷生成</strong>: 高品質的專業履歷 PDF</li>
              <li><strong>報告生成</strong>: 企業報告和文檔</li>
              <li><strong>發票系統</strong>: 自動化發票生成</li>
              <li><strong>證書系統</strong>: 證書和文憑生成</li>
              <li><strong>電子書</strong>: 電子書和手冊生成</li>
            </ul>
          </div>

          <div style="margin-top: 30px; padding: 15px; background-color: #d4edda; border-radius: 5px; text-align: center;">
            <p><strong>生成時間</strong>: ${new Date().toLocaleString('zh-TW')}</p>
            <p><strong>測試狀態</strong>: QuestPDF API 運行正常 ✅</p>
          </div>
        </body>
      </html>
    `;
    setTestHtml(html);
  };

  // 檢查服務信息
  const handleCheckServiceInfo = async () => {
    const info = await getServiceInfo();
    setServiceInfo(info);
  };

  // 驗證 HTML
  const handleValidateHtml = async () => {
    if (!testHtml) {
      alert('請先生成測試 HTML');
      return;
    }
    const isValid = await validateHtml(testHtml);
    setValidationResult(isValid);
  };

  // 測試 QuestPDF 匯出
  const handleTestQuestPdf = async () => {
    if (!testHtml) {
      alert('請先生成測試 HTML');
      return;
    }
    const result = await exportWithQuestPdf(testHtml, customConfig, customStyles, 'questpdf_test.pdf');
    if (result) {
      alert(`PDF 生成成功！\n文件大小: ${result.fileSize} bytes\n生成時間: ${result.generationTime}`);
    }
  };

  // 測試下載
  const handleTestDownload = async () => {
    if (!testHtml) {
      alert('請先生成測試 HTML');
      return;
    }
    const success = await downloadPdf(testHtml, customConfig, customStyles, 'questpdf_download.pdf');
    if (success) {
      alert('PDF 下載成功！');
    }
  };

  // 測試智能匯出
  const handleTestSmartExport = async () => {
    if (!testHtml) {
      alert('請先生成測試 HTML');
      return;
    }
    const success = await exportResume(testHtml, customConfig, customStyles, 'questpdf_smart.pdf');
    if (success) {
      alert('智能匯出成功！');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">🎯 QuestPDF 測試頁面</h1>
          <p className="text-gray-600 mb-6">
            測試 QuestPDF API 的功能和性能，體驗現代化的 PDF 生成技術。
          </p>

          {/* API 狀態 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">📊 API 狀態</h2>
            <div className="flex items-center space-x-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                apiStatus === 'available' ? 'bg-green-100 text-green-800' :
                apiStatus === 'unavailable' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {apiStatus === 'available' ? '✅ 可用' :
                 apiStatus === 'unavailable' ? '❌ 不可用' : '⏳ 檢查中'}
              </span>
              <button
                onClick={checkQuestPdfStatus}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                重新檢查
              </button>
              <button
                onClick={handleCheckServiceInfo}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
              >
                獲取服務信息
              </button>
            </div>
            {serviceInfo && (
              <div className="mt-4 p-4 bg-gray-50 rounded">
                <h3 className="font-semibold mb-2">服務信息:</h3>
                <pre className="text-sm">{JSON.stringify(serviceInfo, null, 2)}</pre>
              </div>
            )}
          </div>

          {/* 測試 HTML */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">📝 測試 HTML</h2>
            <div className="flex space-x-4 mb-4">
              <button
                onClick={generateTestHtml}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
              >
                生成測試 HTML
              </button>
              <button
                onClick={handleValidateHtml}
                className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                驗證 HTML
              </button>
            </div>
            {validationResult !== null && (
              <div className={`p-3 rounded mb-4 ${
                validationResult ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
              }`}>
                HTML 驗證結果: {validationResult ? '✅ 有效' : '❌ 無效'}
              </div>
            )}
            {testHtml && (
              <div className="border rounded p-4 bg-gray-50">
                <h3 className="font-semibold mb-2">HTML 預覽:</h3>
                <div className="max-h-40 overflow-y-auto">
                  <pre className="text-xs">{testHtml.substring(0, 500)}...</pre>
                </div>
              </div>
            )}
          </div>

          {/* PDF 配置 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">⚙️ PDF 配置</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">紙張大小</label>
                <select
                  value={customConfig.paperSize}
                  onChange={(e) => setCustomConfig({...customConfig, paperSize: e.target.value as any})}
                  className="w-full p-2 border rounded"
                >
                  <option value="A3">A3</option>
                  <option value="A4">A4</option>
                  <option value="A5">A5</option>
                  <option value="LETTER">Letter</option>
                  <option value="LEGAL">Legal</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">方向</label>
                <select
                  value={customConfig.orientation}
                  onChange={(e) => setCustomConfig({...customConfig, orientation: e.target.value as any})}
                  className="w-full p-2 border rounded"
                >
                  <option value="Portrait">直向</option>
                  <option value="Landscape">橫向</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">字體大小</label>
                <input
                  type="number"
                  value={customConfig.fontSize}
                  onChange={(e) => setCustomConfig({...customConfig, fontSize: Number(e.target.value)})}
                  className="w-full p-2 border rounded"
                  min="8"
                  max="24"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">啟用頁碼</label>
                <input
                  type="checkbox"
                  checked={customConfig.enablePageNumbers}
                  onChange={(e) => setCustomConfig({...customConfig, enablePageNumbers: e.target.checked})}
                  className="mr-2"
                />
                <span className="text-sm">啟用頁碼</span>
              </div>
            </div>
          </div>

          {/* 樣式配置 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">🎨 樣式配置</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={customStyles.removeShadows}
                    onChange={(e) => setCustomStyles({...customStyles, removeShadows: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm">移除陰影</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={customStyles.removeRoundedCorners}
                    onChange={(e) => setCustomStyles({...customStyles, removeRoundedCorners: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm">移除圓角</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={customStyles.removeAnimations}
                    onChange={(e) => setCustomStyles({...customStyles, removeAnimations: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm">移除動畫</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={customStyles.flattenBackgrounds}
                    onChange={(e) => setCustomStyles({...customStyles, flattenBackgrounds: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm">扁平化背景</span>
                </label>
              </div>
              <div>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={customStyles.convertToGrayscale}
                    onChange={(e) => setCustomStyles({...customStyles, convertToGrayscale: e.target.checked})}
                    className="mr-2"
                  />
                  <span className="text-sm">轉為灰度</span>
                </label>
              </div>
            </div>
          </div>

          {/* 測試按鈕 */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">🧪 測試功能</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <button
                onClick={handleTestQuestPdf}
                disabled={isLoading || !testHtml}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50"
              >
                {isLoading ? '生成中...' : '測試 QuestPDF'}
              </button>
              <button
                onClick={handleTestDownload}
                disabled={isLoading || !testHtml}
                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
              >
                {isLoading ? '下載中...' : '測試下載'}
              </button>
              <button
                onClick={handleTestSmartExport}
                disabled={isLoading || !testHtml}
                className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 disabled:opacity-50"
              >
                {isLoading ? '匯出中...' : '智能匯出'}
              </button>
              <button
                onClick={() => {
                  setCustomConfig(defaultQuestPdfConfig);
                  setCustomStyles(defaultQuestStyleConfig);
                }}
                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
              >
                重置配置
              </button>
            </div>
          </div>

          {/* 錯誤顯示 */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
              <h3 className="text-red-800 font-semibold mb-2">錯誤信息:</h3>
              <p className="text-red-700">{error.message}</p>
              {error.details && (
                <details className="mt-2">
                  <summary className="text-red-600 cursor-pointer">詳細信息</summary>
                  <pre className="text-xs text-red-600 mt-2">{error.details}</pre>
                </details>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 錯誤模態框 */}
      <ExportErrorModal error={error?.message || null} onClose={clearError} />
    </div>
  );
} 