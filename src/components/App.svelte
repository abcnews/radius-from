<script lang="ts">
  import Search from './Search.svelte';
  import Map from './Map.svelte';
  import { LatLon } from './types.d';

  const [, kmString] = /[?&]km=([^&#]*)/i.exec(String(window.location)) || [];
  const km = parseInt(decodeURIComponent(kmString), 10);
  const radius: number = (isNaN(km) ? 5 : km) * 1000;

  // Melbourne latlong
  // let location: LatLon = [-37.7975037, 144.9603923];

  // Sydney latlong
  // TODO: Make this configurable in URL
  let location: LatLon = [-33.86748, 151.20727];
</script>

<Map {location} {radius} />
<Search bind:location />
