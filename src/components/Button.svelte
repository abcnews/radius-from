<script>
  export let text;
</script>

<style>
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
  button:hover,
  button:focus,
  button:active {
    background-color: rgb(43, 50, 55);
    border-radius: 2px;
    color: rgb(255, 255, 255);
  }

  button:hover {
    box-shadow: 0 0 0 2px var(--button-active-filled-fill, #2b3237),
      0 0.25rem 0.375rem -0.0625rem rgba(0, 0, 0, 0.5),
      0 0.125rem 0.25rem -0.0625rem rgba(0, 0, 0, 0.3);
  }
</style>

<button on:click>{text}</button>
