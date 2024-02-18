import { Suspense, lazy } from "react";
import SkeletonLoaderForm from "../../components/forms/SkeletonLoaderForm";
const RegisterStudentForm = lazy(
  () => import("../../components/forms/RegisterStudentForm"),
);

export default function RegisterFormStudent() {
  return (
    <>
      <div className="h-10"></div>
      <div className="flex justify-center">
        <Suspense fallback={<SkeletonLoaderForm />}>
          <RegisterStudentForm />
        </Suspense>
      </div>
    </>
  );
}
