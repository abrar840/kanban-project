
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
import {Routes, Route, Link} from "react-router-dom"

export function SignUp() {
  return (
 <div className="flex items-center justify-center h-screen w-screen bg-blue-600">

  <Card className="w-full max-w-lg">
      <CardHeader>
        <CardTitle>SignUp</CardTitle>
        <CardDescription>
          Enter your email below to register
        </CardDescription>
        <CardAction>
           <Button variant="link"><Link to="/login">Login</Link></Button>
        </CardAction>
      </CardHeader>
       <CardContent>
        <form>
          <div className="flex flex-col gap-6">
             <div className="grid gap-2">
              <Label htmlFor="email">Name</Label>
              <Input
                id="name"
                type="text"
                placeholder=""
                required
              />
              </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                
              </div>
              <Input id="password" type="password" required />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full">
           SignUp
        </Button>
       
      </CardFooter>
    </Card>
     </div>


  )



}

export default SignUp;