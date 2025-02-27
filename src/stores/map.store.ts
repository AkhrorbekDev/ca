import {defineStore} from "pinia";
import {YMapMarkerProps} from "@/lib/ymaps";

type MarkerType = {
    [Key: string]: {
        markerProps: YMapMarkerProps,
        callback: (details: YMapMarkerProps) => void
    }
}

const useMapStore = defineStore({
    id: 'mapStore',
    state(): Object<{
        markers: Object<MarkerType>
    }> {
        return {
            markers: {}
        }
    },
    actions: {
        setMarker(marker: { id: string | number, marker: MarkerType }) {
            this.markers[marker.id] = marker.marker
        }
    },
    getters: {
        getMarkers(state) {
            return state.markers
        },
        getMarker(state) {
            return (id) => state.markers
        }
    }
})

export default useMapStore
