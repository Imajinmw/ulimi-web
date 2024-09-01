const {TextField, Button, Fab, Link, Typography, InputAdornment, Alert, Tabs, Tab} = MaterialUI;
const {Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIcon} = MaterialUI;
const {Dialog, DialogActions,DialogContent, DialogContentText, MenuItem, DialogTitle} = MaterialUI;
let {alpha, TableBody, TableCell, TableContainer, RadioGroup, Radio, FormLabel,Rating,
	TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Paper, Checkbox, IconButton, Tooltip,
    Chip, Avatar, FilledInput, FormControl, InputLabel, Breadcrumbs, Input, ListItemAvatar, 
	FormControlLabel,Switch, DeleteIcon, FilterListIcon, visuallyHidden
} = MaterialUI;

const {useState, useEffect, createContext, useContext, useLayoutEffect } = React;

const SigninContext = createContext({})
var School = createContext({});
var user;

$(document).ready(function(){
    //ReactDOM.render(<Activity />, _('root'));
    
    try{
        ReactDOM.render(<Welcome />, _('root'));
    }
    catch(E){
        alert(E.toString())
    }
});

function Welcome(){
    const [stage, setStage] = useState("home");
    const [menu, setMenu] = useState(false);
    const [logout, setLogout] = useState(false);
    const menus = [
        {
            name:"Home",
            icon:"fa fa-home",
            id:"home"
        },
        {
            name:"Users",
            icon:"fa fa-user-friends",
            id:"users"
        },
        {
            name:"Manage Payments",
            icon:"fa fa-dollar-sign",
            id:"payments"
        },
        {
            name:"Manage Expenditures",
            icon:"fa fa-exchange-alt",
            id:"expenditures"
        },
        {
            name:"Payrolls",
            icon:"fa fa-folder",
            id:"payrolls"
        },
        {
            name:"Profile",
            icon:"fa fa-user-shield",
            id:"profile"
        }
    ];

    const sms_menus = [
        {
            name:"All messages",
            icon:"fa fa-comment",
            id:"all_messages"
        },
        {
            name:"Members",
            icon:"fa fa-users",
            id:"members"
        },
        {
            name:"Extracts",
            icon:"fa fa-dollar-sign",
            id:"extracts"
        },
        {
            name:"Reports",
            icon:"fa fa-chart-line",
            id:"payment_reports"
        }
    ];

    const emails_menus = [
        {
            name:"SMS Messages",
            icon:"fa fa-comment",
            id:"outgoing_messages"
        },
        {
            name:"EMails",
            icon:"fa fa-envelope",
            id:"outgoing_emails"
        },
    ];

    const content = (stage) => (
        <div>{
            stage == "home"?<Home />:
            stage == "users"?<Users />:
            stage == "outgoing_emails"?<OutgoingEmails />:
            <font>{stage}</font>
        }</div>
    )

    return (
        <>
            <div className="w3-padding w3-text-white" style={{background:"#19535f"}}>
                <i className="fa fa-bars" onClick={e=>{
                    setMenu(true);
                }} /> <font>Admin</font>
            </div>
            <div className="w3-row">
                <div className="w3-border-right w3-white" style={{height:window.innerHeight+"px",zIndex:40, overflowY:"auto", borderColor:"var(--success)", width:"80%",position:"fixed",left:"0",top:"0", display:(menu?"block":"none")}}>
                    <div className="w3-padding">
                        <Button sx={{m:2}} color="error" onClick={e=>{
                            setMenu(false);
                        }}>Close</Button>
                        {menus.map(menu=>(
                            <MenuButton data={menu} key={menu.id} isActive={menu.id == stage} onClick={event=>{
                                setStage(menu.id);
                                setMenu(false);
                            }} />
                        ))}
                        <Divider />
                        <MenuButton data={{id:"logout", icon:"fa fa-power-off", name:"Logout"}} onClick={event=>{
                            setLogout(true);
                            setMenu(false);
                        }} />
                        <div className="pt-10 pb-10 w3-small w3-opacity">
                            SMS & PAYMENTS
                        </div>
                        <Divider color="error" size="large" />
                        {sms_menus.map(menu=>(
                            <MenuButton data={menu} key={menu.id} isActive={menu.id == stage} onClick={event=>{
                                setStage(menu.id);
                                setMenu(false);
                            }} />
                        ))}
                        <div className="pt-10 pb-10 w3-small w3-opacity">
                            EMAILS & OUTGOING SMSs
                        </div>
                        <Divider color="error" size="large" />
                        {emails_menus.map(menu=>(
                            <MenuButton data={menu} key={menu.id} isActive={menu.id == stage} onClick={event=>{
                                setStage(menu.id);
                                setMenu(false);
                            }} />
                        ))}
                    </div>
                </div>
                <div className="w3-col m10" style={{height:window.innerHeight+"px", overflowY:"auto"}}>
                    {content(stage)}
                </div>
            </div>

            <div className="w3-modal" style={{display:(logout?"block":"none"),paddingTop:"150px"}}>
                <div className="w3-modal-content w3-round-large w3-padding shadow" style={{width:"350px"}}>
                    <font className="w3-large block pb-25">Logout</font>
                    <font>Are you sure you want to logout?</font>

                    <div className="clearfix pt-15">
                        <span className="float-right">
                            <Button color="success" onClick={e=>{
                                setLogout(false)
                            }}>
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
        </>
    );
}

function MenuButton(props){
    return(
        <div className={"w3-round-large some-padding hover-me pointer "+(props.isActive!=undefined?props.isActive?"bg-success w3-text-white":"":"")} onClick={props.onClick!=undefined?props.onClick:()=>{}}>
            <span style={{width:"40px",display:"inline-block"}} className="w3-center">
                <i className={props.data.icon+" w3-opacity"} />
            </span>
            <font>{props.data.name}</font>
        </div>
    );
}

function Home(){
    const [dashData,setData] = useState({
        all:0,
        activated:0,
        payments:0,
        profit:0,
        left_profit:0,
        usage:"Good"
    });
    const labels = ["Alfred", "Dominic", "Precious", "Esao", "Jacob"];
    const data = [[40,60,36,50,70]];

    const getDashData = () => {
        $.get("api/", {getDashData:"true"}, function(res){
            setData({...dashData, ...res});
        })
    }

    useEffect(()=>{
        getDashData();
    }, []);

    return(
        <>
            <h4 className="w3-padding">System Information</h4>
            <div className="w3-padding">
                <div className="w3-row">
                    <div className="w3-col s6 w3-padding-small">
                        <div className="w3-round w3-light-grey w3-padding">
                            <font className="w3-large block">{dashData.all}</font>
                            <font>All Users</font>
                        </div>
                    </div>
                    <div className="w3-col s6 w3-padding-small">
                        <div className="w3-round alert-secondary w3-padding">
                            <font className="w3-large block">{dashData.activated}</font>
                            <font>Activated Users</font>
                        </div>
                    </div>
                    <div className="w3-col s6 w3-padding-small">
                        <div className="w3-round alert-success w3-padding">
                            <font className="w3-large block">{dashData.payments}</font>
                            <font>Payments</font>
                        </div>
                    </div>
                    <div className="w3-col s6 w3-padding-small">
                        <div className="w3-round alert-info w3-padding">
                            <font className="w3-large block">{dashData.profit}</font>
                            <font>Total Profit</font>
                        </div>
                    </div>
                    <div className="w3-col s6 w3-padding-small">
                        <div className="w3-round alert-danger w3-padding">
                            <font className="w3-large block">{dashData.left_profit}</font>
                            <font>Left Profit</font>
                        </div>
                    </div>
                    <div className="w3-col s6 w3-padding-small">
                        <div className="w3-round alert-warning w3-padding">
                            <font className="w3-large block">{dashData.usage}</font>
                            <font>Usage Status</font>
                        </div>
                    </div>
                </div>
            </div>
            <h4 className="w3-padding">Payments &amp; SMS</h4>
            <div className="w3-padding">
                <div className="w3-row">
                    <div className="w3-col s6 w3-padding-small">
                        <div className="w3-round w3-light-grey w3-padding">
                            <font className="w3-large block">16</font>
                            <font>All Users</font>
                        </div>
                    </div>
                    <div className="w3-col s6 w3-padding-small">
                        <div className="w3-round alert-secondary w3-padding">
                            <font className="w3-large block">16</font>
                            <font>All Users</font>
                        </div>
                    </div>
                    <div className="w3-col s6 w3-padding-small">
                        <div className="w3-round alert-success w3-padding">
                            <font className="w3-large block">16</font>
                            <font>All Users</font>
                        </div>
                    </div>
                    <div className="w3-col s6 w3-padding-small">
                        <div className="w3-round alert-info w3-padding">
                            <font className="w3-large block">16</font>
                            <font>All Users</font>
                        </div>
                    </div>
                    <div className="w3-col s6 w3-padding-small">
                        <div className="w3-round alert-danger w3-padding">
                            <font className="w3-large block">16</font>
                            <font>All Users</font>
                        </div>
                    </div>
                    <div className="w3-col s6 w3-padding-small">
                        <div className="w3-round alert-warning w3-padding">
                            <font className="w3-large block">16</font>
                            <font>All Users</font>
                        </div>
                    </div>
                </div>
            </div>
            
            <div className="w3-padding">
                <Chart labels={labels} data={data} type="line" />
            </div>
        </>
    )
}

function Users(){
    const [users, setUsers] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [word, setWord] = useState("");
    const [users_filtered, setFilteredUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [active, setActive] = useState({});
    const [referrers, setReferrers] = useState([]);

    const getUsers = () => {
        $.get("api/", {getAllUsers:"true"}, function(res){
            setUsers(res);
            setFilteredUsers(res);
        })
    }

    useEffect(()=>{
        getUsers();
    }, []);

    useEffect(()=>{
        //perform search
        setFilteredUsers(users.filter(row=>(
            row.name.toLowerCase().indexOf(word.toLowerCase()) != (0-1)
        )))
    }, [word]);

    useEffect(()=>{
        $.get("api/", {getReferrers:active.id}, function(res){
            setReferrers(res);
        })
    }, [active]);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const activate = (id) => {

    }

    const approve = (id, name) => {
        setOpen(true);
    }

    const deactivate = (id) => {

    }

    const sendApprove = (event) => {
        event.preventDefault();

        let form = event.target;

        $.post("api/", $(form).serialize(), function(response){
            try{
                let res = JSON.parse(response);

                if(res.status){
                    form.reset();
                    getUsers();
                    setOpen(false);
                }
                else{
                    Toast(res.message);
                }
            }
            catch(E){
                alert(E.toString()+response);
            }
        })
    }

    return(
        <>
            <div className="w3-padding">
                <Breadcrumbs aria-label="breadcrumb">
                    <Link underline="hover" color="inherit" href="#">
                        Admin
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
                        Users
                    </Link>
                </Breadcrumbs>
                <Paper sx={{ width: '100%', mb: 2, mt:1 }}>
                    <Input sx={{width:"300px",m:1}} value={word} onChange={event=>setWord(event.target.value)} placeholder="Search table" />
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
                                    <TableCell>Uniq</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Referer</TableCell>
                                    <TableCell>Referrals</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {users_filtered.slice(page*rowsPerPage, (page+1)*rowsPerPage).map((row, index) => {
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
                                            <TableCell>{row.uniq}</TableCell>
                                            <TableCell>{row.status}</TableCell>
                                            <TableCell>{row.parent != "0" ? row.referrer.name:""}</TableCell>
                                            <TableCell>{row.referrals}</TableCell>
                                            
                                            <TableCell>
                                                <Button variant="contained" size="small" color="success" sx={{mr:1}} onClick={event=>{
                                                    setActive({...active, ...row});
                                                    //setOpen(true);
                                                }} style={{textTransform:"none"}}>Edit</Button>
                                                {row.status == "verified"?
                                                    <Button variant="contained" size="small" color="success" className="sm-text" onClick={event=>{
                                                        setActive({...active, ...row});
                                                        approve(row.id, row.name)
                                                    }}>Approve</Button>
                                                : row.status == "deactivated"? 
                                                    <Button variant="contained" size="small" color="success" className="sm-text" onClick={event=>{activate(row.id)}}>Activate</Button>
                                                : row.status == "active"?
                                                    <Button variant="contained" size="small" color="error" className="sm-text" onClick={event=>{deactivate(row.id)}}>Deactivate</Button>:""}
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </MaterialUI.Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[10, 25, 50, 100,200,500]}
                        component="div"
                        count={users.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        />
                </Paper>
            </div>


            <div className="w3-modal" style={{display:(open?"block":"none")}}>
                <div className="w3-modal-content shadow rounded w3-padding-large" style={{width:"350px"}}>
                    <font className="w3-large block">Approve User</font>
                    <div className="pt-10 pb-10">
                        <ListItem className="pointer w3-hover-light-grey">
                            <ListItemAvatar>
                                <Avatar>
                                    <i className="far fa-user" />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={active.name} secondary={active.phone} />
                        </ListItem>
                    </div>

                    <form onSubmit={sendApprove}>
                        <input type={'hidden'} name="approve_member" value={active.id} />

                        <TextField label="Amount" size="small" name="amount" color="success" defaultValue="5000" type="number" fullWidth />

                        <Button variant="contained" sx={{mt:2, mb:2}} color="success" className="sm-text" type="submit">Submit</Button>
                    </form>
                    <div className="pt-15 pb-15 clearfix">
                        <Button variant="contained" color="error" className="float-right" onClick={event=>{
                            setOpen(false);
                        }}>Close</Button>
                    </div>
                </div>
            </div>
        </>
    )
}

function Chart(props){
    const [labels, setLabels] = useState(props.labels);
    const [dimensions, setDimensions] = useState(props.dimensions==undefined?[600,300]:props.dimensions);
    const [ten, setTen] = useState(10);
    const [marks, setMarks] = useState({
        x:props.labels,
        y:[100,80,60,40,20,0]
    });
    const [paddTop, setPadTop] = useState(5);
    const [polygon, setPolygon] = useState("");
    const [type, setType] = useState(props.type==undefined?"bar":props.type);

    useEffect(()=>{
        //set thing
        setTen(.1*dimensions[0]);
    }, []);

    const xCordinateLabel = (index, str) => {
        let width = (dimensions[0]-ten)/marks.x.length, strLen = str.length * 6, padd = 0;
        if(strLen < width){
            padd = Math.ceil((width - strLen) / 2);
        }
        return ten +(width * index) + padd;
    }

    const xCoordinateBar = (index) =>{
        let width = (dimensions[0]-ten)/marks.x.length, padd = 0, strLen = 15;
        if(strLen < width){
            padd = Math.ceil((width - strLen) / 2);
        }
        return ten +(width * index) + padd;
    }

    const xCoordinateHistogram = (index) =>{
        let width = (dimensions[0]-ten)/marks.x.length, padd = 0, strLen = 15;
        
        return (width * index) + ten;
    }

    const xCoordVert = (str)=>{
        let strLen = (str.toString().length * 6);
        //console.log(strLen,"Length")
        return ten - strLen;
    }

    const yCoordVert = (index) => {
        let height = (dimensions[1] - ten)/5;
        return (height*index)+5;
    }

    const height = (row) => {
        return Math.ceil((row/100) * (dimensions[1] - ten - paddTop));
    }

    const lineData = (series) => {
        let width = (dimensions[0] - ten)/series.length, center = Math.ceil(width/2),points = "";

        series.map((row,index)=>{
            let x = ten + (width*index) + center, y = (dimensions[1] - ten - height(row));
            if(points == ""){
                points = `${x},${y}`;
            }
            else{
                points += `, ${x},${y}`;
            }
        });

        return points;
    }

    return (
        <>
            <svg viewBox={"0 0 "+dimensions[0]+" "+dimensions[1]} style={{border:"1px solid black",height:dimensions[1]+"px",width:dimensions[0]+"px"}}>
                {/** Line axes */}
                <line x1={ten} y1={paddTop} x2={ten} y2={dimensions[1]-ten} style={{stroke:"rgb(255,0,0)",strokeWidth:"1"}} />
                <line x1={dimensions[0]} y1={dimensions[1]-ten} x2={ten} y2={dimensions[1]-ten} style={{stroke:"rgb(255,0,0)",strokeWidth:"1"}} />

                {/** Marks */}
                {marks.x.map((row, index)=> (
                    <text x={xCordinateLabel(index,row)} y={dimensions[1]-ten + 12} style={{fontSize:"12px"}} fill="black">{row}</text>
                ))}

                {marks.y.map((row, index)=> (
                    <text x={xCoordVert(row)} y={yCoordVert(index)} style={{fontSize:"12px"}} fill="black">{row}</text>
                ))}

                {type == "bar"?<>
                    {/** Print the bars */}
                    {props.data.map((series,ind)=>(
                        series.map((row,index)=>(
                            <rect x={xCoordinateBar(index)} y={(dimensions[1] - ten - height(row))} width="20" height={height(row)}  style={{fill:"blue",fillOpacity:"0.1"}} />
                        ))
                    ))}
                </>:
                type == "histogram"?<>
                    {/** Print histogram -- no spaces between */}
                    {props.data.map((series,ind)=>(
                        series.map((row,index)=>(
                            <rect x={xCoordinateHistogram(index)} y={(dimensions[1] - ten - height(row))} width={(dimensions[0]-ten)/series.length} height={height(row)}  style={{fill:"blue",fillOpacity:"0.1"}} />
                        ))
                    ))}
                </>:
                type == "line"?<>
                    {props.data.map((series,ind)=>(
                        <polyline points={lineData(series)} style={{fill:"none",stroke:"black", strokeWidth:"3"}} />
                    ))}
                </>:
                ""}
            </svg>
        </>
    )
}


function OutgoingEmails(){
    const [heads, setHeads] = useState([]);
    const [subjects, setSubjects] = useState([]);
    const [email, setEmail] = useState("");
    const [stage, setStage] = useState("welcome");
    const [id, setId] = useState("");
    
    const getHeads = () => {
        $.get("api/", {getEmailHeads:"true"}, function(res){
            setHeads(res);
        })
    }

    const getSubjects = () => {
        $.post("api/", {getEmailSubjects:email}, function(res){
            setSubjects(res);
        })
    }

    useEffect(()=>{
        getHeads();
    }, []);

    useEffect(()=>{
        getSubjects();
    }, [email]);

    return (
        <>
            <div className="w3-row">
                <div className="w3-col m3 w3-border-right" style={{height:window.innerHeight+"px", overflow:"auto"}}>
                    {heads.map((row,index)=>(
                        <div className="w3-padding pointer w3-hover-light-grey w3-border-bottom" onClick={e=>{
                            setEmail(row.receiver);
                            setStage("subjects");
                        }}>
                            <font className="block bold">{row.receiver}</font>
                            <font className="block w3-small w3-opacity">{row.count+" emails"}</font>
                        </div>
                    ))}
                </div>
                <div className="w3-col m9" style={{height:window.innerHeight+"px", overflow:"auto"}}>
                    {stage == "welcome"?<>
                        <div className="bcenter" style={{height:window.innerHeight+"px", overflow:"auto",width:"100%"}}>
                            <font className="w3-jumbo"><i className="fa fa-envelope-open w3-opacity" /></font>
                        </div>
                    </>:
                    stage == "subjects"?<>
                        <div>
                            {subjects.map((row,index)=>(
                                <div className="w3-padding-large pointer w3-hover-light-grey w3-border-bottom" onClick={e=>{
                                    setStage("view");
                                    setId(row.id);
                                }}>
                                    <font className="block w3-large">{row.subject}</font>
                                    <font className="w3-small w3-opacity block">{row.receiver}</font>
                                    <font>{row.date}</font>
                                </div>
                            ))}
                        </div>
                    </>:
                    stage=="view"?<>
                        <iframe width={"100%"} height={window.innerHeight} src={"api/?viewEmail="+id} />
                    </>:
                    <font>{stage}</font>}
                </div>
            </div>
        </>
    )
}