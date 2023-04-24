const jwtSecret = process.env.JWT_SECRET;

export const PORT = process.env.PORT || 4000;

export const getJwtSecret = () => {
  if(jwtSecret === undefined) {
    console.error("missing jwt secret")
    process.exit(0)
  }
  return jwtSecret
}