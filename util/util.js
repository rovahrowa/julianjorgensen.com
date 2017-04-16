var crypto = require('crypto'); // for validating payload

/**
 * Validates the payload
 */
// console.log('57f6aeac6d538f446fff3c37d40c6a0a');
// console.log(isValidPayload('Invoice204', '57f6aeac6d538f446fff3c37d40c6a0a'));

function isValidPayload(signature, token, payload) {
	var hash = crypto.createHmac('sha256', token).update(JSON.stringify(payload)).digest('base64');
	if (signature === hash) {
		return hash;
	}
	return hash;
}

module.exports.isValidPayload = isValidPayload;
