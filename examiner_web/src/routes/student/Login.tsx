import { Suspense, lazy } from "react";
import SkeletonLoaderForm from "../../components/forms/SkeletonLoaderForm";
const LoginStudentForm = lazy(
  () => import("../../components/forms/LoginStudentForm")
);

export default function LoginStudent() {
  return (
    <>
      <div className="h-10"></div>
      <div className="flex justify-center">
        <Suspense fallback={<SkeletonLoaderForm />}>
          <LoginStudentForm />
        </Suspense>
      </div>
    </>
  );
}
