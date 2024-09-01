function WarehouseReport(){
    const [type, setType] = useState("");
    const [rows, setRows] = useState([]);
    const [groups, setGroups] = useState([]);
    const [years, setYears] = useState([]);
    const [parent,setParent] = useState("");
    const [src, setSrc] = useState("api/");
    const [excelSrc, setExcelSrc] = useState("");
    
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

    const getYears = () => {
        $.get("api/", {getYears:"true"}, function(res){
            setYears(res);
        })
    }

    const generateReport = (event) => {
        event.preventDefault();

        $.post("api/", $(event.target).serialize(), function(response){
            Toast(response);
            try{
                let res = JSON.parse(response);
                setSrc(res.pdf);
                setExcelSrc(res.xlsx);
            }
            catch(E){
                alert(response);
            }
        })
    }

    useEffect(()=>{
        getHouses();
        getGroups();
        getYears();
    }, []);

    return (
        <>
            <div className="w3-row">
                <div className="w3-col m4">
                    <form onSubmit={generateReport}>
                        <TextField select fullWidth name="type" sx={{mt:2}} size="small" onChange={e=>setType(e.target.value)} required value={type} label="Report Type">
                            {["Daily", "Monthly"].map((option) => (
                                <MenuItem key={option} value={option}>
                                    {option}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField select fullWidth name="parent" value={parent} size="small" onChange={e=>setParent(e.target.value)} sx={{mt:2}} label="Warehouse Group">
                            {groups.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>

                        <TextField select fullWidth name="warehouse" sx={{mt:2}} size="small" label="Warehouse" required>
                            {rows.filter(r=>(r.parent == parent)).map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </TextField>
                        {
                            type == "Daily" ? <>
                                <TextField type="date" fullWidth name="date" size="small" sx={{mt:2}} label="Choose Date" />
                            </>:
                            type == "Monthly" ?
                            <>
                                <TextField select fullWidth name="month" sx={{mt:2}} size="small" label="Choose Month">
                                    {["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((option) => (
                                        <MenuItem key={option} value={option}>
                                            {option}
                                        </MenuItem>
                                    ))}
                                </TextField>
                                <TextField select fullWidth name="year" sx={{mt:2}} size="small" label="Year">
                                    {years.map((option) => (
                                        <MenuItem key={option.id} value={option.id}>
                                            {option.year}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </>:""
                        }
                        <Button variant="contained" type="submit" sx={{mt:2}} fullWidth style={{textTransform:"none"}}>Generate Report</Button>
                    </form>
                </div>
                <div className="w3-col m8">
                    <div className="w3-padding">
                        {excelSrc.length > 0 ? <Button variant={"contained"} color={"success"} onClick={e=>{
                            window.open("output/"+excelSrc, '_blank').focus();
                        }
                        }>Download</Button>:"" }
                        <iframe src={src} width="100%" height={700} style={{border:"none"}}></iframe>
                    </div>
                </div>
            </div>
        </>
    )
}

function AttendanceReport(){
    return (
        <>

        </>
    );
}

function AccidentsReport(){
    const [warehouses, setWarehouses] = useState([]);
    const [accidents, setAccidents] = useState([]);
    const [active, setActive] = useState({
        image:"",
        video:""
    })
    const [open, setOpen] = useState({
        attachments: false
    })

    const getWarehouses = () => {
        $.get("api/", {getHouses:"true"}, function (res){
            setWarehouses(res);
        });
    }

    const getData = ()=>{
        $.get("api/", {getActiveAccidents:"true"}, function (res){
            setAccidents(res);
        });
    }
    const filterData = (event) => {
        event.preventDefault();
    }

    const downloadExcel = (event) => {
        const heads = ["#", "Date", "Clerk", "Warehouse", "Type", "Description"];

        let csvContent = "data:text/csv;charset=utf-8,";

        csvContent = heads.join(",") + "\r\n";

        accidents.map((row, index) => {
            let row_str = [index+1, row.date, row.clerk_data.name, row.warehouse_data.name, row.type, row.description].join(",");
            csvContent += row_str + "\r\n";
        });

        let filename = "Accidents";

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
        getWarehouses();
        getData();
    }, []);

    return (
        <>
            <form onSubmit={filterData}>
                <select className={"form-control"} style={{width:"200px",display:"inline-block"}}>
                    {warehouses.map((row,index)=>(
                        <option value={row.id} key={row.id}>{row.name}</option>
                    ))}
                </select>
                Start date <input type={"date"} name={"startDate"} className={"form-control"} style={{width:"200px",display:"inline-block"}}/>
                End date <input type={"date"} name={"startDate"} className={"form-control"} style={{width:"200px",display:"inline-block"}}/>
                <Button variant={"outlined"} type={"submit"}>View</Button>
            </form>

            <Paper sx={{mt:2}}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell>Clerk</TableCell>
                            <TableCell>Warehouse</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Attachments</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {accidents.map((row,index)=>(
                            <TableRow>
                                <TableCell>{index+1}</TableCell>
                                <TableCell>{row.clerk_data.name}</TableCell>
                                <TableCell>{row.warehouse_data.name}</TableCell>
                                <TableCell>{row.type}</TableCell>
                                <TableCell>
                                    <Link href={"#"} onClick={e=>{
                                        setOpen({...open, attachments:true});
                                        setActive(row);
                                    }
                                    }>View</Link>
                                </TableCell>
                                <TableCell>{row.description}</TableCell>
                                <TableCell>{row.date}</TableCell>
                                <TableCell>
                                    <Button variant={"outlined"}size={"small"}>Acknowledge</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>

            {accidents.length > 0 ? <Button variant={"contained"} onClick={downloadExcel} sx={{mt:2}} color={"success"}>Download Excel</Button> : "" }

            <div className={"w3-modal"} onClick={e=>setOpen({...open, attachments:false})} style={{display:(open.attachments?"block":"none")}}>
                <div className={"w3-modal-content w3-round-large w3-padding-large shadow"} onClick={e=>{e.stopPropagation()}}>
                    <div className={"clearfix"}>
                        <font className={"w3-large"}>View attachments</font>
                        <i className={"fa fa-times w3-hover-text-red pointer float-right"} onClick={e=>setOpen({...open, attachments:false})}></i>
                    </div>
                    {active.image.length > 2 ? <img src={"../uploads/"+active.image} width={"100%"} />:"" }
                    {active.image.length > 2 ? <video width={"100%"} controls> <source src={"../uploads/"+active.image} /></video>:"" }
                </div>
            </div>
        </>
    );
}