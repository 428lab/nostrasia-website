/**
 * Utility functions for determining locale year based on URL path
 */
import i18nConfig from '~/i18n'

/**
 * Get the locale year based on the current URL path
 * @param pathname - The URL pathname (e.g., '/2024', '/2025', '/')
 * @returns The year string for locale loading
 */
export function getLocaleYearFromPath(pathname: string): string {
  // Extract year from path like /2024, /2025, etc.
  const yearMatch = pathname.match(/^\/(\d{4})/)
  
  if (yearMatch) {
    return yearMatch[1]
  }
  
  // Default to configured year for root path or non-year paths
  return i18nConfig.localeYear
}

/**
 * Get the locale year for server-side rendering based on request
 * @param request - The incoming request object
 * @returns The year string for locale loading
 */
export function getLocaleYearFromRequest(request: Request): string {
  const url = new URL(request.url)
  return getLocaleYearFromPath(url.pathname)
}

/**
 * Get the locale year for client-side based on current location
 * @returns The year string for locale loading
 */
export function getLocaleYearFromLocation(): string {
  if (typeof window === 'undefined') {
    return i18nConfig.localeYear
  }
  
  return getLocaleYearFromPath(window.location.pathname)
}