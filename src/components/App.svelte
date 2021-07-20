<script lang="ts">
  import Search from './Search.svelte';
  import Map from './Map.svelte';
  import { LatLon } from './types.d';

  // For quick reference:
  // Melbourne [-37.7975037, 144.9603923];
  // Sydney [-33.86748, 151.20727];
  // Adelade [-34.92866, 138.59863];

  // Defaults to Melbourne, sorry
  const mel: [number, number] = [-37.7975037, 144.9603923];

  const [, kmString] = /[?&]km=([^&#]*)/i.exec(String(window.location)) || [];
  const [, llString] = /[?&]ll=([^&#]*)/i.exec(String(window.location)) || [];
  const km = parseFloat(decodeURIComponent(kmString));
  const [lat, lon] = llString ? decodeURIComponent(llString).split(',').map(parseFloat) : [];
  const radius: number = (isNaN(km) ? 5 : km) * 1000;
  let location: LatLon = isNaN(lat) || isNaN(lon) ? mel : [lat, lon];
</script>

<Map {location} {radius} />
<Search bind:location />
