function isLink(str: string): boolean {
	const pattern = /^https?:\/\/.*/;
	return pattern.test(str);
}

export default isLink;
