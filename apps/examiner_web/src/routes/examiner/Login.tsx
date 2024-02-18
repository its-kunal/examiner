import { Suspense, lazy } from "react";
import SkeletonLoaderForm from "../../components/forms/SkeletonLoaderForm";
const LoginExaminerForm = lazy(
  () => import("../../components/forms/LoginExaminerForm")
);

export default function LoginStudent() {
  return (
    <>
      <div className="h-10"></div>
      <div className="flex justify-center">
        <Suspense fallback={<SkeletonLoaderForm />}>
          <LoginExaminerForm />
        </Suspense>
      </div>
    </>
  );
}
