import { createAvatar } from "@dicebear/core";
import { thumbs } from "@dicebear/collection";

export default function StudentProfile({
  name,
  rollno,
  password,
  email,
  standard,
}: {
  name: string;
  rollno: string;
  password: string;
  email?: string;

  standard?: number;
}) {
  const avatar = createAvatar(thumbs, {
    seed: name,
  });
  return <div className=""></div>;
}
