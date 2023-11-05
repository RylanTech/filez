import { useContext, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap"
import { FileContext } from "../context/FileContext";

function Upload() {
    const [file, setFile] = useState(null);
    const [btnC, setBtnC] = useState(false)
    const [message, setMessage] = useState(null)
    const [fileName, setFileName] = useState(null)

    const [name, setName] = useState(null)
    const [description, setDescription] = useState(null)

    const { uploadFile, uploadProgress } = useContext(FileContext)

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    async function uploadFileToUrl() {
        if (file) {
            setMessage(null)
            const newFile = new File([file], file.name, {
                type: file.type,
            });

            const formData = new FormData();
            formData.append("file", newFile);

            formData.append("filename", name)
            formData.append("filedes", description)

            const uploadedFile = await uploadFile(formData); // Pass the formData variable

            if (uploadedFile) {
                setFileName(`http://localhost:3001/${uploadedFile.path}`)
            }
        } else {
            setMessage("No file uploaded")
            setBtnC(false)
        }
    }

    function handleSubmit() {
        setBtnC(true)
        uploadFileToUrl()
    }

    return (
        <>
            <Container>
                <Row>
                    <div className="box">
                        <Row>

                            {btnC ? (
                                <>
                                    <div className="col-12 col-md-6">
                                        <center>
                                            Upload progress<br />
                                            <div style={{ width: `${uploadProgress}%` }} className="progressBar" />
                                            <div className="loadingBar" /><br />
                                            {uploadProgress}%
                                        </center>
                                    </div>
                                </>
                            ) : (
                                <>
                                    <Form.Group>
                                        <Form.Label>File Name</Form.Label>
                                        <Form.Control
                                            className="col-12"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                        />
                                    </Form.Group>
                                    <Form.Group>
                                        <Form.Label>description</Form.Label>

                                        <Form.Control
                                            placeholder="optional"
                                            className="col-12"
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                        />
                                    </Form.Group>
                                    <br /><br /><br /><br />
                                    <div className="col-12 col-md-4">
                                        <Form.Control
                                            type="file"
                                            id="fileInput"
                                            onChange={(e) => handleFileChange(e)}
                                        />
                                    </div>
                                    <center>
                                        <Button className="submitBtn" onClick={handleSubmit}>
                                            Upload
                                        </Button>
                                    </center>
                                </>
                            )}
                            {message ? (
                                <>
                                    <div className="emeMsg">
                                        {message}
                                    </div>
                                </>
                            ) : (
                                <>
                                </>
                            )}
                        </Row>
                    </div>
                </Row >
                {
                    fileName ? (
                        <>
                            <Row>
                                <div className="box">
                                    <Row>
                                        <Form.Control
                                            className="col-12"
                                            value={fileName}
                                        />
                                    </Row>
                                </div>
                            </Row>
                        </>
                    ) : (
                        <>
                        </>
                    )
                }
            </Container >
        </>
    )
}
export default Upload