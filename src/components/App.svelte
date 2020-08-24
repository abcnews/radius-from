<script lang="ts">
  import Search from "./Search.svelte";
  import Map from "./Map.svelte";
  import { LatLon } from "./types.d";
  let location: LatLon = [-37.7975037, 144.9603923];
</script>

<Map {location} />
<Search bind:location />
