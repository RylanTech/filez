import { useEffect } from "react"
import { Container, Row } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
function Homepage() {
    const navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem("myFilezUserToken")
        if (!token) {
            navigate('login')
        }
        
    },[])

    return (
        <>
            <img className="cloudsPhoto" src="Clouds.png" />
            <Container>
                <Row>
                    <center>
                        <Link className="fpOptionLink col-12 col-md-5"
                        to={'/upload'}
                        >
                            <div className="fpOption">
                                <center>
                                    <h3 className="optionTitle">
                                    Upload
                                    </h3>
                                </center>
                            </div>
                        </Link>
                        <Link className="fpOptionLink col-12 col-md-5"
                        to={'/indexing'}
                        >
                            <div className="fpOption">
                                <center>
                                    <h3 className="optionTitle">
                                        Index
                                    </h3>
                                </center>
                            </div>
                        </Link>
                    </center>
                </Row>
            </Container>
        </>
    )
}
export default Homepage