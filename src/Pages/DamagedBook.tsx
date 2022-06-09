import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import Alert from "../Components/Alert";
import { url } from "../config";
function DamagedBook() {
    const [damagedBooks, setDamagedBooks] = useState<{
        name: string,
        isbn: string,
        bookid: number,
        username: string,
        damage_date: string,
        price: number
    }[]>([])
    const [err, setErr] = useState(false);
    useEffect(() => {
        fetch(`${url}/admin`, {
            mode: 'cors',
            method: 'POST',
            body: JSON.stringify({ action: "getDamageList" })
        })
            .then(res => res.json())
            .then(obj => setDamagedBooks(obj), () => setErr(true))
    }, [])
    return (
        <Container component="main" maxWidth="lg">
            <Alert
                open={err}
                onClose={() => setErr(false)}
                message="Network error"
                servrity="error"
            />
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>name</TableCell>
                            <TableCell>isbn</TableCell>
                            <TableCell>bookid</TableCell>
                            <TableCell>username</TableCell>
                            <TableCell>damage date</TableCell>
                            <TableCell>price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {damagedBooks.map(item => (
                            <TableRow key={`${item.isbn}${item.bookid}`}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.isbn}</TableCell>
                                <TableCell>{item.bookid}</TableCell>
                                <TableCell>{item.username}</TableCell>
                                <TableCell>{item.damage_date}</TableCell>
                                <TableCell>{item.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    )
}
export default DamagedBook;