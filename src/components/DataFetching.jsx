import axios from "axios";
import React, { useEffect, useState } from "react";
import { HoverEffect } from "./ui/Card-hover-effect";

const DataFetching = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("")

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = () => {
    setLoading(true);
    axios
      .get("http://localhost:5000/get-user-notes", { withCredentials: true })
      .then((res) => {
        console.log("Response:", res.data);
        setNotes(res.data.notes);
        setUsername(res.data.username || "User")
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleEdit = (note) => {
    console.log("Editing note:", note);
    // Implement your edit logic here
    // For example: navigate to edit page or open modal
    // navigate(`/edit-note/${note._id}`);
  };

  const handleDelete = async (note) => {
    if (window.confirm("Are you sure you want to delete this note?")) {
      try {
        await axios.delete(`http://localhost:5000/delete-note/${note._id}`, {
          withCredentials: true,
        });
        // Remove the deleted note from state
        setNotes(notes.filter(n => n._id !== note._id));
        console.log("Note deleted successfully");
      } catch (err) {
        console.error("Error deleting note:", err);
        alert("Failed to delete note. Please try again.");
      }
    }
  };

  if (loading) {
    return (
      <div className="p-6">
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading notes...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">{username}'s Notes ({notes.length})</h2>
      {notes.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-500 mb-4">No notes found</div>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
            Create Your First Note
          </button>
        </div>
      ) : (
        <HoverEffect 
          items={notes} 
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default DataFetching;