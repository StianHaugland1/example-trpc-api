import express from "express";
import swaggerUi from "swagger-ui-express"
import openAPISpec  from './OpenapiSpec.json'
import { todosRouter } from "./routes/todos";
import { authRouter } from "./routes/auth";

const app = express();
export const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use('/todos', todosRouter);
app.use('/auth', authRouter);

// Swagger
app.use('/doc', swaggerUi.serve, swaggerUi.setup(openAPISpec))

// Start the Express app
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// const t = true
// app.get("/todos/:id", (req, res) => {
//   console.log(req.query?.hi)
//   console.log("wopwop")
//   if(t) return res.status(200).json(["Tony","Lisa","Michael","Ginger","Food"]);
//   res.status(404)
//  });

//  app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
//  });