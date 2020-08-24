<script lang="ts">
  import {
    map,
    circle,
    latLng,
    tileLayer,
    Browser,
    Circle,
    Map
  } from "leaflet";
  import { onMount } from "svelte";
  import { LatLon } from "./types.d";
  export let location: LatLon;
  let mapElement: HTMLElement;
  let mapInstance: Map;
  let circleInstance: Circle;

  onMount(() => {
    mapInstance = map(mapElement, {
      zoom: 12,
      center: latLng(location),
      doubleClickZoom: false,
      dragging: !Browser.mobile,
      tap: !Browser.mobile
    });
    tileLayer(
      "https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg",
      {
        attribution:
          'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
        maxZoom: 18,
        detectRetina: true
      }
    ).addTo(mapInstance);

    circleInstance = circle(location, {
      stroke: false,
      fillColor: "#f03",
      fillOpacity: 0.2,
      radius: 5000
    }).addTo(mapInstance);
  });

  $: if (mapInstance && circleInstance) {
    circleInstance.setLatLng(location);
    mapInstance.panTo(latLng(location));
    mapInstance.fitBounds(circleInstance.getBounds());
  }
</script>

<style>
  .map {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    background-color: #ccc;
  }
</style>

<div class="map" bind:this={mapElement} />
