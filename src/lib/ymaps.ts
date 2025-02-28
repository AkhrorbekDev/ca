import * as Vue from 'vue';

await ymaps3.ready.then(() => {
    ymaps3.import.registerCdn('https://cdn.jsdelivr.net/npm/{package}', [
        '@yandex/ymaps3-default-ui-theme@0.0', '@yandex/ymaps3-clusterer@0.0']);
});
const [ymaps3Vue] = await Promise.all([ymaps3.import('@yandex/ymaps3-vuefy'), ymaps3.ready]);
export const vuefy = ymaps3Vue.vuefy.bindTo(Vue);
const {YMapClusterer, clusterByGrid} = vuefy.module(await ymaps3.import('@yandex/ymaps3-clusterer'));
export const {
    YMapZoomControl,
    YMapDefaultMarker,
    YMapGeolocationControl,
} = vuefy.module(await ymaps3.import('@yandex/ymaps3-default-ui-theme'));
export {YMapClusterer, clusterByGrid}
console.log(ymaps3)
export const {
    YMap,
    YMapDefaultSchemeLayer,
    YMapDefaultFeaturesLayer,
    YMapMarker,
    YMapControls,
    YMapControl,
    YMapMarkerProps,
    YMapListener,
    YMapLayer,
    YMapFeatureDataSource,
} = vuefy.module(ymaps3);

