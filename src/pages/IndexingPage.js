import { useContext, useEffect, useState } from "react"
import { Button, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { FileContext } from "../context/FileContext"

function Indexing() {
    const navigate = useNavigate()
    const [files, setFiles] = useState();
    const [fileIsSelected, setFileIsSelected] = useState(false)
    const [fileArray, setFileArray] = useState([])

    const { getFilesByUser, deleteFileArr } = useContext(FileContext)

    useEffect(() => {
        let token = localStorage.getItem("myFilezUserToken")
        if (!token) {
            navigate('login')
        }

        async function getFileData() {
            const filez = await getFilesByUser()
            setFiles(filez)
        }
        getFileData()

    }, [])

    function convertDateToString(timestamp) {
        const date = new Date(timestamp);
        const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Add 1 to month because it's 0-based, and pad with '0' if needed
        const day = date.getDate().toString().padStart(2, '0'); // Pad with '0' if needed

        return `${month}/${day}/${year}`;
    }

    function splitString(inputString, maxLength) {
        if (inputString.length <= maxLength) {
            return inputString;
        } else {
            return inputString.slice(0, maxLength) + '...';
        }
    }

    function handleSelection(num) {
        let arr = fileArray
        if (arr.includes(num)) {
            // Number exists in the array, remove it.
            const index = arr.indexOf(num);
            arr.splice(index, 1);
        } else {
            // Number doesn't exist in the array, push it.
            arr.push(num);
        }
        setFileArray(arr)

        if (arr.length > 0) {
            setFileIsSelected(true)
        } else {
            setFileIsSelected(false)
        }
    }

    async function handleDelete() {
        await deleteFileArr(fileArray).then(
            window.location.reload()
        )
    }

    function copyLinkToClipboard(link) {
        // Create a temporary input element to copy the link
        const tempInput = document.createElement('input');
        tempInput.value = link;
        document.body.appendChild(tempInput);

        // Select the link text and copy it to the clipboard
        tempInput.select();
        document.execCommand('copy');

        // Remove the temporary input element
        document.body.removeChild(tempInput);

        // Optionally, provide feedback to the user
        alert('Link copied to clipboard: ' + link);
    }

    function displayFiles() {
        // console.log(files)
        if (files) {
            return files.map((file) => {
                return (
                    <>
                        <div className="fileItem">
                            <Row>
                                <div className="col-1">
                                    <Form.Check
                                        onClick={() => {
                                            handleSelection(file.fileId)
                                        }}
                                    />
                                </div>
                                <div className="col-2 col-md-2">
                                    {file.name}
                                </div>
                                <div className="col-2 col-md-2">
                                    {convertDateToString(file.uploadDate)}
                                </div>
                                <div className="col-1 col-md-2"/>
                                <a className="col-3 col-md-2" href={`http://localhost:3001/${file.path}`}>
                                <Button  variant="success">
                                    Download
                                </Button>
                                </a>
                                <div className="col-3 col-md-2">
                                <Button
                                    onClick={() => {
                                        copyLinkToClipboard(`http://localhost:3001/${file.path}`)
                                    }}
                                >
                                    Copy Link
                                </Button>
                                </div>
                                <div className="col-12">
                                    <a className="downloadLink" target="_blank" href={`http://localhost:3001/${file.path}`}>{splitString(file.path, 60)}</a>
                                </div>
                            </Row>
                        </div>
                        <hr />
                    </>
                )
            })
        } else {
            return (
                <>
                    <center>
                        No files
                    </center>
                </>
            )
        }
    }

    return (
        <>
            <div className="navbar">
                <h3>Uploads</h3>
                {fileIsSelected ? (
                    <>
                        <Button
                            variant="danger"
                            onClick={handleDelete}
                        >
                            Delete
                        </Button>
                    </>
                ) : (
                    <></>
                )}
            </div>
            <Container>
                <Row>
                    {displayFiles()}
                </Row>
            </Container>
        </>
    )
}
export default Indexing