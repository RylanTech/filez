import { useContext, useEffect, useState } from "react"
import { Button, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { FileContext } from "../context/FileContext"

function Indexing() {
    const navigate = useNavigate()
    const [files, setFiles] = useState(null);
    const [fileIsSelected, setFileIsSelected] = useState(false)
    const [fileArray, setFileArray] = useState([])

    const { getFilesByUser, deleteFileArr, ip } = useContext(FileContext)

    useEffect(() => {
        let token = localStorage.getItem("myFilezUserToken")
        if (!token) {
            navigate('login')
        }

        async function getFileData() {
            const filez = await getFilesByUser()
            console.log(filez)
            if (0 < filez.length) {
                console.log(filez.length)
                setFiles(filez)
            } else {
                setFiles(null)
            }
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
                                <div className="col-2">
                                    {file.name}
                                </div>
                                <div className="col-md-3" />
                                <div className="col-12 col-md-6">
                                    <Row>
                                        <div className="col-6">
                                            <Button
                                                className="col-12"
                                                variant="success"
                                                onClick={() => {
                                                    copyLinkToClipboard(`http://${ip}/download/${file.path}`)
                                                }}>
                                                Download Link
                                            </Button>
                                        </div>
                                        <div className="col-6">
                                            <Button
                                                className="col-12"
                                                onClick={() => {
                                                    copyLinkToClipboard(`http://${ip}/uploads/${file.path}`)
                                                }}
                                            >
                                                View Link
                                            </Button>
                                        </div>
                                    </Row>
                                </div>
                                <div className="col-9 col-md-11">
                                    <a
                                        className="downloadLink"
                                        target="_blank"
                                        href={`http://${ip}/${file.path}`}
                                    >uploads/{splitString(file.path, 60)}</a>
                                </div>
                                <div className="col-3 col-md-1">
                                    {convertDateToString(file.uploadDate)}
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