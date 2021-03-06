//注册页
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, /*Link,*/ TextField/*, Typography*/ } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Alert from "../Components/Alert";
import Barcode from "../Components/Barcode";
import { homepage, url } from '../config';
function Signup(): JSX.Element {
    const [user, setUser] = useState("");
    const [email, setEmail] = useState("");
    const [pwd, setPwd] = useState("");
    const [repwd, setRepwd] = useState("");
    const [loadding, setLoadding] = useState(false);
    const [open, setOpen] = useState(false);
    const [openBarcode, setOpenBarcode] = useState(false);
    const navigate = useNavigate();
    const isUseremail = isEmail(email);
    const navigateToSignin = () => navigate(homepage === "/" ? "/signin" : `${homepage}/signin`, { replace: true });
    function handleSubbmit(): void {
        if (user !== "" && isUseremail && pwd !== "" && pwd === repwd) {
            setLoadding(true);
            fetch(`${url}/user`, {
                method: 'POST',
                mode: 'cors',
                body: JSON.stringify({
                    action: "regist",
                    username: user,
                    email: email,
                    password: pwd,
                    birth: "2001-05-19"
                })
            })
                .then(res => res.json())
                .then(
                    obj => {
                        if (obj.state === 1) {
                            setOpenBarcode(true)
                        } else {
                            setOpen(true);
                        }
                    },
                    () => setOpen(true)
                )
        }
    }
    function isEmail(text: string): boolean {
        return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/.test(text)
    }
    return (
        <>
            <Alert
                message="Error while registering"
                open={open}
                onClose={() => setOpen(false)}
                servrity="error"
            />
            <Dialog
                open={openBarcode}
                onClose={navigateToSignin}
            >
                <DialogTitle>Success! Here is your barcode</DialogTitle>
                <DialogContent>
                    <Barcode data={user} height={150} width={3} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={navigateToSignin}>
                        Done
                    </Button>
                </DialogActions>
            </Dialog>
            <DialogContent>
                <Box sx={{
                    alignItems: "center",
                    display: "flex",
                    flexDirection: "column",
                }}>
                    {/* 
                <Typography component="h1" variant="h5">Sign up</Typography>
                */}
                    <TextField
                        margin="normal"
                        fullWidth
                        label="User name"
                        autoComplete="account"
                        type="text"
                        autoFocus
                        value={user}
                        onChange={e => setUser(e.target.value)}
                    />
                    <TextField
                        error={email !== "" && !isUseremail}
                        margin="normal"
                        fullWidth
                        label="Email"
                        autoComplete="email"
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        helperText={(email !== "" && !isUseremail) ? "Not a email" : ""}
                    />
                    <TextField
                        error={pwd !== "" && pwd.length < 8}
                        margin="normal"
                        fullWidth
                        label="Password"
                        type="password"
                        value={pwd}
                        onChange={e => setPwd(e.target.value)}
                        helperText={pwd !== "" && pwd.length < 8 ? "Too short" : ""}
                    />
                    <TextField
                        error={pwd !== repwd && repwd !== ""}
                        margin="normal"
                        fullWidth
                        label="Confirm Password"
                        type="password"
                        value={repwd}
                        onChange={e => setRepwd(e.target.value)}
                        helperText={pwd !== repwd && repwd !== "" ? "Passwords does not match" : ""}
                    />
                </Box>
            </DialogContent>
            <DialogActions>
                <Button
                    disabled={user === "" || pwd.length < 8 || pwd !== repwd || !isUseremail || loadding}
                    onClick={handleSubbmit}
                >
                    ADD
                </Button>
            </DialogActions>
            {/*
                <Link component={RouterLink} to={homepage === "/" ? "/signin" : `${homepage}/signin`}>
                    Already have a account? Sign in
                </Link>
                */}
        </>
    );
}
export default Signup;