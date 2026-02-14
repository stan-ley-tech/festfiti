/**
 * Avatar and Icon Generation Utilities
 * Uses DiceBear API v9 for generating consistent avatars and icons
 */

/**
 * Generate a DiceBear avatar URL using email as seed
 * @param {string} email - User's email address
 * @param {string} style - Avatar style (avataaars, icons, etc.)
 * @returns {string} Avatar URL from DiceBear API v9
 */
export function getAvatarUrl(email, style = 'avataaars') {
  return `https://api.dicebear.com/9.x/${style}/svg?seed=${encodeURIComponent(email)}`;
}

/**
 * Generate an avatar with avataaars style (cartoon avatars for users)
 * @param {string} email - User's email address
 * @returns {string} Avatar URL with avataaars style from DiceBear v9
 */
export function getUserAvatar(email) {
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(email)}`;
}

/**
 * Generate an app icon using the icons style
 * @param {string} appName - Name of the application
 * @returns {string} Icon URL for the app from DiceBear v9
 */
export function getAppIcon(appName) {
  return `https://api.dicebear.com/9.x/icons/svg?seed=${encodeURIComponent(appName)}`;
}

/**
 * Get avatar URL with custom color scheme based on user role
 * @param {string} email - User's email address
 * @param {string} role - User role (admin, tester, developer)
 * @returns {string} Avatar URL with avataaars style
 */
export function getAvatarByRole(email, role) {
  // Using avataaars style which doesn't support background color
  // Role differentiation can be done via UI badges instead
  return getUserAvatar(email);
}

/**
 * Get a consistent color for text initials based on string
 * @param {string} text - Text to generate color from
 * @returns {string} Tailwind color class
 */
export function getColorFromText(text) {
  const colors = [
    'bg-red-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-yellow-500',
    'bg-lime-500',
    'bg-green-500',
    'bg-emerald-500',
    'bg-teal-500',
    'bg-cyan-500',
    'bg-sky-500',
    'bg-blue-500',
    'bg-indigo-500',
    'bg-violet-500',
    'bg-purple-500',
    'bg-fuchsia-500',
    'bg-pink-500',
  ];

  let hash = 0;
  for (let i = 0; i < text.length; i++) {
    hash = text.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % colors.length;
  return colors[index];
}

/**
 * Get initials from email or name
 * @param {string} text - Email address or full name
 * @returns {string} Two-letter initials
 */
export function getInitials(text) {
  if (!text) return 'U';

  // If it's an email, extract the part before @
  const cleanText = text.includes('@') ? text.split('@')[0] : text;

  // Split by common separators
  const parts = cleanText.split(/[\s._-]+/).filter(Boolean);

  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }

  return cleanText.substring(0, 2).toUpperCase();
}

/**
 * Generate a fallback app icon with initials
 * @param {string} appName - Name of the application
 * @returns {{ initials: string, colorClass: string }} Object with initials and color class
 */
export function getAppIconFallback(appName) {
  return {
    initials: getInitials(appName),
    colorClass: getColorFromText(appName),
  };
}

/**
 * Get avatar URL for notifications/comments
 * @param {string} email - User's email
 * @returns {string} Small, simple avatar URL
 */
export function getSmallAvatar(email) {
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${encodeURIComponent(email)}`;
}
