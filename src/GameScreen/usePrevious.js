import { useEffect, useRef } from 'react';

// custom hook for getting previous value
const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
};

export default usePrevious;
