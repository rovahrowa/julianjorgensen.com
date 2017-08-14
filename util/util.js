let crypto = require('crypto'); // for validating payload

// Validates the payload (used for QuickBooks)
function isValidPayload(signature, token, payload) {
	var hash = crypto.createHmac('sha256', token).update(JSON.stringify(payload)).digest('base64');
	if (signature === hash) {
		return hash;
	}
	return hash;
}
module.exports.isValidPayload = isValidPayload;


// Creates a MD5 token based on a secret varialbe
function createToken(secretVariable) {
	let token = crypto.createHash('md5').update(secretVariable).digest('hex');
	return token;
}

module.exports.createToken = createToken;


// search objects by prop value
function searchObjects(nameKey, prop, arr){
  for (var i=0; i < arr.length; i++) {
    if (arr[i][prop] === nameKey) {
      return arr[i];
    }
  }
}
module.exports.searchObjects = searchObjects;


function addHttp(url){
  if (!url.match(/^[a-zA-Z]+:\/\//)){
    url = 'http://' + url;
  }
  return url;
}
module.exports.addHttp = addHttp;
