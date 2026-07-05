type Options = {
  method?: string;
  body?: any;
};

export const apiFetch = async (endpoint: string, options: Options = {}) => {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + endpoint, {
    method: options.method || "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });
  const data = await res.json();
  if (!res.ok) {
    throw { response: { data } };
  }
  return data;
};

export const uploadFetch = async (endpoint: string, formData: FormData) => {
  const res = await fetch(import.meta.env.VITE_BACKEND_URL + endpoint, {
    method: "POST",
    credentials: "include",
    body: formData,
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Upload Failed");
  }
  return data;
};
