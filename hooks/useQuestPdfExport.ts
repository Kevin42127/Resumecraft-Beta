import { useState } from 'react';

// QuestPDF API 配置
const QUESTPDF_API_BASE = 'http://localhost:5101/api/pdf';

// 類型定義
export interface QuestPdfConfig {
  paperSize: 'A3' | 'A4' | 'A5' | 'LETTER' | 'LEGAL';
  orientation: 'Portrait' | 'Landscape';
  marginTop: number;
  marginBottom: number;
  marginLeft: number;
  marginRight: number;
  enableHeader: boolean;
  enableFooter: boolean;
  headerText?: string;
  footerText?: string;
  fontFamily: string;
  fontSize: number;
  enablePageNumbers: boolean;
}

export interface QuestStyleConfig {
  removeShadows: boolean;
  removeBorders: boolean;
  removeRoundedCorners: boolean;
  removeAnimations: boolean;
  flattenBackgrounds: boolean;
  convertToGrayscale: boolean;
  backgroundColor?: string;
  textColor?: string;
  primaryFont: string;
  fallbackFont: string;
}

export interface QuestPdfRequest {
  html: string;
  filename?: string;
  config: QuestPdfConfig;
  styles: QuestStyleConfig;
}

export interface QuestPdfResponse {
  success: boolean;
  message: string;
  pdfData?: string;
  fileSize: number;
  generationTime: string;
  generatedAt: string;
}

export interface QuestServiceInfo {
  name: string;
  version: string;
  engine: string;
  startedAt: string;
  supportedFeatures: string[];
}

export interface QuestExportError {
  message: string;
  details?: string;
  timestamp: string;
}

// 默認配置
export const defaultQuestPdfConfig: QuestPdfConfig = {
  paperSize: 'A4',
  orientation: 'Portrait',
  marginTop: 20,
  marginBottom: 20,
  marginLeft: 20,
  marginRight: 20,
  enableHeader: false,
  enableFooter: false,
  fontFamily: 'Microsoft YaHei',
  fontSize: 12,
  enablePageNumbers: false,
};

export const defaultQuestStyleConfig: QuestStyleConfig = {
  removeShadows: true,
  removeBorders: false,
  removeRoundedCorners: true,
  removeAnimations: true,
  flattenBackgrounds: true,
  convertToGrayscale: false,
  primaryFont: 'Microsoft YaHei',
  fallbackFont: 'Arial',
};

// QuestPDF Hook
export const useQuestPdfExport = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<QuestExportError | null>(null);
  const [apiStatus, setApiStatus] = useState<'unknown' | 'available' | 'unavailable'>('unknown');

  // 檢查 QuestPDF API 狀態
  const checkQuestPdfStatus = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${QUESTPDF_API_BASE}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setApiStatus('available');
        return true;
      } else {
        setApiStatus('unavailable');
        return false;
      }
    } catch (err) {
      setApiStatus('unavailable');
      return false;
    }
  };

  // 獲取服務信息
  const getServiceInfo = async (): Promise<QuestServiceInfo | null> => {
    try {
      const response = await fetch(`${QUESTPDF_API_BASE}/info`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  // 獲取默認配置
  const getDefaultConfig = async (): Promise<QuestPdfConfig | null> => {
    try {
      const response = await fetch(`${QUESTPDF_API_BASE}/config/default`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  // 獲取默認樣式
  const getDefaultStyles = async (): Promise<QuestStyleConfig | null> => {
    try {
      const response = await fetch(`${QUESTPDF_API_BASE}/styles/default`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        return await response.json();
      }
      return null;
    } catch (err) {
      return null;
    }
  };

  // 驗證 HTML
  const validateHtml = async (html: string): Promise<boolean> => {
    try {
      const response = await fetch(`${QUESTPDF_API_BASE}/validate-html`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ html }),
      });

      if (response.ok) {
        const result = await response.json();
        return result.isValid;
      }
      return false;
    } catch (err) {
      return false;
    }
  };

  // 使用 QuestPDF 生成 PDF
  const exportWithQuestPdf = async (
    html: string,
    config: QuestPdfConfig = defaultQuestPdfConfig,
    styles: QuestStyleConfig = defaultQuestStyleConfig,
    filename?: string
  ): Promise<QuestPdfResponse | null> => {
    setIsLoading(true);
    setError(null);

    try {
      // 檢查 API 狀態
      const isAvailable = await checkQuestPdfStatus();
      if (!isAvailable) {
        throw new Error('QuestPDF API 不可用');
      }

      // 驗證 HTML
      const isValid = await validateHtml(html);
      if (!isValid) {
        throw new Error('HTML 內容無效');
      }

      // 準備請求
      const request: QuestPdfRequest = {
        html,
        filename,
        config,
        styles,
      };

      // 發送請求
      const response = await fetch(`${QUESTPDF_API_BASE}/generate-detailed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      const result: QuestPdfResponse = await response.json();
      
      if (!result.success) {
        throw new Error(result.message || 'PDF 生成失敗');
      }

      return result;
    } catch (err) {
      const error: QuestExportError = {
        message: err instanceof Error ? err.message : '未知錯誤',
        details: err instanceof Error ? err.stack : undefined,
        timestamp: new Date().toISOString(),
      };
      setError(error);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  // 下載 PDF
  const downloadPdf = async (
    html: string,
    config: QuestPdfConfig = defaultQuestPdfConfig,
    styles: QuestStyleConfig = defaultQuestStyleConfig,
    filename: string = `resume_${new Date().toISOString().slice(0, 19).replace(/:/g, '-')}.pdf`
  ): Promise<boolean> => {
    setIsLoading(true);
    setError(null);

    try {
      // 檢查 API 狀態
      const isAvailable = await checkQuestPdfStatus();
      if (!isAvailable) {
        throw new Error('QuestPDF API 不可用');
      }

      // 準備請求
      const request: QuestPdfRequest = {
        html,
        filename,
        config,
        styles,
      };

      // 發送請求
      const response = await fetch(`${QUESTPDF_API_BASE}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP ${response.status}: ${response.statusText}`);
      }

      // 下載文件
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      return true;
    } catch (err) {
      const error: QuestExportError = {
        message: err instanceof Error ? err.message : '未知錯誤',
        details: err instanceof Error ? err.stack : undefined,
        timestamp: new Date().toISOString(),
      };
      setError(error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // 智能匯出（帶回退機制）
  const exportResume = async (
    html: string,
    config: QuestPdfConfig = defaultQuestPdfConfig,
    styles: QuestStyleConfig = defaultQuestStyleConfig,
    filename?: string
  ): Promise<boolean> => {
    // 首先嘗試 QuestPDF
    const questPdfResult = await downloadPdf(html, config, styles, filename);
    if (questPdfResult) {
      return true;
    }

    // QuestPDF 失敗，可以添加其他回退方案
    // 例如：Puppeteer、前端生成等
    console.warn('QuestPDF 匯出失敗，請檢查 API 狀態');
    return false;
  };

  // 清除錯誤
  const clearError = () => {
    setError(null);
  };

  return {
    // 狀態
    isLoading,
    error,
    apiStatus,
    
    // 方法
    checkQuestPdfStatus,
    getServiceInfo,
    getDefaultConfig,
    getDefaultStyles,
    validateHtml,
    exportWithQuestPdf,
    downloadPdf,
    exportResume,
    clearError,
    
    // 默認配置
    defaultQuestPdfConfig,
    defaultQuestStyleConfig,
  };
}; 