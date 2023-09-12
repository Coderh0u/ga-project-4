const useFetch = () => {
  const fetchData = async (
    endpoint: string,
    method: string,
    body?: object,
    token?: string
  ) => {
    const res = await fetch(import.meta.env.VITE_SERVER + endpoint, {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(body),
    });
    const data = await res.json();

    let returnValue: FetchReturn;
    if (res.ok) {
      if (data.status === "error") {
        returnValue = { ok: false, data: data.msg };
      } else {
        returnValue = { ok: true, data };
      }
    } else {
      if (data?.errors && Array.isArray(data.errors)) {
        const messages = data.errors.map((item: any) => item.msg);
        returnValue = { ok: false, data: messages };
      } else if (data?.status === "error") {
        returnValue = { ok: false, data: data.msg };
      } else {
        console.log("hi", data);
        returnValue = { ok: false, data: "An error occured" };
      }
    }

    return returnValue;
  };

  return fetchData;
};

export default useFetch;
