import { useEffect, useState } from "react";
import "../App.css";
import { Button, Container, Form, Modal, Nav, Navbar } from "react-bootstrap";
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8000";

const RestApi = () => {
  const [todo, setTodo] = useState([]);
  const [editShow, setEditShow] = useState(false);
  const [addShow, setAddShow] = useState(false);
  const [deleteShow, setDeleteShow] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  //get data by server from mongo
  const getData = async () => {
    const data = await axios.get("/");
    setTodo(data.data.data.reverse());
  };
  useEffect(() => {
    getData();
  }, [addShow, editShow, deleteShow]);

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
    // console.log(addData); https://youtube.com/shorts/LqPaOct_gFU?si=mpmr8J990EKCo_Rc
    const data = await axios.post("/create", addData);
    // console.log(data);
    alert(
      `${data.data.success} 
        Title : ${data.data.create.title} 
        Description : ${data.data.create.description}
        `
    ),
      setAddShow(false),
      setAddData({ title: "", description: "" });
  };

  //edit existing todo section
  const [editData, setEditData] = useState({
    id: "",
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
    const data = await axios.put("/update", editData);
    alert(data.data.success);
    setEditData({ title: "", description: "", id: "" });
    setEditShow(false);
  };

  //delete existing todo section
  const deleteTodo = async (id: any) => {
    const data = await axios.delete(`/delete/${id}`);
    alert(data.data.success);
    setDeleteId("");
    setDeleteShow(false);
  };
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
      {todo?.map((todo: any, i) => (
        <div className="todos" key={i}>
          <div className="data">
            <h4>{todo?.title}</h4>
            <h5>{todo?.description}</h5>
          </div>
          <div>
            <HiPencilAlt
              size="25"
              color="green"
              className="icon"
              onClick={() => {
                setEditShow(true),
                  setEditData({
                    id: todo._id,
                    title: todo.title,
                    description: todo.description,
                  });
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
          <Button
            variant="outline-primary"
            onClick={() => deleteTodo(deleteId)}
          >
            Delete Todo
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default RestApi;
