import axios from "axios";
import { useContext } from "react";
import { Container, Row } from "react-bootstrap"
import { FileContext } from "../context/FileContext";

function Upload() {
    const [file, setFile] = useState(null);
    const [uploadProgress, setUploadProgress] = useState(0);

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const { uploadFile } = useContext(FileContext)

    function uploadFileToUrl() {
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

        if (file) {
            // Create a FormData object and append the file to it
            const formData = new FormData();
            formData.append('file', file);

            uploadFile(FormData)
        }
    }

    return (
        <>
            <Container>
                <Row>
                    <input
                        type="file"
                        id="fileInput"
                        onChange={(e) => {
                            const selectedFile = e.target.files && e.target.files[0];
                            if (selectedFile) {
                                uploadFileToUrl(selectedFile);
                            }
                        }}
                    />
                </Row>
            </Container>
        </>
    )
}
export default Upload