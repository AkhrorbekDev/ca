<script lang="ts" setup>
import velosiped from "@/assets/images/velosiped.png"
import skuter from "@/assets/images/skuter.png"
import sedan from "@/assets/images/sedan.png"
import {useCommonStore} from "@/stores/common.store"
import {services} from "@/components/fakeJson"
import {
  YMap,
  YMapDefaultSchemeLayer,
  YMapDefaultFeaturesLayer,
  YMapMarker,
  YMapClusterer,
  clusterByGrid, YMapLayer,
  YMapDefaultMarker,
  YMapListener,
  YMapFeatureDataSource,
  YMapControls,
  YMapZoomControl,
  YMapGeolocationControl,
  YMapControl
} from '@/lib/ymaps';
import type {LngLatBounds, LngLat, YMapLocationRequest, Margin} from '@yandex/ymaps3-types';
import type {Feature} from '@yandex/ymaps3-clusterer';
import useMapStore from "@/stores/map.store";
import {watch, computed} from 'vue'
import {onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";

const mapStore = useMapStore()
const refreshMarkers = (m) => {
  return m.map(marker => {
    return {
      type: 'Feature',
      id: marker.id,
      geometry: {
        type: 'Point',
        ...marker.markerProps.geometry
      }
    }
  })
}
const _markers = ref(refreshMarkers(mapStore.getMarkers || []))
const gridSizedMethod = clusterByGrid({gridSize: 64});
const LOCATION: YMapLocationRequest = {
  center: [69.279719, 41.311145],
  zoom: 12
};
const store = useCommonStore()


const route = useRoute()
const router = useRouter()

const value2 = ref(null);
const ingredient = ref('');
const ingredient2 = ref('');
const ingredient3 = ref('');
const imageList = ref<string[] | []>([])

const extraMenu = ref(false)
const menu = ref(false)
const filterMenuList = [
  "Barchasi",
  "Baland narxlilar",
  "Past narxlilar",
]

const deleteImage = (index) => {
  imageList.value.splice(index, 1)
}

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    // Create a temporary URL for the uploaded file
    imageList.value.push(URL.createObjectURL(file))
  }
};

const selectedCountry = ref();
const countries = ref([
  {name: 'Velosiped', info: "3 kg gacha", image: velosiped},
  {name: 'Skuter', info: "5 kg gacha", image: skuter},
  {name: 'Sedan', info: "20 kg gacha", image: sedan},

]);

const selectedCompany = ref();
const oilStaion = ref([
  {price: "1 litr: 11 500 so‘m", name: 'FathOil', info: "Yetkazib berish narxi: 7 000 so‘m",},
  {price: "1 litr: 11 500 so‘m", name: 'Miss Petrol', info: "Yetkazib berish narxi: Bepul",},
  {price: "1 litr: 11 500 so‘m", name: 'Oktan Petrol', info: "Yetkazib berish narxi: 10 000 so‘m",},
  {price: "1 litr: 11 500 so‘m", name: 'IBR Petroleum', info: "Yetkazib berish narxi: 15 000 so‘m",},
  {price: "1 litr: 11 500 so‘m", name: 'Mustang', info: "Yetkazib berish narxi: Bepul",},

]);

const transport = ref();
const transportList = ref([
  {
    name: "Avtovozlar",
    info: "Maxsus yuk mashinalari",
    disabled: false
  },

  {
    name: "Evakuator",
    info: "Maxsus yuk mashinalari",
    disabled: true
  },

  {
    name: "Maxsus texnikalarni transferi",
    info: "Maxsus yuk mashinalari",
    disabled: false
  },

  {
    name: "Yaxtalar va qayiqlarni transferi",
    info: "Maxsus yuk mashinalari",
    disabled: false
  },
])

const extraToggleMenu = () => {
  extraMenu.value = !extraMenu.value
}

const toggle = (event) => {
  menu.value.toggle(event);
};


onMounted(() => {

  let item = services.find(el => el.unique == route.params.type)
  if (Object.keys(item).length) {
    store.activeService = item
  }
})


watch(mapStore.getMarkers, (newVal) => {
  _markers.value = refreshMarkers(newVal)
}, {
  immediate: true,
  deep: true
})


const visible = ref(false)
const mapCluster = ref(null)

const lastChangedMarker = ref(0)
const changeMarkerPosition = (o, e) => {
  let marker
  if (_markers.value?.length > 1 && lastChangedMarker.value < _markers.value?.length) {
    marker = _markers.value[lastChangedMarker.value > 0 ? lastChangedMarker.value + 1 : lastChangedMarker.value]

    lastChangedMarker.value++
  } else {
    marker = _markers.value[0]
  }
  mapStore.updateMarker({
    ...marker,
    geometry: {
      ...marker.geometry,
      coordinates: e.coordinates
    }
  }, marker.id)

  mapStore.getMarker(marker.id)?.callback({
    ...marker.geometry,
    coordinates: e.coordinates
  })

}

const changeOnDrag = (e, id) => {

  try {
    mapStore.updateMarker({
      coordinates: e,
    }, id)
    const marker = mapStore.getMarker(id)
    marker.callback(marker.markerProps)
  } catch (e) {
    console.log(e)
  }
}

</script>

<template>
  <div>
    <div v-if="route.params.type !== 'oil'"
         class="bg-white rounded-[32px] !p-[16px] absolute bottom-[20px] right-[20px] z-[100] w-[368px]">
      {{ JSON.stringify(_markers) }}
      <button class="bg-[#66C61C] w-full text-center rounded-[24px] text-white text-[16px] !p-[16px]">
        E’lonni joylash
      </button>
    </div>


    <div
        width="100%"
        style="width: 100%; height: 100vh; top: 0; left: 0"
    >
      <YMap :location="LOCATION" :ref="refMap">
        <YMapDefaultSchemeLayer/>
        <YMapDefaultFeaturesLayer/>
        <YMapFeatureDataSource id="clusterer-source"/>
        <YMapLayer source="clusterer-source" type="markers" :zIndex="1800"/>

        <!--<YMapClusterer ref="mapCluster" :method="gridSizedMethod" :features="_markers">
          <template #marker="{feature}">
            <YMapMarker
                draggable
                v-bind="{
                  size: 'normal',
                  iconName: 'fallback',
                }"
                :key="feature.id"
                :coordinates="feature.geometry.coordinates"
                :onDragEnd="(e) => console.log('drag end', e)"
                source="clusterer-source"
            >
              <div class="map-geo-icon">
                <img width="24" height="24" src="@/assets/icons/map-pin.svg" alt="">
              </div>
            </YMapMarker>
          </template>
          <template #cluster="{coordinates, features}">
            <YMapMarker
                :key="features[0].id + features.length"
                :coordinates="coordinates"
                draggable
                source="clusterer-source">
              <div class="map-geo-icon">
                <img width="24" height="24" src="@/assets/icons/map-pin.svg" alt="">

              </div>
            </YMapMarker>
          </template>
        </YMapClusterer>-->
        <YMapMarker
            v-for="feature in _markers" iconName="landmark"
            source="clusterer-source"
            draggable
            :onDragEnd="(e) => changeOnDrag(e, feature.id)"
            :key="feature.id" :coordinates="feature.geometry.coordinates">
          <div
              class="marker-container"
          >
            <div class="map-geo-icon">
              <img width="24" height="24" src="@/assets/icons/map-pin.svg" alt="">
            </div>
          </div>
        </YMapMarker>
        <YMapControls position="right">
          <YMapGeolocationControl v-bind="{easing: 'ease-in-out', duration: 1000, zoom: 15}"/>

          <YMapZoomControl/>
        </YMapControls>
        <YMapListener
            @click="changeMarkerPosition"
        />
      </YMap>
    </div>
  </div>
</template>

<style lang="scss">
.p-floatlabel label {
  top: 1rem !important;
}

.map-geo-icon {
  width: 56px;
  height: 56px;
  border-radius: 100%;
  padding: 8px;
  background: white;
  transform: translate(-50%, calc(-100% + 2px));
  position: absolute;

  img {
    width: 40px;
    height: 40px;
  }

}

.custom-date input {
  border: none;
  height: 76px;
  border-radius: 24px;
  background-color: #FAFAFA !important;
}

.no-scrollbar::-webkit-scrollbar {
  display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none; /* IE and Edge */
  scrollbar-width: none; /* Firefox */
}

.p-select-overlay {
  top: 235px !important;
  border-radius: 24px !important;
  padding: 12px 20px !important;
}

.p-select-list-container {
  @apply no-scrollbar
}

.p-menu {
  border-radius: 16px !important;
}

.p-menu-item-content {
  padding: 8px 12px !important;
  border-radius: 16px !important;
}

.p-select-list-container {
  min-height: 500px;
}
</style>
