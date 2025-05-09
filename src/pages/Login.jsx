import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { auth } from "../firebase";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // ✅ Redirect to /add-student if admin is already logged in
    useEffect(() => {
        if (auth.currentUser?.email === "admin@example.com") {
            navigate("/add-student");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // ✅ Check if user is admin
            if (user.email === "admin@example.com" && password === "admin123") {
                toast.success("Admin login successful! 🎉");
                navigate("/add-student"); // Redirect for admin only
            } else {
                toast.error("Access denied. Only admin can add students!");
            }
        } catch (error) {
            toast.error("Login failed. Check your credentials!");
            console.error("Login Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <form id="login-page" className="mx-auto mt-36 px-10 py-5 rounded-lg max-w-md shadow-2xl bg-white" onSubmit={handleSubmit}>
                <h1 className="text-3xl md:text-4xl text-blue-600 text-center font-bold">Admin Login</h1>
                <br />
                <div className="mb-5">
                    <h3 className="text-lg md:text-xl text-blue-500 font-semibold">Email</h3>
                    <input
                        className="px-3 py-2 md:py-3 rounded-lg mt-2 w-full border focus:ring-2 focus:ring-blue-600"
                        type="email"
                        placeholder="Enter your email..."
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-5">
                    <h3 className="text-lg md:text-xl text-blue-500 font-semibold">Password</h3>
                    <input
                        className="px-3 py-2 md:py-3 rounded-lg mt-2 w-full border focus:ring-2 focus:ring-blue-600"
                        type="password"
                        placeholder="Enter password..."
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className={`bg-blue-600 text-white py-2 md:py-3 px-4 md:px-6 mt-5 w-full rounded-lg transition duration-300 ${
                        loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-500"
                    }`}
                    disabled={loading}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>
            </form>
        </>
    );
};

export default Login;