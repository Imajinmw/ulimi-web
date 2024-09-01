const {TextField, Button, Fab, Link, Typography, InputAdornment, Alert, Tabs, Tab} = MaterialUI;
const {Box, Drawer, List, Divider, ListItem, ListItemButton, ListItemIcon, ListItemText, SvgIcon, createTheme, ThemeProvider} = MaterialUI;
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

let theme = createTheme({
	palette: {
		primary: {
			main: '#377b3b',
		},
		secondary: {
			main: '#edf2ff',
		},
	},
});

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
        passwordError:"",
		emailForgot:false,
		emailForgotError:""
    });
	const [showPassword, setShowPassword] = React.useState(false);
	const [stage, setStage] = useState("login");
	const [done, setDone] = useState({
		error:false,
		msg:"Forgot password? Enter your email and we will send you a reset password link"
	})

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
					window.localStorage.setItem("user", response);
					window.location = "admin/";
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
				alert(E.toString()+response);
			}
        })
    }

	const handleForgot = (event) => {
        event.preventDefault();

        let form = event.target;

        $.post("api/", $(form).serialize(), function(response){
			try{
				let res = JSON.parse(response);
				if(res.status){
					setDone({...done, msg:"Your reset password email was sent. Check your inbox"});
				}
				else{
					setErrors({...errors, emailForgot:true,emailForgotError:res.message});
					setDone({error:true, msg:res.message})
				}
			}
			catch(E){
				alert(E.toString()+response);
			}
        })
    }

    return (<>
		<ThemeProvider theme={theme}>
			<div className="w3-row" style={{background:"#d3d3d4", height:window.innerHeight+"px"}}>
				<div className="w3-col m4">&nbsp;</div>
				<div className="w3-col m3 w3-padding">

					<div className="w3-padding-large mt-60 w3-round-large w3-white shadow">
						<div className="pt-15 pb-15 w3-center">
							<img src="images/seedling.svg" height="80" onClick={event=>{
								window.location = "index.php";
							}} style={{cursor:"pointer"}} />
							<font className="bold block mt-15" style={{fontSize:"1.2rem"}}>Ulimi App</font>
						</div>
						{stage == "login"?
						<form onSubmit={handleSubmit} className="pb-20">
							<TextField
								id="filled-password-input"
								label="Email or phone"
								name="email_login"
								error={errors.email}
								variant="filled"
								helperText={errors.emailError}
								fullWidth/>
							
							<FormControl sx={{ mt: 2}} fullWidth error={errors.password} variant="filled">
								<InputLabel htmlFor="filled-adornment-password">{errors.password?errors.passwordError:"Password"}</InputLabel>
								<FilledInput
									id="filled-adornment-password"
									type={showPassword ? 'text' : 'password'}
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

							<Typography sx={{mb:3,mt:3,display:"none"}}>
								Not yet a memer? <Link href="register.php" style={{fontWeight:"bold"}}>Click here</Link> to register
							</Typography>

							<div className="clearfix pt-30">
								<Button type="submit" role="submit" size="large" fullWidth variant="contained" style={{background:"var(--u-dark)"}}>Login</Button>
							</div>
							<Typography sx={{pb:3,mt:3}} onClick={e=>{
									setStage("forgot")
								}}>
								<Link href="#" style={{fontWeight:"bold"}}>Forgot password??</Link>
							</Typography>
						</form>:
						<form onSubmit={handleForgot} className="pb-20">
							<Typography sx={{pb:1}} style={{color:(done.error?"var(--bs-red)":"var(--bs-secondary)")}}>{done.msg}</Typography>
							<TextField
								id="filled-password-input"
								label="Email or phone"
								name="email_forgot"
								error={errors.emailForgot}
								variant="filled"
								helperText={errors.emailForgotError}
								fullWidth/>
							
					
							<div className="clearfix pt-30">
								<Button type="submit" role="submit" size="large" fullWidth variant="contained" style={{background:"var(--u-dark)"}}>Send Link</Button>
							</div>
							<Typography sx={{pb:3,mt:3}}>
								<Link href="#" onClick={e=>{
									setStage("login")
								}} style={{fontWeight:"bold"}}>Go to login</Link>
							</Typography>
						</form>}
					</div>
				</div>
			</div>
		</ThemeProvider>
    </>)
}