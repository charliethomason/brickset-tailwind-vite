import { useState, useEffect } from "react";

const TEST_PARAMS = { "theme": "star wars", "pageSize": 100 };

export const useBricksetQuery = () => {
  const apiKey = import.meta.env.VITE_BRICKSET_KEY;
  const bricksetUser = import.meta.env.VITE_BRICKSET_USER;
  const bricksetPass = import.meta.env.VITE_BRICKSET_PW;
  const [sets, setSets] = useState([]);
  useEffect(() => {
    const fetchSets = async () => {
      try {
        const loginParams = new URLSearchParams({
          apiKey,
          username: bricksetUser,
          password: bricksetPass
        });
        const login = await fetch(`/api/login?${loginParams.toString()}`);
        if (!login.ok) {
          throw new Error(`HTTP error! Status: ${login.status}`);
        }
        const result = await login.json();
        const userHash = result.hash;

        if (userHash) {
          const params = new URLSearchParams({
            apiKey,
            userHash,
            params: JSON.stringify(TEST_PARAMS)
          });
          const resp = await fetch(`/api/getSets?${params.toString()}`);
          if (!resp.ok) {
            throw new Error(`HTTP error! Status: ${resp.status}`);
          }
          const data = await resp.json();
          setSets(data.sets);
        }
      } catch (err) {
        console.log("useBricksetQuery error", err);
      }
    };
    fetchSets();
  }, []);
  return { sets };
};
