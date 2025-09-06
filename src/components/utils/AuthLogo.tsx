import logo from "@/assets/logo.svg";

export default function AuthLogo() {
  return (
    <div className="w-full max-w-full space-y-4 hidden lg:block">
      <div className="space-y-2 flex flex-col items-center justify-center">
        <img src={logo} alt="CrowdCloud Logo" className="h-auto w-52"/>
        <h1 className="font-allerta text-5xl">CrowdCloud</h1>
      </div>
    </div>
  )
}
