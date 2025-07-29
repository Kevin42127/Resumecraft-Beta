// Text formatting utility functions

export const formatDate = (date: string): string => {
  if (!date) return '';
  
  const d = new Date(date);
  return d.toLocaleDateString('zh-TW', {
    year: 'numeric',
    month: 'short'
  });
};

export const formatPhone = (phone: string): string => {
  if (!phone) return '';
  
  // Remove all non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Format based on length
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
  } else if (cleaned.length === 11) {
    return `+${cleaned.slice(0, 1)} (${cleaned.slice(1, 4)}) ${cleaned.slice(4, 7)}-${cleaned.slice(7)}`;
  }
  
  return phone;
};

export const formatDuration = (startDate: string, endDate: string, current: boolean): string => {
  if (!startDate) return '';
  
  const start = new Date(startDate);
  const end = current ? new Date() : new Date(endDate);
  
  const years = end.getFullYear() - start.getFullYear();
  const months = end.getMonth() - start.getMonth();
  
  let duration = '';
  
  if (years > 0) {
    duration += `${years} 年`;
    if (months > 0) {
      duration += ` ${months} 個月`;
    }
  } else if (months > 0) {
    duration += `${months} 個月`;
  } else {
    duration += '1 個月以下';
  }
  
  return duration;
};

export const capitalizeFirst = (str: string): string => {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (!text || text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

export const getInitials = (firstName: string, lastName: string): string => {
  const first = firstName ? firstName.charAt(0).toUpperCase() : '';
  const last = lastName ? lastName.charAt(0).toUpperCase() : '';
  return first + last;
};

export const formatCurrency = (amount: number, currency: string = 'TWD'): string => {
  return new Intl.NumberFormat('zh-TW', {
    style: 'currency',
    currency: currency
  }).format(amount);
};

export const formatPercentage = (value: number): string => {
  return `${Math.round(value)}%`;
};

export const getSkillLevelColor = (level: string): string => {
  switch (level) {
    case 'expert':
      return 'text-green-600';
    case 'advanced':
      return 'text-blue-600';
    case 'intermediate':
      return 'text-yellow-600';
    case 'beginner':
      return 'text-gray-600';
    default:
      return 'text-gray-600';
  }
};

export const getSkillLevelText = (level: string): string => {
  switch (level) {
    case 'expert':
      return '專家級';
    case 'advanced':
      return '進階';
    case 'intermediate':
      return '中級';
    case 'beginner':
      return '初級';
    default:
      return '初級';
  }
};
