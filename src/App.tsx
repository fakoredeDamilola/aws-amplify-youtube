import { useEffect  } from "react";
// import type { Schema } from "../amplify/data/resource";
// import { generateClient } from "aws-amplify/data";
import { RouterProvider as Router } from "react-router-dom";
import { router } from "./routes/router";

// const client = generateClient<Schema>();

function App() {

  useEffect(() => {
    // client.models.Todo.observeQuery().subscribe({
    //   next: (data) => setTodos([...data.items]),
    // });
  }, []);

  // function createTodo() {
  //   client.models.Todo.create({ content: window.prompt("Todo content") });
  // }

  return (
    <main>
      <Router router={router} />
    </main>
  );
}

export default App;
