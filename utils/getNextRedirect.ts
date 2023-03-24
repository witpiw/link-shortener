function getNextRedirect(destination = "/") {
	return {
		redirect: {
			permanent: false,
			destination,
		},
	};
}

export default getNextRedirect;
