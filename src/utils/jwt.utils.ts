import jwt from "jsonwebtoken";

export const getKid = (token: string) => {
  // eslint-disable-next-line import/no-named-as-default-member
  const decoded = jwt.decode(token, { complete: true });
  if (!decoded) return;
  const { kid } = decoded.header;
  return kid;
};
