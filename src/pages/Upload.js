import { useContext, useState } from "react";
import { Button, Container, Form, Row } from "react-bootstrap"
import { FileContext } from "../context/FileContext";

function Upload() {
    const [file, setFile] = useState(null);

    const { uploadFile, uploadProgress } = useContext(FileContext)

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    async function uploadFileToUrl() {
        const newFile = new File([file], file.name, {
            type: file.type,
        });
    
        const formData = new FormData();
        formData.append("file", newFile);
    
        await uploadFile(formData); // Pass the formData variable
    }

    return (
        <>
            <Container>
                <Row>
                    <center>
                        <br />
                        <br />
                        <input
                            type="file"
                            id="fileInput"
                            onChange={(e) => handleFileChange(e)}
                        />
                        {uploadProgress}
                        <Button onClick={uploadFileToUrl}>
                            Upload
                        </Button>
                    </center>

                </Row>
            </Container>
        </>
    )
}
export default Upload