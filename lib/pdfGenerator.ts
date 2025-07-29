import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generatePDFFromCanvas = async (element: HTMLElement, filename: string = 'resume.pdf'): Promise<void> => {
  try {
    // 保存原始樣式
    const originalStyles = {
      position: element.style.position,
      left: element.style.left,
      top: element.style.top,
      width: element.style.width,
      height: element.style.height,
      transform: element.style.transform,
      overflow: element.style.overflow,
    };

    // 設置元素樣式以確保最佳 PDF 生成
    element.style.position = 'relative';
    element.style.left = '0';
    element.style.top = '0';
    element.style.width = '210mm'; // A4 寬度
    element.style.height = 'auto';
    element.style.transform = 'none';
    element.style.overflow = 'visible';

    // 等待樣式應用
    await new Promise(resolve => setTimeout(resolve, 100));

    // 改進的 html2canvas 配置
    const canvas = await html2canvas(element, {
      useCORS: true,
      allowTaint: true,
      width: element.offsetWidth,
      height: element.offsetHeight,
      logging: false,
      scale: 2, // 提高解析度
      backgroundColor: '#ffffff', // 確保白色背景
      onclone: (clonedDoc) => {
        // 確保克隆的文檔有正確的字體和樣式
        const style = clonedDoc.createElement('style');
        style.textContent = `
          * {
            font-family: 'Microsoft YaHei', 'PingFang SC', 'Helvetica Neue', Arial, sans-serif !important;
            box-sizing: border-box !important;
          }
          .resume-preview {
            background-color: white !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06) !important;
            border-radius: 8px !important;
            overflow: hidden !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          /* 完整預覽面板樣式 */
          body {
            margin: 0 !important;
            padding: 0 !important;
            background-color: #f3f4f6 !important;
          }
          /* 外層包裝 - 模擬 bg-gray-100 p-6 */
          .pdf-wrapper {
            background-color: #f3f4f6 !important;
            padding: 1.5rem !important;
            display: flex !important;
            justify-content: center !important;
            align-items: flex-start !important;
            min-height: 100vh !important;
            box-sizing: border-box !important;
            width: 100% !important;
          }
          /* 中層容器 - 模擬 max-w-4xl mx-auto */
          .pdf-container {
            max-width: 56rem !important;
            margin: 0 auto !important;
            width: 100% !important;
          }
          /* 內層履歷 - 模擬 resume-preview bg-white shadow-material */
          .pdf-resume-preview {
            background-color: white !important;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1), 0 1px 2px rgba(0,0,0,0.06) !important;
            border-radius: 8px !important;
            overflow: hidden !important;
            width: 100% !important;
            box-sizing: border-box !important;
          }
          .resume-section {
            margin-bottom: 1.5rem !important;
          }
          .border-l-4 {
            border-left-width: 4px !important;
            border-left-style: solid !important;
          }
          .border-b-2 {
            border-bottom-width: 2px !important;
            border-bottom-style: solid !important;
          }
          .text-blue-600 { color: #2563eb !important; }
          .text-green-600 { color: #16a34a !important; }
          .text-purple-600 { color: #9333ea !important; }
          .text-gray-600 { color: #4b5563 !important; }
          .text-red-600 { color: #dc2626 !important; }
          .border-blue-600 { border-color: #2563eb !important; }
          .border-green-600 { border-color: #16a34a !important; }
          .border-purple-600 { border-color: #9333ea !important; }
          .border-gray-600 { border-color: #4b5563 !important; }
          .border-red-600 { border-color: #dc2626 !important; }
          .text-gray-900 { color: #111827 !important; }
          .text-gray-700 { color: #374151 !important; }
          .text-gray-600 { color: #4b5563 !important; }
          .text-gray-500 { color: #6b7280 !important; }
          .bg-white { background-color: #ffffff !important; }
          .text-3xl { font-size: 1.875rem !important; line-height: 2.25rem !important; }
          .text-2xl { font-size: 1.5rem !important; line-height: 2rem !important; }
          .text-lg { font-size: 1.125rem !important; line-height: 1.75rem !important; }
          .text-base { font-size: 1rem !important; line-height: 1.5rem !important; }
          .text-sm { font-size: 0.875rem !important; line-height: 1.25rem !important; }
          /* 字體大小設定 */
          .text-sm { font-size: 0.875rem !important; line-height: 1.25rem !important; }
          .text-base { font-size: 1rem !important; line-height: 1.5rem !important; }
          .text-lg { font-size: 1.125rem !important; line-height: 1.75rem !important; }
          /* 間距設定 */
          .space-y-2 > * + * { margin-top: 0.5rem !important; }
          .space-y-4 > * + * { margin-top: 1rem !important; }
          .space-y-6 > * + * { margin-top: 1.5rem !important; }
          .font-bold { font-weight: 700 !important; }
          .font-semibold { font-weight: 600 !important; }
          .font-medium { font-weight: 500 !important; }
          .p-8 { padding: 2rem !important; }
          .pb-4 { padding-bottom: 1rem !important; }
          .mb-6 { margin-bottom: 1.5rem !important; }
          .mb-2 { margin-bottom: 0.5rem !important; }
          .mt-4 { margin-top: 1rem !important; }
          .pl-4 { padding-left: 1rem !important; }
          .space-y-4 > * + * { margin-top: 1rem !important; }
          .space-y-2 > * + * { margin-top: 0.5rem !important; }
          .space-y-6 > * + * { margin-top: 1.5rem !important; }
          .space-y-1 > * + * { margin-top: 0.25rem !important; }
          .grid { display: grid !important; }
          .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
          .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .gap-4 { gap: 1rem !important; }
          .flex { display: flex !important; }
          .items-center { align-items: center !important; }
          .items-start { align-items: flex-start !important; }
          .justify-between { justify-content: space-between !important; }
          .space-x-2 > * + * { margin-left: 0.5rem !important; }
          .leading-relaxed { line-height: 1.625 !important; }
          .max-w-2xl { max-width: 42rem !important; }
          .list-disc { list-style-type: disc !important; }
          .list-inside { list-style-position: inside !important; }
          .w-20 { width: 5rem !important; }
          .h-20 { height: 5rem !important; }
          .rounded-full { border-radius: 9999px !important; }
          .overflow-hidden { overflow: hidden !important; }
          .bg-gray-200 { background-color: #e5e7eb !important; }
          .w-full { width: 100% !important; }
          .h-full { height: 100% !important; }
          .object-cover { object-fit: cover !important; }
          .text-right { text-align: right !important; }
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .md\\:space-y-1 > * + * { margin-top: 0.25rem !important; }
          .md\\:space-y-4 > * + * { margin-top: 1rem !important; }
          .md\\:grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)) !important; }
          .md\\:grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)) !important; }
          .ml-2 { margin-left: 0.5rem !important; }
          /* 確保文字不被裁切 */
          * {
            word-wrap: break-word !important;
            overflow-wrap: break-word !important;
            hyphens: auto !important;
          }
          /* 增加文字間距 */
          p, li, div {
            margin-bottom: 0.5rem !important;
            padding-bottom: 0.25rem !important;
          }
          /* 確保列表項目有足夠空間 */
          ul, ol {
            padding-left: 1.5rem !important;
            margin-bottom: 1rem !important;
          }
          li {
            margin-bottom: 0.5rem !important;
            line-height: 1.6 !important;
          }
        `;
        clonedDoc.head.appendChild(style);
      }
    });

    // 恢復原始樣式
    Object.assign(element.style, originalStyles);

    // Create PDF with A4 dimensions and proper margins
    const pageWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const margin = 20; // 20mm margin on all sides
    const contentWidth = pageWidth - (margin * 2);
    const contentHeight = pageHeight - (margin * 2);
    
    // Calculate image dimensions to fit within content area
    const imgWidth = contentWidth;
    const imgHeight = (canvas.height * contentWidth) / canvas.width;
    let heightLeft = imgHeight;

    const pdf = new jsPDF('p', 'mm', 'a4');
    let position = margin; // Start with top margin

    // Add first page
    pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', margin, position, imgWidth, imgHeight);
    heightLeft -= contentHeight;

    // Add additional pages if content is longer than one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight + margin;
      pdf.addPage();
      pdf.addImage(canvas.toDataURL('image/png', 1.0), 'PNG', margin, position, imgWidth, imgHeight);
      heightLeft -= contentHeight;
    }

    // Save the PDF
    pdf.save(filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('PDF 生成失敗，請稍後再試');
  }
};

export const downloadResumeAsPDF = async (): Promise<void> => {
  try {
    // Show loading state
    const loadingElement = document.createElement('div');
    loadingElement.innerHTML = `
      <div style="display: flex; align-items: center; gap: 10px;">
        <div style="width: 20px; height: 20px; border: 2px solid #ffffff; border-top: 2px solid transparent; border-radius: 50%; animation: spin 1s linear infinite;"></div>
        <span>正在生成 PDF...</span>
      </div>
    `;
    loadingElement.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 20px;
      border-radius: 8px;
      z-index: 9999;
      font-family: Arial, sans-serif;
    `;
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
    document.body.appendChild(loadingElement);

    // 找到履歷預覽元素
    let targetElement = document.querySelector('.resume-preview') as HTMLElement;
    
    if (!targetElement) {
      throw new Error('找不到履歷預覽元素，請確保預覽面板已開啟');
    }

    // 創建完整的預覽面板結構，完全模擬 PreviewPanel 的結構
    const wrapper = document.createElement('div');
    wrapper.style.cssText = `
      background-color: #f3f4f6;
      padding: 1.5rem;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      min-height: 100vh;
      box-sizing: border-box;
      width: 100%;
    `;

    // 創建 max-w-4xl mx-auto 容器
    const container = document.createElement('div');
    container.style.cssText = `
      max-width: 56rem;
      margin: 0 auto;
      width: 100%;
    `;

    // 創建 resume-preview 元素
    const resumePreview = document.createElement('div');
    resumePreview.className = 'pdf-resume-preview';

    // 克隆履歷內容
    const clonedContent = targetElement.cloneNode(true) as HTMLElement;
    resumePreview.appendChild(clonedContent);

    // 組裝結構
    container.appendChild(resumePreview);
    wrapper.appendChild(container);
    document.body.appendChild(wrapper);

    // 等待樣式應用
    await new Promise(resolve => setTimeout(resolve, 200));

    // 生成 PDF
    await generatePDFFromCanvas(wrapper, 'resume.pdf');

    // 清理臨時元素
    document.body.removeChild(wrapper);

    // Remove loading state and style
    document.body.removeChild(loadingElement);
    document.head.removeChild(style);
  } catch (error) {
    console.error('Error downloading PDF:', error);
    throw error;
  }
};
