import { Suspense, lazy } from "react";
import SkeletonLoaderForm from "../../components/forms/SkeletonLoaderForm";
const RegisterExaminerForm = lazy(
  () => import("../../components/forms/RegisterExaminerForm"),
);

export default function RegisterFormStudent() {
  return (
    <>
      <div className="h-10"></div>
      <div className="flex justify-center">
        <Suspense fallback={<SkeletonLoaderForm />}>
          <RegisterExaminerForm />
        </Suspense>
      </div>
    </>
  );
}
