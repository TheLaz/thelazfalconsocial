exports.transform = function (id, impressions, organic, viral, paid) {
	return {
		id: id,
		general: {
			value: impressions.value,
			date: impressions.timestamp
		},
		organic: {
			value: organic.value,
			date: organic.timestamp
		},
		viral: {
			value: viral.value,
			date: viral.timestamp
		},
		paid: {
			value: paid.value,
			date: paid.timestamp
		}
	}
}
