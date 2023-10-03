import { Button, Container, Form, Modal, Nav, Navbar } from "react-bootstrap";
import { useQuery, gql } from "@apollo/client";
import "../App.css";
import { HiPencilAlt, HiOutlineTrash } from "react-icons/hi";

const GET_MONGO_ALL_TODO = gql`
  query {
    getMongoAllTodo {
      _id
      title
      description
      createdAt
      updatedAt
    }
    deleteTodo(id: $deleteTodoId) {
      message
    }
  }
`;

const GraphqlClient = () => {
  const { loading, error, data } = useQuery(GET_MONGO_ALL_TODO);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  // console.log(22,data.getMongoAllTodo);
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
            // onClick={() => setAddShow(true)}
          >
            Add todo
          </Button>
        </Container>
      </Navbar>

      {/* fetch data from mongo */}
      {data.getMongoAllTodo.map((todo: any, i: number) => (
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
              // onClick={() => {
              //   setEditShow(true),
              //     setEditData({
              //       id: todo._id,
              //       title: todo.title,
              //       description: todo.description,
              //     });
              // }}
            />
            <HiOutlineTrash
              size={25}
              color="red"
              className="icon"
              // onClick={() => {
              //   setDeleteShow(true), setDeleteId(todo._id);
              // }}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default GraphqlClient;
