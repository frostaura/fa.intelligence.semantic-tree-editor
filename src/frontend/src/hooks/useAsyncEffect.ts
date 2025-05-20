import { useEffect } from "react";

export const useEffectAsync = (effect: () => Promise<void>, deps: React.DependencyList) => {
    useEffect(() => {
        setTimeout(async () => await effect());
    }, deps);
}