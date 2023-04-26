import {decode} from "jsonwebtoken"

export const getKid = (token: string) => {
  const decoded = decode(token, { complete: true })
  if(!decoded) return
  const {kid} = decoded.header
  return kid
}
