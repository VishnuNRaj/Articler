"use client"

import useRedirect from "@/hooks/useRedirect";
import useLogin from "./Hooks";
import { FaEye, FaEyeSlash } from "react-icons/fa"
import Preloader from "@/styles/Preloader";
import useLoading from "@/hooks/useLoading";

export default function LoginComponent() {

    const { formik, setShowPassword, showPassword } = useLogin()
    const redirect = useRedirect()
    const { loading,setLoading } = useLoading()
    return (
        <div className="flex min-h-screen items-center justify-center p-5 bg-auto text-gray-900">
            <div className="w-full animate-popover-show max-w-md border-separate border-popover border-2 text-gray-900 bg-muted rounded-lg shadow-lg p-8 px-6">
                <h2 className="text-2xl font-bold text-center mb-2">
                    Login
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Enter your email and password to access your account.
                </p>
                <form onSubmit={formik.handleSubmit} className="">
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.email}
                            className={`w-full px-3 py-2 border rounded-md ${formik.touched.email && formik.errors.email ? 'border-error' : 'border-gray-300'} bg-gray-50`}
                        />
                        {formik.touched.email && formik.errors.email ? (
                            <div className="text-error mt-1 text-sm">
                                {formik.errors.email}
                            </div>
                        ) : null}
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="password" className="block text-gray-700 mb-1">
                            {formik.touched.password && formik.errors.password ? (
                                <div className="text-error mt-1 text-sm">
                                    {formik.errors.password}
                                </div>
                            ) : <>Password</>}
                        </label>
                        <input
                            id="password"
                            name="password"
                            type={showPassword ? 'text' : 'password'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.password}
                            className={`w-full px-3 py-2 border rounded-md ${formik.touched.password && formik.errors.password ? 'border-error' : 'border-gray-300'} bg-gray-50`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute inset-y-0 right-3 flex items-center top-[40%]`}
                        >
                            {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                        </button>

                    </div>
                    <div className="flex justify-between items-center mb-4">
                        <button type="button" className="text-blue-500 hover:underline">
                            Forgot password?
                        </button>
                    </div>
                    <button
                        type="submit"
                        onClick={()=>{
                            !formik.errors.email && !formik.errors.password || formik.errors.email?.length === 0 && formik.errors.password?.length === 0 && setLoading(true)
                        }}
                        className="w-full px-4 py-2 bg-foreground text-popover font-semibold rounded-lg hover:bg-blue-600"
                    >
                        {loading ? <Preloader /> : "Login"}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Don&apos;t have an account?{" "}
                        <button type="button" onClick={() => redirect({ path: "/register" })} className="text-blue-500 font-medium hover:underline">
                            Sign up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
