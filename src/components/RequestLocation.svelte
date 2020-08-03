<script>
  import Button from "./Button.svelte";

  export let text = "Share location";
  export let success;
  export let error;
  export let timeout = 5000;

  const requestLocationAccess = () =>
    navigator.geolocation.getCurrentPosition(success, error, { timeout });
</script>

<Button {text} on:click={requestLocationAccess} />
