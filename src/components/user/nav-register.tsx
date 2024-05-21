'use client'
import Image from 'next/image'
import Logo from '../../../public/images/Logo.png'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Link from "next/link"
import { usePathname } from 'next/navigation'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"

import { RegisterBody, RegisterBodyType } from "@/schemaValidations/auth.schema"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {useSignUpStore} from '@/services/store/authStore'

const Register = () => {
  const pathname = usePathname()
  const form = useForm<RegisterBodyType>({
      resolver: zodResolver(RegisterBody),
        defaultValues: {
          Fname:'',
          Lname:'',
          email:'',
          phone:'',
          password:'',
          confirmPassword:'',
      },
  })
  const register= useSignUpStore(state => state.register)

  async function onSubmit(values: RegisterBodyType) {
    try {
      await register(values.Fname, values.Lname, values.email, values.phone, values.password, values.confirmPassword)
    }
    catch (err) {
      console.error(err)
  }
  }

  return (
    <Dialog>
      <DialogTrigger className="border border-[#28A745] text-[#28A745] px-2 py-0 w-[90px] text-sm md:text-md md:px-4 md:py-2 rounded-md">
        Sign up
      </DialogTrigger>
      <DialogContent>
      <Card className="mx-auto max-w-sm border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-xl flex flex-col justify-center items-center gap-2">
          <Image
                src = {Logo}
                width={100}
                height={50}
                alt = 'Logo'
                className = 'w-24 h-6 sm:w-35 sm:h-8 '
          />
        </CardTitle>
        <CardDescription className = 'flex items-center justify-center'>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>
      <CardContent className = "border-none">
      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
                <FormField
                  control={form.control}
                  name="Fname"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                          <Input placeholder="First Name" {...field} />
                      </FormControl>
                      <FormMessage/>
                      </FormItem>
                  )}
                />
            </div>
            <div className="grid gap-2">
                <FormField
                      control={form.control}
                      name="Lname"
                      render={({ field }) => (
                          <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl>
                              <Input placeholder="Last Name" {...field} />
                          </FormControl>
                          <FormMessage/>
                          </FormItem>
                      )}
                    />
            </div>
          </div>
          <div className="grid gap-2">
            <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                        <Input placeholder="Email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                        <Input placeholder="09xxxxxxx" type="phone" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                        <Input placeholder="Password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
          </div>
          <div className="grid gap-2">
            <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                    <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                        <Input placeholder="Confirm Password" type="confirmPassword" {...field} />
                    </FormControl>
                    <FormMessage />
                    </FormItem>
                )}
            />
          </div>
          <Button type="submit" className="w-full">
            Create an account
          </Button>
          <Button variant="outline" className="w-full">
            Sign up with GitHub
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <Link href="#" className="underline">
            Sign in
          </Link>
        </div>
      </form>
      </Form>
      </CardContent>
    </Card>
      </DialogContent>
    </Dialog>
  )
}
export default Register
