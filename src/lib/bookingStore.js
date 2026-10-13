import { useSyncExternalStore } from 'react'

/**
 * A tiny shared store so a "Request this service" button anywhere on the page can
 * pre-select the service in the booking form. No global state library needed.
 */
let state = { serviceId: '', nonce: 0 }
const listeners = new Set()

export const bookingStore = {
  get: () => state,
  selectService(serviceId) {
    state = { serviceId, nonce: state.nonce + 1 }
    listeners.forEach((l) => l())
  },
  subscribe(l) {
    listeners.add(l)
    return () => listeners.delete(l)
  },
}

export const useBookingSelection = () => useSyncExternalStore(bookingStore.subscribe, bookingStore.get, bookingStore.get)
