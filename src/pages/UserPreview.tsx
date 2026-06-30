import { useEffect, useRef, useState } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import html2canvas from 'html2canvas'

interface RepresentativeBook {
  title: string
  author?: string
  image?: string
  displayOrder?: number
  rating?: number
}

interface PublicProfile {
  nickname: string
  profileImageUrl?: string
  introduction?: string
  representativeBooks: RepresentativeBook[]
}

const API_BASE = ''
const S3_HOST = 'https://booki-dev-s3.s3.ap-northeast-2.amazonaws.com'

function resolveImg(url: string | undefined | null): string | undefined {
  if (!url) return undefined
  return import.meta.env.DEV ? url.replace(S3_HOST, '/s3-image') : url
}

async function fetchProfile(token: string): Promise<PublicProfile> {
  const res = await fetch(`${API_BASE}/api/public/profiles/${token}`)
  const json = await res.json().catch(() => null)
  if (!json?.isSuccess) throw new Error(json?.message ?? 'not_found')
  return json.result
}

// 행 배분 — 앱 로직과 동일
function calcRows(count: number): { row1: number; row2: number; maxPerRow: number } {
  let row1 = 0, row2 = 0
  if (count <= 4) { row1 = count; row2 = 0 }
  else if (count === 5) { row1 = 2; row2 = 3 }
  else if (count === 6) { row1 = 3; row2 = 3 }
  else { row1 = 3; row2 = Math.min(count - 3, 4) }
  const maxPerRow = Math.max(row1, row2, 4)
  return { row1, row2, maxPerRow }
}

// ── ic_bookii_text (113×12, grey200) ────────────────────────
function BookiiTextLogo() {
  return (
    <svg width="113" height="12" viewBox="0 0 113 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M0 0.25H5.87C6.99 0.25 7.87 0.53 8.52 1.07C9.17 1.62 9.49 2.41 9.49 3.43C9.49 3.91 9.38 4.36 9.16 4.78C8.94 5.19 8.62 5.52 8.22 5.76C8.78 5.98 9.2 6.3 9.46 6.71C9.72 7.12 9.86 7.65 9.86 8.31C9.86 9.02 9.69 9.63 9.36 10.15C9.03 10.67 8.58 11.07 8.02 11.34C7.46 11.62 6.84 11.75 6.16 11.75H0V0.25ZM5.23 4.81C6.09 4.81 6.52 4.41 6.52 3.61C6.52 3.16 6.41 2.85 6.19 2.68C5.97 2.5 5.63 2.42 5.18 2.42H2.94V4.81H5.23ZM5.41 9.58C5.91 9.58 6.28 9.49 6.52 9.3C6.76 9.12 6.89 8.79 6.89 8.31C6.89 7.84 6.76 7.5 6.51 7.28C6.25 7.07 5.86 6.96 5.34 6.96H2.94V9.58H5.41Z" fill="#FF7618"/>
      <path d="M13.33 11.24C12.39 10.74 11.64 10.03 11.09 9.13C10.55 8.22 10.27 7.18 10.27 6.01C10.27 4.84 10.55 3.79 11.09 2.88C11.64 1.97 12.39 1.26 13.33 0.76C14.28 0.25 15.34 0 16.51 0C17.68 0 18.72 0.25 19.67 0.76C20.62 1.26 21.36 1.97 21.9 2.88C22.45 3.79 22.72 4.84 22.72 6.01C22.72 7.18 22.45 8.22 21.9 9.13C21.36 10.03 20.62 10.74 19.67 11.24C18.73 11.75 17.67 12 16.51 12C15.35 12 14.28 11.75 13.33 11.24ZM18.12 8.88C18.61 8.61 19 8.23 19.28 7.74C19.57 7.25 19.71 6.67 19.71 6.01C19.71 5.36 19.57 4.78 19.29 4.29C19.01 3.81 18.63 3.43 18.14 3.16C17.65 2.89 17.11 2.76 16.51 2.76C15.92 2.76 15.36 2.89 14.87 3.16C14.39 3.43 14 3.81 13.72 4.29C13.44 4.78 13.3 5.36 13.3 6.01C13.3 6.67 13.44 7.25 13.72 7.74C14 8.24 14.39 8.62 14.88 8.88C15.37 9.14 15.92 9.27 16.52 9.27C17.11 9.27 17.64 9.14 18.12 8.88Z" fill="#FF7618"/>
      <path d="M26.53 11.24C25.58 10.74 24.83 10.03 24.29 9.13C23.74 8.22 23.47 7.18 23.47 6.01C23.47 4.84 23.74 3.79 24.29 2.88C24.83 1.97 25.58 1.26 26.53 0.76C27.47 0.25 28.53 0 29.7 0C30.88 0 31.92 0.25 32.87 0.76C33.81 1.26 34.56 1.97 35.1 2.88C35.64 3.79 35.91 4.84 35.91 6.01C35.91 7.18 35.64 8.22 35.1 9.13C34.56 10.03 33.81 10.74 32.87 11.24C31.92 11.75 30.87 12 29.7 12C28.54 12 27.47 11.75 26.53 11.24ZM31.31 8.88C31.8 8.61 32.19 8.23 32.47 7.74C32.76 7.25 32.91 6.67 32.91 6.01C32.91 5.36 32.76 4.78 32.48 4.29C32.2 3.81 31.82 3.43 31.33 3.16C30.84 2.89 30.3 2.76 29.7 2.76C29.11 2.76 28.55 2.89 28.06 3.16C27.58 3.43 27.19 3.81 26.91 4.29C26.63 4.78 26.49 5.36 26.49 6.01C26.49 6.67 26.63 7.25 26.91 7.74C27.19 8.24 27.58 8.62 28.07 8.88C28.56 9.14 29.11 9.27 29.71 9.27C30.3 9.27 30.83 9.14 31.32 8.88Z" fill="#FF7618"/>
      <path d="M37.07 0.25H40.01V5.02L44.01 0.25H47.49L42.8 5.85L47.81 11.76H44.33L40.01 6.67V11.76H37.07V0.25Z" fill="#FF7618"/>
      <path d="M48.31 0.25H51.24V11.75H48.31V0.25Z" fill="#FF7618"/>
      <path d="M52.74 0.25H55.68V11.75H52.74V0.25Z" fill="#FF7618"/>
      <path d="M57.32 0.25H63.2C64.31 0.25 65.2 0.53 65.84 1.07C66.49 1.62 66.82 2.41 66.82 3.43C66.82 3.91 66.7 4.36 66.48 4.78C66.26 5.19 65.95 5.52 65.54 5.76C66.1 5.98 66.52 6.3 66.78 6.71C67.04 7.12 67.18 7.65 67.18 8.31C67.18 9.02 67.01 9.63 66.68 10.15C66.35 10.67 65.9 11.07 65.35 11.34C64.79 11.62 64.17 11.75 63.48 11.75H57.32V0.25ZM62.55 4.81C63.42 4.81 63.85 4.41 63.85 3.61C63.85 3.16 63.73 2.85 63.51 2.68C63.29 2.5 62.96 2.42 62.5 2.42H60.26V4.81H62.55ZM62.73 9.58C63.23 9.58 63.6 9.49 63.84 9.3C64.09 9.12 64.21 8.79 64.21 8.31C64.21 7.84 64.08 7.5 63.83 7.28C63.58 7.07 63.19 6.96 62.67 6.96H60.26V9.58H62.74Z" fill="#FF7618"/>
      <path d="M70.66 11.24C69.72 10.74 68.97 10.03 68.42 9.13C67.87 8.22 67.6 7.18 67.6 6.01C67.6 4.84 67.88 3.79 68.42 2.88C68.97 1.97 69.72 1.26 70.66 0.76C71.6 0.25 72.67 0 73.84 0C75.01 0 76.05 0.25 77 0.76C77.95 1.26 78.69 1.97 79.23 2.88C79.78 3.79 80.05 4.84 80.05 6.01C80.05 7.18 79.78 8.22 79.23 9.13C78.69 10.03 77.95 10.74 77 11.24C76.05 11.75 75 12 73.84 12C72.68 12 71.6 11.75 70.66 11.24ZM75.45 8.88C75.93 8.61 76.32 8.23 76.61 7.74C76.89 7.25 77.04 6.67 77.04 6.01C77.04 5.36 76.9 4.78 76.62 4.29C76.33 3.81 75.95 3.43 75.46 3.16C74.98 2.89 74.43 2.76 73.84 2.76C73.24 2.76 72.68 2.89 72.2 3.16C71.71 3.43 71.32 3.81 71.04 4.29C70.76 4.78 70.62 5.36 70.62 6.01C70.62 6.67 70.76 7.25 71.04 7.74C71.33 8.24 71.71 8.62 72.2 8.88C72.7 9.14 73.24 9.27 73.84 9.27C74.44 9.27 74.96 9.14 75.45 8.88Z" fill="#FF7618"/>
      <path d="M83.85 11.24C82.91 10.74 82.16 10.03 81.61 9.13C81.06 8.22 80.79 7.18 80.79 6.01C80.79 4.84 81.07 3.79 81.61 2.88C82.16 1.97 82.91 1.26 83.85 0.76C84.8 0.25 85.86 0 87.03 0C88.2 0 89.24 0.25 90.19 0.76C91.14 1.26 91.88 1.97 92.42 2.88C92.97 3.79 93.24 4.84 93.24 6.01C93.24 7.18 92.97 8.22 92.42 9.13C91.88 10.03 91.14 10.74 90.19 11.24C89.25 11.75 88.19 12 87.03 12C85.87 12 84.8 11.75 83.85 11.24ZM88.64 8.88C89.13 8.61 89.51 8.23 89.8 7.74C90.09 7.25 90.23 6.67 90.23 6.01C90.23 5.36 90.09 4.78 89.81 4.29C89.53 3.81 89.14 3.43 88.66 3.16C88.17 2.89 87.63 2.76 87.03 2.76C86.43 2.76 85.88 2.89 85.39 3.16C84.9 3.43 84.52 3.81 84.24 4.29C83.96 4.78 83.82 5.36 83.82 6.01C83.82 6.67 83.96 7.25 84.24 7.74C84.52 8.24 84.91 8.62 85.4 8.88C85.89 9.14 86.44 9.27 87.03 9.27C87.63 9.27 88.16 9.14 88.64 8.88Z" fill="#FF7618"/>
      <path d="M94.4 0.25H97.33V5.02L101.33 0.25H104.82L100.12 5.85L105.13 11.76H101.65L97.33 6.67V11.76H94.4V0.25Z" fill="#FF7618"/>
      <path d="M105.63 0.25H108.57V11.75H105.63V0.25Z" fill="#FF7618"/>
      <path d="M110.06 0.25H113V11.75H110.06V0.25Z" fill="#FF7618"/>
    </svg>
  )
}

// ── ic_quote (24×24, uiMain 오렌지) ─────────────────────────
function QuoteIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M18 18c0.4 0 0.78-0.16 1.06-0.44s0.44-0.66 0.44-1.06v-3.66c0-0.4-0.16-0.78-0.44-1.06-0.28-0.29-0.66-0.44-1.06-0.44h-2.08c0-0.53 0.03-1.06 0.1-1.58 0.08-0.56 0.24-1.06 0.46-1.5 0.21-0.43 0.5-0.77 0.83-1.02 0.34-0.28 0.78-0.42 1.3-0.42V4.5c-0.86 0-1.62 0.19-2.27 0.56-0.65 0.37-1.2 0.87-1.63 1.49-0.43 0.67-0.74 1.4-0.93 2.18-0.2 0.86-0.29 1.73-0.28 2.6v5.17c0 0.4 0.16 0.78 0.44 1.06S14.6 18 15 18h3Zm-9 0c0.4 0 0.78-0.16 1.06-0.44s0.44-0.66 0.44-1.06v-3.66c0-0.4-0.16-0.78-0.44-1.06C9.78 11.49 9.4 11.34 9 11.34H6.92c0-0.53 0.03-1.06 0.1-1.58C7.1 9.2 7.25 8.7 7.47 8.26 7.69 7.84 7.98 7.5 8.3 7.25c0.34-0.28 0.78-0.42 1.3-0.42V4.5C8.76 4.5 8 4.69 7.35 5.06 6.69 5.43 6.14 5.93 5.7 6.55c-0.43 0.67-0.74 1.4-0.93 2.18-0.2 0.86-0.29 1.73-0.28 2.6v5.17c0 0.4 0.16 0.78 0.44 1.06S5.6 18 6 18h3Z" fill="#FF7618"/>
    </svg>
  )
}

// ── ic_repressentative_book (167×24) ────────────────────────
function RepBookHeader() {
  return (
    <svg width="167" height="24" viewBox="0 0 167 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M8.2 1.63C8.57 0.65 9.51 0 10.55 0H159.21C160.37 0 161.38 0.79 161.65 1.92L166.09 20.18C166.48 21.77 165.28 23.3 163.65 23.3H3.65C1.88 23.3 0.67 21.53 1.29 19.89L8.2 1.63Z" fill="#42413F"/>
      <path d="M56.61 10.38V11.62H54.82V10.38H56.61ZM55.22 6.53V16.39H53.71V6.53H55.22ZM47.51 13.44V7.37H49.02V13.44H47.51ZM52.79 13.93H47.51V12.69H52.79V13.93ZM66.15 11.12V12.2H56.93V11.12H66.15ZM64.82 12.68V15.12H59.71V15.97H58.21V14.18H63.33V13.7H58.2V12.68H64.82ZM65.1 15.65V16.67H58.21V15.65H65.1ZM64.85 6.71V9.15H59.81V9.96H58.33V8.21H63.38V7.73H58.31V6.71H64.85ZM65.04 9.65V10.67H58.33V9.65H65.04ZM77.89 6.54V16.4H76.46V6.54H77.89ZM76.82 10.45V11.67H75.13V10.45H76.82ZM75.58 6.72V15.91H74.19V6.72H75.58ZM69.52 13.5V7.44H71.02V13.5H69.52ZM73.62 13.93H69.52V12.69H73.62V13.93ZM73.4 8.66H70.14V7.44H73.4V8.66ZM82.59 11.99V14.49H81.1V11.99H82.59ZM85.83 12V14.5H84.34V12H85.83ZM88.08 14.19V15.4H78.86V14.19H88.08ZM87.04 7.27V8.47H79.87V7.27H87.04ZM87.04 11.26V12.45H79.88V11.26H87.04ZM82.63 8.23V11.43H81.11V8.23H82.63ZM85.78 8.23V11.43H84.29V8.23H85.78ZM96.57 6.55V16.41H95.07V6.55H96.57ZM98.02 10.51V11.75H96.23V10.51H98.02ZM94.45 7.82V9H88.66V7.82H94.45ZM92.31 6.76V8.39H90.8V6.76H92.31ZM91.56 14.22C91.07 14.22 90.62 14.12 90.24 13.92C89.85 13.71 89.55 13.42 89.33 13.05C89.12 12.68 89.01 12.25 89.01 11.78C89.01 11.31 89.12 10.89 89.33 10.52C89.55 10.14 89.85 9.85 90.24 9.63C90.62 9.42 91.06 9.32 91.55 9.32C92.05 9.32 92.49 9.42 92.88 9.63C93.26 9.84 93.56 10.13 93.77 10.51C93.99 10.89 94.1 11.31 94.1 11.78C94.1 12.25 93.99 12.68 93.77 13.05C93.56 13.42 93.26 13.71 92.88 13.92C92.49 14.12 92.06 14.22 91.56 14.22ZM91.55 13C91.89 13 92.15 12.89 92.35 12.67C92.55 12.45 92.65 12.15 92.65 11.79C92.65 11.41 92.55 11.11 92.35 10.89C92.15 10.67 91.89 10.55 91.56 10.55C91.23 10.55 90.96 10.67 90.76 10.89C90.56 11.11 90.46 11.41 90.46 11.79C90.46 12.15 90.57 12.45 90.77 12.67C90.97 12.89 91.24 13 91.55 13ZM106.28 9.34V10.53H99.69V9.34H106.28ZM107.51 11.47V12.66H98.29V11.47H107.51ZM101.2 6.9V9.94H99.69V6.9H101.2ZM106.23 15.35V16.54H99.71V15.35H106.23ZM101.21 13.43V15.7H99.71V13.43H101.21ZM119.18 6.55V12.74H117.75V6.55H119.18ZM118.16 9.09V10.28H116.56V9.09H118.16ZM117.04 6.72V12.68H115.63V6.72H117.04ZM119.18 13.16V16.75H117.69V14.36H112.5V13.16H119.18ZM110.46 11.43L111.96 9.63C112.2 9.36 112.32 9.09 112.32 8.82V7.89H113.64V8.82C113.64 9.41 113.42 9.97 112.97 10.5L111.46 12.28L110.46 11.43ZM114.52 12.28L113.02 10.5C112.57 9.97 112.35 9.41 112.35 8.82V7.89H113.66V8.82C113.66 9.09 113.78 9.36 114.03 9.63L115.53 11.43L114.52 12.28ZM115.23 8.72H110.68V7.5L115.23 7.49V8.72ZM113.67 6.54V8.22H112.32V6.54H113.67Z" fill="white"/>
    </svg>
  )
}

// ── 프로필 아바타 (squircle via SVG clipPath — html2canvas 호환) ──
const SQUIRCLE_PATH = 'M 0 46 C 0 8.12 8.12 0 46 0 C 83.88 0 92 8.12 92 46 C 92 83.88 83.88 92 46 92 C 8.12 92 0 83.88 0 46 Z'

function ProfileAvatar({ url }: { url?: string }) {
  const img = resolveImg(url)
  return (
    <svg
      className="up-avatar-svg"
      width="92" height="92" viewBox="0 0 92 92"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: 'block', flexShrink: 0 }}
    >
      <defs>
        <clipPath id="up-squircle-clip">
          <path d={SQUIRCLE_PATH} />
        </clipPath>
      </defs>
      {img ? (
        <image
          href={img}
          x="0" y="0" width="92" height="92"
          clipPath="url(#up-squircle-clip)"
          preserveAspectRatio="xMidYMid slice"
        />
      ) : (
        <g clipPath="url(#up-squircle-clip)">
          <rect width="92" height="92" fill="#C6C5C2" />
          <circle cx="46" cy="34" r="18" fill="white" fillOpacity="0.5" />
          <ellipse cx="46" cy="76" rx="27" ry="19" fill="white" fillOpacity="0.5" />
        </g>
      )}
    </svg>
  )
}

// ── 앱으로 열기 배너 ─────────────────────────────────────────
function OpenInAppBanner({ token }: { token: string }) {
  const isAndroid = /android/i.test(navigator.userAgent)
  if (!isAndroid) return null
  const handleOpenApp = () => {
    const webUrl = encodeURIComponent(`https://bookiibookii.com/share/profile/${token}`)
    const intentUrl = `intent://share/profile/${token}#Intent;scheme=https;host=bookiibookii.com;package=com.bookiibookii.bookiibookii;S.browser_fallback_url=${webUrl};end`
    window.location.href = intentUrl
  }
  return (
    <div className="up-app-banner">
      <span className="up-app-banner-text">부키부키 앱이 설치되어 있나요?</span>
      <button className="up-app-banner-btn" onClick={handleOpenApp}>앱으로 열기</button>
    </div>
  )
}

// ── 메인 컴포넌트 ────────────────────────────────────────────
export default function UserPreview() {
  const params = useParams<{ token?: string; id?: string }>()
  const token = params.token ?? params.id
  const isDark = new URLSearchParams(useLocation().search).get('dark') === '1'
  const [profile, setProfile] = useState<PublicProfile | null>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  const [errorMsg, setErrorMsg] = useState('')
  const [saving, setSaving] = useState(false)
  const captureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!token) { setStatus('error'); return }
    fetchProfile(token)
      .then(data => { setProfile(data); setStatus('ok') })
      .catch((e: Error) => { setErrorMsg(e.message); setStatus('error') })
  }, [token])

  const handleSave = async () => {
    if (!captureRef.current || saving) return
    setSaving(true)
    try {
      await document.fonts.ready
      const el = captureRef.current

      // 1. 프로필 이미지 → data URL 변환 (html2canvas SVG <image> 미지원 우회)
      let avatarDataUrl: string | undefined
      const avatarSrcUrl = profile?.profileImageUrl ? resolveImg(profile.profileImageUrl) : undefined
      if (avatarSrcUrl) {
        try {
          const res = await fetch(avatarSrcUrl, { mode: 'cors' })
          const blob = await res.blob()
          avatarDataUrl = await new Promise<string>(resolve => {
            const reader = new FileReader()
            reader.onload = () => resolve(reader.result as string)
            reader.readAsDataURL(blob)
          })
        } catch { /* 이미지 없이 진행 */ }
      }

      // 2. 아바타 위치 측정 (html2canvas 실행 전)
      const captureRect = el.getBoundingClientRect()
      const avatarSvgEl = el.querySelector<SVGSVGElement>('.up-avatar-svg')
      const avatarRect = avatarSvgEl?.getBoundingClientRect() ?? null

      // 3. html2canvas — 아바타 SVG를 투명 div로 교체해 위치만 유지
      const rawCanvas = await html2canvas(el, {
        scale: 3,
        useCORS: true,
        backgroundColor: isDark ? '#1c1b1a' : '#ffffff',
        height: el.scrollHeight,
        windowHeight: 9999,
        logging: false,
        onclone: (_doc, clonedEl) => {
          clonedEl.querySelectorAll<SVGSVGElement>('.up-avatar-svg').forEach(svgEl => {
            const wrap = document.createElement('div')
            wrap.style.cssText = 'width:92px;height:92px;flex-shrink:0;display:block'
            svgEl.parentNode?.replaceChild(wrap, svgEl)
          })
        },
      })

      // 4. 출력 캔버스 (fit — 전체 프로필이 잘리지 않게)
      const TARGET_W = 1080
      const TARGET_H = 1920
      const fitScale = Math.min(TARGET_W / rawCanvas.width, TARGET_H / rawCanvas.height)
      const dW = Math.round(rawCanvas.width * fitScale)
      const dH = Math.round(rawCanvas.height * fitScale)
      const dx = Math.round((TARGET_W - dW) / 2)
      const dy = Math.round((TARGET_H - dH) / 2)

      const out = document.createElement('canvas')
      out.width = TARGET_W
      out.height = TARGET_H
      const ctx = out.getContext('2d')!
      ctx.fillStyle = isDark ? '#1c1b1a' : '#ffffff'
      ctx.fillRect(0, 0, TARGET_W, TARGET_H)
      ctx.drawImage(rawCanvas, dx, dy, dW, dH)

      // 5. 아바타 스퀴클 — Canvas 2D로 직접 그리기 (브라우저와 동일한 모양)
      if (avatarRect) {
        const oAX = dx + Math.round((avatarRect.left - captureRect.left) * 3 * fitScale)
        const oAY = dy + Math.round((avatarRect.top  - captureRect.top)  * 3 * fitScale)
        const oAW = Math.round(avatarRect.width  * 3 * fitScale)
        const oAH = Math.round(avatarRect.height * 3 * fitScale)

        const squircle = new Path2D(SQUIRCLE_PATH)

        const applySquircleClip = () => {
          ctx.translate(oAX, oAY)
          ctx.scale(oAW / 92, oAH / 92)
          ctx.clip(squircle)
        }

        if (avatarDataUrl) {
          await new Promise<void>(resolve => {
            const img = new Image()
            img.onload = () => {
              ctx.save()
              applySquircleClip()
              ctx.drawImage(img, 0, 0, 92, 92)
              ctx.restore()
              resolve()
            }
            img.onerror = () => resolve()
            img.src = avatarDataUrl!
          })
        } else {
          // 기본 아바타 (이미지 없을 때)
          ctx.save()
          applySquircleClip()
          ctx.fillStyle = '#C6C5C2'
          ctx.fillRect(0, 0, 92, 92)
          ctx.fillStyle = 'rgba(255,255,255,0.5)'
          ctx.beginPath(); ctx.arc(46, 34, 18, 0, Math.PI * 2); ctx.fill()
          ctx.beginPath(); ctx.ellipse(46, 76, 27, 19, 0, 0, Math.PI * 2); ctx.fill()
          ctx.restore()
        }
      }

      const link = document.createElement('a')
      link.download = `bookiibookii-profile-${token ?? 'user'}.png`
      link.href = out.toDataURL('image/png')
      link.click()
    } catch {
      // silent fail
    } finally {
      setSaving(false)
    }
  }

  const renderCard = () => {
    if (!profile) return null
    const books = profile.representativeBooks
    const { row1, row2, maxPerRow } = calcRows(books.length)
    // 앱: bookWidth = (maxWidth - gap*(maxRowCount-1)) / maxRowCount, gap=4dp
    // CSS: flex: 0 0 calc((100% - Npx) / M)
    const bookFlex = `0 0 calc((100% - ${(maxPerRow - 1) * 4}px) / ${maxPerRow})`

    return (
      <div className={`up-capture${isDark ? ' up-capture--dark' : ''}`} ref={captureRef}>

        {/* BOOKIIBOOKII 텍스트 로고 (ic_bookii_text, 113×12) */}
        <div className="up-logo-wrap">
          <BookiiTextLogo />
        </div>

        {/* 프로필: 아바타 + 닉네임 (gap 8dp) */}
        <div className="up-profile">
          <ProfileAvatar url={profile.profileImageUrl} />
          <h1 className="up-nickname">{profile.nickname}</h1>
        </div>

        {/* 한 줄 소개 박스 */}
        <div className="up-motto-box">
          <QuoteIcon />
          <p className="up-motto-text">
            {profile.introduction?.trim() || '한 줄 소개를 입력해주세요'}
          </p>
        </div>

        {/* 나를 대표하는 책 헤더 (ic_repressentative_book) */}
        <div className="up-rep-header-wrap">
          <RepBookHeader />
        </div>

        {/* 구분선 */}
        <div className="up-separator" />

        {books.length === 0 ? (
          <p className="up-books-empty">아직 등록된 책이 없어요</p>
        ) : (
          <>
            {/* 1행 */}
            <div className="up-books-row">
              {books.slice(0, row1).map((book, i) => {
                const img = resolveImg(book.image)
                return (
                  <div key={i} className="up-book" style={{ flex: bookFlex }}>
                    {img
                      ? <img src={img} alt={book.title} className="up-book-img" crossOrigin="anonymous" />
                      : <div className="up-book-placeholder" />
                    }
                  </div>
                )
              })}
            </div>

            {/* 2행 */}
            {row2 > 0 && (
              <>
                <div className="up-separator" />
                <div className="up-books-row">
                  {books.slice(row1, row1 + row2).map((book, i) => {
                    const img = resolveImg(book.image)
                    return (
                      <div key={i} className="up-book" style={{ flex: bookFlex }}>
                        {img
                          ? <img src={img} alt={book.title} className="up-book-img" crossOrigin="anonymous" />
                          : <div className="up-book-placeholder" />
                        }
                      </div>
                    )
                  })}
                </div>
              </>
            )}
          </>
        )}

        {/* 마지막 구분선 */}
        <div className="up-separator" />
      </div>
    )
  }

  return (
    <div className={`up-page-outer${isDark ? ' up-page-dark' : ''}`}>
    <div className="up-root">
      <header className="cp-header">
        <span className="cp-logo">BOOKIIBOOKII</span>
      </header>

      <main className="up-main">
        {status === 'loading' && (
          <div className="cp-state">
            <div className="cp-spinner" />
            <p>프로필을 불러오는 중...</p>
          </div>
        )}
        {status === 'error' && (
          <div className="cp-state">
            <span className="cp-state-icon">📚</span>
            <p className="cp-state-title">프로필을 찾을 수 없어요</p>
            <p className="cp-state-desc">
              {errorMsg || '탈퇴했거나 존재하지 않는 회원이에요.'}
            </p>
          </div>
        )}
        {status === 'ok' && renderCard()}
      </main>

      {token && <OpenInAppBanner token={token} />}

      <footer className="cp-footer">
        <a
          href="https://play.google.com/store/apps/details?id=com.bookiibookii.bookiibookii_d"
          className="cp-btn cp-btn--outline"
          target="_blank"
          rel="noopener noreferrer"
        >
          앱 다운로드
        </a>
        <button
          className="cp-btn cp-btn--solid"
          onClick={handleSave}
          disabled={saving || status !== 'ok'}
        >
          {saving ? '저장 중...' : '이미지 저장'}
        </button>
      </footer>
    </div>
    </div>
  )
}
