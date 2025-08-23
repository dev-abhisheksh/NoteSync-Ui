import axios from "axios";
import React, { useEffect, useState } from "react";
import { HoverEffect } from "./ui/Card-hover-effect"; // ✅ use this instead

const DataFetching = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/get-user-notes", { withCredentials: true })
      .then((res) => {
        console.log("Response:", res.data);
        setNotes(res.data.notes);
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
      });
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">User Notes</h2>
      <HoverEffect items={notes} /> {/* ✅ show notes with hover effect */}
    </div>
  );
};

export default DataFetching;
