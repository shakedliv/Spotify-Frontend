const { DEV, VITE_LOCAL } = import.meta.env

import { getRandomIntInclusive, makeId } from '../util.service'

import { trackService as local } from './track.service.local'
import { trackService as remote } from './track.service.remote'

function getEmptyTrack() {
   return {
        _id: '',
      name: makeId(),
      speed: getRandomIntInclusive(80, 240),
   }
}

function getDefaultFilter() {
    return {
       name: '',
       artists: '',
        sortField: '',
        sortDir: '',
    }
}

const service = (VITE_LOCAL === 'true') ? local : remote
export const trackService = { getEmptyTrack, getDefaultFilter, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.trackService = trackService
