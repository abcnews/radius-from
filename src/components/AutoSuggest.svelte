<script lang="ts">
  import { createEventDispatcher } from "svelte";
  import TextInput from "./TextInput.svelte";
  import { Location } from "./types.d";

  const dispatch = createEventDispatcher();

  export let value: string;
  export let placeholder: string;
  export let options: Location[] | false = false;
  export let valueAccessor: (v: any) => any = v => v;
  export let labelAccessor: (l: any) => string = l => l;
  export let noMatch = "No match";

  let selectedOption: number | false = false;
  $: dispatch("value", { value });

  $: console.log(labelAccessor(options && options[0]));

  const incrementSelectedOption = () => {
    if (selectedOption === false || options === false)
      return (selectedOption = 0);
    selectedOption = (selectedOption + 1) % options.length;
  };

  const decrementSelectedOption = () => {
    if (options === false) return 0;
    if (selectedOption === false) return (selectedOption = options.length - 1);
    selectedOption =
      selectedOption - 1 < 0 ? options.length - 1 : selectedOption - 1;
  };

  const handleSearchKeydown = ev => {
    if (ev.key === "Enter" && selectedOption !== false) {
      selectOption();
    }

    if (options && options.length > 0) {
      if (ev.key === "ArrowDown") incrementSelectedOption();
      if (ev.key === "ArrowUp") decrementSelectedOption();
    }
  };

  const selectOption = () => {
    selectedOption !== false &&
      dispatch("select", valueAccessor(options[selectedOption]));
  };
</script>

<style>
  .auto-complete {
    position: relative;
  }

  .options {
    position: absolute;
    top: 100%;
    left: 0;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .result {
    padding: 0;
    background: #fff;
    display: block;
    border-top: 1px solid #ccc;
    color: #000;
    width: 100%;
  }

  .result button {
    display: block;
    padding: 8px;
    width: 100%;
    border: none;
    background: transparent;
    text-align: left;
    font-size: 1rem;
  }

  .result.selected {
    background-color: #ccc;
  }
</style>

<div class="auto-complete" on:keydown={handleSearchKeydown}>
  <TextInput
    {placeholder}
    bind:value
    on:keydown
    on:focus
    on:focus={() => (selectedOption = false)} />
  {#if options !== false}
    <ol class="options">
      {#if options && options.length === 0}
        <li class="result no-match">{noMatch}</li>
      {/if}
      {#each options as option, i}
        <li class="result" class:selected={i === selectedOption}>
          <button
            on:mouseover={ev => ev.target.focus()}
            on:focus={() => (selectedOption = i)}
            on:click={selectOption}>
            {labelAccessor(option)}
          </button>
        </li>
      {/each}
    </ol>
  {/if}
</div>
