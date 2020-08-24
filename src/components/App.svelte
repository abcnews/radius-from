<script lang="ts">
  import "@abcaustralia/nucleus/css/root.css";
  import Search from "./Search.svelte";
  import Map from "./Map.svelte";
  import { LatLon } from "./types.d";
  let location: LatLon = [-37.7975037, 144.9603923];
</script>

<style>
  :global(:root) {
    /* Main brand colour */
    --colour-primary: hsl(47, 98%, 51%);
    /* Colours interactive elements, such as links and focus highlights */
    --colour-assistant: hsl(214, 100%, 40%);
    /* Used to apply accents to interface elements */
    --colour-accent: hsl(47, 98%, 51%);
    /* Used to apply an active effect (e.g. Button active) */
    --colour-accent-active: hsla(47, 98%, 51%, 0.7);
    /* A faded variant of the accent colour (e.g. Loading) */
    --colour-accent-faded: hsla(47, 98%, 51%, 0.25);
  }
</style>

<Map {location} />
<Search bind:location />
