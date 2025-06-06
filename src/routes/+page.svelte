<script lang="ts">
	import { insertChip } from '$lib/chip';
	import Dropdown from '$lib/components/Dropdown.svelte';
	import Table from '$lib/components/Table.svelte';

	let element = $state<HTMLDivElement>();
	let top = $state(0);
	let left = $state(0);
	let dropdownVisible = $state(false);

	let columns = $state([
		{ id: 1, name: 'LinkedIn URL', type: 'text' },
		{ id: 2, name: 'LinkedIn Profile', type: 'profile' },
		{ id: 3, name: 'AI Column', type: 'AI', data: [{ columnId: 1, domId: 1 }] }
	]);

	let filteredColumns = $derived.by(() => {
		return columns.filter((column) => {
			let remove = false;
			columns[2].data?.forEach((existing) => {
				if (existing.columnId === column.id) remove = true;
			});
			if (column.type === 'AI') remove = true;
			if (!column.name) remove = true;
			return !remove;
		});
	});

	const createNewColumn = () => {
		columns.push({ id: Math.floor(Math.random() * 1000), name: 'new', type: 'text' });
	};

	const selectChip = (columnId: number, columnName: string, columnType: string) => {
		dropdownVisible = false;
		const domId = Math.floor(Math.random() * 1000);
		columns[2].data?.push({ columnId, domId });
		insertChip(columnName, columnType, domId);
	};

	const onKeyUp = (event: KeyboardEvent) => {
		if (event.key === '/') {
			const selection = window.getSelection();
			const range = selection?.getRangeAt(0);
			if (!selection || !range) return;
			const rects = range.getClientRects();
			left = rects[0].x;
			top = rects[0].y + 30;
			dropdownVisible = true;
		}
	};

	const onInput = () => {
		if (!element || !columns[2].data) return;

		for (let i = columns[2].data.length - 1; i >= 0; i--) {
			let exists = false;
			for (const child of element.children) {
				if (child.id === `chip-${columns[2].data[i].domId}`) exists = true;
			}
			if (!exists) columns[2].data.splice(i, 1);
		}
	};

	$effect(() => {
		// update chips when column names change
		$state.snapshot(columns);
		if (!element || !columns[2].data) return;
		for (const column of columns[2].data) {
			for (const child of element.children) {
				if (child.id === `chip-${column.domId}`) {
					const name = columns.find((c) => c.id === column.columnId)?.name ?? '';
					child.innerHTML = `&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${name}&nbsp;&nbsp;`;
				}
			}
		}
	});
</script>

<div class="pt-20 px-10 xl:px-50 relative">
	<Table {columns} {createNewColumn} />
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		bind:this={element}
		onkeyup={onKeyUp}
		oninput={onInput}
		class="h-96 inline-block w-full focus:outline-none leading-7 border-1 border-zinc-400 rounded p-3"
		contenteditable="true"
	>
		hello <span id="chip-1" class="text chip" contenteditable="false"
			>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;LindedIn URL&nbsp;&nbsp;</span
		>&nbsp;
	</div>
	{#if dropdownVisible}
		<Dropdown columns={filteredColumns} {top} {left} {selectChip} bind:visible={dropdownVisible} />
	{/if}
</div>

<style>
</style>
