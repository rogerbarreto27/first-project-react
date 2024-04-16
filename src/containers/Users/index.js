import React, { useState, useEffect } from "react"
import { useHistory } from "react-router-dom"

import axios from "axios"
import Avatar from "../../assets/avatar.svg"
import Arrow from "../../assets/arrow.svg"
import Trash from "../../assets/trash.svg"

import H1 from "../../components/Title"
import ContainerItens from "../../components/ContanerItens"
import Button from "../../components/Button"

import {
  Container,
  Image,
  User,
} from "./styles";

function Users() {
  const [users, setUsers] = useState([]);
  const history = useHistory()

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

  function goBackPage() {
    history.push("/");
  }

  
  return (
    <Container>
      <Image alt="logo-image" src={Avatar} />
      <ContainerItens isBlur={true}>

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

        <Button isBack={true} onClick={goBackPage}>
        <img alt="seta" src={Arrow} />  Voltar
        </Button>

      </ContainerItens>
    </Container>
  );
}

export default Users;