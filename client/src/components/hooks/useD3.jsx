import React from 'react';
import * as d3 from 'd3';

// make a hook that takes in a callback function and data. make reference to  

export const useD3 = (renderChartFn, dependencies) => {
    const ref = React.useRef();

    React.useEffect(() => {
        renderChartFn(d3.select(ref.current));
        return () => { };
    }, dependencies);
    return ref;
}