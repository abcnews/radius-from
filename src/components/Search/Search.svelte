<script>
  import { onMount } from "svelte";
  import { OpenStreetMapProvider } from "leaflet-geosearch";

  const provider = new OpenStreetMapProvider();

  let locationString;
  let locationError;
  $: geolocationSupported = !!navigator.geolocation || !locationError;
  export let location;
  let suppliedLocation;
  let permissionStatus;

  const handleSubmit = () => {
    provider.search({ query: locationString }).then(results => {
      if (results.length > 0) {
        location = suppliedLocation = [results[0].y, results[0].x];
      }
    });
  };

  $: console.log("suppliedLocation :>> ", suppliedLocation);

  const handleLocationSuccess = position => {
    location = suppliedLocation = [
      position.coords.latitude,
      position.coords.longitude
    ];
  };

  const handleLocationError = err => {
    locationError = err;
  };

  const requestLocationAccess = () =>
    navigator.geolocation.getCurrentPosition(
      handleLocationSuccess,
      handleLocationError,
      { timeout: 5000 }
    );

  $: console.log("permissionStatus :>> ", permissionStatus);

  onMount(() => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(result => (permissionStatus = result.state));
  });
</script>

<style lang="scss">
  button {
    color: rgb(0, 0, 0);
    background-color: rgb(253, 199, 8);
    box-shadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px,
      rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.05) 0px 2px 4px -1px;
    border-radius: 3px;
    border: 1px solid transparent;
    cursor: pointer;
    font-family: "abcsans", -apple-system, BlinkMacSystemFont, "Segoe UI",
      "Roboto", "Helvetica Neue", Arial, sans-serif;
    font-size: 0.75rem;
    font-weight: 700;
    letter-spacing: 0.125rem;
    line-height: 1.5rem;
    padding: 0.625rem 1.5rem 0.5rem;
    text-align: center;
    text-transform: uppercase;
    touch-action: manipulation;
    transition-duration: 0.2s;
    transition-property: color, border-color, border-radius, background-color,
      box-shadow, transform, transform;
    transition-timing-function: ease-out;
    vertical-align: middle;
  }
  button:hover {
    background-color: rgb(43, 50, 55);
    border-radius: 2px;
    color: rgb(255, 255, 255);
    box-shadow: 0 0 0 2px var(--button-active-filled-fill, #2b3237),
      0 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.5),
      0 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.3);
  }

  input {
    border-radius: 0;
    display: block;
    min-height: 3rem;
    padding: 0.75rem 1.5rem 0.6rem 1rem;
    font-family: "abcsans", -apple-system, BlinkMacSystemFont, "Segoe UI",
      "Roboto", "Helvetica Neue", Arial, sans-serif;
    font-size: 1rem;
    color: inherit;
    border: 1px solid hsl(0, 0%, 80%);
    box-sizing: border-box;
    transition: border 0.2s;
  }

  input:focus {
    border-width: 1px 1px 1px 8px;
    border-color: rgb(253, 199, 8);
  }

  .inputs {
    position: absolute;
    right: 50%;
    top: 50%;
    transform: translate(50%, -50%);
    z-index: 10;
    transition: right 0.5s, top 0.5s, transform 0.5s;
  }

  .inputs.corner {
    right: 20px;
    top: 20px;
    transform: translate(0, 0);
  }

  .shim {
    width: 100%;
    height: 100%;
    position: absolute;
    display: none;
    left: 0;
    top: 0;
    z-index: 1;
    background: rgba(0, 0, 0, 0.6);
  }

  .shim.active {
    display: block;
  }
</style>

<div class="shim" class:active={!suppliedLocation} />

<div class="inputs" class:corner={!!suppliedLocation}>
  {#if !suppliedLocation && !locationError}
    <button on:click={requestLocationAccess}>Use my location</button>
  {:else}
    <input
      type="text"
      placeholder="Type an address"
      bind:value={locationString}
      on:keydown={ev => ev.key === 'Enter' && handleSubmit()} />
  {/if}
</div>
