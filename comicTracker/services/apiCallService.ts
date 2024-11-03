import { FullPageLoader } from '@/components';
import axios, { RawAxiosRequestHeaders } from 'axios';

export const apiCall = async (
	serviceName: string,
	request?: any,
	headers?: Partial<RawAxiosRequestHeaders> & Record<string, string>
) => {
	try {
		const defaultHeaders: Partial<RawAxiosRequestHeaders> &
			Record<string, string> = {
			'Content-Type': 'application/json',
			'Accept': 'application/json',
		};
		console.log('This is request', request);

		const response = await axios.post(
			`${process.env.EXPO_PUBLIC_API_URL}/${serviceName}`,
			JSON.stringify(request),
			{
				headers: {
					'Content-Type': 'application/json',
					...headers,
				},
			}
		);

		const data = response.data;

		return data;
	} catch (error) {
		console.log(error);
		// FullPageLoader.close();
	}
};
