import {defineStore, acceptHMRUpdate} from "pinia";
import {YMapMarkerProps} from "@/lib/ymaps";
import {defu} from 'defu'
import getGeoObject from '@/composables/getGeoObject'
import {ref} from "vue";

type MarkerType = {
    id: string | any,
    markerProps: YMapMarkerProps,
    callback: (details: YMapMarkerProps) => void
}

const useMapStore = defineStore({
    id: 'mapStore',
    state(): Object<{
        markers: Array<MarkerType>,
        defaultCoordinates: Array<number>
    }> {
        return {
            markers: [],
            defaultCoordinates: [69.279719, 41.311145]

        }
    },
    actions: {
        setMarker(marker: { id: string | number, marker: MarkerType }, id: string | number) {
            const isExist = this.markers.some(item => item.id === id)
            if (isExist) return
            this.markers.push(marker.marker)
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
            const index = this.markers.findIndex(marker => marker.id === id)
            if (index !== -1) {
                this.markers.splice(index, 1)
            }
            console.log(this.markers, index, id)
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
