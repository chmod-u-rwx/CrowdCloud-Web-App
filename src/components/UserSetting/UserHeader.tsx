export default function UserHeader() {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm justify-between gap-4">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold font-rubik items-center flex gap-3">
          User Settings
        </h1>
        <p className="text-secondary-foreground">
          Manage your account settings and preferences
        </p>
      </div>
    </div>
  );
};