<script lang="ts">
	let { columns, createNewColumn = $bindable() } = $props();
</script>

<table class="mb-5">
	<tbody>
		<tr>
			{#each columns as column}
				<td class="border-1 border-zinc-200 relative pl-5">
					<span
						class={[
							column.type === 'text' ? 'bg-[#d9eafd] border-[#93c2f5]' : '',
							column.type === 'profile' ? 'bg-[#f4edff] border-[#d3c9ee]' : '',
							column.type === 'AI' ? 'bg-[#edfff1] border-[#c9eece]' : '',
							'absolute inset-2 block  border-1 rounded-sm w-3 h-3'
						]}
						aria-hidden="true"
					></span>
					<input class="w-40 px-2 py-1 text-sm" bind:value={column.name} />
				</td>
			{/each}
			<td class="w-40 border-1 border-zinc-200"
				><button
					onclick={createNewColumn}
					class="px-2 py-1 text-sm text-violet-400 hover:text-violet-500">New column</button
				></td
			>
		</tr>
	</tbody>
</table>
