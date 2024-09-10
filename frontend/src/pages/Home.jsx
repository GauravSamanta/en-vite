import axios from "axios";
import React, { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    axios.get("/api/users").then((response) => {
      console.log(response);
    });
  }, []);

  return <div>Home</div>;
}
