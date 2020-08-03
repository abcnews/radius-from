<script>
  import Search from "../Search/Search.svelte";
  import Map from "../Map/Map.svelte";
  let location = [-37.7975037, 144.9603923];
</script>

<style lang="scss">
  .root {
    width: 100%;
    height: 100%;
    min-height: 320px;
    background-color: #ccc;
  }
</style>

<Map {location} />
<Search bind:location />
