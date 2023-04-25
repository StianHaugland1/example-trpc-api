import jwt from "jsonwebtoken"

export const getKid = (token: string) => {
  const decoded = jwt.decode(token, { complete: true })
  if(!decoded) return
  const {kid} = decoded.header
  return kid
}

// if()
// function getKey(header, callback){
//   client.getSigningKey(header.kid, function(err, key) {
//     var signingKey = key.publicKey || key.rsaPublicKey;
//     callback(null, signingKey);
//   });
// }

// jwt.verify(token, getKey, options, function(err, decoded) {
//   console.log(decoded.foo) // bar
// });