import { useEffect } from "react";
import { RouterProvider as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </main>
  );
}

export default App;
