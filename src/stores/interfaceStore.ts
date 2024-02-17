import { defineStore } from 'pinia'
export interface InterfaceStoreState {
    _isDarkMode: boolean,
    _initialized: boolean
}
export const InterfaceStoreLocalStorageKey = '_keyInterfaceStore'
export const useInterfaceStore = defineStore('interfaceStore', {
    state: (): InterfaceStoreState => ({
        _isDarkMode: false,
        _initialized: false
    }),
    getters: {
        isDarkMode: (state: InterfaceStoreState) => state._isDarkMode
    },
    actions: {
        toggleDarkMode() {
            this._isDarkMode = !this._isDarkMode
            localStorage.setItem(InterfaceStoreLocalStorageKey, JSON.stringify(this.$state))
        },
        setDarkMode(value: boolean) {
            this._isDarkMode = value
            localStorage.setItem(InterfaceStoreLocalStorageKey, JSON.stringify(this.$state))
        },
        hydrateState() {
            const interfaceStoreLocalStorageItem = localStorage.getItem(InterfaceStoreLocalStorageKey)
            if(interfaceStoreLocalStorageItem) {
                try {
                    this.setDarkMode((JSON.parse(interfaceStoreLocalStorageItem) as InterfaceStoreState)._isDarkMode)
                }
                catch(err) {
                    if(err) console.error(`Error parsing localStorage item with key ${InterfaceStoreLocalStorageKey}: ${err}`)
                }
            }
        }
    }
})