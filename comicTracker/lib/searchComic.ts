import { apiCall } from '@/services/apiCallService';

const searchComic = async (term: string) => {
	if (!term || term.length < 3) return;
	try {
		const data = await apiCall('search', {
			term,
		});

		return data;
	} catch (error) {
		console.log('Error in search', error);
		return [];
	}
};

export default searchComic;
