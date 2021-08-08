import http from "./http";

const HEADERS = {
  "Content-Type": "application/json",
};

const BASE_URL = "http://localhost:3000";

export const deleteFile = filePath => {
  const URL = `${BASE_URL}/file`;
  return http.delete(
    URL,
    {
      path: filePath,
    },
    HEADERS
  );
};

export const deleteFolder = folderPath => {
  const URL = `${BASE_URL}/folder`;
  return http.delete(
    URL,
    {
      path: folderPath,
    },
    HEADERS
  );
};

export const list = path => {
  const URL = `${BASE_URL}/all?path=${path}`;
  return http.get(URL, {});
};
