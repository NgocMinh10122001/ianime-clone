import MenuManage from "@/components/admin/MenuManage";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MenuManage />

      {children}
    </div>
  );
}
