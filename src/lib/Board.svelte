<script lang="ts">
  import type { Ctx, Game } from "boardgame.io";
  import { width, height} from "./Game";
  import type {TicTacToeState} from "./Game";

  export let G : any;
  export let ctx : Ctx;
  export let moves;
  export let client;

  let winner;
  $: {
    if (!ctx.gameover) {
      winner = "";
    } else if (ctx.gameover.draw) {
      winner = "Draw";
    } else if (ctx.gameover.winner) {
      winner = `Player ${ctx.gameover.winner} wins!`;
    }
  }
</script>

<style>
    .grid {
        display: grid;
        grid-gap: 0.3rem;
    }
    button {
        font-size: 1rem;
        font-family: monospace;
    }
</style>
{#if !winner}
  <div class="grid" style="grid-template-columns: repeat({width}, 3rem); grid-template-rows: repeat({height}, 3rem);">
    {#each Array(width) as _, i}
      {#each Array(height) as _, j}
        <button on:click={() => moves.clickCell(i*width+j)}>
          {#if G.cells[i * width + j] == 0}
            X
          {:else if G.cells[i * width + j] == 1}
            O
          {/if}
          <!--{G.cells[i * width + j] || ""}-->
        </button>
      {/each}
    {/each}
  </div>
{:else}
  <p>{winner}</p>
  <button on:click={() => client.reset()}>Reset</button>
{/if}
  
