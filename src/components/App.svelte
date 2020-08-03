<script>
  import Search from "./Search.svelte";
  import Map from "./Map.svelte";
  let location = [-37.7975037, 144.9603923];
</script>

<Map {location} />
<Search bind:location />
