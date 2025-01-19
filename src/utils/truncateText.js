export default function truncateText(text, maxLength) {
	if (text.length <= maxLength) return text;
	const truncated = text.slice(0, text.lastIndexOf(' ', maxLength));
	return truncated + '...';
}