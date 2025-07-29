// 測試 PDF 生成 API
const testPDFAPI = async () => {
  try {
    console.log('開始測試 PDF 生成 API...')
    
    const testHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>測試履歷</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            .header { background: #f0f0f0; padding: 20px; text-align: center; }
            .content { padding: 20px; }
          </style>
        </head>
        <body>
          <div id="resume-preview">
            <div class="header">
              <h1>測試履歷</h1>
              <p>這是一個測試履歷</p>
            </div>
            <div class="content">
              <h2>工作經驗</h2>
              <p>測試工作經驗內容</p>
            </div>
          </div>
        </body>
      </html>
    `

    const response = await fetch('http://localhost:3000/api/generate-pdf', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        html: testHTML,
        filename: 'test-resume.pdf'
      })
    })

    if (response.ok) {
      console.log('✅ API 測試成功！')
      console.log('狀態碼:', response.status)
      console.log('內容類型:', response.headers.get('content-type'))
      
      // 下載測試PDF
      const blob = await response.blob()
      console.log('PDF 大小:', blob.size, 'bytes')
      
      // 創建下載連結
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = 'test-resume.pdf'
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      window.URL.revokeObjectURL(url)
      
      console.log('✅ 測試PDF已下載')
    } else {
      console.error('❌ API 測試失敗')
      console.log('狀態碼:', response.status)
      const errorText = await response.text()
      console.log('錯誤訊息:', errorText)
    }
  } catch (error) {
    console.error('❌ API 測試錯誤:', error)
  }
}

// 如果是在瀏覽器環境中運行
if (typeof window !== 'undefined') {
  // 添加測試按鈕到頁面
  const testButton = document.createElement('button')
  testButton.textContent = '測試 PDF API'
  testButton.onclick = testPDFAPI
  testButton.style.cssText = `
    position: fixed;
    top: 10px;
    right: 10px;
    z-index: 10000;
    padding: 10px 20px;
    background: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  `
  document.body.appendChild(testButton)
  
  console.log('📋 PDF API 測試工具已載入')
  console.log('點擊右上角的「測試 PDF API」按鈕來測試')
}

// 如果是在Node.js環境中運行
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { testPDFAPI }
} 