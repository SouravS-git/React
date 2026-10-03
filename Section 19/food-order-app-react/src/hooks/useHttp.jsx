import { useCallback, useEffect, useState } from "react";

async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message || 'Something went wrong!');
  }

  return responseData;
}

export default function useHttp(url, config, initialData) {
  const [responseData, setResponseData] = useState(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(undefined);

  const sendRequest = useCallback(async (data) => {
    setIsLoading(true);

    try {
      const responseData = await sendHttpRequest(url, {...config.current, body: JSON.stringify(data)});
      setResponseData(responseData);
    }catch (error) {
      setError(error.message || 'Something went wrong!');
    }

    setIsLoading(false);
  }, [sendHttpRequest, url, config]);

  useEffect(() => {
    if (config.current.method === 'GET'){
      sendRequest();
    }
  }, [sendRequest, config]);

  function clearData(){
    setResponseData(initialData);
    setError(undefined);
    setIsLoading(false);
  }

  return {
    responseData,
    isLoading,
    error,
    sendRequest,
    clearData,
  }
}