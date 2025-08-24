import React, { useEffect, useState } from "react";
import axios from "axios"; // Added missing axios import
// import Header from "../components/Header";
// import Navbar from "../components/Navbar";
import { Menu, X } from "lucide-react";

const Dashboard = () => {
    const [users, setUsers] = useState([])
    const [notes, setNotes] = useState([])
    // const [search, setSearch] = useState([])
    const [loading, setLoading] = useState(true) // Added loading state
    const [error, setError] = useState(null) // Added error state
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false) // Mobile nav state

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)

                // Debug: Log the API call
                console.log("Fetching users from:", 'http://localhost:5000/api/admin/users');

                const userRes = await axios.get('http://localhost:5000/api/admin/users', {
                    withCredentials: true
                });

                // Debug: Log the full response
                console.log("Full user response:", userRes);
                console.log("User response data:", userRes.data);
                console.log("Users array:", userRes.data.users);

                const notesRes = await axios.get('http://localhost:5000/get-notes', {
                    withCredentials: true
                })

                // Debug: Log notes response
                console.log("Notes response:", notesRes.data);

                // Try different possible response structures
                const usersData = userRes.data.users || userRes.data || [];
                const notesData = notesRes.data.notes || notesRes.data || [];

                console.log("Setting users:", usersData);
                console.log("Setting notes:", notesData);

                setUsers(usersData)
                setNotes(notesData)
                setError(null)
            } catch (error) {
                console.log("Error fetching admin data", error)
                console.log("Error response:", error.response?.data)
                console.log("Error status:", error.response?.status)
                setError(`Failed to fetch data: ${error.message}`)
            } finally {
                setLoading(false)
            }
        }

        fetchData() // Actually call the function
    }, [])

    //Delete a user
    const deleteUser = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
                withCredentials: true,
            });
            setUsers(users.filter((u) => u._id !== id));
        } catch (err) {
            console.error("Error deleting user:", err);
        }
    };

    if (loading) {
        return (
            <div className="h-screen flex flex-col">
                {/* <Header /> */}
                <div className="flex flex-1">
                    {/* Desktop Navbar */}
                    <div className="hidden lg:block">
                        {/* <Navbar /> */}
                    </div>
                    <main className="flex-1 p-4 lg:p-6 bg-gray-50 flex items-center justify-center">
                        <div className="text-xl text-gray-600">Loading...</div>
                    </main>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="h-screen flex flex-col">


                <main className="flex-1 p-4 lg:p-6 bg-gray-50 flex items-center justify-center">
                    <div className="text-xl text-red-600">{error}</div>
                </main>
            </div>
        );
    }

    return (
        <div className="h-screen flex flex-col">
          

            {/* Mobile Menu Button */}
            <div className="lg:hidden bg-white border-b border-gray-200 p-4">
                <button
                    onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                    className="flex items-center gap-2 text-gray-700"
                >
                    {isMobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                    <span>Menu</span>
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            {isMobileNavOpen && (
                <div className="lg:hidden fixed inset-0 z-50 bg-black bg-opacity-50">
                    <div className="bg-white w-72 h-full shadow-lg">
                        <div className="p-4 border-b border-gray-200">
                            <button
                                onClick={() => setIsMobileNavOpen(false)}
                                className="flex items-center gap-2 text-gray-700"
                            >
                                <X className="w-5 h-5" />
                                <span>Close</span>
                            </button>
                        </div>
                        <Navbar />
                    </div>
                </div>
            )}

            <div className="flex flex-1 overflow-hidden">
                {/* Desktop Navbar */}
                <div className="hidden lg:block">
                    {/* <Navbar /> */}
                </div>

                <main className="flex-1 p-4 lg:p-6 bg-gray-50 overflow-y-hidden h-full ">
                    <h1 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6">
                        Admin Dashboard
                    </h1>

                    {/* Stats Cards - Responsive Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                        <div className="bg-white p-4 lg:p-6 rounded-xl shadow-md">
                            <h2 className="text-sm lg:text-lg font-semibold text-gray-700">Total Users</h2>
                            <p className="text-2xl lg:text-3xl font-bold text-blue-600">{users.length}</p>
                        </div>

                        <div className="bg-white p-4 lg:p-6 rounded-xl shadow-md">
                            <h2 className="text-sm lg:text-lg font-semibold text-gray-700">Total Notes</h2>
                            <p className="text-2xl lg:text-3xl font-bold text-green-600">{notes.length}</p>
                        </div>

                        <div className="bg-white p-4 lg:p-6 rounded-xl shadow-md sm:col-span-2 lg:col-span-1">
                            <h2 className="text-sm lg:text-lg font-semibold text-gray-700">Active Sessions</h2>
                            <p className="text-2xl lg:text-3xl font-bold text-purple-600">25</p>
                        </div>
                    </div>

                    {/* Users Table - Mobile Responsive */}
                    <div className="bg-white rounded-xl shadow-md overflow-hidden">
                        {/* Mobile Card View */}
                        <div className="block lg:hidden">
                            <div className="p-4 bg-gray-100 border-b">
                                <h3 className="font-semibold text-gray-800">Users ({users.length})</h3>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                                {users.length > 0 ? (
                                    users.map((user) => (
                                        <div key={user._id} className="p-4 border-b border-gray-100 last:border-b-0">
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className="font-semibold text-gray-800">
                                                            {user.name || user.username || 'N/A'}
                                                        </p>
                                                        <p className="text-sm text-gray-600">{user.email}</p>
                                                        <p className="text-xs text-gray-500 mt-1">
                                                            Role: {user.role || 'User'}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="flex gap-2 pt-2">
                                                    <button className="px-3 py-1 bg-blue-500 text-white text-xs rounded-lg hover:bg-blue-600 flex-1">
                                                        Edit
                                                    </button>
                                                    <button
                                                        className="px-3 py-1 bg-red-500 text-white text-xs rounded-lg hover:bg-red-600 flex-1"
                                                        onClick={() => deleteUser(user._id)}
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="p-8 text-center text-gray-500">
                                        No users found
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Desktop Table View */}
                        <div className="hidden lg:block">
                            <div className="overflow-x-auto max-h-96 overflow-y-auto">
                                <table className="min-w-full text-left text-gray-700">
                                    <thead className="bg-gray-100 sticky top-0">
                                        <tr>
                                            <th className="px-6 py-3 font-semibold">User</th>
                                            <th className="px-6 py-3 font-semibold">Email</th>
                                            <th className="px-6 py-3 font-semibold">Role</th>
                                            <th className="px-6 py-3 font-semibold">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.length > 0 ? (
                                            users.map((user) => (
                                                <tr key={user._id} className="border-t hover:bg-gray-50">
                                                    <td className="px-6 py-3">{user.name || user.username || 'N/A'}</td>
                                                    <td className="px-6 py-3">{user.email}</td>
                                                    <td className="px-6 py-3">{user.role || 'User'}</td>
                                                    <td className="px-6 py-3">
                                                        <button className="px-3 py-1 bg-blue-500 text-white text-sm rounded-lg hover:bg-blue-600">
                                                            Edit
                                                        </button>
                                                        <button
                                                            className="ml-2 px-3 py-1 bg-red-500 text-white text-sm rounded-lg hover:bg-red-600"
                                                            onClick={() => deleteUser(user._id)}
                                                        >
                                                            Delete
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-3 text-center text-gray-500">
                                                    No users found
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;