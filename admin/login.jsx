const {TextField, Button, Fab, Link, Typography, InputAdornment, Alert, Tabs, Tab} = MaterialUI;
const {Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIcon} = MaterialUI;
const {Dialog, DialogActions,DialogContent, DialogContentText, MenuItem, DialogTitle} = MaterialUI;
let {alpha, TableBody, TableCell, TableContainer, RadioGroup, Radio, FormLabel,Rating,
	TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Paper, Checkbox, IconButton, Tooltip,
    Chip, Avatar, FilledInput, FormControl, InputLabel,
	FormControlLabel,Switch, DeleteIcon, FilterListIcon, visuallyHidden
} = MaterialUI;

const {useState, useEffect, createContext, useContext, useLayoutEffect } = React;

const SigninContext = createContext({})
var School = createContext({});
var user;

$(document).ready(function(){
    //ReactDOM.render(<Activity />, _('root'));

    try{
        ReactDOM.render(<Login />, _('root'));
    }
    catch(E){
        alert(E.toString())
    }
});

function Login(){
    const [errors,setErrors] = useState({
        email:false,
        emailError:"",
        password:false,
        passwordError:""
    });
	const [showPassword, setShowPassword] = React.useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

    const handleSubmit = (event) => {
        event.preventDefault();

        let form = event.target;

        $.post("api/", $(form).serialize(), function(response){
			try{
				let res = JSON.parse(response);
				if(res.status){
					//window.localStorage.setItem("user", response);
					window.location = window.location.href;
				}
				else{
					//alert(res.type);
					if(res.type == "email"){
						setErrors({...errors, email:true,emailError:res.message,password:false});
					}
					else{
						setErrors({...errors, password:true,passwordError:res.message,email:false,emailError:""});
					}
				}
			}
			catch(E){
				alert(E.toString()+response+"  rodz");
			}
        })
    }

    return (<>
		<div className="w3-row" style={{background:"#d3d3d4", height:window.innerHeight+"px"}}>
			<div className="w3-col m4">&nbsp;</div>
			<div className="w3-col m3 w3-padding">

				<div className="w3-padding-large mt-60 w3-round-large w3-white shadow">
					<div className="pt-15 pb-15 w3-center">
						<img src="../images/logo.png" width="80" onClick={event=>{
							window.location = "index.php";
						}} style={{borderRadius:"50%"}} />
						<font className="bold block" style={{fontSize:"1.2rem"}}>Log in to your account</font>
					</div>
					<form onSubmit={handleSubmit} className="pb-20">
						<TextField
							id="filled-password-input"
							label="Email or phone"
							name="email_login"
							color="success"
							error={errors.email}
							variant="filled"
							helperText={errors.emailError}
							fullWidth/>
						
						<FormControl sx={{ mt: 2}} fullWidth color="success" error={errors.password} variant="filled">
							<InputLabel htmlFor="filled-adornment-password">{errors.password?errors.passwordError:"Password"}</InputLabel>
							<FilledInput
								id="filled-adornment-password"
								type={showPassword ? 'text' : 'password'}
								color="success"
								name="password"
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
											>
											{showPassword ? <i className="fa fa-eye-slash" /> : <i className="fa fa-eye" />}
										</IconButton>
									</InputAdornment>
								}
								/>
						</FormControl>

						<div className="clearfix pt-20">
							<Button type="submit" color="success" role="submit" size="large" fullWidth variant="contained">Login</Button>
						</div>
					</form>
				</div>
			</div>
        </div>
    </>)
}