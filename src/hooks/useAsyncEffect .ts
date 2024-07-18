import { useEffect, useCallback } from 'react';

const useAsyncEffect = (effect: (signal: AbortSignal) => Promise<void>, dependencies: any[]) => {
    const memoizedEffect = useCallback(effect, [effect, ...dependencies]);

    useEffect(() => {
        const controller = new AbortController();
        const { signal } = controller;

        const asyncEffect = async () => {
            try {
                await memoizedEffect(signal);
            } catch (error: unknown) {
                if (error instanceof Error && error.name !== 'AbortError') {
                    console.error('An error occurred:', error);
                } else if (error instanceof Error) {
                    console.error('Operation was aborted:', error);
                } else {
                    console.error('An unknown error occurred:', error);
                }
            }
        };

        asyncEffect();

        return () => {
            controller.abort();
        };
    }, [memoizedEffect]);
};

export default useAsyncEffect;
