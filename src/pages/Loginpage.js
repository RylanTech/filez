import { useContext, useState } from "react"
import { Button, Container, Form, Row } from "react-bootstrap"
import { FileContext } from "../context/FileContext"
import { useNavigate } from "react-router-dom"

function Loginpage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const {loginUser} = useContext(FileContext)
    const navigate = useNavigate()

    function login() {
        const user = {
            email,
            password
        }
        
        async function loggingIn() {
            const res = await loginUser(user)
            if (res) {
                navigate('/')
            }
        }
        loggingIn()
    }

    return (
        <>
            <img className="cloudsPhoto" src="Clouds.png" />
            <Container>
                <Row>
                    <center>
                        <Form.Group className="col-12 col-md-5">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>
                        <br/>
                        <Form.Group className="col-12 col-md-5">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>
                        <br/>
                        <Button
                        onClick={login}
                        >Login</Button>
                    </center>
                </Row>
            </Container>
        </>
    )
}
export default Loginpage