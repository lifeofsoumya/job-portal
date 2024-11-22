import AuthForm from "@/components/AuthForm"
import { Icons } from "@/components/icons"

const page = () => {
  return (
    <div className="w-full h-screen flex justify-center items-center">
        <AuthForm origin="signIn" />
    </div>
  )
}

export default page