// utils/serializeFirestore.js

export const serializeFirestore = (data) => {
	return JSON.parse(JSON.stringify(data));
};
