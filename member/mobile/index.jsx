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
var user, config;

const btn_style = {
    textTransform:"none",
    fontSize:"0.78rem",
    fontWeight:"bold",
    outline:"none"
}

window.onload = function(event){
    let str = window.localStorage.getItem("user");
    if (str != null) {
        try{
            user = JSON.parse(str);
            document.title = user.name+ " | Member"
            ReactDOM.render(<Welcome />, _("root"));
            //Toast(user.status)

            //get config data
            $.get("api/", {getConfig:"true"}, function(res){
                config = res;
            })
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
    //const [stage, setStage] = useState("wallets");
    const [open, setOpen] = useState(false);
    const [drawerOpen,setDrawerOpen] = useState(false);
    const [anchor, setAnchor] = useState("left");
    const [logout, setLogout] = useState(false);
    const [verified, setVerified] = useState(true);

    const getVerified = () => {
        $.get("api/", {getVerified:user.id}, function(res){
            setVerified(res.verified);
        })
    }

    const getUpdateUser = () => {
        $.get("api/", {getUser:user.id}, function(res){
            if(res.status){
                window.localStorage.setItem("user", JSON.stringify(res));
            }
            else{
                window.localStorage.removeItem("user");
                window.location = '../';
            }
        })
    }

    useEffect(()=>{
        getVerified();
        getUpdateUser();
    }, []);

    const menus = ["Home", "Wallets", "Pay", "Referrals"];

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setDrawerOpen(open);
    };

    return  (
        <Context.Provider value={{drawerOpen,setDrawerOpen, stage, setStage, setLogout}}>
            <div className="w3-padding w3-text-white" style={{height:(open?window.innerHeight+"px":"auto"),background:"#19535f"}}>
                <div className="w3-row pt-10 pb-10">
                    <div className="w3-col s4">
                        <span style={{padding:"5px"}} onClick={toggleDrawer("left", true)}>
                            <i className={"fa "+(open?"fa-times":"fa-bars")} style={{fontSize:"1.7rem"}}></i>
                        </span>
                        
                    </div>
                    <div className="w3-col s4 w3-center">
                        <img src="../images/ea_logo.png" width="30" />
                    </div>
                    <div className="w3-col s4 clearfix">
                        <img src="../images/avatar.png" className="float-right" width="30" />
                    </div>
                </div>
                <div className="w3-row" style={{display:(open?"block":"none")}}>
                    <div className="w3-col m5">
                        <div>
                            {menus.map((row,index)=>(
                                <div className="w3-padding">
                                    <a href="#" onClick={event=>{
                                        setStage(row);
                                        setOpen(false);
                                    }} className={"tlink mobile "+(row==stage?"active":"")}>{row}</a>
                                </div>
                            ))}
                            <div className="w3-padding">
                                <div className="w3-row">
                                    <div className="w3-col s2">
                                        <img src="../images/avatar.png" className="pointer" width="40" />
                                    </div>
                                    <div className="w3-col s9">
                                        <font className="w3-large w3-text-white block">{user.name}</font>
                                        <font className="w3-text-white w3-opacity block">Your profile</font>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {stage=="Home"?<Home />:
            stage=="profile"?<Profile />:
            stage=="notifications"?<Notifications />:
            stage=="referrals"?<Referrals />:
            stage=="wallets"?<Wallets />:
            <font>{stage}</font>}
            <Drawer anchor={anchor} open={drawerOpen} onClose={toggleDrawer("left", false)} width="300" style={{width:(window.innerWidth*.84)+"px",maxWidth:(window.innerWidth*.84)+"px"}}>
                <div className="w3-padding clearfix">
                    <i className="fa fa-times text-danger w3-large float-right" onClick={event=>{
                        setDrawerOpen(false);
                    }}></i>
                </div>
                <MenuElement />
            </Drawer>

            <div className="w3-modal" style={{display:(logout?"block":"none")}}>
                <div className="w3-modal-content w3-round-large w3-padding shadow" style={{width:"350px"}}>
                    <font className="w3-large block pb-25">Logout</font>
                    <font>Are you sure you want to logout?</font>

                    <div className="clearfix pt-15">
                        <span className="float-right">
                            <Button color="success" onClick={e=>{
                                setLogout(false)
                            }} style={{textTransform:"none"}}>
                                Cancel
                            </Button>
                            <Button onClick={event=>{
                                window.localStorage.removeItem("user");
                                window.location = '../';
                            }} color="success">
                                Logout
                            </Button>
                        </span>
                    </div>
                </div>
            </div>

            <div className="bcenter w3-center" style={{position:"fixed",width:"100%", left:"0", top:"0", zIndex:"4", height:"100%", background:"rgba(0,0,0,.3)",display:(verified?"none":"inline-flex")}}>
                <div className="w3-round-large w3-padding w3-white shadow" style={{width:"300px"}}>
                    <div className="w3-center pt-20 pb-20">
                        <img src="../images/buy-illus.3ca6360b.svg" width={"80"} />
                    </div>
                    <div className="w3-center">
                        <font className="bold block mb-20">Lets get you verified</font>
                        <font>You are almost ready to use Khobidi Pay. Please verify the email we will send you</font>
                    </div>

                    
                    <Button size="large" sx={{mt:3}} variant="contained" fullWidth style={{...btn_style, background:"#7b2d26"}} onClick={event=>{
                        $.get("api/", {sendConfirmEmail:user.id}, function(res){
                            Toast(res);
                            setVerified(true);
                        })
                    }}>Send Email</Button>
                    <Button size="large" sx={{mt:2,mb:3}} variant="contained" fullWidth style={{...btn_style, background:"var(--gray)"}} onClick={event=>{
                        setVerified(true);
                    }}>Verify later</Button>
                </div>
            </div>
        </Context.Provider>
    );
}


function Referrals(){
    const [active, setActive] = useState("Earnings");
    const buttons = ["Earnings", "Registration"];
    const [rows, setRows] = useState([]);
    const [registration, setRegistration] = useState([]);
    const [total, setTotal] = useState(0);

    const getData = () => {
        $.get("api/", {getReferralData:user.id}, function(response){
            try{
                let res = JSON.parse(response);
                setRegistration(res.registration);
                setRows(res.earnings);
                setTotal(res.amount);
            }
            catch(E){
                alert(E.toString()+response);
            }
        })
    }

    useEffect(()=>{
        getData();
    }, []);

    const open_fb = () => {
        //let u = config.base_url+"register.php?ref="+user.uniq;
        let u = "https://adimo-shopping.com/"+"register.php?ref="+user.uniq;
        let t = "Register EA Coin";
        window.open('http://www.facebook.com/sharer.php?u='+encodeURIComponent(u)+'&t='+encodeURIComponent(t),'sharer','toolbar=0,status=0,width=626,height=436');
        return false;
    }

    return (
        <>
            <div className="w3-padding">
                <font className="w3-large block mb-15">Referrals</font>
                <div className="mb-15">
                    <Typography>
                        Your link<br />
                        <Link target={"_blank"} href={config.base_url+"register.php?ref="+user.uniq}>{config.base_url+"register.php?ref="+user.uniq}</Link>
                    </Typography>
                    <font>Share link</font>
                    <div className="w3-row">
                        <div className="w3-col s4 w3-center">
                            <a href={"whatsapp://send?text="+config.base_url+"register.php?ref="+user.uniq} data-action="share/whatsapp/share">
                                <i className="fab fa-whatsapp w3-xlarge" />
                                <br />
                                Whatsapp
                            </a>
                        </div>
                        <div className="w3-col s4 w3-center" onClick={e=>{
                            Toast("Opening facebook")
                            open_fb();
                        }}>
                            <i className="fab fa-facebook w3-xlarge" />
                            <br />
                            Facebook
                        </div>
                        <div className="w3-col s4 w3-center">
                            <a href={"https://telegram.me/share/url?url="+config.base_url+"register.php?ref="+user.uniq+"&text=Register EA Coin"}>
                                <i className="fab fa-telegram w3-xlarge" />
                                <br />
                                Telegram
                            </a>
                        </div>
                    </div>
                </div>
                {buttons.map((row,index)=>(
                    <Button sx={{ml:1}} variant={row == active?"contained":"outlined"} color="success" onClick={e=>{
                        setActive(row);
                    }} style={{textTransform:"none"}}>{row}</Button>
                ))}

                <div className="table-responsive pt-20" style={{display:(active=="Earnings"?"block":"none")}}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Amount</th>
                                <th>Username</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rows.map((row,index)=>(
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{row.amount}</td>
                                    <td>{row.name}</td>
                                    <td>{row.time}</td>
                                </tr>
                            ))}
                            <tr>
                                <td></td>
                                <td>{total}</td>
                                <td>Total</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div className="table-responsive pt-20" style={{display:(active=="Registration"?"block":"none")}}>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Status</th>
                                <th>Level</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {registration.map((row,index)=>{
                                <tr>
                                    <td>{index+1}</td>
                                    <td>{row.name}</td>
                                    <td>{row.status}</td>
                                    <td>{row.level}</td>
                                    <td>{row.date_reg}</td>
                                </tr>
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}

function MenuElement(){
    const {drawerOpen,setDrawerOpen, stage, setStage, setLogout} = useContext(Context);

    let icon;
    if(theme == "Light"){
        icon = "fa fa-sun";
    }else{
        icon = "fa fa-moon";
    }

    const [mode, setMode] = React.useState({
        name:theme,
        icon:icon
    });

    const changeMode = (event) => {
        if(mode.name == "Light"){
            //set dark
            setMode({
                name:"Dark",
                icon:"fa fa-moon"
            });

            $.get("worker.php?setTheme=dark", function(res,s){
                Toast(res);
                $('#theme-changer').load("dark.css");
            })
        }
        else{
            //set light
            setMode({
                name:"Light",
                icon:"fa fa-sun"
            });

            $.get("worker.php?setTheme=light", function(res,s){
                $('#theme-changer').load("light.css");
            });
        }
    }

    return (<div>
        <div className="w3-row pt-15 pb-15" onClick={event=>{
            setDrawerOpen(false);
            setStage("profile")
        }}>
            <div className="w3-col s4 w3-center">
                <img src="../images/ea_logo.png" width="70%" style={{borderRadius:"50%"}}/>
            </div>
            <div className="w3-col s8">
                <font className="block bold"><b>{user.name}</b></font>
                <span className="text-success"> Active</span>
            </div>
        </div>
        
        <OneMenu icon="fa fa-certificate" title="Home" onClick={e=>{
            setDrawerOpen(false);
            setStage("Home")
        }} secondaryText="Secure your account" />
        <OneMenu icon={"fa fa-briefcase"} onClick={e=>{
            setDrawerOpen(false);
            setStage('wallets');
        }} title={"Wallets"} secondaryText="Change appearance" />
        <OneMenu icon="fa fa-exchange-alt" title="Pay" secondaryText="Transfer funds" />
        <OneMenu icon="fa fa-rss" title="Referrals" onClick={e=>{
            setDrawerOpen(false);
            setStage("referrals");
        }} secondaryText="View earnings u've made" />
        <OneMenu icon="far fa-bell" title="Notifications" onClick={e=>{
            setDrawerOpen(false);
            setStage("notifications")
        }} secondaryText="Manage" />

        <Divider sx={{mb:2}} />
        <OneMenu icon="fa fa-power-off" title="Logout" onClick={event=>{
            setDrawerOpen(false);
            setLogout(true);
        }} style={{marginTop:"15px"}} />
        <OneMenu icon="far fa-trash-alt w3-text-red" title="Deactivate Account" className="text-danger" />
    </div>)
}

function OneMenu(props){
    const [error,setError] = useState(props.error==undefined?false:true);

    return(<div className={"w3-row rip-me w3-padding "+(props.className!=undefined?props.className:"")} onClick={props.onClick!=undefined?props.onClick:()=>{}}>
        <div className="w3-col w3-center" style={{width:"15%",paddingTop:"4px"}}>
            <i className={"text-secondary "+props.icon} style={{fontSize:"1.4rem"}} />
        </div>
        <div className="w3-col" style={{width:"70%"}}>
            <font className="block" style={{fontSize:"1.12rem"}}>{props.title}</font>
            {props.secondaryText!=undefined?<font className={"block w3-small "+(error?"text-danger":"w3-opacity")}>{props.secondaryText}</font>:""}
        </div>
        <div className="w3-col" style={{width:"14%"}}>
            {props.endIcon!=undefined?<i className={props.endIcon} />:""}
        </div>
    </div>)
}


function Home(){
    const btn_style = {
        textTransform:"none",
        fontSize:"0.78rem",
        fontWeight:"bold",
        outline:"none"
    }

    const [data, setData] = useState({
        crypto:0,
        standard:0,
        withdraw:0
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

                    {user.account_status == "registered"?<>
                        <div className="w3-padding-small">
                            <Alert variant="outlined" severity="info">
                                Looks like your email is not verified.
                                <br />
                                <Link href="#" onClick={event=>{
                                    $.get("api/", {sendConfirmEmail:user.id}, function(res){
                                        Toast(res);
                                        setVerified(true);
                                    })
                                }}>Resend verification</Link>
                            </Alert>
                        </div>
                    </>:""}

                    <div className="w3-row w3-padding pt-10 pb-15">
                        <div className="w3-half pt-10 pb-15">
                            <font className="w3-small block">Combined total</font>
                            <font className="w3-large">MWK {data.crypto}</font>
                        </div>
                        <div className="w3-half">
                            <font className="">
                                <Button size="large" color="success" variant="contained" onClick={e=>{
                                    setOpen({...open, deposit:true});
                                }} style={btn_style}>Deposit</Button>
                                <Button size="large" color="success" variant="outlined" sx={{ml:2}} onClick={e=>{
                                    setOpen({...open, withdraw:true});
                                }} style={btn_style}>Withdraw</Button>
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

                    <div className="w3-responsive">
                        <div className="w3-row pt-15 pb-15" style={{width:"1300px"}}>
                            <div className="w3-padding w3-col" style={{width:"300px"}}>
                                <div className="w3-round-large alert-dark h w3-padding-large">
                                    <img src="../images/buy-illus.3ca6360b.svg" width={"80"} />
                                    <font className="block w3-large">Buy crypto currency</font>
                                </div>
                            </div>
                            <div className="w3-padding w3-col" style={{width:"300px"}}>
                                <div className="w3-round-large alert-warning h w3-padding-large">
                                    <img src="../images/sell-illus.1e1b9555.svg" width={"80"} />
                                    <font className="block w3-large">Sell crypto currency</font>
                                </div>
                            </div>
                            <div className="w3-padding w3-col" style={{width:"300px"}}>
                                <div className="w3-round-large alert-info h w3-padding-large">
                                    <img src="../images/refer-illus.3d73a906.svg" width={"80"} />
                                    <font className="block w3-large">Refer a friend</font>
                                </div>
                            </div>
                            <div className="w3-padding w3-col" style={{width:"300px"}}>
                                <div className="w3-round-large alert-success h w3-padding-large">
                                    <img src="../images/buy-illus.3ca6360b.svg" width={"80"} />
                                    <font className="block w3-large">Buy crypto currency</font>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="w3-padding">
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
                                            <font className="block">Digital Marketing</font>
                                            <font className="w3-small">Crypto</font>
                                        </div>
                                    </div>
                                    <div className="pt-10 pb-10">
                                        <font className="w3-opacity w3-small">
                                            AVAILABLE BALANCE
                                        </font>
                                        <font className="w3-large block bold">MWK {data.crypto}</font>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <font className="w3-opacity w3-small">
                                        Withdrawable BALANCE
                                    </font>
                                    <font className="w3-opacity block w3-small">
                                        MWK {data.withdraw}
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
                                            <font className="block">Standard Account</font>
                                            <font className="w3-small">MWK</font>
                                        </div>
                                    </div>
                                    <div className="pt-10 pb-10">
                                        <font className="w3-opacity w3-small">
                                            AVAILABLE BALANCE
                                        </font>
                                        <font className="w3-large block bold">MWK {data.standard}</font>
                                    </div>
                                </div>
                                <div className="card-footer">
                                    <font className="w3-opacity w3-small">
                                        Pending BALANCE
                                    </font>
                                    <font className="w3-opacity block w3-small">
                                        MWK {data.standard}
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
                        </div>
                    </form>
                    <div className="pt-15 pb-15">
                        <Button variant="outlined" sx={{ml:3}} startIcon={<i className="fa fa-key w3-small" />} onClick={event=>setChange(true)} color="success">Change Password</Button>
                    </div>
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


function Notifications(){
    const [rows, setRows] = useState([]);
    const [page,setPage] = useState(1);

    const getNotifications = () => {
        $.get("api/", {getNotifications:user.id}, function(res){
            setRows(res);
        })
    }

    useEffect(()=>{
        getNotifications();
    }, []);

    return (
        <>
            <div className="w3-padding">
                <font className="w3-large">Notifications</font>
            </div>
            <div className="w3-padding">
                {page*10 < rows.length?<>
                    <div className="w3-padding" onClick={e=>{
                        Toast("hello");
                        setPage(page+1);
                    }}>
                        <font className="bold text-success" >Read older</font>
                    </div>
                </>:""}

                {page != 1?<>
                    <div className="w3-padding">
                        <font className="bold text-success" onClick={e=>{
                            setPage(page-1);
                        }}>Read newer</font>
                    </div>
                </>:""}
                {rows.slice((page-1)*10, page*10).map((row,index)=>(
                    <div className="mb-15 border rounded w3-padding">
                        <font className="w3-small w3-opacity block">{row.time}</font>
                        <div>{row.content}</div>
                    </div>
                ))}

                
            </div>
        </>
    )
}

function Wallets(){
    const [open, setOpen] = useState({
        digital:false,
        standard:false
    });

    const [top,setTop] = useState({
        digital:0,
        standard:0
    });
    const [right, setRight] = useState(0);
    const [balance, setBalance] = useState({
        crypto:0,
        standard:0,
        withdraw:0
    });

    const getBalance = () => {
        $.get("api/", {getDashboardData:user.id}, function(res){
            setBalance({...balance, ...res});
        })
    }

    useEffect(()=>{
        getBalance()
    }, []);

    return (
        <Context.Provider value={{open,setOpen}}>
            <div className="w3-padding">
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
                                <div className="w3-col s7">
                                    <font className="block">Digital Marketing</font>
                                    <font className="w3-small">Crypto</font>
                                </div>
                                <div className="w3-col s2">
                                    <Fab size="small" aria-label="add" onClick={e=>{
                                        setOpen({...open, digital:true});
                                        setTop({...top, digital:($(e.target).offset().top + $(e.target).height() +2)});
                                        setRight(window.innerWidth - $(e.target).offset().left - $(e.target).width());
                                    }} style={{background:"var(--white1)", boxShadow:"none", outline:"none"}}>
                                        <i className="fa fa-ellipsis-h"/>
                                    </Fab>
                                </div>
                            </div>
                            <div className="pt-10 pb-10">
                                <font className="w3-opacity w3-small">
                                    AVAILABLE BALANCE
                                </font>
                                <font className="w3-large block bold">MWK {balance.crypto}</font>
                            </div>
                        </div>
                        <div className="card-footer">
                            <font className="w3-opacity w3-small">
                                Withdrawable BALANCE
                            </font>
                            <font className="w3-opacity block w3-small">
                                MWK {balance.withdraw}
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
                                <div className="w3-col s7">
                                    <font className="block">Standard Account</font>
                                    <font className="w3-small">MWK</font>
                                </div>
                                <div className="w3-col s2">
                                    <Fab size="small" aria-label="add" onClick={e=>{
                                        setOpen({...open, standard:true});
                                        setTop({...top, standard:($(e.target).offset().top + $(e.target).height() +2)});
                                        setRight(window.innerWidth - $(e.target).offset().left - $(e.target).width());
                                    }} style={{background:"var(--white1)", boxShadow:"none",outline:"none"}}>
                                        <i className="fa fa-ellipsis-h"/>
                                    </Fab>
                                </div>
                            </div>
                            <div className="pt-10 pb-10">
                                <font className="w3-opacity w3-small">
                                    AVAILABLE BALANCE
                                </font>
                                <font className="w3-large block bold">MWK {balance.standard}</font>
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

            {open.digital?<DigitalMenu top={top.digital} right={right} onSelected={(item)=>{
                Toast(item);
            }} />:""}

            {open.standard?<StandardMenu top={top.standard} right={right} onSelected={(item)=>{
                Toast(item);
            }} />:""}
            
        </Context.Provider>
    );
}

function DigitalMenu(props){
    const list = ["Send to Standard", "Withdraw", "Details"];
    const {open,setOpen} = useContext(Context);

    //register an event listener
    useEffect(()=>{
        const dclick = (event) => {
            setOpen({...open, digital:false})
        }

        setTimeout(()=>{
            document.addEventListener('click', dclick, false);
        }, 2000);
        
        
        return () => {
            document.removeEventListener('click', dclick);
        }
    }, []);

    return (
        <>
            <div className="shadow rounded w3-white" style={{position:"fixed", top:(props.top)+"px", right:props.right+"px",zIndex:20,padding:"8px 0px"}}>
                {list.map((row,index)=>(
                    <div className="w3-padding" key={"dm"+index} onClick={e=>{
                        e.stopPropagation();
                        props.onSelected(row);
                        setOpen({...open, digital:false})
                    }}>{row}</div>
                ))}
            </div>
        </>
    )
}

function StandardMenu(props){
    const list = ["Send to Digital", "Send to User", "Withdraw", "Details"];
    const {open,setOpen} = useContext(Context);

    //register an event listener
    useEffect(()=>{
        const dclick = (event) => {
            setOpen({...open, standard:false})
        }

        setTimeout(()=>{
            document.addEventListener('click', dclick, false);
        }, 2000);
        
        return () => {
            document.removeEventListener('click', dclick);
        }
    }, []);

    return (
        <>
            <div className="shadow rounded w3-white" style={{position:"fixed", top:(props.top)+"px", right:props.right+"px",zIndex:2,padding:"8px 0px"}}>
                {list.map((row,index)=>(
                    <div className="w3-padding" key={"sm"+index} onClick={e=>{
                        e.stopPropagation();
                        props.onSelected(row);
                        setOpen({...open, standard:false})
                    }}>{row}</div>
                ))}
            </div>
        </>
    )
}