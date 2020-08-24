<script lang="ts">
  import ReactComponent from "svelte-react";
  import { Button } from "@abcaustralia/nucleus";

  export let text = "Share location";
  export let success: PositionCallback;
  export let error: PositionErrorCallback;
  export let timeout = 5000;

  const requestLocationAccess = () =>
    navigator.geolocation.getCurrentPosition(success, error, { timeout });
</script>

<style>
  :global(button) {
    width: 100%;
  }
</style>

<ReactComponent
  this={Button}
  children={text}
  onClick={requestLocationAccess}
  variant="filled" />
