<script lang="ts">
  import { GeoJSONSource, Map } from 'maplibre-gl';
  import { circle, point, bbox } from '@turf/turf';
  import { onMount } from 'svelte';
  import type { LatLon } from './types.d';

  export let location: LatLon;
  export let radius: number;

  const MIN_RADIUS = 1;
  const MAX_RADIUS = 25;

  let mapElement: HTMLElement;
  let center: [number, number];
  let map: Map;

  $: center = [location[1], location[0]];
  $: overlay = circle(point(center), Math.max(MIN_RADIUS, Math.min(radius, MAX_RADIUS)), 50, 'kilometers');

  onMount(() => {
    map = new Map({
      container: mapElement,
      style: 'https://www.abc.net.au/res/sites/news-projects/map-vector-style-bright/style.json',
      zoom: 12,
      center,
      doubleClickZoom: false
    });

    map.on('load', () => {
      map.addSource('radius', { type: 'geojson', data: overlay });
      map.addLayer({
        id: 'radius',
        type: 'fill',
        source: 'radius',
        paint: { 'fill-color': '#f03', 'fill-opacity': 0.2 }
      });
    });
  });

  $: if (map && map.loaded()) {
    (map.getSource('radius') as GeoJSONSource).setData(
      circle(point(center), Math.max(MIN_RADIUS, Math.min(radius, MAX_RADIUS)), 50, 'kilometers')
    );
    map.panTo(center);
    map.fitBounds(bbox(overlay) as [number, number, number, number]);
  }
</script>

<div class="map" bind:this={mapElement} />

<style>
  .map {
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 1;
    background-color: #ccc;
  }
</style>
