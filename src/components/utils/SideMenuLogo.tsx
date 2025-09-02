import logo from "@/assets/logo.svg";

export default function SideMenuLogo() {
  return (
    <div className="flex items-center space-x-3">
      <img src={logo} alt="" className="w-10 h-auto"/>
      <div className="ml-2">
        <h1 className="text-xl font-allerta">CrowdCloud</h1>
      </div>
    </div>
  );
}
