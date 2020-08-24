<script lang="ts">
  import { throttle } from "throttle-debounce";
  import Button from "./Button.svelte";
  import AutoSuggest from "./AutoSuggest.svelte";
  import RequestLocation from "./RequestLocation.svelte";
  import { LatLon, Location } from "./types.d";
  import { MAPBOX_TOKEN } from "../constants";
  export let location: LatLon;

  let locationError: PositionError;
  $: geolocationSupported = !!navigator.geolocation && !locationError;
  let suppliedLocation: LatLon | false = false;
  let suggestedLocations: Location[] | false = false;

  const fetchSuggestions: (query: string) => void = throttle(
    1000,
    false,
    query => {
      fetch(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json?access_token=${MAPBOX_TOKEN}&autocomplete=true&country=au&types=district%2Cpostcode%2Clocality%2Cplace%2Caddress%2Cneighborhood`
      )
        .then(res => {
          if (!res.ok) {
            throw new Error();
          }
          return res.json();
        })
        .then((data: { features: undefined | Location[] }) => {
          if (!data.features) {
            throw new Error();
          }

          suggestedLocations = data.features.slice(0, 3);
        });
    }
  );

  const handleSearchValue = ({ detail: { value } }) => {
    if (value.length < 3) {
      suggestedLocations = false;
      return;
    }
    fetchSuggestions(value);
  };

  const handleLocationSuccess = (position: {
    coords: { latitude: number; longitude: number };
  }) => {
    location = suppliedLocation = [
      position.coords.latitude,
      position.coords.longitude
    ];
  };

  const handleLocationError: PositionErrorCallback = (err: PositionError) => {
    locationError = err;
  };

  const handleSelectLocation = ({ detail: { center } }) => {
    location = suppliedLocation = center.reverse();
    suggestedLocations = false;
  };
</script>

<style lang="scss">
  div {
    font-family: "abcsans", -apple-system, BlinkMacSystemFont, "Segoe UI",
      "Roboto", "Helvetica Neue", Arial, sans-serif;
    color: #fff;
    text-align: center;
  }

  h2 {
    width: 12em;
  }

  .inputs {
    display: flex;
    justify-content: center;
    flex-direction: column;
    position: absolute;
    right: 50%;
    top: 30%;
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
  {#if !suppliedLocation}
    <h2>Enter your location to see how far you can go from home</h2>

    {#if geolocationSupported}
      <RequestLocation
        text="Use my location"
        success={handleLocationSuccess}
        error={handleLocationError} />
      <p>OR</p>
    {/if}
    <AutoSuggest
      value=""
      placeholder="Type an address"
      options={suggestedLocations ? suggestedLocations : false}
      labelAccessor={d => (d ? d.place_name : '')}
      on:value={handleSearchValue}
      on:select={handleSelectLocation} />
  {:else}
    <Button
      on:click={() => (suppliedLocation = false)}
      text="Change location" />
  {/if}
</div>
