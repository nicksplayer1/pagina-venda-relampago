import { Suspense } from "react";
import AdminLoginForm from "./AdminLoginForm";

type PageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function AdminLoginPage({ searchParams }: PageProps) {
  const params = await searchParams;

  const errorMessage =
    params.error === "config"
      ? "Faltam variáveis ADMIN_PASSWORD ou ADMIN_TOKEN."
      : "";

  return (
    <Suspense fallback={null}>
      <AdminLoginForm errorMessage={errorMessage} />
    </Suspense>
  );
}
