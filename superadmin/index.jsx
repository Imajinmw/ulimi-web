const {TextField, Button, Fab, Link, Typography, InputAdornment, Alert, Tabs, Tab} = MaterialUI;
const {Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIcon, createTheme, ThemeProvider} = MaterialUI;
const {Dialog, DialogActions,DialogContent, DialogContentText, MenuItem, DialogTitle} = MaterialUI;
let {alpha, TableBody, TableCell, TableContainer, RadioGroup, Radio, FormLabel,Rating, Table,
	TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Paper, Checkbox, IconButton, Tooltip,
    Chip, Avatar, FilledInput, FormControl, InputLabel, Breadcrumbs, Input, ListItemAvatar, 
	FormControlLabel,Switch, DeleteIcon, FilterListIcon, visuallyHidden
} = MaterialUI;

const {useState, useEffect, createContext, useContext, useLayoutEffect } = React;

const SigninContext = createContext({})
var School = createContext({});
var user;

let theme = createTheme({
	palette: {
		primary: {
			main: '#343a40',
		},
		secondary: {
			main: '#edf2ff',
		},
	},
});

let yellowTheme = createTheme({
	palette: {
		primary: {
			main: '#ffcb05',
		},
		secondary: {
			main: '#edf2ff',
		},
	},
});

$(document).ready(function(){
    //ReactDOM.render(<Activity />, _('root'));
    try{
        user = JSON.parse(window.localStorage.getItem("user"));
        ReactDOM.render(<Welcome />, _('root'));
    }
    catch(E){
        alert(E.toString())
    }
});

function Welcome(){
    const [stage, setStage] = useState("home");
    const [logout, setLogout] = useState(false);
    const menus = [
        {
            name:"Home",
            icon:"fa fa-home",
            label:"Dashboard, general stats",
            id:"home"
        },
        {
            name:"Admin & Supervisor",
            icon:"fa fa-user-friends",
            label:"Add, edit supervisors",
            id:"users"
        },
        {
            name:"Clerks",
            icon:"fa fa-users",
            label:"Manage clerks",
            id:"clerks"
        },
        {
            name:"Attendance Register",
            icon:"fa fa-calendar-check",
            label:"View performance of clerks",
            id:"progress"
        },
        {
            name:"Warehouses",
            icon:"fa fa-warehouse",
            label:"Add, edit, allocate",
            id:"warehouse"
        },
        {
            name:"Inspection Questions",
            icon:"fa fa-info-circle",
            label:"Manage",
            id:"questions"
        },
        {
            name:"Reports",
            icon:"fa fa-file-excel",
            label:"Download Excel reports",
            id:"reports"
        },
        {
            name:"Manage System",
            icon:"fa fa-cog",
            label:"Calibrate System",
            id:"options"
        },
        {
            name:"Notifications",
            icon:"fa fa-globe-africa",
            label:"Get Updates",
            id:"notifications"
        },
        {
            name:"Profile",
            icon:"fa fa-user-shield",
            label:"Change your login details",
            id:"profile"
        }
    ];

    const content = (stage) => (
        <div>{
            stage == "home"?<Home />:
            stage == "users"?<Users />:
            stage == "warehouse"?<Warehouse />:
            stage == "clerks" ? <Clerks />:
            stage == "options"?<Options />:
            stage == "progress"?<WorkProgress />:
            stage == "reports"?<Reports />:
            stage == "questions"?<Questions />:
            stage == "notifications"?<Notifications />:
            stage == "profile"?<Profile />:
            <font>{stage}</font>
        }</div>
    )

    return (
        <>
            <ThemeProvider theme={theme}>
                <div className="w3-row">
                    <div className="w3-col m2 w3-border-right" style={{height:window.innerHeight+"px", overflowY:"auto", borderColor:"var(--success)", background:"var(--u-dark)"}}>
                        <div className="w3-padding">
                            <div className="w3-center pt-15 pb-15">
                                <img src="../images/banner.jpg" width={"40%"} />
                                <br /><br />
                                <font className="block">{user.name}</font>
                                <font className="block text-success">{"["+user.type+"]"}</font>
                            </div>
                            {menus.map(menu=>(
                                <MenuButton data={menu} key={menu.id} isActive={menu.id == stage} onClick={event=>{
                                    setStage(menu.id);
                                }} />
                            ))}
                            
                            <MenuButton data={{id:"logout", icon:"fa fa-power-off w3-text-red", name:"Logout", label:"Sign out account"}} onClick={event=>{
                                setLogout(true);
                            }} />
                        </div>
                    </div>
                    <div className="w3-col m10" style={{height:window.innerHeight+"px", overflowY:"auto"}}>
                        {content(stage)}
                    </div>
                </div>

                <div className="w3-modal" style={{display:(logout?"block":"none")}}>
                    <div className="w3-modal-content shadow rounded w3-padding-large" style={{width:"350px"}}>
                        <font className="w3-large block mb-30 block">Logout</font>

                        <font className="block mb-15">Are you sure you want to logout?</font>
                        <div className="pt-10 pb-10 clearfix">
                            <span className="float-right">
                                <Button size="small"  onClick={event=>setLogout(false)}>Close</Button>
                                <Button size="small"  onClick={event=>{
                                    setLogout(false);
                                    window.location = '../logout.php';
                                }}>Logout</Button>
                            </span>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </>
    );
}

function Reports(){
    const [value, setValue] = React.useState(0);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <div className="w3-padding bg-alert">
                Download System Reports
            </div>

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Warehouse Report" {...a11yProps(0)} style={{textTransform:"none"}} />
                        <Tab label="Accidents" {...a11yProps(1)} style={{textTransform:"none"}} />
                        <Tab label="Travel Expences" {...a11yProps(2)} style={{textTransform:"none"}} />
                        <Tab label="Supervisor Inspections" {...a11yProps(3)} style={{textTransform:"none"}} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <h3>Warehouse report</h3>
                    <WarehouseReport />
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <h3>Accidents Reports</h3>
                    <AccidentsReport />
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <h3>Travel</h3>
                    <Travel />
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <h3>Supervisor Inspections</h3>
                    <SupervisorInspections />
                </TabPanel>
            </Box>
        </>
    );
}

function Questions(){
    const [value, setValue] = React.useState(0);
    const [rows, setRows] = useState([]);
    const [answers, setAnswers] = useState({
        positive:"Yes",
        negative:"No"
    });
    const [errors, setErrors] = useState({
        newSeal:false,
        newSealText:"",
        breakSeal:false,
        breakSealText:""
    });
    const [active, setActive] = useState({});
    const [edit, setEdit] = useState(false);

    const getRows = () => {
        $.post("api/", {getSealQuestions:"true"}, function(res){
            setRows(res);
        })
    }

    useEffect(()=>{
        getRows();
    }, []);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const saveQuestion = (event) => {
        event.preventDefault();

        let form = event.target;

        $.post("api/", $(form).serialize(), function(response){
            try{
                let res = JSON.parse(response);
                if(res.status){
                    form.question.value = '';
                    setAnswers({positive:"Yes", negative:"No"});
                    getRows();
                    Toast("Successfully added question");
                }
                else{
                    if(form.type.value == "new_seal"){
                        setErrors({...errors, newSeal:true, newSealText:res.message});
                    }
                    else{
                        setErrors({...errors, breakSeal:true, breakSealText:res.message});
                    }
                }
            }
            catch(E){
                alert(E.toString()+response);
            }
        })
    }

    const editQuestion = (event) => {
        event.preventDefault();

        let form = event.target;

        $.post("api/", $(form).serialize(), function(response){
            try{
                let res = JSON.parse(response);
                if(res.status){
                    setEdit(false);
                    getRows();
                    Toast("Successfully updated question");
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

    return (
        <>
            <div className="w3-padding bg-alert">
                Manage Seal Opening and Closing Questions
            </div>

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="New Seal" {...a11yProps(0)} style={{textTransform:"none"}} />
                        <Tab label="Break Seal" {...a11yProps(1)} style={{textTransform:"none"}} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <div className="w3-row">
                        <div className="w3-col m8 w3-padding">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Question</TableCell>
                                        <TableCell>Postv Asn.</TableCell>
                                        <TableCell>Neg Asn.</TableCell>
                                        <TableCell>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.filter(r=>(r.type == "new_seal")).map((row,index)=>(
                                        <TableRow hover key={index}>
                                            <TableCell padding="none">{index+1}</TableCell>
                                            <TableCell padding="none" onMouseEnter={e=>{
                                                e.target.getElementsByTagName("a")[0].style.visibility = "visible";
                                            }} onMouseLeave={e=>{
                                                e.target.getElementsByTagName("a")[0].style.visibility = "hidden";
                                            }}>{row.question} <a href="#" onClick={e=>{
                                                setActive(row);
                                                setEdit(true);
                                            }} className="text-success" style={{visibility:"hidden"}}>Edit</a></TableCell>
                                            <TableCell padding="none">{row.positive}</TableCell>
                                            <TableCell padding="none">{row.negative}</TableCell>
                                            <TableCell style={{padding:"4px"}}>
                                                <Button variant="contained" color="error" size="small" style={{textTransform:"none"}}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="w3-col m4 w3-padding">
                            <Typography component="h4">Add new Question</Typography>
                            {errors.newSeal?<Alert severity="error" sx={{mt:1,mb:1}}>{errors.newSealText}</Alert>:""}
                            <form onSubmit={saveQuestion}>
                                <input type="hidden" name="type" value={"new_seal"} />
                                <TextField fullWidth label="Question" sx={{mt:2}} size="small" multiline rows={3} name="question" />
                                <TextField fullWidth sx={{mt:2}} size="small" label="Positive answer" value={answers.positive} onChange={e=>setAnswers({...answers, positive:e.target.value})} name="positive" /> 
                                <TextField fullWidth sx={{mt:2,mb:3}} size="small" label="Negative answer" name="negative" value={answers.negative} onChange={e=>setAnswers({...answers, negative:e.target.value})} /> 

                                <Button type="submit" variant="contained">Save Question</Button>
                            </form>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className="w3-row">
                        <div className="w3-col m8 w3-padding">
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>#</TableCell>
                                        <TableCell>Question</TableCell>
                                        <TableCell>Postv Asn.</TableCell>
                                        <TableCell>Neg Asn.</TableCell>
                                        <TableCell>Delete</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {rows.filter(r=>(r.type == "break_seal")).map((row,index)=>(
                                        <TableRow hover key={index}>
                                            <TableCell padding="none">{index+1}</TableCell>
                                            <TableCell padding="none" onMouseEnter={e=>{
                                                e.target.getElementsByTagName("a")[0].style.visibility = "visible";
                                            }} onMouseLeave={e=>{
                                                e.target.getElementsByTagName("a")[0].style.visibility = "hidden";
                                            }}>{row.question} <a href="#" className="text-success" style={{visibility:"hidden"}}>Edit</a></TableCell>
                                            <TableCell padding="none">{row.positive}</TableCell>
                                            <TableCell padding="none">{row.negative}</TableCell>
                                            <TableCell style={{padding:"4px"}}>
                                                <Button variant="contained" color="error" size="small" style={{textTransform:"none"}}>Delete</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                        <div className="w3-col m4 w3-padding">
                            <Typography component="h4">Add new Question</Typography>
                            {errors.breakSeal?<Alert severity="error" sx={{mt:1,mb:1}}>{errors.breakSealText}</Alert>:""}
                            <form onSubmit={saveQuestion}>
                                <input type="hidden" name="type" value={"break_seal"} />
                                <TextField fullWidth label="Question" sx={{mt:2}} size="small" multiline rows={3} name="question" />
                                <TextField fullWidth sx={{mt:2}} size="small" label="Positive answer" value={answers.positive} onChange={e=>setAnswers({...answers, positive:e.target.value})} name="positive" /> 
                                <TextField fullWidth sx={{mt:2,mb:3}} size="small" label="Negative answer" name="negative" value={answers.negative} onChange={e=>setAnswers({...answers, negative:e.target.value})} /> 

                                <Button type="submit" variant="contained">Save Question</Button>
                            </form>
                        </div>
                    </div>
                </TabPanel>
            </Box>

            <div className="w3-modal" style={{display:(edit?"block":"none")}}>
                <div className="w3-modal-content shadow w3-round-large w3-padding-large" style={{width:"370px"}}>
                    <font className="w3-large">Edit Question</font>

                    <form onSubmit={editQuestion}>
                        <input type="hidden" name="question_id" value={active.id} />
                        <TextField fullWidth label="Question" sx={{mt:2}} size="small" value={active.question} onChange={e=>setActive({...active, question:e.target.value})} multiline rows={3} name="question_edit" />
                        <TextField fullWidth sx={{mt:2}} size="small" label="Positive answer" value={active.positive} onChange={e=>setActive({...active, positive:e.target.value})} name="positive" /> 
                        <TextField fullWidth sx={{mt:2,mb:3}} size="small" label="Negative answer" name="negative" value={active.negative} onChange={e=>setActive({...active, negative:e.target.value})} /> 

                        <div className="w3-row">
                            <div className="w3-half w3-padding">
                                <Button variant="outlined" type="button" fullWidth onClick={e=>{
                                    setEdit(false);
                                }}>Close</Button>
                            </div>
                            <div className="w3-half w3-padding">
                                <Button type="submit" variant="contained" fullWidth>Save</Button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

function WorkProgress(){
    const [value, setValue] = React.useState(0);
    const [days, setDays] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [overtime, setOvertime] = useState([]);
    const [seals, setSeals] = useState([]);
    const [clerks, setClerks] = useState([]);
    const [active,setActive] = useState({});
    const [edit, setEdit] = useState(false);
    const [answers, setAnswers] = useState({
        positive:"Yes",
        negative:"No"
    });
    const [errors, setErrors] = useState({
        newSeal:false,
        newSealText:"",
        breakSeal:false,
        breakSealText:""
    });
    const [modals, setModals] = useState({
        reward:false
    });

    const [page, setPage] = React.useState({
        general:0,
        overtime:0,
        seals:0
    });
    const [rowsPerPage, setRowsPerPage] = React.useState({
        general:25,
        overtime:25,
        seals:25
    });

    const handleChangePage = (event, newPage, table) => {
        setPage({...page, [table]:newPage});
    };
    
    const handleChangeRowsPerPage = (event, table) => {
        setRowsPerPage({...rowsPerPage, [table]:parseInt(event.target.value, 10)});
        setPage({...page, [table]:0});
    };

    const getDays = () => {
        $.post("api/", {getAllDays:"true"}, function(res){
            setDays(res);
        })
    }

    const getHouses = () => {
        $.get("api/", {getHouses:"true"}, function(res){
            setWarehouses(res);
        })
    }

    const getClerks = () => {
        $.get("api/", {getClerks:"true"}, function(res){
            setClerks(res);
        })
    }

    const getSeals = () => {
        $.post("api/", {getSeals:"true"}, function(response){
            try{
                let res = JSON.parse(response);
                setSeals(res);
            }
            catch(E){
                alert(E.toString()+response);
            }
        })
    }

    const getOvertime = () => {
        $.get("api/", {getOvertime:"true"}, function(res){
            setOvertime(res.map(r=>{
                r.checked=false
                return r;
            }));
        })
    }

    useEffect(()=>{
        getDays();
        getHouses();
        getOvertime();
        getSeals();
        getClerks();
    }, []);
    
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const saveQuestion = (event) => {
        event.preventDefault();

        let form = event.target;

        $.post("api/", $(form).serialize(), function(response){
            try{
                let res = JSON.parse(response);
                if(res.status){
                    form.question.value = '';
                    setAnswers({positive:"Yes", negative:"No"});
                    getRows();
                    Toast("Successfully added question");
                }
                else{
                    if(form.type.value == "new_seal"){
                        setErrors({...errors, newSeal:true, newSealText:res.message});
                    }
                    else{
                        setErrors({...errors, breakSeal:true, breakSealText:res.message});
                    }
                }
            }
            catch(E){
                alert(E.toString()+response);
            }
        })
    }

    const filterDays = (event) => {
        event.preventDefault();
        let form = event.target;

        $.post("api/", $(form).serialize(), function(response){
            try{
                let res = JSON.parse(response);

                setDays(res);
            }
            catch(E){
                alert(E.toString()+response);
            }
        })
    }

    const filterSeals = (event) => {
        event.preventDefault();

        //alert("We are here")

        $.post("api/", $(event.target).serialize(), function(response){
            //alert(response);
            try{
                let res = JSON.parse(response);
                setSeals(res);
            }
            catch(E){
                alert(E.toString()+response);
            }
        })
    }

    const downloadDays = () => {
        const heads = ["#", "Date", "Clerk", "Warehouse", "Start time", "End time", "Total", "Overtime"];
        
        let csvContent = "data:text/csv;charset=utf-8,";

        csvContent = heads.join(",") + "\r\n";
        
        days.map((row, index) => {
            let row_str = [index+1, row.day+" "+row.month, row.user_data.name, row.warehouse_data.name, row.start, row.end, row.hours+"hrs", row.overtime+"hrs"].join(",");
            csvContent += row_str + "\r\n";
        });

        let filename = "Attendance";

        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    const downloadOvertime = () => {
        const heads = ["#", "User", "Warehouse", "Hours", "Date"];
        
        let csvContent = heads.join(",") + "\r\n";
        
        overtime.map((row, index) => {
            let row_str = [index+1, row.user_data.name, row.warehouse_data.name, row.amount, row.date].join(",");
            csvContent += row_str + "\r\n";
        });

        let filename = "Overtime";

        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    const downloadSeals = () => {
        const heads = ["#", "Seal No.", "User", "Warehouse","Door", "Created", "Breaked", "Status"];
        
        let csvContent = "data:text/csv;charset=utf-8,";

        csvContent = heads.join(",") + "\r\n";
        
        seals.map((row, index) => {
            let row_str = [index+1, row.seal, row.user_data.name, row.warehouse_data.name, row.room_data.room, row.created, row.breaked, row.breaked == 0 ? "Sealed": "Breaked"].join(",");
            csvContent += row_str + "\r\n";
        });

        let filename = "Seals";

        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    const saveTimeChange = (event) => {
        event.preventDefault();
        let form = event.target;

        $.post("api/", $(form).serialize(), function(response){
            try{
                let res = JSON.parse(response);

                if(res.status){
                    setEdit(false);
                    Toast("Success");
                    getDays();
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

    return (
        <>
            <div className="w3-padding bg-alert">
                View performance of clerks
            </div>

            <Box sx={{ width: '100%', typography: 'body1' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="General Progress" {...a11yProps(0)} style={{textTransform:"none"}} />
                        <Tab label="Overtime" {...a11yProps(1)} style={{textTransform:"none"}} />
                        <Tab label="Seals" {...a11yProps(1)} style={{textTransform:"none"}} />
                        <Tab label="Supervisor Attendance" {...a11yProps(3)} style={{textTransform:"none"}} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <div className="w3-row">
                        <div className="w3-col m12 w3-padding">
                            <form id="filterDays" className="pb-10" onSubmit={filterDays}>
                                Filter records 
                                <select className="form-control" name="filterDaysWarehouse" style={{width:"200px",display:"inline-block"}} required>
                                    <option value={"0"}>--All warehouses--</option>
                                    {warehouses.map((row,index)=>(
                                        <option value={row.id} key={row.id}>{row.name}</option>
                                    ))}
                                </select>
                                <select className="form-control" name="clerk" style={{width:"200px",display:"inline-block"}} required>
                                    <option value={"0"}>--All Clerks--</option>
                                    {clerks.map((row,index)=>(
                                        <option value={row.id} key={row.id}>{row.name}</option>
                                    ))}
                                </select>
                                From: <input type={"date"} name="startDate" className="form-control" style={{width:"200px",display:"inline-block"}} />
                                To: <input type={"date"} name="endDate" className="form-control" style={{width:"200px",display:"inline-block"}} />
                                <Button variant="outlined" sx={{ml:1}} type="submit" style={{textTransform:"none"}}>View</Button> 
                            </form>
                            <Paper>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Contract</TableCell>
                                            <TableCell>Clerk</TableCell>
                                            <TableCell>Group</TableCell>
                                            <TableCell>Warehouse</TableCell>
                                            <TableCell>Start time</TableCell>
                                            <TableCell>End time</TableCell>
                                            <TableCell>Total</TableCell>
                                            <TableCell>Overtime</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {days.slice(rowsPerPage.general*page.general, (page.general+1)*rowsPerPage.general).map((row,index)=>(
                                            <TableRow hover key={index}>
                                                <TableCell padding="none" align="center">{index+1}</TableCell>
                                                <TableCell padding="none">{row.fulldate}</TableCell>
                                                <TableCell padding="none">{row.contract}</TableCell>
                                                <TableCell padding="none">{row.user_data.name}</TableCell>
                                                <TableCell padding="none">{row.warehouse_data.group_name}</TableCell>
                                                <TableCell padding="none">{row.warehouse_data.name}</TableCell>
                                                <TableCell padding="none" onMouseEnter={e=>{
                                                    e.target.getElementsByTagName("a")[0].style.visibility = "visible";
                                                }} onMouseLeave={e=>{
                                                    e.target.getElementsByTagName("a")[0].style.visibility = "hidden";
                                                }}>{row.start} <a href="#" onClick={e=>{
                                                    setActive(row);
                                                    setEdit(true);
                                                }} className="text-success" style={{visibility:"hidden"}}>Edit</a></TableCell>
                                                <TableCell padding="none" onMouseEnter={e=>{
                                                    e.target.getElementsByTagName("a")[0].style.visibility = "visible";
                                                }} onMouseLeave={e=>{
                                                    e.target.getElementsByTagName("a")[0].style.visibility = "hidden";
                                                }}>{row.end} <a href="#" onClick={e=>{
                                                    setActive(row);
                                                    setEdit(true);
                                                }} className="text-success" style={{visibility:"hidden"}}>Edit</a></TableCell>
                                                <TableCell padding="none">{row.hours+"hrs"}</TableCell>
                                                <TableCell padding="none">{row.overtime+"hrs"}</TableCell>
                                                <TableCell style={{padding:"4px"}}>
                                                    <Button variant="contained" color="error" size="small" style={{textTransform:"none"}}>Delete</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[25, 50, 100,200,500]}
                                    component="div"
                                    count={days.length}
                                    rowsPerPage={rowsPerPage.general}
                                    page={page.general}
                                    onPageChange={(event, newPage)=>{handleChangePage(event, newPage, "general")}}
                                    onRowsPerPageChange={(event)=>{handleChangeRowsPerPage(event, "general")}}
                                    />
                            </Paper>

                            {days.length > 0 ? <Button sx={{mt:2,textTransform:"none"}} onClick={downloadDays} color="success" variant="contained">Download Excel</Button>:""}
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className="w3-row">
                        <div className="w3-col m12 w3-padding">
                            <form id="filterOvertime" className="pb-10" onSubmit={filterDays}>
                                Filter records 
                                <select className="form-control" name="filterOvertimeWarehouse" style={{width:"200px",display:"inline-block"}} required>
                                    <option value={""}>--Choose warehouse--</option>
                                    {warehouses.map((row,index)=>(
                                        <option value={row.id} key={row.id}>{row.name}</option>
                                    ))}
                                </select>
                                <select className="form-control" name="clerk" style={{width:"200px",display:"inline-block"}} required>
                                    <option value={"0"}>--All Clerks--</option>
                                    {clerks.map((row,index)=>(
                                        <option value={row.id} key={row.id}>{row.name}</option>
                                    ))}
                                </select>
                                From: <input type={"date"} name="startDate" className="form-control" style={{width:"200px",display:"inline-block"}} />
                                To: <input type={"date"} name="endDate" className="form-control" style={{width:"200px",display:"inline-block"}} />
                                <Button variant="outlined" sx={{ml:1}} type="submit" style={{textTransform:"none"}}>View</Button> 
                            </form>
                            <Paper>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>
                                                <input type={"checkbox"} onChange={e=>{
                                                    if(e.target.checked){
                                                        setOvertime(overtime.map(r=>{
                                                            r.checked=true
                                                            return r;
                                                        }));
                                                    }
                                                    else{
                                                        setOvertime(overtime.map(r=>{
                                                            r.checked=false
                                                            return r;
                                                        }));
                                                    }
                                                }} />
                                            </TableCell>
                                            <TableCell>#</TableCell>
                                            <TableCell>User</TableCell>
                                            <TableCell>Warehouse</TableCell>
                                            <TableCell>Hours.</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Reason</TableCell>
                                            <TableCell>Reward</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {overtime.map((row,index)=>(
                                            <TableRow hover key={index}>
                                                <TableCell padding="none" align="center">
                                                    <input type={"checkbox"} checked={row.checked} onChange={e=>{
                                                        if(e.target.checked){
                                                            setOvertime(overtime.map((r,i)=>{
                                                                if(i == index){
                                                                    r.checked = true;
                                                                }
                                                                return r;
                                                            }))
                                                        }
                                                        else{
                                                            setOvertime(overtime.map((r,i)=>{
                                                                if(i == index){
                                                                    r.checked = false;
                                                                }
                                                                return r;
                                                            }))
                                                        }
                                                    }} />
                                                </TableCell>
                                                <TableCell padding="none">{index+1}</TableCell>
                                                <TableCell padding="none">{row.user_data.name}</TableCell>
                                                <TableCell padding="none">{row.warehouse_data.name}</TableCell>
                                                <TableCell padding="none">{row.amount}</TableCell>
                                                <TableCell padding="none">{row.date}</TableCell>
                                                <TableCell padding="none">{row.reason}</TableCell>
                                                <TableCell style={{padding:"4px"}}>
                                                    <Button variant="contained" size="small" onClick={e=>{
                                                        $.post("api/", {rewardOvertime:row.id}, function(res){
                                                            Toast(res);
                                                            getOvertime();
                                                        })
                                                    }} style={{textTransform:"none"}}>Reward</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[25, 50, 100,200,500]}
                                    component="div"
                                    count={overtime.length}
                                    rowsPerPage={rowsPerPage.overtime}
                                    page={page.overtime}
                                    onPageChange={(event, newPage)=>{handleChangePage(event, newPage, "overtime")}}
                                    onRowsPerPageChange={(event)=>{handleChangeRowsPerPage(event, "overtime")}}
                                    />
                            </Paper>
                            <div className="pt-10 pb-10">
                                {overtime.filter(r=>(r.checked)).length > 0 ? <>
                                    <font className="block">Reward these ({overtime.filter(r=>(r.checked)).length}) selected overtime records</font>
                                    <Button variant="contained" onClick={e=>{
                                        setModals({...modals, reward:true});
                                    }}>Reward</Button>
                                </>:""}

                                {overtime.length > 0 ? <Button sx={{mt:2,textTransform:"none"}} onClick={downloadOvertime} color="success" variant="contained">Download Excel</Button>:""}
                            </div>
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={2}>
                    <div className="w3-row">
                        <div className="w3-col m12 w3-padding">
                            <form id="filterOvertime" className="pb-10" onSubmit={filterSeals}>
                                Filter records 
                                <select className="form-control" name="filterSeals" style={{width:"200px",display:"inline-block"}} required>
                                    <option value={"0"}>--Choose warehouse--</option>
                                    {warehouses.map((row,index)=>(
                                        <option value={row.id} key={row.id}>{row.name}</option>
                                    ))}
                                </select>
                                <select className="form-control" name="clerk" style={{width:"200px",display:"inline-block"}} required>
                                    <option value={"0"}>--All Clerks--</option>
                                    {clerks.map((row,index)=>(
                                        <option value={row.id} key={row.id}>{row.name}</option>
                                    ))}
                                </select>
                                From: <input type={"date"} name="startDate" className="form-control" style={{width:"200px",display:"inline-block"}} />
                                To: <input type={"date"} name="endDate" className="form-control" style={{width:"200px",display:"inline-block"}} />
                                <Button variant="outlined" sx={{ml:1}} type="submit" style={{textTransform:"none"}}>View</Button> 
                            </form>
                            <Paper>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Seal No.</TableCell>
                                            <TableCell>User</TableCell>
                                            <TableCell>Warehouse</TableCell>
                                            <TableCell>Door</TableCell>
                                            <TableCell>Created</TableCell>
                                            <TableCell>Breaked</TableCell>
                                            <TableCell>Status</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {seals.slice(rowsPerPage.seals*page.seals, (page.seals+1)*rowsPerPage.seals).map((row,index)=>(
                                            <TableRow hover key={index}>
                                                <TableCell padding="none" align="center">{index+1}</TableCell>
                                                <TableCell padding="none">{row.seal}</TableCell>
                                                <TableCell padding="none">{row.user_data.name}</TableCell>
                                                <TableCell padding="none">{row.warehouse_data.name}</TableCell>
                                                <TableCell padding="none">{row.room_data.room}</TableCell>
                                                <TableCell padding="none">{row.created}</TableCell>
                                                <TableCell padding="none">{row.breaked}</TableCell>
                                                <TableCell style={{padding:"5px"}}>
                                                    {row.breaked == 0 ? "Sealed": "Breaked"}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[25, 50, 100,200,500]}
                                    component="div"
                                    count={seals.length}
                                    rowsPerPage={rowsPerPage.seals}
                                    page={page.seals}
                                    onPageChange={(event, newPage)=>{handleChangePage(event, newPage, "seals")}}
                                    onRowsPerPageChange={(event)=>{handleChangeRowsPerPage(event, "seals")}}
                                    />
                            </Paper>

                            {seals.length > 0 ? <Button sx={{mt:2,textTransform:"none"}} onClick={downloadSeals} color="success" variant="contained">Download Excel</Button>:""}
                        </div>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={3}>
                    <SupervisorAttendance />
                </TabPanel>
            </Box>

            <div className="w3-modal" style={{display:(modals.reward?"block":"none")}}>
                <div className="w3-modal-content shadow w3-round-large pt-30 pl-10 pr-10 pb-40" style={{width:"400px"}}>
                    <font className="block w3-large">Confirm reward</font>

                    <font className="block mt-25">Reward these ({overtime.filter(r=>(r.checked)).length}) selected overtime records</font>
                    <div className="w3-row pt-20">
                        <div className="w3-half w3-padding">
                            <Button variant="outlined" fullWidth onClick={e=>{
                                setModals({...modals, reward:false});
                            }}>Close</Button>
                        </div>
                        <div className="w3-half w3-padding">
                            <Button variant="contained" fullWidth onClick={()=>{
                                Toast(overtime.filter(r=>(r.checked)).map(r=>(r.id)).toString());

                                $.post("api/", {rewardOvertimes:String(overtime.filter(r=>(r.checked)).map(r=>(r.id)).toString())}, function(res){
                                    if(res.status){
                                        setModals({...modals, reward:false});
                                        getOvertime();
                                    }
                                    else{
                                        Toast(res.message);
                                    }
                                })
                            }}>Confirm</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w3-modal" style={{display:(edit?"block":"none")}}>
                <div className="w3-modal-content shadow w3-round-large pt-30 pl-10 pr-10 pb-40" style={{width:"400px"}}>
                    <font className="block w3-large">Edit Start time and End time</font>

                    <Alert severity="info" sx={{mt:1,mb:1}}>Please note that overtime will not be reward, from change you are going to make</Alert>

                    <form onSubmit={saveTimeChange}>
                        <input type={"hidden"} name="day_id" value={active.id} />
                        <p>
                            Start time
                            <input type={"time"} className="form-control" name="edit_start_time" value={active.start_time} onChange={e=>setActive({...active, start_time:e.target.value})} required />
                        </p>
                        <p>
                            End time
                            <input type={"time"} className="form-control" name="edit_end_time" value={active.end_time} onChange={e=>setActive({...active, end_time:e.target.value})} required />
                        </p>
                        <p>
                            <Button variant="contained" type="submit">Update</Button>
                        </p>
                    </form>
                    <div className="w3-row pt-20">
                        <div className="w3-half w3-padding">&nbsp;</div>
                        <div className="w3-half w3-padding">
                            <Button variant="outlined" fullWidth onClick={e=>{
                                setEdit(false);
                            }}>Close</Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

function MenuButton(props){
    return(
        <div className={"w3-round-large some-padding hover-me w3-text-white w3-row pointer "+(props.isActive!=undefined?props.isActive?"active1 ":"":"")} onClick={props.onClick!=undefined?props.onClick:()=>{}}>
            <div style={{width:"40px",paddingTop:(props.isActive?"7px":"")}} className="w3-center w3-col">
                <i className={props.data.icon+" w3-opacity"} style={{fontSize:"1.2rem"}} />
            </div>
            <div className="w3-rest">
                <font className="block">{props.data.name}</font>
                {props.isActive?
                    <font className="block" style={{fontSize:"11px",opacity:"0.5"}}>{props.data.label}</font>:""
                }
            </div>
        </div>
    );
}

function Home(){
    const [dashData,setData] = useState({
        staff:0,
        clerks:0,
        warehouses:0,
        profit:0
    });

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
            <ThemeProvider theme={theme}>
                <h4 className="w3-padding">System Information</h4>
                <div className="w3-padding">
                    <div className="w3-row">
                        <div className="w3-col m2 w3-padding-small">
                            <div className="w3-round w3-light-grey w3-padding">
                                <font className="w3-large block">{dashData.staff}</font>
                                <font>All Staff</font>
                            </div>
                        </div>
                        <div className="w3-col m2 w3-padding-small">
                            <div className="w3-round alert-secondary w3-padding">
                                <font className="w3-large block">{dashData.clerks}</font>
                                <font>Clerks</font>
                            </div>
                        </div>
                        <div className="w3-col m2 w3-padding-small">
                            <div className="w3-round alert-success w3-padding">
                                <font className="w3-large block">{dashData.warehouses}</font>
                                <font>Warehouses</font>
                            </div>
                        </div>
                        <div className="w3-col m2 w3-padding-small">
                            <div className="w3-round alert-info w3-padding">
                                <font className="w3-large block">{dashData.profit}</font>
                                <font>.</font>
                            </div>
                        </div>
                        <div className="w3-col m2 w3-padding-small">
                            <div className="w3-round alert-danger w3-padding">
                                <font className="w3-large block">{dashData.profit}</font>
                                <font>.</font>
                            </div>
                        </div>
                        <div className="w3-col m2 w3-padding-small">
                            <div className="w3-round alert-warning w3-padding">
                                <font className="w3-large block">{"Good"}</font>
                                <font>Usage Status</font>
                            </div>
                        </div>
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
}

function Users(){
    const [users, setUsers] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    const [word, setWord] = useState("");
    const [users_filtered, setFilteredUsers] = useState([]);
    const [open, setOpen] = useState(false);
    const [allocation, setAllocation] = useState(false);
    const [allocations, setAllocations] = useState([]);
    const [active, setActive] = useState({});
    const [add, setAdd] = useState(false);
    const [error, setError] = useState("");
    const [anchor, setAnchor] = useState("right");

    const getUsers = () => {
        $.get("api/", {getAllUsers:"true"}, function(res){
            setUsers(res);
            setFilteredUsers(res);
        })
    }

    const saveStaff = (event) => {
        event.preventDefault();
        let form = event.target;

        $.post("api/", $(form).serialize(), function(response){
            try{
                let res = JSON.parse(response);

                if(res.status){
                    Toast("Successfully added staff")
                    setAdd(false);
                    form.reset();
                    getUsers();
                }
                else{
                    setError(res.message);
                }
            }
            catch(E){
                alert(E.toString()+response);
            }
        })
    }

    const editStaff = (event) => {
        event.preventDefault();
        let form = event.target;

        $.post("api/", $(form).serialize(), function(response){
            try{
                let res = JSON.parse(response);

                if(res.status){
                    Toast("Successfully updated staff")
                    form.reset();
                    getUsers();
                    setState({...state, right:false});
                }
                else{
                    setError(res.message);
                }
            }
            catch(E){
                alert(E.toString()+response);
            }
        })
    }

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    useEffect(()=>{
        getUsers();
    }, []);

    useEffect(()=>{
        //perform search
        setFilteredUsers(users.filter(row=>(
            row.name.toLowerCase().indexOf(word.toLowerCase()) != (0-1)
        )))
    }, [word]);

    const getAllocations = () => {
        $.get("api/", {getSupervisorAllocations:active.id}, function(res){
            setAllocations(res);
        })
    }

    useEffect(()=>{
        if(active.type == "supervisor"){
            getAllocations();
        }
        else{
            setAllocations([]);
        }
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
    };

    useEffect(()=>{
        $.post("api/", {changeUserStatus:active.id,status:active.status}, function(res){
            getUsers();
        })
    }, [active.status]);

    const deleteUser = (active) => {
        $.post("api/", {deleteStaff:active.id}, function(response){
            setState({...state, right:false});
            getUsers();
            Toast(response);
        })
    }

    const resetPassword = (user) => {
        $.post("api/", {resetPasswordStaff:user.id}, function(res){
            if(res.status){
                Toast("Success");
            }
            else{
                Toast("Failed");
            }
        })
    }

    return(
        <>
            <ThemeProvider theme={theme}>
                <div className="w3-padding alert-success">Manage Admins and Supervisors</div>
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
                    <Button variant="contained" sx={{mt:1,mb:1}}  onClick={e=>{
                        setAdd(true);
                    }}>Add User</Button>
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
                                        <TableCell>Email</TableCell>
                                        <TableCell>Type</TableCell>
                                        <TableCell>Allocations</TableCell>
                                        <TableCell>Status</TableCell>
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
                                                
                                                <TableCell>{row.email}</TableCell>
                                                <TableCell>{row.type}</TableCell>
                                                <TableCell>{row.type == "supervisor" ? <Button size="small" style={{textTransform:"none"}} onClick={e=>{
                                                    setAllocation(true);
                                                    setActive(row);
                                                }} color="success">Allocations</Button>:""}</TableCell>
                                                <TableCell>{row.status}</TableCell>
                                                
                                                <TableCell>
                                                    <Button variant="contained" size="small"  sx={{mr:1}} onClick={event=>{
                                                        setActive({...active, ...row});
                                                        toggleDrawer("right", true)
                                                        setState({...state, right:true})
                                                        //setOpen(true);
                                                    }} style={{textTransform:"none"}}>Edit</Button>
                                                </TableCell>
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

                            <TextField label="Amount" size="small" name="amount"  defaultValue="5000" type="number" fullWidth />

                            <Button variant="contained" sx={{mt:2, mb:2}}  className="sm-text" type="submit">Submit</Button>
                        </form>
                        <div className="pt-15 pb-15 clearfix">
                            <Button variant="contained" color="error" className="float-right" onClick={event=>{
                                setOpen(false);
                            }}>Close</Button>
                        </div>
                    </div>
                </div>

                <div className="w3-modal" style={{display:(allocation?"block":"none")}}>
                    <div className="w3-modal-content shadow rounded w3-padding-large" style={{width:"350px"}}>
                        <font className="w3-large block">{active.name+"'s allocations"}</font>
                        <div className="pt-10 pb-10">
                            {allocations.map((row,index)=>(
                                <div className="w3-padding w3-border-bottom clearfix">
                                    <font>{row.name}</font>
                                    <i className="fa fa-times w3-hover-text-red pointer float-right" onClick={e=>{
                                        $.get("api/", {removeSupervisor:row.id}, function(res){
                                            //Toast(res);
                                            getAllocations();
                                        })
                                    }}></i>
                                </div>
                            ))}
                        </div>

                        
                        <div className="pt-15 pb-15 clearfix">
                            <Button variant="contained" color="error" className="float-right" onClick={event=>{
                                setAllocation(false);
                            }}>Close</Button>
                        </div>
                    </div>
                </div>

                <div className="w3-modal" style={{display:(add?"block":"none")}}>
                    <div className="w3-modal-content w3-card-8 w3-round-large w3-padding" style={{width:"400px"}}>
                        <font className="w3-large block pt-10 w3-text-black">Add new Staff</font>
                        
                        {error.length > 0?<Alert severity="error">{error}</Alert>:""}

                        <form className="pt-30" onSubmit={saveStaff}>
                            <TextField fullWidth name="staff_name" hiddenLabel label="Name" size="small"  />
                            <TextField fullWidth name="email" label="Email" hiddenLabel sx={{mt:2}} size="small"  />
                            <TextField fullWidth name="password" label="Set Password" hiddenLabel sx={{mt:2, mb:2}} type="password" size="small"  />
                            <TextField select label="Account type" size="small" hiddenLabel name="type"  fullWidth>
                                {["superadmin","admin", "supervisor"].map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            
                            <div className="w3-row pb-10 pt-30">
                                <div className="w3-half w3-padding-small">
                                    <Button variant="outlined" className="float-right" fullWidth onClick={event=>setAdd(false)}>Close</Button>
                                </div>
                                <div className="w3-half w3-padding-small">
                                    <Button variant="contained" type="submit" fullWidth>Submit</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                <Drawer
                    anchor="right"
                    open={state.right}
                    onClose={toggleDrawer(anchor, false)}
                    >
                    <div style={{width:"400px"}} className="w3-padding-large">
                        <Typography component="h3">Update {active.type}</Typography>

                        <form className="pt-30" onSubmit={editStaff}>
                            <input type={"hidden"} name="staff_id" value={active.id} />
                            <TextField fullWidth name="staff_name_edit" value={active.name} onChange={e=>setActive({...active, name:e.target.value})} hiddenLabel label="Name" size="small"  />
                            <TextField fullWidth name="email" label="Email" hiddenLabel sx={{mt:2}} size="small" value={active.email} onChange={e=>setActive({...active, email:e.target.value})}  />
                            <TextField select label="Account type" size="small" hiddenLabel sx={{mt:2}} name="type" value={active.type} onChange={e=>setActive({...active, type:e.target.value})}  fullWidth>
                                {["superadmin", "admin", "supervisor"].map((option) => (
                                    <MenuItem key={option} value={option}>
                                        {option}
                                    </MenuItem>
                                ))}
                            </TextField>
                            
                            <div className="w3-row pb-10 pt-30">
                                <div className="w3-half w3-padding-small">
                                    <Button variant="outlined" className="float-right" fullWidth onClick={event=>setState({...state, right:false})}>Close</Button>
                                </div>
                                <div className="w3-half w3-padding-small">
                                    <Button variant="contained" type="submit" fullWidth>Submit</Button>
                                </div>
                            </div>
                        </form>

                        <Divider />
                        <div className="clearfix pt-40">
                            <span className="w3-padding">
                                <font className="block">Account Status</font>
                                <font className="w3-small w3-opacity">{active.status}</font>
                            </span>
                            <Switch label="Sample" className="float-right" checked={active.status == "active"} onChange={e=>{
                                if(e.target.checked){
                                    setActive({...active, status:"active"});
                                }
                                else{
                                    setActive({...active, status:"deactivated"});
                                }
                            }} />
                        </div>
                        <Divider />
                        <div className="pt-30">
                            <Button color="error" style={{textTransform:"none"}} variant="contained" onClick={e=>deleteUser(active)}>Delete</Button>
                            <Button sx={{textTransform:"none",ml:2}} variant="outlined" onClick={e=>resetPassword(active)}><i className="fa fa-redo-alt mr-10" />  Reset Password</Button>
                        </div>
                    </div>
                </Drawer>
            </ThemeProvider>
        </>
    )
}

function Warehouse(){
    const [rows, setRows] = useState([]);
    const [groups, setGroups] = useState([]);
    const [open, setOpen] = useState(false);
    const [add, setAdd] = useState(false);
    const [error, setError] = useState("");
    const [value, setValue] = React.useState(0);
    const [active, setActive] = useState({
        rooms:[]
    });
    const [anchor, setAnchor] = useState("right");
    const [users, setUsers] = useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const getUsers = () => {
        $.get("api/", {getAllUsers:"true"}, function(res){
            setUsers(res);
        })
    }

    const saveWarehouse = (event) => {
        event.preventDefault();
        let form = event.target;

        $.post("api/", $(form).serialize(), function(res){
            if(res.status){
                Toast("Successfully added warehouse")
                setOpen(false);
                form.reset();
                getHouses();
            }
            else{
                setError(res.message);
            }
        })
    }

    const editWarehouse = (event) => {
        event.preventDefault();
        let form = event.target;

        $.post("api/", $(form).serialize(), function(res){
            if(res.status){
                Toast("Successfully updated warehouse")
                setState({...state, warehouse:false});
                form.reset();
                getHouses();
            }
            else{
                setError(res.message);
            }
        })
    }

    const [page, setPage] = React.useState({
        warehouse:0,
        groups:0,
    });
    const [rowsPerPage, setRowsPerPage] = React.useState({
        warehouse:25,
        groups:25,
    });

    const handleChangePage = (event, newPage, table) => {
        setPage({...page, [table]:newPage});
    };
    
    const handleChangeRowsPerPage = (event, table) => {
        setRowsPerPage({...rowsPerPage, [table]:parseInt(event.target.value, 10)});
        setPage({...page, [table]:0});
    };

    const [state, setState] = useState({
        groups:false,
        warehouse:false,
        rooms:false
    })

    const saveWarehouseGroup = (event) => {
        event.preventDefault();
        let form = event.target;

        $.post("api/", $(form).serialize(), function(res){
            if(res.status){
                Toast("Successfully added warehouse group")
                setAdd(false);
                form.reset();
                getGroups();
            }
            else{
                setError(res.message);
            }
        })
    }

    const getHouses = () => {
        $.get("api/", {getHouses:"true"}, function(res){
            setRows(res);
        })
    }

    const getGroups = () => {
        $.get("api/", {getGroups:"true"}, function(res){
            setGroups(res);
        })
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    useEffect(()=>{
        getHouses();
        getGroups();
        getUsers();
    }, []);

    const updateWarehouseStatus = (active,status) => {
        $.post("api/", {updateWarehouseStatus:active.id, status}, function(res){
            Toast(res);
            getHouses();
        })
    }

    const saveRooms = (event) => {
        event.preventDefault();

        $.post("api/", $(event.target).serialize(), function(res){
            if(res.status){
                getHouses();
                setState({...state, rooms:false});
                Toast("Success");
            }
            else{
                Toast(res.message);
            }
        })
    }

    return (
        <>
            <div className="w3-padding alert-warning">Manage Warehouses</div>
            <Box sx={{ width: '100%', typography: 'body1' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="lab API tabs example">
                        <Tab label="Available Warehouses" {...a11yProps(0)} style={{textTransform:"none"}} />
                        <Tab label="Groups" {...a11yProps(1)} style={{textTransform:"none"}} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <div className="w3-padding">
                        <Button sx={{mt:1,mb:1}} variant="contained" onClick={e=>{setOpen(true)}} >Add Warehouse</Button>
                    </div>
                    <div className="w3-padding">
                        <Paper sx={{ width: '100%'}}>
                            <TableContainer>
                                <MaterialUI.Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Group</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Location</TableCell>
                                            <TableCell>Coordinates</TableCell>
                                            <TableCell>Doors</TableCell>
                                            <TableCell>Clerks</TableCell>
                                            <TableCell>Status</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows.map((row,index)=>(
                                            <TableRow>
                                                <TableCell padding="none" align="center">{index+1}</TableCell>
                                                <TableCell>{row.group.name}</TableCell>
                                                <TableCell padding="none">{row.name}</TableCell>
                                                <TableCell padding="none">{row.location}</TableCell>
                                                <TableCell padding="none">{row.coordinates}</TableCell>
                                                <TableCell padding="none">{row.rooms.length} <Link href="#" onClick={e=>{
                                                    setActive(row);
                                                    setState({...state, rooms:true});
                                                }}>Manage</Link></TableCell>
                                                <TableCell padding="none">{row.clerks}</TableCell>
                                                <TableCell padding="none">{row.status}</TableCell>
                                                <TableCell style={{padding:"5px"}}>
                                                    <Button variant="contained" size="small" onClick={e=>{
                                                        setActive(row);
                                                        setState({...state, warehouse:true});
                                                    }}>Manage</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </MaterialUI.Table>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 50, 100,200,500]}
                                    component="div"
                                    count={rows.length}
                                    rowsPerPage={rowsPerPage.warehouse}
                                    page={page.warehouse}
                                    onPageChange={(event, newPage)=>{handleChangePage(event, newPage, "warehouse")}}
                                    onRowsPerPageChange={(event)=>{handleChangeRowsPerPage(event, "warehouse")}}
                                    />
                            </TableContainer>
                        </Paper>
                    </div>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <div className="w3-padding">
                        <Button sx={{mt:1,mb:1}} variant="contained" onClick={e=>{setAdd(true)}} >Add A Group</Button>
                    </div>
                    <div className="w3-padding">
                        <Paper sx={{ width: '100%'}}>
                            <TableContainer>
                                <MaterialUI.Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>#</TableCell>
                                            <TableCell>Name</TableCell>
                                            <TableCell>Owner Email</TableCell>
                                            <TableCell>Warehouses</TableCell>
                                            <TableCell>Action</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {groups.map((row,index)=>(
                                            <TableRow hover key={index}>
                                                <TableCell padding="none" align="center">{index+1}</TableCell>
                                                <TableCell padding="none">{row.name}</TableCell>
                                                <TableCell padding="none">{row.owner_email}</TableCell>
                                                <TableCell padding="none">{row.warehouses}</TableCell>
                                                <TableCell style={{padding:"5px"}}>
                                                    <Button variant="contained" size="small" onClick={e=>{
                                                        setActive(row);
                                                        setState({...state, groups:true});
                                                    }}>Manage</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </MaterialUI.Table>
                                <TablePagination
                                    rowsPerPageOptions={[5, 10, 25, 50, 100,200,500]}
                                    component="div"
                                    count={groups.length}
                                    rowsPerPage={rowsPerPage.groups}
                                    page={page.groups}
                                    onPageChange={(event, newPage)=>{handleChangePage(event, newPage, "groups")}}
                                    onRowsPerPageChange={(event)=>{handleChangeRowsPerPage(event, "groups")}}
                                    />
                            </TableContainer>
                        </Paper>
                    </div>
                </TabPanel>
            </Box>

            <div className="w3-modal" style={{display:(open?"block":"none")}}>
                <div className="w3-modal-content shadow rounded w3-padding-large" style={{width:"450px"}}>
                    <font className="w3-large">Add new Warehouse</font>
                    
                    {error.length > 0?<Alert severity="error">{error}</Alert>:""}

                    <form className="pt-30" onSubmit={saveWarehouse}>
                        <TextField select label="Group name" size="small" name="parent"  fullWidth>
                            {groups.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField fullWidth name="warehouse_name" sx={{mt:2}} label="Warehouse Name" size="small"  />
                        <TextField fullWidth name="location" label="Location Name" sx={{mt:2}} size="small"  />
                        <TextField fullWidth name="no_rooms_add" sx={{mt:2}} label="No. of rooms" type="number" size="small"  />
                        <TextField fullWidth name="coordinates" label="Coordinates" sx={{mt:2, mb:2}} size="small"  />
                        
                        <div>
                            <Button variant="contained" sx={{mt:3}} type="submit" >Submit</Button>
                        </div>
                    </form>
                    <div className="pt-10 pb-10 clearfix">
                        <Button variant="contained" color="error" size="small" className="float-right" onClick={event=>setOpen(false)}>Close</Button>
                    </div>
                </div>
            </div>

            <div className="w3-modal" style={{display:(state.rooms?"block":"none")}}>
                <div className="w3-modal-content shadow rounded w3-padding-large" style={{width:"400px"}}>
                    <font className="w3-large block">Manage doors - {active.name}</font>
                    
                    <Typography sx={{mt:2}}>Add more doors</Typography>
                    <form className="" onSubmit={saveRooms}>
                        <input type="hidden" name="warehouse_id" value={active.id} />
                        <TextField fullWidth name="no_rooms_add" sx={{mt:2}} label="No. of rooms" type="number" size="small"  />
                        <div>
                            <Button variant="contained" sx={{mt:3}} type="submit" >Create</Button>
                        </div>
                    </form>
                    <Typography sx={{mt:2}}>Available doors</Typography>
                    {active.rooms.map((row,index)=>(
                        <div className="w3-padding w3-border-bottom clearfix">
                            {row.room} 
                            <span className="float-right">
                                <Chip size="small" label="Edit" />
                                <Chip size="small" color="error" sx={{ml:1}} label="Delete" />
                            </span>
                        </div>
                    ))}
                    <div className="pt-10 pb-10 clearfix">
                        <Button variant="contained" color="error" size="small" className="float-right" onClick={event=>setState({...state, rooms:false})}>Close</Button>
                    </div>
                </div>
            </div>

            <div className="w3-modal" style={{display:(add?"block":"none")}}>
                <div className="w3-modal-content shadow rounded w3-padding-large" style={{width:"450px"}}>
                    <font className="w3-large">Add new Warehouse Group</font>
                    
                    {error.length > 0?<Alert severity="error">{error}</Alert>:""}

                    <form className="pt-30" onSubmit={saveWarehouseGroup}>
                        <TextField fullWidth name="warehouse_group_name" label="Group Name" size="small"  />
                        <TextField fullWidth name="owner_email" sx={{mt:2}} label="Owner Email" size="small"  />
                        
                        <div>
                            <Button variant="contained" sx={{mt:3}} type="submit" >Submit</Button>
                        </div>
                    </form>
                    <div className="pt-10 pb-10 clearfix">
                        <Button variant="contained" color="error" size="small" className="float-right" onClick={event=>setAdd(false)}>Close</Button>
                    </div>
                </div>
            </div>

            <Drawer
                anchor="right"
                open={state.warehouse}
                onClose={toggleDrawer("warehouse", false)}
                >
                <div style={{width:"400px"}} className="w3-padding-large">
                    <Typography component="h3">Update warehouse</Typography>

                    <form className="pt-30 pb-20" onSubmit={editWarehouse}>
                        <input type={"hidden"} name="warehouse_id" value={active.id} />
                        <TextField select label="Group name" size="small" name="parent" value={active.parent} onChange={e=>setActive({...active, parent:e.target.value})} fullWidth>
                            {groups.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField select label="Supervisor" size="small" sx={{mt:2}} name="supervisor" value={active.supervisor} onChange={e=>setActive({...active, supervisor:e.target.value})} fullWidth>
                            <MenuItem value={0}>{"--No supervisor--"}</MenuItem>
                            {users.filter(r=>r.type=="supervisor").map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField fullWidth name="warehouse_name_edit" sx={{mt:2}} label="Warehouse Name" value={active.name} onChange={e=>setActive({...active, name:e.target.value})} size="small"  />
                        <TextField fullWidth name="location" label="Location Name" sx={{mt:2}} size="small" value={active.location} onChange={e=>setActive({...active, location:e.target.value})} />
                        <TextField fullWidth name="coordinates" label="Coordinates" sx={{mt:2, mb:2}} value={active.coordinates} onChange={e=>setActive({...active, coordinates:e.target.value})} size="small"  />
                        
                        <div>
                            <Button variant="contained" sx={{mt:3}} type="submit" >Save Changes</Button>
                        </div>
                    </form>

                    <Divider />
                    <div className="clearfix pt-40">
                        <span className="w3-padding">
                            <font className="block">Account Status</font>
                            <font className="w3-small w3-opacity">{active.status}</font>
                        </span>
                        <Switch label="Sample" className="float-right" checked={active.status == "active"} onChange={e=>{
                            let status = "active";
                            if(e.target.checked){
                                setActive({...active, status:"active"});
                            }
                            else{
                                setActive({...active, status:"deactivated"});
                                status = "deactivated";
                            }

                            updateWarehouseStatus(active, status);
                        }} />
                    </div>
                    <Divider />
                    <div className="pt-30">
                        <Button color="error" style={{textTransform:"none"}} variant="contained" onClick={e=>deleteUser(active)}>Finish Contract</Button>
                    </div>
                </div>
            </Drawer>
        </>
    )
}

function Clerks(){
    const [rows, setRows] = useState([]);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");
    const [houses, setHouses] = useState([]);
    const [anchor, setAnchor] = useState("right");
    const [active, setActive] = useState({});
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const [state, setState] = React.useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setState({ ...state, [anchor]: open });
    };

    const saveClerk = (event) => {
        event.preventDefault();
        let form = event.target;

        $.post("api/", $(form).serialize(), function(response){
            try{
                let res = JSON.parse(response);

                if(res.status){
                    Toast("Successfully added clerk")
                    setOpen(false);
                    form.reset();
                    getClerks();
                }
                else{
                    setError(res.message);
                }
            }
            catch(E){
                alert(E.toString()+response);
            }
        })
    }

    const editClerk = (event) => {
        event.preventDefault();
        let form = event.target;

        $.post("api/", $(form).serialize(), function(response){
            try{
                let res = JSON.parse(response);

                if(res.status){
                    Toast("Successfully updated clerk")
                    setState({...state, right:false});
                    form.reset();
                    getClerks();
                }
                else{
                    setError(res.message);
                }
            }
            catch(E){
                alert(E.toString()+response);
            }
        })
    }

    const getClerks = () => {
        $.get("api/", {getClerks:"true"}, function(res){
            setRows(res);
        })
    }

    const getHouses = () => {
        $.get("api/", {getHouses:"true"}, function(res){
            setHouses(res);
        })
    }

    const resetPassword = (user) => {
        $.post("api/", {resetPassword:user.id}, function(res){
            if(res.status){
                Toast("Success");
            }
            else{
                Toast("Failed");
            }
        })
    }

    useEffect(()=>{
        getClerks();
        getHouses();
    }, []);

    useEffect(()=>{
        $.post("api/", {changeClerkStatus:active.id,status:active.status}, function(res){
            getClerks();
        })
    }, [active.status]);

    const deleteUser = (active) => {
        $.post("api/", {deleteClerk:active.id}, function(response){
            setState({...state, right:false});
            getClerks();
            Toast(response);
        })
    }

    const getFilteredClerks = (event) => {
        event.preventDefault();
        let form = event.target;

        $.post("api/", $(form).serialize(), function(res){
            setRows(res);
        })
    }

    return (
        <>
            <div className="w3-padding bg-alert">Manage Clerks</div>
            <div className="w3-padding">
                <Button sx={{mt:1,mb:1}} variant="contained" onClick={e=>{setOpen(true)}}>Add Clerk</Button>
            </div>
            <div className="w3-padding">
                <form onSubmit={getFilteredClerks}>
                    Filter records 
                    <select className="form-control" name="filterClerks" style={{width:"200px",display:"inline-block"}} required>
                        <option value={"0"}>--Choose warehouse--</option>
                        {houses.map((row,index)=>(
                            <option value={row.id} key={row.id}>{row.name}</option>
                        ))}
                    </select>
                    
                    <Button variant="outlined" sx={{ml:1}} type="submit" style={{textTransform:"none"}}>View</Button> 
                </form>
            </div>
            <div className="w3-padding">
                <Paper sx={{ width: '100%'}}>
                    <TableContainer>
                        <MaterialUI.Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>#</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Email</TableCell>
                                    <TableCell>Phone</TableCell>
                                    <TableCell>Status</TableCell>
                                    <TableCell>Date Reg</TableCell>
                                    <TableCell>Warehouse</TableCell>
                                    <TableCell>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map((row,index)=>(
                                    <TableRow hover key={index}>
                                        <TableCell padding="none" align="center">{index+1}</TableCell>
                                        <TableCell padding="none">{row.name}</TableCell>
                                        <TableCell padding="none">{row.email}</TableCell>
                                        <TableCell padding="none">{row.phone}</TableCell>
                                        <TableCell padding="none">{row.status}</TableCell>
                                        <TableCell padding="none">{row.date}</TableCell>
                                        <TableCell padding="none">{row.warehouse_data.name}</TableCell>
                                        <TableCell style={{padding:"5px"}}>
                                            <Button variant="outlined" size="small" onClick={e=>{
                                                setActive(row);
                                                setState({...state, right:true});
                                            }}>Manage</Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </MaterialUI.Table>
                    </TableContainer>
                    <TablePagination
                            rowsPerPageOptions={[5, 10, 25, 50, 100,200,500]}
                            component="div"
                            count={rows.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            onPageChange={handleChangePage}
                            onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                </Paper>
            </div>

            <div className="w3-modal" style={{display:(open?"block":"none")}}>
                <div className="w3-modal-content shadow rounded w3-padding-large" style={{width:"450px"}}>
                    <font className="w3-large">Add new Clerk</font>
                    
                    {error.length > 0?<Alert severity="error">{error}</Alert>:""}

                    <form className="pt-30" onSubmit={saveClerk}>
                        <TextField fullWidth name="clerk_name" label="Name" size="small"  />
                        <TextField fullWidth name="phone" label="Phone" sx={{mt:2}} size="small"  />
                        <TextField fullWidth name="email" label="Email" sx={{mt:2}} size="small"  />
                        <TextField fullWidth name="password" label="Set Password" sx={{mt:2, mb:2}} type="password" size="small"  />
                        <TextField select label="Warehouse" size="small" name="warehouse"  fullWidth>
                            {houses.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        
                        <div>
                            <Button variant="contained" sx={{mt:3}} type="submit" >Submit</Button>
                        </div>
                    </form>
                    <div className="pt-10 pb-10 clearfix">
                        <Button variant="contained" color="error" size="small" className="float-right" onClick={event=>setOpen(false)}>Close</Button>
                    </div>
                </div>
            </div>

            <Drawer
                anchor="right"
                open={state.right}
                onClose={toggleDrawer(anchor, false)}
                >
                <div style={{width:"400px"}} className="w3-padding-large">
                    <Typography component="h3">Update {active.type}</Typography>

                    <form className="pt-30 pb-20" onSubmit={editClerk}>
                        <input type={"hidden"} name="clerk_id" value={active.id} />
                        <TextField fullWidth name="clerk_name_edit" label="Name" size="small" value={active.name} onChange={e=>setActive({...active, name:e.target.value})} />
                        <TextField fullWidth name="phone" label="Phone" sx={{mt:2}} size="small" value={active.phone} onChange={e=>setActive({...active, phone:e.target.value})} />
                        <TextField fullWidth name="email" label="Email" sx={{mt:2}} size="small" value={active.email} onChange={e=>setActive({...active, email:e.target.value})} />
                        
                        <TextField select label="Warehouse" size="small" sx={{mt:2}} name="warehouse" value={active.warehouse} onChange={e=>setActive({...active, warehouse:e.target.value})} fullWidth>
                            {houses.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        
                        <div>
                            <Button variant="contained" sx={{mt:3}} type="submit" >Save Changes</Button>
                        </div>
                    </form>

                    <Divider />
                    <div className="clearfix pt-40">
                        <span className="w3-padding">
                            <font className="block">Account Status</font>
                            <font className="w3-small w3-opacity">{active.status}</font>
                        </span>
                        <Switch label="Sample" className="float-right" checked={active.status == "active"} onChange={e=>{
                            if(e.target.checked){
                                setActive({...active, status:"active"});
                            }
                            else{
                                setActive({...active, status:"deactivated"});
                            }
                        }} />
                    </div>
                    <Divider />
                    
                    <div className="pt-30">
                        <Button color="error" style={{textTransform:"none"}} variant="contained" onClick={e=>deleteUser(active)}>Delete</Button>
                        <Button sx={{textTransform:"none",ml:2}} variant="outlined" onClick={e=>resetPassword(active)}><i className="fa fa-redo-alt mr-10" />  Reset Password</Button>
                    </div>
                </div>
            </Drawer>
        </>
    )
}

function TabPanel(props) {
    const {children, value, index, ...other} = props;

    return (
        <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function Options(){
    const [data, setData] = useState({
        distance:100,
        requireCoordinates:true,
        startTime:"00:00:00",
        endTime:"00:00:00",
    });

    const getData = () => {
        $.get("api/", {getOptionsData:"true"}, function(res){
            setData({...data, ...res});
            console.log(res.startTime);
        })
    }

    useEffect(()=>{
        getData();
    }, []);

    const saveChanges = (event) => {
        $.post("api/", {...data, saveOptions:"true"}, function(response){
            try{
                let res = JSON.parse(response);
                if(res.status){
                    Toast("Success");
                    getData();
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

    return (
        <>
            <ThemeProvider theme={yellowTheme}>
                <div className="w3-row">
                    <div className="w3-col m3">&nbsp;</div>
                    <div className="w3-col m6 pt-50">
                        <font className="bold roboto block pb-10">Clerk Login</font>
                        <div className="prodShadow w3-round-large">
                            <div className="clearfix w3-hover-light-grey" style={{borderTopLeftRadius:"8px",borderTopRightRadius:"8px"}}>
                                <font className="w3-padding" style={{display:"inline-block"}}>Require location to checkin</font>
                                <Switch label="Sample" className="float-right" checked={data.requireCoordinates} onChange={e=>{
                                    if(e.target.checked){
                                        setData({...data, requireCoordinates:true});
                                    }
                                    else{
                                        setData({...data, requireCoordinates:false});
                                    }
                                }} />
                            </div>
                            <hr />
                            <div className="mt-10 pb-10 pr-10 clearfix">
                                <font className="w3-padding" style={{display:"inline-block"}}>Maximum distance from warehouse</font>
                                <Input className="float-right" value={data.distance} onChange={e=>setData({...data, distance:e.target.value})} type="number" placeholder="Max distance" sx={{width:150}} />
                            </div>
                            <ThemeProvider theme={theme}>
                                <div className="w3-padding">
                                    <Button variant="outlined" size="small" onClick={saveChanges} style={{textTransform:"none"}}>Save Changes</Button>
                                </div>
                            </ThemeProvider>
                        </div>
                        
                        <font className="bold roboto block pt-30 pb-10">Working time</font>
                        <div className="prodShadow w3-round-large">
                            
                            <div className="mt-10 pb-10 pt-15 pr-10 clearfix">
                                <font className="w3-padding" style={{display:"inline-block"}}>Starting time</font>
                                <Input className="float-right" value={data.startTime} onChange={e=>setData({...data, startTime:e.target.value})} placeholder="Starting time" type="time" sx={{width:150}} />
                            </div>
                            <hr />
                            <div className="mt-10 pb-10 pr-10 clearfix">
                                <font className="w3-padding" style={{display:"inline-block"}}>Closing time</font>
                                <Input className="float-right" value={data.endTime} onChange={e=>setData({...data, endTime:e.target.value})} placeholder="Closing time" type="time" sx={{width:150}} />
                            </div>
                            <ThemeProvider theme={theme}>
                                <div className="w3-padding">
                                    <Button variant="outlined" size="small" onClick={saveChanges} style={{textTransform:"none"}}>Save Changes</Button>
                                </div>
                            </ThemeProvider>
                        </div>
                        
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
}

function Notifications(){
    const [rows, setRows] = useState([]);

    const getData = () => {
        $.get("api/", {getNotifications:"superAdmin"}, function(rows){
            setRows(rows);
        });
    }

    useEffect(()=>{
        getData();
    }, []);

    return (
        <>
            <ThemeProvider theme={yellowTheme}>
                <div className="w3-row" style={{height:window.innerHeight+"px",background:"#fafafa"}}>
                    <div className="w3-col m3">&nbsp;</div>
                    <div className="w3-col m6 pt-50">
                        <font className="bold roboto block pb-10">Notifications</font>

                        {rows.map((row,index) => (
                            <div className="prodShadow mt-15 w3-white w3-round-large">
                                {/** */}
                            </div>
                        ))}
                        
                    </div>
                </div>
            </ThemeProvider>
        </>
    )
}

function Profile(props){
    const [value, setValue] = React.useState(0);
    const [picture, setPicture] = React.useState(user.photo);
    const [modals, setModals] = useState({
        editEmail:false,
        editName:false
    });
    const [user2, setUser2] = useState({...user});
  
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const choosePicture = (event) => {
        let input = document.createElement("input");
        input.type = 'file';
        input.accept = 'image/*';
        input.addEventListener('change', function (event){
            //upload
            let formdata = new FormData();
            formdata.append("change_picture", input.files[0]);

            post("api/", formdata, function (response){
                try{
                    let res = JSON.parse(response);

                    if (res.status){
                        window.localStorage.setItem("user", response);
                        user = JSON.parse(window.localStorage.getItem("user"));
                        setPicture(user.photo);
                    }
                }
                catch (e) {
                    alert(e.toString()+response);
                }
            })
        });

        input.click();
    }

    const updateEmail = (event) => {
        $.post("api/", {updateEmail:user2.email}, function(res){
            if (res.status){
                Toast("Successfully updated email");
                setModals({...modals, editEmail:false});
                getUser();
            }
            else{
                Toast(res.message);
            }
        })
    }

    const getUser = () => {
        $.get("api/", {getCurrentUser:"true"}, function(res){
            setUser2(res);
            localStorage.setItem("user", JSON.stringify(res));
        })
    }

    const updateName = (event) => {
        $.post("api/", {updateName:user2.name}, function(res){
            if (res.status){
                Toast("Successfully updated name");
                setModals({...modals, editName:false});
                getUser();
            }
            else{
                Toast(res.message);
            }
        })
    }

    const changePassword = (event) => {
        event.preventDefault();

        let form = event.target;

        $.post("api/", {admin_new_password:form.admin_new_password.value}, function(res){
            if(res.status){
                setOpen(false)
                Toast("Success");
            }
            else{
                Toast(res.message);
            }
        })
    }

    return (
        <div>
            <div className="w3-padding-large w3-large alert-warning text-dark">
                Your Profile
            </div>
            <div className="pt-30">
                <div className="w3-row">
                    <div className="w3-col m1">&nbsp;</div>
                    <div className="w3-col m3 pl-20 pr-20">
                        <img src={"../uploads/"+picture} width="100%" />
                    </div>
                    <div className="w3-col m8 pr-20 pl-20">
                        <Typography variant="h4" component="h1" gutterBottom>
                            {user.name}
                        </Typography>
                        <Link href="#" className="block">{user.type}</Link>
                        <FormLabel id="demo-radio-buttons-group-label" sx={{mt:4}}>Rankings</FormLabel>
                        <div className="mb-40">
                            <font style={{display:"inline-block"}} className="w3-large">3.4</font> 
                            <Rating
                                name="text-feedback"
                                value={3.5}
                                readOnly
                                precision={0.5}
                                />
                        </div>
                        <div className="">
                            <Button variant="outlined" onClick={choosePicture} startIcon={<i className="fa fa-photo w3-small" />}>
                                Choose Picture
                            </Button>

                            <Button variant="contained" sx={{ml:3}} onClick={handleClickOpen} startIcon={<i className="fa fa-lock w3-small" />}>
                                Change password
                            </Button>
                        </div>
                        <div className="pt-30">
                            <Box sx={{ width: '100%' }}>
                                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                                        <Tab label="About" icon={<i className="far fa-user" />} iconPosition="start" {...a11yProps(0)} />
                                        <Tab label="Activity Log" icon={<i className="fa fa-list-ol" />} iconPosition="start" {...a11yProps(1)} />
                                    </Tabs>
                                </Box>
                                <TabPanel value={value} index={0}>
                                    <FormLabel id="demo-radio-buttons-group-label">BASIC INFORMATION</FormLabel>
                                    <div className="w3-row pt-15">
                                        <div className="w3-col m2">
                                            <font className="bold">Email:</font>
                                        </div>
                                        <div className="w3-col m9">
                                            <Link href="#" onClick={e=>{
                                                setModals({...modals, editEmail: true});
                                            }
                                            }>{user2.email}</Link>
                                        </div>
                                    </div>
                                    <div className="w3-row pt-15">
                                        <div className="w3-col m2">
                                            <font className="bold">Name:</font>
                                        </div>
                                        <div className="w3-col m9">
                                            <Link href="#" onClick={e=>setModals({...modals, editName: true})}>{user2.name}</Link>
                                        </div>
                                    </div>
                                </TabPanel>
                                <TabPanel value={value} index={1}>
                                    Expired
                                </TabPanel>
                            </Box>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    size="small"
                    >
                    <DialogTitle id="alert-dialog-title">
                        Change password
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            &nbsp;
                        </DialogContentText>
                        <form onSubmit={changePassword}>
                            <TextField
                                id="filled-password-input"
                                label="Enter new Password"
                                name="admin_new_password"
                                fullWidth
                                type="password"
                                sx={{mb:3, mt:2}}
                                size="small" />

                            <Button type="submit" role="submit" sx={{mt:2}} variant="contained">Save Changes</Button>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>

            <div className={"w3-modal"} style={{display:(modals.editEmail?"block":"none")}}>
                <div className={"w3-modal-content w3-round-large shadow w3-padding"} style={{width:"370px"}}>
                    <font className={"w3-large block"}>Edit Email</font>
                    <TextField label={"Change Email"} sx={{mt:3}} value={user2.email} onChange={e=>setUser2({...user2, email:e.target.value})} fullWidth size={"small"} />

                    <div className={"w3-row pt-30 pb-15"}>
                        <div className={"w3-half w3-padding"}>
                            <Button fullWidth variant={"outlined"} onClick={e=>setModals({...modals, editEmail:false})}>Close</Button>
                        </div>
                        <div className={"w3-half w3-padding"}>
                            <Button fullWidth variant={"contained"} onClick={updateEmail}>Update</Button>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"w3-modal"} style={{display:(modals.editName?"block":"none")}}>
                <div className={"w3-modal-content w3-round-large shadow w3-padding"} style={{width:"370px"}}>
                    <font className={"w3-large block"}>Edit Name</font>
                    <TextField label={"Change Name"} sx={{mt:3}} value={user2.name} onChange={e=>setUser2({...user2, name:e.target.value})} fullWidth size={"small"} />

                    <div className={"w3-row pt-30 pb-15"}>
                        <div className={"w3-half w3-padding"}>
                            <Button fullWidth variant={"outlined"} onClick={e=>setModals({...modals, editName:false})}>Close</Button>
                        </div>
                        <div className={"w3-half w3-padding"}>
                            <Button fullWidth variant={"contained"} onClick={updateName}>Update</Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function SupervisorInspections(){
    const [rows,setRows] = useState([]);
    const [warehouses, setWarehouses] = useState([])
    const [users, setUsers] = useState([])

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filterRows = (event) => {
        event.preventDefault();

        $.post("api/", $(event.target).serialize(), function(res){
            setRows(res);
        })
    }

    const getUsers = () => {
        $.get("api/", {getAllUsers:"true"}, function(res){
            setUsers(res);
            setFilteredUsers(res);
        })
    }

    const getHouses = () => {
        $.get("api/", {getHouses:"true"}, function(res){
            setWarehouses(res);
        })
    }

    const getRows = () => {
        $.get("api/", {getSupervisorInspections:"true"}, function(res){
            setRows(res);
        })
    }

    const downloadSeals = () => {
        const heads = ["#", "Warehouse", "Supervisor", "Remarks", "Date"];
        
        let csvContent = "data:text/csv;charset=utf-8,";

        csvContent = heads.join(",") + "\r\n";
        
        rows.map((row, index) => {
            let row_str = [
                index+1,
                row.warehouse_data.name,
                row.supervisor_data.name,
                row.content.replace(",", " "),
                row.date
            ].join(",");
            csvContent += row_str + "\r\n";
        });

        let filename = "SupervisorInspection";

        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    useEffect(()=>{
        getRows();
        getHouses();
        getUsers();
    }, []);

    return (
        <>
            <div className="w3-padding">
                <form onSubmit={filterRows}>
                    Filter records 
                    <select className="form-control" name="filterInspection" style={{width:"200px",display:"inline-block"}} required>
                        <option value={"0"}>--Choose warehouse--</option>
                        {warehouses.map((row,index)=>(
                            <option value={row.id} key={row.id}>{row.name}</option>
                        ))}
                    </select>
                    <select className="form-control" name="supervisor" style={{width:"200px",display:"inline-block"}} required>
                        <option value={"0"}>--Choose Supervisor--</option>
                        {users.filter(r=>r.type == "supervisor").map((row,index)=>(
                            <option value={row.id} key={row.id}>{row.name}</option>
                        ))}
                    </select>
                    From: <input type={"date"} name="startDate" className="form-control" style={{width:"200px",display:"inline-block"}} />
                    To: <input type={"date"} name="endDate" className="form-control" style={{width:"200px",display:"inline-block"}} />
                    <Button variant="outlined" sx={{ml:1}} type="submit" style={{textTransform:"none"}}>View</Button> 
                </form>
            </div>
            <div className="w3-padding">
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Warehouse</TableCell>
                                <TableCell>Supervisor</TableCell>
                                <TableCell>Remarks Content</TableCell>
                                <TableCell>Date & Time</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.slice((page)*rowsPerPage, rowsPerPage*(page+1)).map((row,index)=>(
                                <TableRow hover>
                                    <TableCell padding="none">{index+1}</TableCell>
                                    <TableCell padding="none">{row.warehouse_data.name}</TableCell>
                                    <TableCell padding="none">{row.supervisor_data.name}</TableCell>
                                    <TableCell padding="none">{row.content}</TableCell>
                                    <TableCell style={{padding:"4px"}}>{row.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[25, 50, 100,200,500]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage)=>{handleChangePage(event, newPage)}}
                        onRowsPerPageChange={(event)=>{handleChangeRowsPerPage(event)}}
                            />
                </Paper>

                {rows.length > 0 ? <>
                    <Button variant="contained" sx={{mt:2}} color="success" onClick={downloadSeals}>Download Excel</Button> 
                </>:""}
            </div>
        </>
    )
}

function Travel(){
    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filterRows = (event) => {
        event.preventDefault();
    }

    const getRows = () => {
        $.get("api/", {getExpenditure:"true"}, function(res){
            setRows(res);
        })
    }

    const getTotal = (rows) => {
        let total = 0;

        rows.map(row=>{
            total += Number(row.amount);
        })

        return total;
    }

    const downloadExcel = () => {
        const heads = ["#", "Date", "Amount", "User", "Type", "Description"];
        
        let csvContent = "data:text/csv;charset=utf-8,";

        csvContent = heads.join(",") + "\r\n";
        
        rows.map((row, index) => {
            let row_str = [index+1, row.date, row.amount, row.user_data.name, row.type,row.description].join(",");
            csvContent += row_str + "\r\n";
        });

        let filename = "Travel Expences";

        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    useEffect(()=>{
        getRows();
    }, []);

    return (
        <>
            <div className="w3-padding">
                <form onSubmit={filterRows}>
                    From: <input type={"date"} name="startDate" className="form-control" style={{width:"200px",display:"inline-block"}} />
                    To: <input type={"date"} name="endDate" className="form-control" style={{width:"200px",display:"inline-block"}} />
                    <Button variant="outlined" sx={{ml:1}} type="submit" style={{textTransform:"none"}}>View</Button> 
                </form>
            </div>
            <div className="w3-padding">
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Amount</TableCell>
                                <TableCell>User</TableCell>
                                <TableCell>Type</TableCell>
                                <TableCell>Description</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {rows.slice((page)*rowsPerPage, rowsPerPage*(page+1)).map((row,index)=>(
                                <TableRow>
                                    <TableCell padding="none">{index+1}</TableCell>
                                    <TableCell padding="none">{row.date}</TableCell>
                                    <TableCell padding="none">{row.amount}</TableCell>
                                    <TableCell padding="none">{row.user_data.name}</TableCell>
                                    <TableCell padding="none">{row.type}</TableCell>
                                    <TableCell style={{padding:"4px"}}>{row.description}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell></TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell>{getTotal(rows)}</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[25, 50, 100,200,500]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage)=>{handleChangePage(event, newPage)}}
                        onRowsPerPageChange={(event)=>{handleChangeRowsPerPage(event)}}
                            />
                </Paper>
                <div className="w3-padding">
                    <Button variant="contained" sx={{textTransform:"none"}} onClick={downloadExcel} color="success">Download Excel</Button>
                </div>
            </div>
        </>
    )
}

function SupervisorAttendance(){
    const [users, setUsers] = useState([]);
    const [rows, setRows] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(25);
    

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };
    
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getUsers = () => {
        $.get("api/", {getAllUsers:"true"}, function(res){
            setUsers(res);
            setFilteredUsers(res);
        })
    }

    const getRows = () => {
        $.get("api/", {getSupervisorAttendance:"true"}, function(res){
            setRows(res);
        })
    }

    const filterAttendance = (event) => {
        event.preventDefault();

        $.post("api/", $(event.target).serialize(), function(res){
            setRows(res);
        })
    }

    useEffect(()=>{
        getUsers();
        getRows();
    }, []);

    const downloadExcel = () => {
        const heads = ["#", "User", "Start Time", "End Time", "Total Hrs", "Date"];
        
        let csvContent = "data:text/csv;charset=utf-8,";

        csvContent = heads.join(",") + "\r\n";
        
        rows.map((row, index) => {
            let row_str = [index+1, row.name, row.starttime, row.endtime, row.total+"hrs",row.date].join(",");
            csvContent += row_str + "\r\n";
        });

        let filename = "Supervisor Attendance";

        var blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        if (navigator.msSaveBlob) { // IE 10+
            navigator.msSaveBlob(blob, filename);
        } else {
            var link = document.createElement("a");
            if (link.download !== undefined) { // feature detection
                // Browsers that support HTML5 download attribute
                var url = URL.createObjectURL(blob);
                link.setAttribute("href", url);
                link.setAttribute("download", filename);
                link.style.visibility = 'hidden';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        }
    }

    return (
        <>
            <div className="w3-padding">
                <form id="filterOvertime" className="pb-10" onSubmit={filterAttendance}>
                    Filter records 
                    <select className="form-control" name="filterSupervisor" style={{width:"200px",display:"inline-block"}} required>
                        <option value={"0"}>--Choose supervisor--</option>
                        {users.filter(r=>r.type=="supervisor").map((row,index)=>(
                            <option value={row.id} key={row.id}>{row.name}</option>
                        ))}
                    </select>
                    <select className="form-control" name="mode" style={{width:"90px",display:"inline-block"}} required>
                        <option value={0}>--All--</option>
                        <option value={1}>Once per day</option>
                    </select>
                    From: <input type={"date"} name="startDate" className="form-control" style={{width:"200px",display:"inline-block"}} />
                    To: <input type={"date"} name="endDate" className="form-control" style={{width:"200px",display:"inline-block"}} />
                    <Button variant="outlined" sx={{ml:1}} type="submit" style={{textTransform:"none"}}>View</Button> 
                </form>
                <Paper>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell>User</TableCell>
                                <TableCell>Start Time</TableCell>
                                <TableCell>End Time</TableCell>
                                <TableCell>Total Hrs</TableCell>
                                <TableCell>Date</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.slice((page)*rowsPerPage, rowsPerPage*(page+1)).map((row,index)=>(
                                <TableRow hover key={index}>
                                    <TableCell padding="none" align="center">{index+1}</TableCell>
                                    <TableCell padding="none">{row.name}</TableCell>
                                    <TableCell padding="none">{row.starttime}</TableCell>
                                    <TableCell padding="none">{row.endtime}</TableCell>
                                    <TableCell padding="none">{row.total+"hrs"}</TableCell>
                                
                                    <TableCell style={{padding:"4px"}}>{row.date}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    <TablePagination
                        rowsPerPageOptions={[25, 50, 100,200,500]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={(event, newPage)=>{handleChangePage(event, newPage)}}
                        onRowsPerPageChange={(event)=>{handleChangeRowsPerPage(event)}}
                            />
                </Paper>
                <div className="w3-padding">
                    <Button variant="contained" color="success" onClick={downloadExcel} sx={{textTransform:"none"}}>Download Excel</Button>
                </div>
            </div>
        </>
    )
}