export const APP_STORE_URL = 'https://apps.apple.com/kr/app/id6785906497'
export const PLAY_STORE_URL = 'https://play.google.com/store/apps/details?id=com.bookiibookii.bookiibookii_d'

export function isIOS(): boolean {
  if (typeof navigator === 'undefined') return false
  const ua = navigator.userAgent
  if (/iPhone|iPad|iPod/i.test(ua)) return true
  return /Macintosh/i.test(ua) && navigator.maxTouchPoints > 1
}

export function getStoreUrl(): string {
  return isIOS() ? APP_STORE_URL : PLAY_STORE_URL
}
