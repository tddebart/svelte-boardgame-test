<script lang="ts">
  let count = 5;
  $: double = count*2;
  
  function add(){
    count++;
  }
</script>

<h1>Count: {count}</h1>
<h1>{double}</h1>
<button on:click={add}>Click</button>