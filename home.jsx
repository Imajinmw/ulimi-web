const {useState, useEffect} = React;

$(document).ready(function(event){
	ReactDOM.render(<Home />, document.getElementById("root"));
})

function Home(){
	const [error, setError] = useState("");
    const [stage,setStage] = useState("dashboard");

	const menus = [
        {
            name:"Dashboard",
            id:"dashboard",
            icon:"fa fa-home"
        },
        {
            name:"Export data",
            id:"connectivity",
            icon:"fa fa-exchange-alt"
        },
        {
            name:"Live Serial",
            id:"serial",
            icon:"fa fa-terminal"
        },
        {
            name:"Reports",
            id:"reports",
            icon:"fa fa-chart-line"
        },
        {
            name:"Profile",
            id:"profile",
            icon:"fa fa-user-shield"
        }
    ];
	return(<>
		<div className="w3-row">
            <div className="w3-col m2 w3-padding w3-border-right" style={{height:window.innerHeight+"px"}}>
                <div className="w3-padding-large w3-center">
                    <img src="img.jpg" width="50%" />
                    <br />
                    <h5>Green House Monitor</h5>
                    <font>{"[Marlene Timone]"}</font>
                </div>
                <div style={{paddingTop:"40px"}}>
                    {menus.map(menu=>(
                        <MenuButton data={menu} key={menu.id} isActive={menu.id == stage} onClick={event=>{
                            setStage(menu.id);
                        }} />
                    ))}
                </div>
            </div>
			<div className="w3-col m10 w3-padding" style={{height:window.innerHeight+"px"}}>
                {stage=="dashboard"?<>
                    <Dashboard />
                </>:
                stage=="serial"?<Terminal />:
                stage=="connectivity"?<Export />:
                stage=="reports"?<Reports />:
                <font>{stage}</font>}
            </div>
		</div>
	</>)
}

function MenuButton(props){
    return(
        <div className={"w3-round-large some-padding hover-me pointer "+(props.isActive!=undefined?props.isActive?"btn-success":"":"")} onClick={props.onClick!=undefined?props.onClick:()=>{}}>
            <span style={{width:"40px",display:"inline-block"}} className="w3-center">
                <i className={props.data.icon} />
            </span>
            <font>{props.data.name}</font>
        </div>
    );
}

function Export(){
    return (
        <>
            <div className="w3-padding-xxlarge">
                <font className="w3-xlarge">Export sensor data to excel</font>
            </div>
            <div className="w3-row">
                <div className="w3-col m4 w3-padding">
                    <div className="w3-padding w3-light-grey bordrer">
                        <h5>Temperature</h5>
                        <a href="download.php?temperature" target={"_blank"} className="btn btn-success">Download</a>
                    </div>
                </div>
                <div className="w3-col m4 w3-padding">
                    <div className="w3-padding w3-light-grey bordrer">
                        <h5>Humidity</h5>
                        <a href="download.php?humidity" target={"_blank"} className="btn btn-success">Download</a>
                    </div>
                </div>
                <div className="w3-col m4 w3-padding">
                    <div className="w3-padding w3-light-grey bordrer">
                        <h5>Moisture</h5>
                        <a href="download.php?moisture" target={"_blank"} className="btn btn-success">Download</a>
                    </div>
                </div>
            </div>
        </>
    );
}

function Reports(){
    const [data, setData] = useState({
        hight_temperature:0,
        medium_temperature:0,
        low_temperature:0,
        high_humidity:0,
        low_humidity:0,
        high_moisture:0,
        low_moisture:0,
    })
    const changeFilter = (event) => {
        event.preventDefault();
    }
    const months = [
        1,2,3,4,5,6,7,8,9,10,11,12
    ];

    const years= [
        2020,2021,2022,2023
    ]

    const getData = () => {
        $.get("api/", {getData:"true"}, function(res){
            setData({...data, ...res});
        })
    }

    useEffect(()=>{
        getData();
    }, []);

    return(<>
        <form onSubmit={changeFilter} style={{display:"none"}}>
            Month
            <select name="month">
                {months.map(row=>(
                    <option>{row}</option>
                ))}
            </select>
             Month
            <select name="year">
                {years.map(row=>(
                    <option>{row}</option>
                ))}
            </select>
            <button className="btn btn-success btn-sm w3-margin-right">View</button>
        </form>
        <div className="w3-row" style={{paddingTop:"30px"}}>
                <div className="w3-col m4 w3-padding">
                    <div className="w3-padding w3-light-grey bordrer">
                        <h5>Temperature</h5>
                        
                        <br />
                        <h6>High temperature: {data.hight_temperature}%</h6>
                        <h6>Medium temperature: {data.medium_temperature}%</h6>
                        <h6>Low temperature: {data.low_temperature}%</h6>
                    </div>
                </div>
                <div className="w3-col m4 w3-padding">
                    <div className="w3-padding w3-light-grey bordrer">
                        <h5>Humidity</h5>
                        <br />
                        <h6>High humidity: {data.high_humidity}%</h6>
                        <h6>Low humidity: {data.low_humidity}%</h6>
                    </div>
                </div>
                <div className="w3-col m4 w3-padding">
                    <div className="w3-padding w3-light-grey bordrer">
                        <h5>Moisture</h5>
                        <br />
                        <h6>High moisture: {data.low_moisture}%</h6>
                        <h6>Low moisture: {data.low_moisture}%</h6>
                    </div>
                </div>
            </div>
    </>)
}

function Terminal(){
    const [rows, setRows] = useState([]);

    const getRows = ()=>{
        $.get("api/", {getRows:"true"}, function(res){
            setRows(res);
        })
    }
    useEffect(() => {
        const interval = setInterval(getRows, 2000);
        return () => {
          clearInterval(interval);
        };
    }, []);


    return (
        <>
            <div className="w3-padding bg-success w3-text-white">
                Serial Monitor
            </div>
            <br/>
            <div className="w3-margin w3-padding w3-light-grey border" style={{height:"400px",overflowY:"auto"}}>
                {rows.map((row,index)=>(<>
                    <font>{row.data}</font> <font className="w3-opacity w3-small">{row.time}</font><br />
                </>))}
            </div>
        </>
    )
}

function Dashboard(){
    const [height, setHeight] = useState(window.innerHeight);

    useEffect(()=>{
        //setHeight(window.innerHeight - _('top-bar').clientHeight);
    }, []);
    return(<>
        <div className="bcenter" style={{height:height+"px",width:"100%"}}>
            <span style={{height:"70px",width:"400px"}} className="w3-center">
                <h2>Welcome</h2>
                <h5 className="w3-opacity">Use buttons on left to select task</h5>
            </span>
        </div>
    </>)
}