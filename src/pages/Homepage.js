import { Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"

function Homepage() {

    return (
        <>
            <img className="cloudsPhoto" src="clouds.png" />
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
                        to={'/index'}
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