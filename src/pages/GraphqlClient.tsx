import { Button, Container, Form, Modal, Nav, Navbar } from "react-bootstrap";
import { useQuery, gql, useMutation } from "@apollo/client";
import "../App.css";
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";
import { useState } from "react";

const GET_MONGO_ALL_TODO = gql`
  query {
    getMongoAllTodo {
      _id
      title
      description
      createdAt
      updatedAt
    }
  }
`;

const DELETE_MONGO_TODO = gql`
  mutation deleteTodo($deleteTodoId: ID!) {
    deleteTodo(id: $deleteTodoId) {
      message
    }
  }
`;

const CREATE_MONGO_TODO = gql`
  mutation addTodo($todoInput: TodoInput) {
    createTodo(todoInput: $todoInput) {
      _id
      title
      description
      createdAt
      updatedAt
    }
  }
`;

const UPDATE_MONGO_TODO = gql`
  mutation updateTodo($updateTodoId: ID!, $todoInput: TodoInput) {
    updateTodo(id: $updateTodoId, todoInput: $todoInput) {
      message
    }
  }
`;

const GraphqlClient = () => {
  const { loading, error, data } = useQuery(GET_MONGO_ALL_TODO);
  const [deleteTodo] = useMutation(DELETE_MONGO_TODO);
  const [addTodo] = useMutation(CREATE_MONGO_TODO);
  const [updateTodo] = useMutation(UPDATE_MONGO_TODO);

  const [addShow, setAddShow] = useState(false);
  const [editShow, setEditShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);

  //add new todo section
  const [addData, setAddData] = useState({
    title: "",
    description: "",
  });
  const handleTitleChange = (e: any) => {
    setAddData((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };
  const handleDesChange = (e: any) => {
    setAddData((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };
  const addSubmit = async (e: any) => {
    e.preventDefault();
    addTodo({
      variables: {
        todoInput: addData,
      },
    });
    alert("Todo Added Successfully...");
    setAddShow(false);
    setAddData({ title: "", description: "" });
    window.location.reload();
  };

  //delete existing todo section
  const [deleteId, setDeleteId] = useState("");
  const deleteTodoFunc = async () => {
    deleteTodo({
      variables: {
        deleteTodoId: deleteId,
      },
    });
    alert("Todo Deleted Successfully...");
    setDeleteShow(false);
    window.location.reload();
  };

  //edit existing todo section
  const [editId, setEditId] = useState("");
  const [editData, setEditData] = useState({
    title: "",
    description: "",
  });
  const handleEditTitleChange = (e: any) => {
    setEditData((prevState) => ({
      ...prevState,
      title: e.target.value,
    }));
  };
  const handleEditDesChange = (e: any) => {
    setEditData((prevState) => ({
      ...prevState,
      description: e.target.value,
    }));
  };
  const editSubmit = async () => {
    updateTodo({
      variables: {
        updateTodoId: editId,
        todoInput: editData,
      },
    });
    alert("Todo Updated Successfully...");
    setEditData({ title: "", description: "" });
    setEditShow(false);
    window.location.reload();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  // console.log(22, addTodoData.createTodo);
  // console.log(23, deletedData?.deleteTodo.message, deleteLoading);
  return (
    <>
      <Navbar expand="lg" className="bg-primary">
        <Container>
          <Navbar.Brand href="/">todos-crud</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/restapi">rest-api</Nav.Link>
              <Nav.Link href="/graphql">graphql</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          <Button
            variant="outline-info"
            className="addTodo"
            onClick={() => setAddShow(true)}
          >
            Add todo
          </Button>
        </Container>
      </Navbar>

      {/* fetch data from mongo */}
      <div className="reverse">
        {data?.getMongoAllTodo.map((todo: any, i: number) => (
          <div className="todos" key={i}>
            <div className="data">
              <h4>{todo.title}</h4>
              <h5>{todo.description}</h5>
            </div>
            <div>
              <HiPencilAlt
                size="25"
                color="green"
                className="icon"
                onClick={() => {
                  setEditShow(true),
                    setEditData({
                      title: todo.title,
                      description: todo.description,
                    }),
                    setEditId(todo._id);
                }}
              />
              <HiOutlineTrash
                size={25}
                color="red"
                className="icon"
                onClick={() => {
                  setDeleteShow(true), setDeleteId(todo._id);
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* modal for add todo*/}
      <Modal show={addShow} onHide={() => setAddShow(false)} className="modal">
        <Modal.Header closeButton>
          <Modal.Title>Add Your Todo</Modal.Title>
        </Modal.Header>
        <Form className="p-3">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Todo Title</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={addData.title}
              onChange={handleTitleChange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Todo Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={addData.description}
              onChange={handleDesChange}
            />
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={() => setAddShow(false)}>
            Close
          </Button>
          <Button variant="outline-primary" onClick={addSubmit}>
            Add todo
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal for delete todo*/}
      <Modal
        show={deleteShow}
        onHide={() => setDeleteShow(false)}
        className="modal"
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Your Todo</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setDeleteShow(false)}
          >
            Close
          </Button>
          <Button variant="outline-primary" onClick={deleteTodoFunc}>
            Delete Todo
          </Button>
        </Modal.Footer>
      </Modal>

      {/* modal for edit todo*/}
      <Modal
        show={editShow}
        onHide={() => setEditShow(false)}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Form className="p-3">
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Todo Title</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={editData.title}
              onChange={handleEditTitleChange}
            />
          </Form.Group>
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Label>Todo Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={4}
              value={editData.description}
              onChange={handleEditDesChange}
            />
          </Form.Group>
        </Form>
        <Modal.Footer>
          <Button
            variant="outline-secondary"
            onClick={() => setEditShow(false)}
          >
            Close
          </Button>
          <Button variant="outline-primary" onClick={editSubmit}>
            Edit Todo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default GraphqlClient;
