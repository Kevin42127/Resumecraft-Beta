using Microsoft.AspNetCore.Mvc;
using QuestPdfApi.Models;
using QuestPdfApi.Services;

namespace QuestPdfApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PdfController : ControllerBase
    {
        private readonly IPdfService _pdfService;

        public PdfController(IPdfService pdfService)
        {
            _pdfService = pdfService;
        }

        /// <summary>
        /// 生成PDF文檔
        /// </summary>
        [HttpPost("generate")]
        public async Task<IActionResult> GeneratePdf([FromBody] PdfRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var response = await _pdfService.GeneratePdfWithResponseAsync(request);
            
            if (!response.Success)
            {
                return BadRequest(response);
            }

            var filename = string.IsNullOrEmpty(request.Filename) 
                ? $"resume_{DateTime.Now:yyyyMMdd_HHmmss}.pdf" 
                : request.Filename;

            return File(response.PdfData!, "application/pdf", filename);
        }

        /// <summary>
        /// 生成PDF文檔（詳細響應）
        /// </summary>
        [HttpPost("generate-detailed")]
        public async Task<ActionResult<PdfResponse>> GeneratePdfDetailed([FromBody] PdfRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var response = await _pdfService.GeneratePdfWithResponseAsync(request);
            return Ok(response);
        }

        /// <summary>
        /// 驗證HTML內容
        /// </summary>
        [HttpPost("validate-html")]
        public async Task<IActionResult> ValidateHtml([FromBody] HtmlValidationRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var isValid = await _pdfService.ValidateHtmlAsync(request.Html);
            
            return Ok(new
            {
                IsValid = isValid,
                Message = isValid ? "HTML content is valid" : "HTML content is invalid"
            });
        }

        /// <summary>
        /// 獲取服務健康狀態
        /// </summary>
        [HttpGet("health")]
        public async Task<IActionResult> Health()
        {
            var serviceInfo = await _pdfService.GetServiceInfoAsync();
            
            return Ok(new
            {
                Status = "Healthy",
                Service = serviceInfo.Name,
                Version = serviceInfo.Version,
                Engine = serviceInfo.Engine,
                StartedAt = serviceInfo.StartedAt,
                Uptime = DateTime.UtcNow - serviceInfo.StartedAt
            });
        }

        /// <summary>
        /// 獲取服務信息
        /// </summary>
        [HttpGet("info")]
        public async Task<ActionResult<ServiceInfo>> GetServiceInfo()
        {
            var serviceInfo = await _pdfService.GetServiceInfoAsync();
            return Ok(serviceInfo);
        }

        /// <summary>
        /// 獲取默認PDF配置
        /// </summary>
        [HttpGet("config/default")]
        public async Task<ActionResult<PdfConfig>> GetDefaultConfig()
        {
            var config = await _pdfService.GetDefaultConfigAsync();
            return Ok(config);
        }

        /// <summary>
        /// 獲取默認樣式配置
        /// </summary>
        [HttpGet("styles/default")]
        public async Task<ActionResult<StyleConfig>> GetDefaultStyles()
        {
            var styles = await _pdfService.GetDefaultStylesAsync();
            return Ok(styles);
        }

        /// <summary>
        /// 測試端點
        /// </summary>
        [HttpGet("test")]
        public IActionResult Test()
        {
            var testHtml = @"
                <html>
                <head>
                    <style>
                        body { font-family: Arial, sans-serif; margin: 20px; }
                        h1 { color: #333; }
                        p { line-height: 1.6; }
                    </style>
                </head>
                <body>
                    <h1>QuestPDF 測試</h1>
                    <p>這是一個測試文檔，用於驗證 QuestPDF 功能是否正常工作。</p>
                    <p>QuestPDF 是一個強大的 C# PDF 生成庫，提供高品質的 PDF 輸出。</p>
                    <ul>
                        <li>開源免費</li>
                        <li>高性能</li>
                        <li>易於使用</li>
                        <li>支援中文</li>
                    </ul>
                </body>
                </html>";

            var request = new PdfRequest
            {
                Html = testHtml,
                Filename = "questpdf_test.pdf",
                Config = new PdfConfig
                {
                    PaperSize = "A4",
                    Orientation = "Portrait",
                    EnableHeader = true,
                    HeaderText = "QuestPDF 測試文檔",
                    EnableFooter = true,
                    FooterText = "Generated by QuestPDF",
                    EnablePageNumbers = true
                }
            };

            return Ok(new
            {
                Message = "QuestPDF API 運行正常",
                TestRequest = request,
                Endpoints = new
                {
                    Generate = "POST /api/pdf/generate",
                    GenerateDetailed = "POST /api/pdf/generate-detailed",
                    ValidateHtml = "POST /api/pdf/validate-html",
                    Health = "GET /api/pdf/health",
                    Info = "GET /api/pdf/info",
                    DefaultConfig = "GET /api/pdf/config/default",
                    DefaultStyles = "GET /api/pdf/styles/default"
                }
            });
        }
    }
} 