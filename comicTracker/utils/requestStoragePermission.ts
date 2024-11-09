import * as Permissions from 'expo-permissions';

const requestStoragePermission = async () => {
	const { status } = await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
	if (status !== 'granted') {
		console.log('Permission denied');
		return false;
	}
	return true;
};

export { requestStoragePermission };
