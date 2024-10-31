import Link from 'next/link'

const ForgetPasswordForm = () => {
  return (
    <div className="col-span-4 flex justify-center items-center">
      <div className="w-4/6">
        <p className="text-4xl my-5">Forget password</p>
        <p>Enter your detail bellow</p>
        <form className="space-y-9 py-9">
          <div>
            <input
              className="focus:border-b-1 border-black block focus:outline-none w-full py-2"
              type="email"
              placeholder="Email"
            />
          </div>
        </form>
        <div className="flex items-center justify-center gap-10">
          <button className="text-white bg-rose-600 py-3 w-full rounded-md text-sm font-bold">
            Send
          </button>
          <Link
            href="/sign-up"
            className="text-rose-600 bg-white py-3 w-full rounded-md text-sm flex justify-center items-center font-bold"
          >
            Sign up ?
          </Link>
        </div>
      </div>
    </div>
  )
}
export default ForgetPasswordForm
