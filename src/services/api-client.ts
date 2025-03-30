import axios from 'axios';

type ContentType = 'text' | 'image' | 'audio' | 'video';

interface GenerateResponse {
	type: ContentType;
	content?: string;
	error?: string;
}

const baseUrl = import.meta.env.VITE_BASE_URL;

const apiClient = axios.create({
	baseURL: baseUrl,
});

async function fetchOutput(prompt: string, type: string): Promise<GenerateResponse> {
	try {
		const response = await apiClient.post(`/generate`, {
			prompt,
			type,
		});
		return response.data;
	} catch (error) {
		throw new Error('Failed to fetch output');
	}
}

export default fetchOutput