export const insertChip = (columnName: string, columnType: string, domId: number) => {
	const selection = window.getSelection();
	const range = selection?.getRangeAt(0);
	if (!selection || !range) return;

	const cursorPosition = range.startOffset;
	const textNode = range.startContainer;
	const deleteRange = document.createRange();
	deleteRange.setStart(textNode, cursorPosition - 1);
	deleteRange.setEnd(textNode, cursorPosition);
	deleteRange.deleteContents();

	const chipNode = document.createElement('span');
	const text = document.createTextNode(columnName);
	chipNode.contentEditable = 'false';
	chipNode.classList.add(columnType);
	chipNode.classList.add('chip');
	chipNode.id = `chip-${domId}`;
	chipNode.appendChild(text);
	range.insertNode(chipNode);

	const spaceNode = document.createTextNode('\xA0');
	range.setStartAfter(chipNode);
	range.insertNode(spaceNode);

	range.setStartAfter(spaceNode);
	range.collapse(true);

	selection.removeAllRanges();
	selection.addRange(range);
};
