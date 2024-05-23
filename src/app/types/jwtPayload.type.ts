import { UserRole } from "@prisma/client";

type TJWTPayload = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export default TJWTPayload;
