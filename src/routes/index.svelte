
<script lang="ts">
	import {Client} from 'boardgame.io/client';
	import {TicTacToe} from "../lib/Game.ts";
	import { onMount } from "svelte";
	import Board from "../lib/Board.svelte";

	let client;
	let state;
	$: {
		client = client || Client({ game: TicTacToe });
		state = $client;
	}

	onMount(() => {
		client.start();
		return () => client.stop();
	});
</script>

<svelte:head>
	<title>Home</title>
</svelte:head>

<section>
	{#if state}
		<Board G={state.G} ctx={state.ctx} moves={client.moves} client={client} />
	{:else}
		<p>loading...</p>
	{/if}
</section>	


<style>
	section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

	h1 {
		width: 100%;
	}
</style>
