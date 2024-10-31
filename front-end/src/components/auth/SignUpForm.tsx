import Link from 'next/link'
import { FcGoogle } from 'react-icons/fc'

const SignUpForm = () => {
  return (
    <div className="col-span-4 flex justify-center items-center">
      <div className="w-4/6">
        <p className="text-4xl my-5">Create an account</p>
        <p>Enter your detail bellow</p>
        <form className="space-y-9 py-9">
          <div>
            <input
              className="focus:border-b-1 border-black block focus:outline-none w-full py-2"
              type="email"
              placeholder="Email"
            />
          </div>
          <div>
            <input
              className="focus:border-b-1 border-black block focus:outline-none w-full py-2"
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <input
              className="focus:border-b-1 border-black block focus:outline-none w-full py-2"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
        </form>
        <button className="block text-white bg-rose-600 py-3 w-full rounded-md text-sm font-bold">
          Create Account
        </button>
        <button className="flex justify-center items-center border-1 border-gray-400 py-2 w-full rounded-md gap-2 mt-4 mb-8 text-sm">
          <FcGoogle className="text-2xl" />
          Sign in with Google
        </button>
        <p className="flex items-center justify-center text-center gap-4">
          Already have account?
          <Link
            href="/sign-in"
            className="border-b-1 border-rose-600 text-rose-600"
          >
            Log in
          </Link>
        </p>
      </div>
    </div>
  )
}
export default SignUpForm
