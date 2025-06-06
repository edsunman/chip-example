<script lang="ts">
	let { columns, top, left, selectChip, visible = $bindable() } = $props();

	let selected = $state(0);

	const onKeyPress = (event: KeyboardEvent) => {
		switch (event.code) {
			case 'ArrowDown':
				event.preventDefault();
				if (selected < columns.length - 1) selected++;
				return;
			case 'ArrowUp':
				event.preventDefault();
				if (selected > 0) selected--;
				return;
			case 'Enter':
				event.preventDefault();
				selectChip(columns[selected].id, columns[selected].name, columns[selected].type);
				return;
		}
		visible = false;
	};
</script>

<div
	style:top={`${top}px`}
	style:left={`${left}px`}
	class=" w-42 absolute border-1 rounded border-zinc-300"
>
	{#if columns.length > 0}
		{#each columns as column, i}
			<!-- svelte-ignore a11y_mouse_events_have_key_events -->
			<button
				class={[
					'p-2 hover:bg-zinc-100 w-full text-left text-sm',
					selected === i ? 'bg-zinc-100' : ''
				]}
				onmouseover={() => {
					selected = i;
				}}
				onclick={() => selectChip(column.id, column.name, column.type)}
			>
				{column.name}
			</button>
		{/each}
	{:else}
		<div class="p-2 w-full text-left text-sm">No columns</div>
	{/if}
</div>

<svelte:window onkeydown={onKeyPress} />
