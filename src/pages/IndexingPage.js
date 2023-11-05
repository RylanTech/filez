import { useContext, useEffect, useState } from "react"
import { Button, Container, Form, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { FileContext } from "../context/FileContext"

function Indexing() {
    const navigate = useNavigate()
    const [files, setFiles] = useState();
    const [fileIsSelected, setFileIsSelected] = useState(false)

    let fileArray = []

    const { getFilesByUser } = useContext(FileContext)

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

    function handleSelection(id) {
        let i = removeNumberFromArray(fileArray, id)

        if (i) {
            fileArray.push(id)
        }

        function removeNumberFromArray(arr, numberToRemove) {
            const index = arr.indexOf(numberToRemove);
            if (index !== -1) {
                
                return false
            } else {
                return true
            }
        }

        console.log(fileArray)
        
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
                                        onClick={() => handleSelection(file.fileId)}
                                    />
                                </div>
                                <div className="col-5 col-md-2">
                                    {file.name}
                                </div>
                                <div className="col-6 col-md-2">
                                    {convertDateToString(file.uploadDate)}
                                </div>
                                <div className="col-12 col-md-7">
                                    <a className="downloadLink" target="_blank" href={`http://localhost:3001/${file.path}`}>{splitString(file.path, 40)}</a>
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