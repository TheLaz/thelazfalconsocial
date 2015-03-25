exports.transform = function (id, message, image, imagename, network, deleted) {
	return {
		id: id,
		message: message,
		image: image || "https://cdn3.iconfinder.com/data/icons/abstract-1/512/no_image-512.png",
		imagename: imagename,
		network: network,
		deleted: deleted || false
	}
}
