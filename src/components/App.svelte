<script lang="ts">
  import Search from './Search.svelte';
  import Map from './Map.svelte';
  import { LatLon } from './types.d';

  const [, kmString] = /[?&]km=([^&#]*)/i.exec(String(window.location)) || [];
  const [, llString] = /[?&]ll=([^&#]*)/i.exec(String(window.location)) || [];
  const km = parseFloat(decodeURIComponent(kmString));
  const [lat, lon] = decodeURIComponent(llString)?.split(',').map(parseFloat) || [-37.7975037, 144.9603923]; // Defaults to Melbourne, sorry
  const radius: number = (isNaN(km) ? 5 : km) * 1000;
  let location: LatLon = [lat, lon];
  // For quick reference:
  // Melbourne [-37.7975037, 144.9603923];
  // Sydney [-33.86748, 151.20727];
  // Adelade [-34.92866, 138.59863];
</script>

<Map {location} {radius} />
<Search bind:location />
