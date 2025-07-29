using System.ComponentModel.DataAnnotations;

namespace QuestPdfApi.Models
{
    public class PdfRequest
    {
        [Required]
        public string Html { get; set; } = string.Empty;
        
        public string? Filename { get; set; }
        
        public PdfConfig Config { get; set; } = new();
        
        public StyleConfig Styles { get; set; } = new();
    }

    public class PdfConfig
    {
        public string PaperSize { get; set; } = "A4";
        public string Orientation { get; set; } = "Portrait";
        public float MarginTop { get; set; } = 20;
        public float MarginBottom { get; set; } = 20;
        public float MarginLeft { get; set; } = 20;
        public float MarginRight { get; set; } = 20;
        public bool EnableHeader { get; set; } = false;
        public bool EnableFooter { get; set; } = false;
        public string? HeaderText { get; set; }
        public string? FooterText { get; set; }
        public string FontFamily { get; set; } = "Microsoft YaHei";
        public float FontSize { get; set; } = 12;
        public bool EnablePageNumbers { get; set; } = false;
    }

    public class StyleConfig
    {
        public bool RemoveShadows { get; set; } = true;
        public bool RemoveBorders { get; set; } = false;
        public bool RemoveRoundedCorners { get; set; } = true;
        public bool RemoveAnimations { get; set; } = true;
        public bool FlattenBackgrounds { get; set; } = true;
        public bool ConvertToGrayscale { get; set; } = false;
        public string? BackgroundColor { get; set; }
        public string? TextColor { get; set; }
        public string PrimaryFont { get; set; } = "Microsoft YaHei";
        public string FallbackFont { get; set; } = "Arial";
    }

    public class PdfResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; } = string.Empty;
        public byte[]? PdfData { get; set; }
        public long FileSize { get; set; }
        public TimeSpan GenerationTime { get; set; }
        public DateTime GeneratedAt { get; set; } = DateTime.UtcNow;
    }

    public class ServiceInfo
    {
        public string Name { get; set; } = "QuestPDF API";
        public string Version { get; set; } = "1.0.0";
        public string Engine { get; set; } = "QuestPDF";
        public DateTime StartedAt { get; set; } = DateTime.UtcNow;
        public List<string> SupportedFeatures { get; set; } = new()
        {
            "High-quality PDF generation",
            "Responsive layouts",
            "Custom styling",
            "Header/Footer support",
            "Page numbering",
            "Multiple paper sizes",
            "Chinese font support"
        };
    }

    public class HtmlValidationRequest
    {
        [Required]
        public string Html { get; set; } = string.Empty;
    }
} 