import {defineStore, acceptHMRUpdate} from "pinia";
import {YMapMarkerProps} from "@/lib/ymaps";
import {defu} from 'defu'
import getGeoObject from '@/composables/getGeoObject'

type MarkerType = {
    id: string | any,
    markerProps: YMapMarkerProps,
    callback: (details: YMapMarkerProps) => void
}

const useMapStore = defineStore({
    id: 'mapStore',
    state(): Object<{
        markers: Array<MarkerType>
    }> {
        return {
            markers: []
        }
    },
    actions: {
        setMarker(marker: { id: string | number, marker: MarkerType }, id: string | number) {
            if (id) {
                this.markers = this.markers.map(m => {
                    if (m.id === id) {
                        m = marker
                    }
                    return m
                })
            } else {
                this.markers.push(marker.marker)
            }
            console.log(this.markers)
        },
        updateMarker(props: MarkerType['markerProps'], id: string | number) {
            if (id) {
                this.markers.map(m => {
                    if (m.id === id) {
                        m.markerProps = {...m.markerProps, ...props}
                    }
                    return m
                })
            } else {
                return new Error(`${id} marker not found`)
            }
        },
        removeMarker(id: string) {
            this.markers = this.markers.filter(marker => marker.id !== id)
        }
    },
    getters: {
        getMarkers(state) {
            return state.markers
        },
        getMarker(state) {

            return (id) => {
                return state.markers.find(item => {
                    return item.id === id
                })
            }
        }
    }
})


if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useMapStore, import.meta.hot))
}

export default useMapStore
