using QuestPdfApi.Models;

namespace QuestPdfApi.Services
{
    public interface IPdfService
    {
        Task<PdfResponse> GeneratePdfAsync(PdfRequest request);
        Task<PdfResponse> GeneratePdfWithResponseAsync(PdfRequest request);
        Task<bool> ValidateHtmlAsync(string html);
        Task<ServiceInfo> GetServiceInfoAsync();
        Task<PdfConfig> GetDefaultConfigAsync();
        Task<StyleConfig> GetDefaultStylesAsync();
    }
} 