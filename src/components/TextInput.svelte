<script>
  export let placeholder;
  export let value;
</script>

<style>
  input {
    border-radius: 0;
    display: block;
    width: 100%;
    min-height: 3rem;
    padding: 0.75rem 1.5rem 0.6rem 1rem;
    font-family: "abcsans", -apple-system, BlinkMacSystemFont, "Segoe UI",
      "Roboto", "Helvetica Neue", Arial, sans-serif;
    font-size: 1rem;
    color: #000;
    border: 1px solid hsl(0, 0%, 80%);
    box-sizing: border-box;
    transition: border 0.2s;
  }

  input:focus {
    border-width: 1px 1px 1px 8px;
    border-color: rgb(253, 199, 8);
  }
</style>

<input type="text" {placeholder} bind:value on:focus on:keydown />
