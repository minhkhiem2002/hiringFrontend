'use client'
import Image from 'next/image'
import Logo from '../../../public/images/Logo.png'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm , useWatch } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
  import {
    Dialog,
    DialogContent,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { LoginBody, LoginBodyType } from "@/schemaValidations/auth.schema"
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {useAuthStore} from '@/services/store/authStore'
import {useUserStore, useStateLoginStore} from '@/services/store/userStore'
import { z } from "zod"
import { useRouter } from 'next/navigation'

const formUserInfoSchema = z.object({
  Fname: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  Lname: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string(),
  phone: z.string(),
  avatar: z.string(),
  role: z.string(),
})

const Login = () => {
  const router = useRouter()
    const pathname = usePathname()
    const form = useForm<LoginBodyType>({
        resolver: zodResolver(LoginBody),
        defaultValues: {
          email:'',
          password:'',
        },
      })
      const formInfo = useForm<z.infer<typeof formUserInfoSchema>>({
        resolver: zodResolver(formUserInfoSchema),
        defaultValues: {
          Fname: "",
          Lname: "",
          email: "",
          phone: "",
          avatar: "",
          role: ""
        },
      })

    const getInfo = useUserStore(state => state.getInfo)

    const login = useAuthStore(state => state.login);
    async function onSubmit(values: LoginBodyType) {
      console.log('Values', values)
        try {
          console.log('Here 1')
          await login(values.email, values.password)
          
          const userInfo = await getInfo();
          console.log('User info', userInfo)
        if (userInfo) {
          // if (userInfo.role === 'user') {
          //   router.push('/', { scroll: false })
          // }
          const {isLogin, setState} = useStateLoginStore();
          setState({isLogin: true})
        }
        }
        catch (err) {
          console.error(err)
      }
      }

  return (
    <Dialog>
          <DialogTrigger className="border border-[#28A745] text-[#28A745] px-2 py-0 w-[80px] text-sm md:text-md md:px-4 md:py-2 rounded-md">
                Sign in
          </DialogTrigger>
      <DialogContent>
      <Card className="mx-auto max-w-sm border-none shadow-none">
      <CardHeader>
        <CardTitle className="text-2xl flex flex-col justify-center items-center gap-2">
            <Image
                src = {Logo}
                width={100}
                height={50}
                alt = 'Logo'
                className = 'w-24 h-6 sm:w-35 sm:h-8 '
            />
        </CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent className = "border-none">
      <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                            <Input placeholder="Email" type = 'email' {...field} />
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
                        <FormLabel className = "grid gap-2">
                        <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                          <Link  className={`link ${pathname === '/register' ? 'active' : ''} ml-auto inline-block text-sm underline`} href = "/register">
                               Quên mật khẩu?
                          </Link>
                          </div>
                        </FormLabel>
                        <FormControl>
                            <Input placeholder="Password" type = 'current-password' {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
          <Button variant="outline" className="w-full">
            Login with Google
          </Button>
        </div>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link href="#" className="underline">
            Sign up
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
export default Login
