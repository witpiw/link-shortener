function isLink(str: string): boolean {
	const pattern = /^(http(s)?:\/\/)?([\w-]+\.)+[\w-]+(\/[\w- ./?%&=]*)?$/;
	return pattern.test(str);
}

export default isLink;
