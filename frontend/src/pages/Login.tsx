// @ts-nocheck

import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Routes, Route, Link } from "react-router-dom";
import api from "@/lib/axios";
import { useState } from "react";
export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
       localStorage.removeItem("selectedBoardId");
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("tokens", res.data.access_token);

       

      window.location.href = "/";
    } catch (err) {
      setError("invalid credentials");
    }
  };
// ...existing code...
return (
  <div className="flex items-center justify-center h-screen w-full bg-[#f5f5ff]">
    <Card className="w-full max-w-lg shadow-lg border border-[#aabeed] bg-white">
      <CardHeader>
        <CardTitle className="text-[#3a4e7c]">Login to your account</CardTitle>
        <CardDescription className="text-[#6b7fa7]">
          Enter your email below to login to your account
        </CardDescription>
        <CardAction>
          <Button variant="link">
            <Link to="/signup" className="text-[#3a4e7c]">Sign Up</Link>
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin}>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="text-[#3a4e7c]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border border-[#aabeed] focus:border-[#3a4e7c] focus:ring-[#aabeed]"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="text-[#3a4e7c]">Password</Label>
                <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-[#6b7fa7]"
                >
                  Forgot your password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border border-[#aabeed] focus:border-[#3a4e7c] focus:ring-[#aabeed]"
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
          </div>

          <Button
            type="submit"
            className="w-full mt-5 border border-[#aabeed] bg-[#aabeed] text-[#3a4e7c] font-semibold rounded-lg shadow hover:bg-[#8fa9ff] transition"
          >
            Login
          </Button>
        </form>
      </CardContent>
      
    </Card>
  </div>
);
 
}

export default Login;
