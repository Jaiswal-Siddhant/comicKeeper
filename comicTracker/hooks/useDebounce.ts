import { useRef, useCallback } from 'react';

function useDebounce(callback: any, delay: number) {
	const timeoutRef = useRef<any>(null);

	const debouncedCallback = useCallback(
		(...args: any) => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = setTimeout(() => {
				callback(...args);
			}, delay);
		},
		[callback, delay]
	);

	return debouncedCallback;
}

export default useDebounce;
