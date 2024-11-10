/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useEffect, useRef, useState } from 'react';

export interface IBaseWorkerResponse<T> {
  result: T;
  error?: any;
}

export const useWebWorker = <TResult, TWorkerPayload>(worker: Worker) => {
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<any>();
  const [result, setResult] = useState<TResult>();

  const started = useRef(false);

  const startProcessing = useCallback(
    (data: TWorkerPayload) => {
      if (!started.current) {
        setRunning(true);
        worker.postMessage(data);
        started.current = true;
      }
    },
    [worker],
  );

  useEffect(() => {
    const onMessage = (event: MessageEvent<IBaseWorkerResponse<TResult>>) => {
      console.log(event);
      setRunning(false);
      setError(event.data.error);
      setResult(event.data.result);
      started.current = false;
    };
    worker.addEventListener('message', onMessage);
    return () => {
      worker.removeEventListener('message', onMessage);
      worker.terminate();
    };
  }, []);

  return {
    startProcessing,
    running,
    error,
    result,
  };
};
