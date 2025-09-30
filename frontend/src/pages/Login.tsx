// @ts-nocheck

import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Routes, Route, Link } from "react-router-dom"
import api from "@/lib/axios";
import { useState } from "react"
export function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();
    try {
      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("tokens", res.data.access_token);

      alert("login successful");

      window.location.href = "/";

    } catch (err) {
      setError("invalid credentials")
    }




  }




  return (
    <div className="flex items-center justify-center h-screen w-screen bg-blue-600">

      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          <CardAction>
            <Button variant="link"><Link to="/signup">Sign Up</Link></Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input id="password"
                  type="password"
                  onChange={(e) => setPassword(e.target.value)}
                  required />
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </div>

            <Button type="submit" className="w-full mt-5">
              Login
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">

          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </CardFooter>
      </Card>
    </div>


  )



}

export default Login;