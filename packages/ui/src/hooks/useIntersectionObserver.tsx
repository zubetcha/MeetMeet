import { useRef, useCallback, useEffect} from 'react';
import { useInView } from 'react-intersection-observer';


const useIntersectionOberserver =()=>{
    const ref = useRef();
    const [inViewRef, inView] = useInView();

    const setRefs = useCallback(
        (node) => {
          // Ref's from useRef needs to have the node assigned to `current`
          ref.current = node;
          // Callback refs, like the one from `useInView`, is a function that takes the node as an argument
          inViewRef(node);
        },
        [inViewRef],
    );

    useEffect(()=>{
        console.log(inView);
    },[inView])

    const ObserveObject = ()=>{
        return (
            <div ref={setRefs} style={{height:"5px", width:"100%"}}></div>
        )
    }

    return{
        inView,
        ObserveObject
    }
}

export default useIntersectionOberserver;