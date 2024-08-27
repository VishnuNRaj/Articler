"use client"

import { FaEye, FaEyeSlash } from "react-icons/fa"
import useRegister from "./Hooks";
import useRedirect from "@/hooks/useRedirect";
import useLoading from "@/hooks/useLoading";
import Preloader from "@/styles/Preloader";
export default function RegisterComponent() {
    const { formik, setShowConfirmPassword, setShowPassword, showConfirmPassword, showPassword } = useRegister()
    const redirect = useRedirect()
    const { loading } = useLoading()
    return (
        <div className="flex min-h-screen items-center justify-center p-10 bg-auto text-gray-900">
            <div className="w-full animate-popover-show max-w-md border-separate border-background border-2 text-gray-900 rounded-lg shadow-lg p-8">
                <h2 className="text-2xl font-bold text-center mb-2">
                    Register
                </h2>
                <p className="text-center text-gray-600 mb-6">
                    Create your account
                </p>
                <form onSubmit={formik.handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                            className={`w-full px-3 py-2 border rounded-md ${formik.touched.name && formik.errors.name ? 'border-red-500' : 'border-gray-300'} bg-gray-50`}
                        />
                        {formik.touched.name && formik.errors.name ? (
                            <div className="text-error mt-1 text-sm">
                                {formik.errors.name}
                            </div>
                        ) : null}
                    </div>
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
                            className={`w-full px-3 py-2 border rounded-md ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} bg-gray-50`}
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
                            className={`w-full px-3 py-2 border rounded-md ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} bg-gray-50`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className={`absolute inset-y-0 right-3 flex items-center top-[35%]`}
                        >
                            {showPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                        </button>

                    </div>


                    <div className="mb-4 relative">
                        <label htmlFor="confirmPassword" className="block text-gray-700 mb-1">

                            <label htmlFor="password" className="block text-gray-700 mb-1">
                                {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                                    <div className="text-error mt-1 text-sm">
                                        {formik.errors.confirmPassword}
                                    </div>
                                ) : <>Confirm Password</>}
                            </label>
                        </label>
                        <input
                            id="confirmPassword"
                            name="confirmPassword"
                            type={showConfirmPassword ? 'text' : 'password'}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.confirmPassword}
                            className={`w-full px-3 py-2 border rounded-md ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : 'border-gray-300'} bg-gray-50`}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute inset-y-0 right-3 flex items-center top-[35%]"
                        >
                            {showConfirmPassword ? <FaEyeSlash className="text-gray-500" /> : <FaEye className="text-gray-500" />}
                        </button>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                        <button type="button" className="text-blue-500 hover:underline">
                            Forgot password?
                        </button>
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        {loading ? <Preloader /> : "Register"}
                    </button>
                </form>
                <div className="text-center mt-4">
                    <p className="text-gray-600">
                        Already have an account?{" "}
                        <button type="button" onClick={() => redirect({ path: "/login" })} className="text-blue-500 font-medium hover:underline">
                            Sign in
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
}
