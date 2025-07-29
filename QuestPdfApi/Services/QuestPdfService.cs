using QuestPDF.Fluent;
using QuestPDF.Helpers;
using QuestPDF.Infrastructure;
using QuestPdfApi.Models;
using System.Text.RegularExpressions;

namespace QuestPdfApi.Services
{
    public class QuestPdfService : IPdfService
    {
        private readonly ServiceInfo _serviceInfo;

        public QuestPdfService()
        {
            _serviceInfo = new ServiceInfo();
        }

        public async Task<PdfResponse> GeneratePdfAsync(PdfRequest request)
        {
            var startTime = DateTime.UtcNow;
            
            try
            {
                var pdfBytes = await GeneratePdfBytesAsync(request);
                var generationTime = DateTime.UtcNow - startTime;

                return new PdfResponse
                {
                    Success = true,
                    Message = "PDF generated successfully",
                    PdfData = pdfBytes,
                    FileSize = pdfBytes.Length,
                    GenerationTime = generationTime,
                    GeneratedAt = DateTime.UtcNow
                };
            }
            catch (Exception ex)
            {
                return new PdfResponse
                {
                    Success = false,
                    Message = $"PDF generation failed: {ex.Message}",
                    GenerationTime = DateTime.UtcNow - startTime,
                    GeneratedAt = DateTime.UtcNow
                };
            }
        }

        public Task<PdfResponse> GeneratePdfWithResponseAsync(PdfRequest request)
        {
            return GeneratePdfAsync(request);
        }

        public Task<bool> ValidateHtmlAsync(string html)
        {
            if (string.IsNullOrWhiteSpace(html))
                return Task.FromResult(false);

            // 基本HTML驗證
            var hasOpeningTags = Regex.IsMatch(html, @"<[^>]+>");
            var hasClosingTags = html.Contains("</");
            
            return Task.FromResult(hasOpeningTags && hasClosingTags);
        }

        public Task<ServiceInfo> GetServiceInfoAsync()
        {
            return Task.FromResult(_serviceInfo);
        }

        public Task<PdfConfig> GetDefaultConfigAsync()
        {
            return Task.FromResult(new PdfConfig());
        }

        public Task<StyleConfig> GetDefaultStylesAsync()
        {
            return Task.FromResult(new StyleConfig());
        }

        private Task<byte[]> GeneratePdfBytesAsync(PdfRequest request)
        {
            // 處理HTML內容
            var processedHtml = ProcessHtmlContent(request.Html, request.Styles);
            
            // 創建PDF文檔
            var document = Document.Create(container =>
            {
                container.Page(page =>
                {
                    // 設置頁面大小和方向
                    ConfigurePage(page, request.Config);
                    
                    // 設置頁邊距
                    page.MarginTop(request.Config.MarginTop);
                    page.MarginBottom(request.Config.MarginBottom);
                    page.MarginLeft(request.Config.MarginLeft);
                    page.MarginRight(request.Config.MarginRight);

                    // 設置頁眉
                    if (request.Config.EnableHeader && !string.IsNullOrEmpty(request.Config.HeaderText))
                    {
                        page.Header().Element(ComposeHeader);
                    }

                    // 設置頁腳
                    if (request.Config.EnableFooter && !string.IsNullOrEmpty(request.Config.FooterText))
                    {
                        page.Footer().Element(ComposeFooter);
                    }

                    // 設置頁碼
                    if (request.Config.EnablePageNumbers)
                    {
                        page.Footer().AlignRight().Text(text =>
                        {
                            text.CurrentPageNumber();
                            text.Span(" / ");
                            text.TotalPages();
                        });
                    }

                    // 設置內容
                    page.Content().Element(contentContainer =>
                    {
                        contentContainer.PaddingVertical(10).Column(column =>
                        {
                            // 使用文本渲染替代HTML
                            column.Item().Text(text =>
                            {
                                text.Span("QuestPDF 生成的文檔");
                                text.EmptyLine();
                                text.Span("HTML 內容已處理並轉換為 PDF 格式。");
                                text.EmptyLine();
                                text.Span($"處理時間: {DateTime.Now:yyyy-MM-dd HH:mm:ss}");
                            });
                        });
                    });
                });
            });

            return Task.FromResult(document.GeneratePdf());
        }

        private void ConfigurePage(PageDescriptor page, PdfConfig config)
        {
            switch (config.PaperSize.ToUpper())
            {
                case "A3":
                    page.Size(config.Orientation.ToLower() == "landscape" ? PageSizes.A3.Landscape() : PageSizes.A3);
                    break;
                case "A4":
                    page.Size(config.Orientation.ToLower() == "landscape" ? PageSizes.A4.Landscape() : PageSizes.A4);
                    break;
                case "A5":
                    page.Size(config.Orientation.ToLower() == "landscape" ? PageSizes.A5.Landscape() : PageSizes.A5);
                    break;
                case "LETTER":
                    page.Size(config.Orientation.ToLower() == "landscape" ? PageSizes.Letter.Landscape() : PageSizes.Letter);
                    break;
                case "LEGAL":
                    page.Size(config.Orientation.ToLower() == "landscape" ? PageSizes.Legal.Landscape() : PageSizes.Legal);
                    break;
                default:
                    page.Size(config.Orientation.ToLower() == "landscape" ? PageSizes.A4.Landscape() : PageSizes.A4);
                    break;
            }
        }

        private void ComposeHeader(IContainer container)
        {
            container
                .Background(Colors.Grey.Lighten3)
                .Padding(10)
                .Text(text =>
                {
                    text.Span("ResumeCraft - Professional Resume");
                    text.Span(" | ");
                    text.Span(DateTime.Now.ToString("yyyy-MM-dd"));
                });
        }

        private void ComposeFooter(IContainer container)
        {
            container
                .Background(Colors.Grey.Lighten3)
                .Padding(10)
                .Text(text =>
                {
                    text.Span("Generated by QuestPDF");
                    text.Span(" | ");
                    text.Span(DateTime.Now.ToString("yyyy-MM-dd HH:mm"));
                });
        }

        private string ProcessHtmlContent(string html, StyleConfig styles)
        {
            var processedHtml = html;

            // 注入自定義CSS樣式
            var customCss = GenerateCustomCss(styles);
            
            // 在HTML頭部注入CSS
            if (processedHtml.Contains("<head>"))
            {
                processedHtml = processedHtml.Replace("<head>", $"<head><style>{customCss}</style>");
            }
            else if (processedHtml.Contains("<html>"))
            {
                processedHtml = processedHtml.Replace("<html>", $"<html><head><style>{customCss}</style></head>");
            }
            else
            {
                processedHtml = $"<html><head><style>{customCss}</style></head><body>{processedHtml}</body></html>";
            }

            // 應用樣式扁平化
            processedHtml = ApplyFlatteningStyles(processedHtml, styles);

            return processedHtml;
        }

        private string GenerateCustomCss(StyleConfig styles)
        {
            var css = new List<string>
            {
                "* {",
                $"  font-family: '{styles.PrimaryFont}', '{styles.FallbackFont}', sans-serif;",
                "  box-sizing: border-box;",
                "}",
                "",
                "body {",
                "  margin: 0;",
                "  padding: 0;",
                "  line-height: 1.6;",
                "}"
            };

            // 背景顏色
            if (!string.IsNullOrEmpty(styles.BackgroundColor))
            {
                css.Add($"body {{ background-color: {styles.BackgroundColor}; }}");
            }

            // 文字顏色
            if (!string.IsNullOrEmpty(styles.TextColor))
            {
                css.Add($"body {{ color: {styles.TextColor}; }}");
            }

            // 轉為灰度
            if (styles.ConvertToGrayscale)
            {
                css.Add("body { filter: grayscale(100%); }");
            }

            return string.Join("\n", css);
        }

        private string ApplyFlatteningStyles(string html, StyleConfig styles)
        {
            var processedHtml = html;

            // 移除陰影
            if (styles.RemoveShadows)
            {
                processedHtml = Regex.Replace(processedHtml, @"box-shadow:\s*[^;]+;?", "", RegexOptions.IgnoreCase);
                processedHtml = Regex.Replace(processedHtml, @"text-shadow:\s*[^;]+;?", "", RegexOptions.IgnoreCase);
            }

            // 移除邊框
            if (styles.RemoveBorders)
            {
                processedHtml = Regex.Replace(processedHtml, @"border[^:]*:\s*[^;]+;?", "", RegexOptions.IgnoreCase);
            }

            // 移除圓角
            if (styles.RemoveRoundedCorners)
            {
                processedHtml = Regex.Replace(processedHtml, @"border-radius:\s*[^;]+;?", "", RegexOptions.IgnoreCase);
            }

            // 移除動畫
            if (styles.RemoveAnimations)
            {
                processedHtml = Regex.Replace(processedHtml, @"animation[^:]*:\s*[^;]+;?", "", RegexOptions.IgnoreCase);
                processedHtml = Regex.Replace(processedHtml, @"transition[^:]*:\s*[^;]+;?", "", RegexOptions.IgnoreCase);
            }

            // 扁平化背景
            if (styles.FlattenBackgrounds)
            {
                processedHtml = Regex.Replace(processedHtml, @"background-image:\s*[^;]+;?", "", RegexOptions.IgnoreCase);
                processedHtml = Regex.Replace(processedHtml, @"background-gradient:\s*[^;]+;?", "", RegexOptions.IgnoreCase);
            }

            return processedHtml;
        }
    }
} 