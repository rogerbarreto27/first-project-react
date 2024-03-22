import React, { useState, useEffect } from "react"

import axios from "axios"
import Avatar from "../../assets/avatar.svg"
import Arrow from "../../assets/arrow.svg"
import Trash from "../../assets/trash.svg"

import {
  Container,
  Image,
  ContainerItens,
  H1,
  Button,
  User,
} from "./styles";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const { data: newUsers } = await axios.get("http://localhost:3001/users");
      setUsers(newUsers);
    }
    fetchUsers()
  }, []);

  async function deleteUser(userId) {
    await axios.delete(`http://localhost:3001/users/${userId}`)
    const newUsers = users.filter(user => user.id !== userId)
    setUsers(newUsers)
  }


  return (
    <Container>
      <Image alt="logo-image" src={Avatar} />
      <ContainerItens>

        <H1>Usuários</H1>

        <ul>
          {users.map((user) => (
            <User key={users.id}>
              <p>{user.name}</p>  <p>{user.age}</p>
              <button onClick={() => deleteUser(user.id)}>
                <img src={Trash} alt="lata-de-lixo" />
              </button>
            </User>
          ))}
        </ul>

        <Button>
        <img alt="seta" src={Arrow} />  Voltar
        </Button>

      </ContainerItens>
    </Container>
  );
}

export default Users;