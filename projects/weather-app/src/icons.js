import React from 'react'

export const Sun = ({ className = '' }) => (
  <svg className={className} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ffb020" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="4" fill="#ffd166" />
    <g stroke="#ffb020">
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.2" y1="4.2" x2="5.6" y2="5.6" />
      <line x1="18.4" y1="18.4" x2="19.8" y2="19.8" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
    </g>
  </svg>
)

export const Cloud = ({ className = '' }) => (
  <svg className={className} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7193ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 17.58A4 4 0 0 0 16 14H7.5A4.5 4.5 0 1 0 7.5 23H18a3 3 0 0 0 2-5.42z" fill="#dbe9ff" stroke="none" />
    <path d="M20 17.58A4 4 0 0 0 16 14H7.5A4.5 4.5 0 1 0 7.5 23H18a3 3 0 0 0 2-5.42z" opacity="0.6" />
  </svg>
)

export const Rain = ({ className = '' }) => (
  <svg className={className} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3aa0ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 16.58A4 4 0 0 0 16 13H7.5A4.5 4.5 0 1 0 7.5 22H18a3 3 0 0 0 2-5.42z" fill="#dbefff" stroke="none" />
    <line x1="8" y1="19" x2="8" y2="22" stroke="#3aa0ff" />
    <line x1="12" y1="19" x2="12" y2="22" stroke="#3aa0ff" />
    <line x1="16" y1="19" x2="16" y2="22" stroke="#3aa0ff" />
  </svg>
)

export const Snow = ({ className = '' }) => (
  <svg className={className} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#7fd3ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <g fill="#e9f9ff">
      <circle cx="8" cy="12" r="2" />
      <circle cx="16" cy="12" r="2" />
    </g>
    <path d="M20 16.58A4 4 0 0 0 16 13H7.5A4.5 4.5 0 1 0 7.5 22H18a3 3 0 0 0 2-5.42z" fill="#f6fcff" opacity="0.8" />
  </svg>
)

export const Storm = ({ className = '' }) => (
  <svg className={className} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#ff7b7b" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 16.58A4 4 0 0 0 16 13H7.5A4.5 4.5 0 1 0 7.5 22H18a3 3 0 0 0 2-5.42z" fill="#ffecec" stroke="none" />
    <path d="M13 11l-2 4h3l-2 4" fill="#ffb3b3" />
  </svg>
)

export const Fog = ({ className = '' }) => (
  <svg className={className} width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#aab4c8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="10" width="18" height="2" rx="1" fill="#e9eef6" />
    <rect x="3" y="14" width="14" height="2" rx="1" fill="#e9eef6" />
    <rect x="3" y="18" width="10" height="2" rx="1" fill="#e9eef6" />
  </svg>
)

export default { Sun, Cloud, Rain, Snow, Storm, Fog }
