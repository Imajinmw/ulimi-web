const {TextField, Button, Fab, Link, Typography, InputAdornment, Alert, Tabs, Tab} = MaterialUI;
const {Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIcon} = MaterialUI;
const {Dialog, DialogActions,DialogContent, DialogContentText, MenuItem, DialogTitle} = MaterialUI;
let {alpha, TableBody, TableCell, TableContainer, RadioGroup, Radio, FormLabel,Rating,
	TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Paper, Checkbox, IconButton, Tooltip,
    Chip, Avatar, FilledInput, FormControl, InputLabel, CircularProgress, Snackbar, Breadcrumbs,
	FormControlLabel,Switch, DeleteIcon, FilterListIcon, visuallyHidden
} = MaterialUI;

const {useState, useEffect, createContext, useContext, useLayoutEffect } = React;

const Context = createContext({})
var School = createContext({});
var user;

const btn_style = {
    textTransform:"none",
    fontSize:"0.78rem",
    fontWeight:"bold"
}

window.onload = function(event){
    let str = window.localStorage.getItem("user");
    if (str != null) {
        try{
            user = JSON.parse(str);
            document.title = user.name+ " | Member"
            ReactDOM.render(<Welcome />, _("root"));
        }
        catch(E){
            alert(E.toString());
        }
    }
    else{
        window.location = "../index.php";
    }
}

function Welcome(){
    const [stage, setStage] = useState("Home");
    const [open, setOpen] = React.useState(false);
    const [toast, setToast] = useState("Hello world");
    const [verified, setVerified] = useState(true);

    const handleClick = () => {
        setOpen(true);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };

    const menus = ["Home", "Wallets", "Pay", "Referrals"];

    const action = (
        <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>UNDO</Button>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleClose}
                >
                <i className="fa fa-times" />
            </IconButton>
        </React.Fragment>
    );

    const getVerified = () => {
        $.get("api/", {getVerified:user.id}, function(res){
            setVerified(res.verified);
        })
    }

    useEffect(()=>{
        getVerified();
    }, []);

    const btn_style = {
        textTransform:"none",
        fontSize:"0.78rem",
        fontWeight:"bold",
        borderRadius:"7px"
    }

    return  (
        <>
            <Context.Provider value={{toast, setToast, setOpen}}>
                <div className="w3-padding-large w3-text-white" style={{background:"#19535f"}}>
                    <div className="w3-row">
                        <div className="w3-col m2">&nbsp;</div>
                        <div className="w3-col m3">
                            <img src="../images/ea.png" height="30" />
                            
                        </div>
                        <div className="w3-col m5 clearfix">
                            <span className="float-right">
                                {menus.map((row,index)=>(
                                    <a href="#" onClick={event=>setStage(row)} className={"tlink "+(row==stage?"active":"")}>{row}</a>
                                ))}
                                <img src="../images/avatar.png" onClick={event=>setStage("profile")} className="pointer" width="30" />
                            </span>
                        </div>
                    </div>
                </div>
                {stage=="Home"?<Home />:
                stage=="Referrals"?<Referrals />:
                stage=="profile"?<Profile />:
                <font>{stage}</font>}

                <Snackbar
                    open={open}
                    autoHideDuration={6000}
                    onClose={handleClose}
                    message={toast}
                    action={action}
                    />

                <div className="bcenter w3-center" style={{position:"fixed",width:"100%", left:"0", top:"0", zIndex:"4", height:"100%", background:"rgba(0,0,0,.3)",display:(verified?"none":"inline-flex")}}>
                    <div className="w3-round-large w3-padding w3-white shadow" style={{width:"300px"}}>
                        <div className="w3-center pt-20 pb-20">
                            <img src="../images/buy-illus.3ca6360b.svg" width={"80"} />
                        </div>
                        <div className="w3-center">
                            <font className="bold block mb-20">Lets get you verified</font>
                            <font>You are almost ready to use Khobidi Pay. Please verify the email we will send you</font>
                        </div>

                        <Button size="large" sx={{mt:3,mb:3}} variant="contained" fullWidth style={{...btn_style, background:"#7b2d26"}} onClick={event=>{
                            $.get("api/", {sendConfirmEmail:user.id}, function(res){
                                Toast(res);
                                setVerified(true);
                            })
                        }}>Send Email</Button>
                    </div>
                </div>
            </Context.Provider>
        </>
    );
}

function Home(){
    const [data, setData] = useState({
        balance:0
    });
    const [open, setOpen] = useState({
        withdraw:false,
        deposit:false
    })

    const getData = () => {
        $.get("api/", {getDashboardData:user.id}, function(res){
            setData({...data, ...res});
        });
    }

    useEffect(()=>{
        getData();
    }, []);

    return (
        <Context.Provider value={{setOpen,open}}>
            <div className="w3-row">
                <div className="w3-col m2">&nbsp;</div>
                <div className="w3-col m8">

                    {/*** Middle Content Lies below */}
                    <div className="w3-row pt-20 pb-15">
                        <div className="w3-half">
                            <font className="w3-small block">Combined total</font>
                            <font className="w3-large">MWK {data.balance}</font>
                        </div>
                        <div className="w3-half clearfix">
                            <font className="float-right">
                                <Button size="large" color="success" variant="contained" onClick={e=>{
                                    setOpen({...open, deposit:true});
                                }} style={btn_style}>Deposit</Button>
                                <Button size="large" color="success" variant="outlined" onClick={e=>{
                                    setOpen({...open, withdraw:true});
                                }} sx={{ml:2}} style={btn_style}>Withdraw</Button>
                            </font>
                        </div>
                    </div>


                    <div className="border rounded w3-rounded w3-padding w3-white">
                        <div className="w3-row">
                            <div className="w3-col w3-center" style={{width:"80px"}}>
                                <font className="block bold w3-tiny">60%</font>
                                <CircularProgressWithLabel value={90} />
                            </div>
                            <div className="w3-rest">
                                <div className="w3-row">
                                    <div className="w3-col m9 pt-10">
                                        <font className="block bold text-success">Start your crypto journey</font>
                                        <font>Deposit money into your Khobidi wallet to buy crypto</font>
                                    </div>
                                    <div className="w3-col m3 clearfix pt-15">
                                        <i className="fa fa-arrow-right float-right" style={{fontSize:"1.3rem"}} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w3-row pt-15 pb-15">
                        <div className="w3-padding w3-col m3">
                            <div className="w3-round-large alert-dark h w3-padding-large">
                                <img src="../images/buy-illus.3ca6360b.svg" width={"80"} />
                                <font className="block w3-large">Buy crypto currency</font>
                            </div>
                        </div>
                        <div className="w3-padding w3-col m3">
                            <div className="w3-round-large alert-warning h w3-padding-large">
                                <img src="../images/sell-illus.1e1b9555.svg" width={"80"} />
                                <font className="block w3-large">Sell crypto currency</font>
                            </div>
                        </div>
                        <div className="w3-padding w3-col m3">
                            <div className="w3-round-large alert-info h w3-padding-large">
                                <img src="../images/refer-illus.3d73a906.svg" width={"80"} />
                                <font className="block w3-large">Refer a friend</font>
                            </div>
                        </div>
                        <div className="w3-padding w3-col m3">
                            <div className="w3-round-large alert-success h w3-padding-large">
                                <img src="../images/buy-illus.3ca6360b.svg" width={"80"} />
                                <font className="block w3-large">Buy crypto currency</font>
                            </div>
                        </div>
                    </div>
                    <div>
                        <font className="bold">My Wallets</font>
                    </div>

                    <div className="w3-row">
                        <div className="w3-col m4 w3-padding">
                            <div className="card w3-round-large">
                                <div className="card-body">
                                    <div className="w3-row">
                                        <div className="w3-col s3">
                                            <span className="bcenter bg-success" style={{height:"40px", width:"40px",borderRadius:"50%"}}>
                                                <i className="fab fa-bitcoin w3-large"></i>
                                            </span>
                                        </div>
                                        <div className="w3-col s9">
                                            <font className="block">Bitcoin</font>
                                            <font className="w3-small">BTC</font>
                                        </div>
                                    </div>
                                    <div className="pt-10 pb-10">
                                        <font className="w3-opacity w3-small">
                                            AVAILABLE BALANCE
                                        </font>
                                        <font className="w3-large block bold">0 BTC</font>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <font className="w3-opacity w3-small">
                                        Pending BALANCE
                                    </font>
                                    <font className="w3-opacity block w3-small">
                                        BTC 0
                                    </font>
                                </div>
                            </div>
                        </div>
                        <div className="w3-col m4 w3-padding">
                            <div className="card w3-round-large">
                                <div className="card-body">
                                    <div className="w3-row">
                                        <div className="w3-col s3">
                                            <span className="bcenter bg-success" style={{height:"40px", width:"40px",borderRadius:"50%"}}>
                                                <font className="w3-large w3-text-white">K</font>
                                            </span>
                                        </div>
                                        <div className="w3-col s9">
                                            <font className="block">Malawian Kwacha</font>
                                            <font className="w3-small">MWK</font>
                                        </div>
                                    </div>
                                    <div className="pt-10 pb-10">
                                        <font className="w3-opacity w3-small">
                                            AVAILABLE BALANCE
                                        </font>
                                        <font className="w3-large block bold">MWK 0</font>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <font className="w3-opacity w3-small">
                                        Pending BALANCE
                                    </font>
                                    <font className="w3-opacity block w3-small">
                                        MWK 0
                                    </font>
                                </div>
                            </div>
                        </div>
                        <div className="w3-col m4 w3-padding">
                            <div className="card w3-round-large">
                                <div className="card-body">
                                    <div className="w3-row">
                                        <div className="w3-col s3">
                                            <span className="bcenter bg-success" style={{height:"40px", width:"40px",borderRadius:"50%"}}>
                                                <i className="fa fa-dollar-sign w3-large w3-text-white"></i>
                                            </span>
                                        </div>
                                        <div className="w3-col s9">
                                            <font className="block">US Dollar</font>
                                            <font className="w3-small">$</font>
                                        </div>
                                    </div>
                                    <div className="pt-10 pb-10">
                                        <font className="w3-opacity w3-small">
                                            AVAILABLE BALANCE
                                        </font>
                                        <font className="w3-large block bold">$0</font>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <font className="w3-opacity w3-small">
                                        Pending BALANCE
                                    </font>
                                    <font className="w3-opacity block w3-small">
                                        $0
                                    </font>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/** End middle content */}
                </div>
            </div>

            <Withdraw open={open.withdraw} />
            <Deposit open={open.deposit} />
        </Context.Provider>
    );
}

function Withdraw(props){
    const {setOpen, open} = useContext(Context);

    const [errors, setErrors] = useState({
        amount:false,
        amountText:"",
        password:false,
        passwordText:""
    });

    const [state, setState] = useState("amount");

    const proceed = (event) => {
        event.preventDefault();

        let form = event.target;

        $.post("api/", $(form).serialize(), function(response){
            //Toast(response);
            try{
                let res = JSON.parse(response);
                    
                if(state == "amount"){
                    if(res.status){
                        setErrors({...errors, amount:false, amountText:""});
                        setState("password");
                    }
                    else{
                        setErrors({...errors, amount:true, amountText:res.message});
                    }
                }
                else{
                    if(res.status){
                        Toast("Successfully sent request");
                        form.reset();
                        setOpen(false)
                    }
                    else{
                        setErrors({...errors, password:true, passwordText:res.message})
                    }
                }
            }
            catch(E){
                alert(E.toString()+response);
            }
        })
    }

    return(
        <>
            <div className="w3-modal" style={{display:(props.open?"block":"none")}}>
                <div className="w3-modal-content shadow rounded">
                    <div className="pt-25 pb-25 w3-center">
                        <img src="../images/withdraw.jpg" width={"70"} />
                    </div>
                    <div className="w3-center">
                        <font className="w3-large">Withdraw cash</font>
                    </div>
                    <form className="w3-padding-large" onSubmit={proceed}>
                        <input type={"hidden"} name="user_id" value={user.id} />
                        <input type={"hidden"} name="state" value={state} />
                        <Alert severity="info" sx={{mt:1,mb:2}}>Please enter amount. The withdraw request will be processed within 3 hours</Alert>
                        <TextField color="success" helperText={errors.amountText} error={errors.amount} label="Amount" size="small" fullWidth type="number" name="withdraw_amount" />
                        {state == "password"?<>
                            <TextField color="success" helperText={errors.passwordText} error={errors.password} sx={{mt:2}} label="Enter password" size="small" fullWidth type="password" name="withdraw_password" />
                        </>:""}
                        <Button color="success" type="submit" variant="contained" style={btn_style} sx={{mt:2}}>Submit Request</Button>
                    </form>
                    <div className="w3-padding clearfix rounded-bottom">
                        <Button variant="contained" color="error" size="small" className="float-right" onClick={e=>{
                            setOpen({...open, withdraw:false});
                        }}>Close</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

function Deposit(props){
    const {setOpen, open} = useContext(Context);

    return(
        <>
            <div className="w3-modal" style={{display:(props.open?"block":"none")}}>
                <div className="w3-modal-content shadow rounded pb-25">
                    <div className="pt-25 pb-25 w3-center">
                        <img src="../images/buy-illus.3ca6360b.svg" width={"70"} />
                    </div>
                    <div className="w3-center">
                        <font className="w3-large">Deposit cash</font>
                    </div>
                    <Alert severity="info" sx={{m:3}}>You will earn money only by referrering others to register into this system</Alert>
                    
                    <div className="pl-15 pr-15">
                        <Button size="large" sx={{mt:3,mb:3}} variant="contained" fullWidth style={{...btn_style, background:"#7b2d26"}} onClick={e=>{
                            setOpen({...open, deposit:false});
                        }}>Close</Button>
                    </div>
                </div>
            </div>
        </>
    )
}


function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                >
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}


function Referrals(){
    const [users, setUsers] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const getUsers = () => {
        $.get("api/", {getReferrals:user.id}, function(res){
            setUsers(res);
        })
    }

    useEffect(()=>{
        getUsers();
    }, []);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    return(
        <div className="w3-row">
            <div className="w3-col m2">&nbsp;</div>
            <div className="w3-col m8 w3-padding">
                <div className="pt-20 pb-20">
                    <Alert severity="info">List of people registered in referrence to you</Alert> <br /><br />
                    <Link target={"_blank"} href={"http://localhost/khobidi/register.php?ref="+user.uniq}>http://localhost/khobidi/register.php?ref={user.uniq}</Link>
                </div>
                <Paper sx={{ width: '100%', mb: 2 }}>
                    <TableContainer>
                        <MaterialUI.Table
                            aria-labelledby="tableTitle"
                            size="small"
                            id="rodzTable"
                            >
                            <TableHead>
                                <TableRow>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            color="primary"
                                            inputProps={{
                                                'aria-label': 'select all',
                                            }}
                                            />
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Commission</TableCell>
                                    <TableCell>Referer</TableCell>
                                    <TableCell>Referrals</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users.slice(page*rowsPerPage, (page+1)*rowsPerPage).map((row, index) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.name}
                                            >
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    color="primary"
                                                    />
                                            </TableCell>
                                            <TableCell padding="checkbox">
                                                {index+1}
                                            </TableCell>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                padding="none"
                                                >
                                                {row.name}
                                            </TableCell>
                                            <TableCell>{row.phone}</TableCell>
                                            <TableCell>{row.email}</TableCell>
                                            <TableCell>{"0"}</TableCell>
                                            <TableCell>{user.name}</TableCell>
                                            <TableCell>0</TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </MaterialUI.Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 50, 100,200,500]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                </Paper>
            </div>
        </div>
    )
}


function Profile(){
    const [user1, setUser] = useState(user);
    const {toast, setToast, setOpen} = useContext(Context);
    const [change, setChange] = useState(false);

    const updateProfile = (event) => {
        event.preventDefault();

        let form = event.target;

        $.post("api/", $(form).serialize(), function(response){
            try{
                let res = JSON.parse(response);
                if(res.status){
                    setToast("Successfully updated profile");
                    window.localStorage.setItem("user", JSON.stringify(user1));
                }
                else{
                    setToast(res.message);
                }
                setOpen(true);
            }
            catch(E){
                alert(E.toString()+response);
            }
        })
    }

    const updatePassword = (event) => {
        event.preventDefault();

        let form = event.target;

        $.post("api/", $(form).serialize(), function(response){
            try{
                let res = JSON.parse(response);
                if(res.status){
                    setToast("Successfully updated password");
                    //window.localStorage.setItem("user", JSON.stringify(user1));
                }
                else{
                    setToast(res.message);
                }
                setOpen(true);
            }
            catch(E){
                alert(E.toString()+response);
            }
        })
    }

    return(
        <>
            <div className="w3-row">
                <div className="w3-col m2">&nbsp;</div>
                <div className="w3-col m8 w3-padding">
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" href="#">
                            Member
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            href="#"
                            >
                            Dashboard
                        </Link>
                        <Link
                            underline="hover"
                            color="text.primary"
                            href="#"
                            aria-current="page"
                            >
                            Profile
                        </Link>
                    </Breadcrumbs>
                    <form onSubmit={updateProfile}>
                        <input type={"hidden"} name="update_profile" value={user1.id} />
                        <div className="w3-row">
                            <div className="w3-col m4 w3-padding">
                                <TextField fullWidth variant="filled" color="success" label="Full name" name="fullname" value={user1.name} onChange={event=>{
                                    setUser({...user, name:event.target.value});
                                }} />

                                <TextField fullWidth variant="filled" color="success" label="Email" name="email" sx={{mt:2}} value={user1.email} onChange={event=>{
                                    setUser({...user, email:event.target.value});
                                }} />
                            </div>
                            <div className="w3-col m4 w3-padding">
                                <TextField fullWidth variant="filled" color="success" label="Phone" name="phone" value={user1.phone} onChange={event=>{
                                    setUser({...user, phone:event.target.value});
                                }} />
                            </div>
                        </div>
                        <div className="w3-padding">
                            <Button variant="contained" type="submit" color="success" style={{textTransform:"none"}}>Update Profile</Button>
                            <Button variant="outlined" sx={{ml:3}} startIcon={<i className="fa fa-key w3-small" />} onClick={event=>setChange(true)} color="success">Change Password</Button>
                        </div>
                    </form>
                    <Divider />
                    <Button variant="contained" color="error" sx={{m:3}} startIcon={<i className="fa fa-power-off w3-small" />} onClick={event=>{
                        window.localStorage.removeItem("user");
                        window.location= "index.php";
                    }}>Logout</Button>
                </div>
            </div>

            <div className="w3-modal" style={{display:(change?"block":"none")}}>
                <div className="w3-modal-content shadow rounded">
                    <div className="round-top w3-padding-large w3-light-grey">
                        <font className="block w3-large">Change password</font>
                        <font className="block w3-opacity">Change password</font>
                    </div>
                    <div className="w3-padding-large">
                        <form onSubmit={updatePassword}>
                            <input type={"hidden"} name="update_profile" value={user1.id} />
                            <div className="w3-row">
                                
                                <TextField fullWidth color="success" label="Old password" name="old_password" type="password" />

                                <TextField fullWidth color="success" label="New Password" name="new_password" sx={{mt:2}} type="password" />
                                
                            </div>
                            <div className="w3-padding">
                                <Button variant="contained" type="submit" color="success" style={{textTransform:"none"}}>Update</Button>
                            </div>
                        </form>
                        <div className="pt-15 pb-15 clearfix">
                            <Button variant="contained" color="error" className="float-right" onClick={event=>{
                                setChange(false);
                            }}>Close</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}