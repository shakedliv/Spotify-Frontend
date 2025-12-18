const { DEV, VITE_LOCAL } = import.meta.env

import { trackService as local } from './track.service.local'
// import { trackService as remote } from './track.service.remote'

const service = (VITE_LOCAL === 'true') ? local : local

export const trackService = { ...service }

if (DEV) window.trackService = trackService
