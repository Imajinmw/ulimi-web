<?php 
require 'db.php';
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<title><?=$config['name']." - ".$config['intro'];?></title>
	<?php require 'links.php';?>
	<style type="text/css">
		.tlink{
			padding: 4px 12px;
			cursor: pointer;
			border-radius: 3px;
			color: black;
		}
		.tlink:hover{
			background: #d4edda;
			color: #155724;
		}
		.w3-border-purple{
			border-color: #9c27b0 !important;
		}
		.w3-border-pink{
			border-color: #e91e63 !important;
		}
		.logos .images-gallery-row {
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
			-ms-flex-pack: center;
			justify-content: center;
		}
		.images-gallery-row.jsx-160764463 {
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
			-ms-flex-pack: center;
			justify-content: center;
			-webkit-flex-wrap: wrap;
			-ms-flex-wrap: wrap;
			flex-wrap: wrap;
		}
		.image-gallery {
			width: 150px;
		}
		.logos .images-gallery-row .image-gallery {
			padding: 24px 0;
			display: -webkit-box;
			display: -webkit-flex;
			display: -ms-flexbox;
			display: flex;
			-webkit-box-pack: center;
			-webkit-justify-content: center;
			-ms-flex-pack: center;
			justify-content: center;
			width: 244px;
		}
		.image-gallery img {
			max-height: 69px;
			max-width: 118px;
		}
		img {
			border-style: none;
		}

		/* Hide scrollbar for Chrome, Safari and Opera */
		.hide-scroll::-webkit-scrollbar {
			display: none;
		}

		/* Hide scrollbar for IE, Edge and Firefox */
		.hide-scroll {
			-ms-overflow-style: none;  /* IE and Edge */
			scrollbar-width: none;  /* Firefox */
		}
		.thin-font{
			font-family: Poppins,googleRoboto,Helvetica,Arial,sans-serif;-webkit-box-sizing: border-box;box-sizing: border-box;font-weight: 200 !important;
		}
	</style>
</head>
<body>
<div id="root">
	<div class="w3-row w3-white w3-hide-small">
		<div class="w3-col m2">&nbsp;</div>
		<div class="w3-col m8 w3-padding">
			<div class="w3-row">
				<div class="w3-col m7">
					<img src="images/ea.png" height="30">
					<span class="">
						<a href="#" class="tlink">Products <i class="fa fa-caret-down w3-small"></i></a>
						<a href="#" class="tlink">Teams <i class="fa fa-caret-down w3-small"></i></a>
						<a href="#" class="tlink">Platforms <i class="fa fa-caret-down w3-small"></i></a>
						<a href="#" class="tlink">Resources <i class="fa fa-caret-down w3-small"></i></a>
					</span>
				</div>
				<div class="w3-col m5 clearfix">
					<span class="float-right">
						<a href="login.php" class="tlink">Login</a>
						<a href="register.php" class="btn btn-success btn-sm" style="font-weight:200;padding-right:24px;padding-left:24px;box-shadow: none;font-family: robotLight;background: var(--color);border: none;">Get Started <i class="fa fa-arrow-right"></i></a>
					</span>
				</div>
			</div>
		</div>
	</div>
	<div class="w3-row w3-padding-large w3-white shadow w3-hide-medium w3-hide-large">
		<div class="w3-col m7 clearfix">
			<img src="images/ea.png" height="35">
			<i class="fa fa-bars float-right" onclick="toggleMenu(this)" style="font-size: 1.8rem;"></i>
		</div>
		<div class="" id="menu-content" style="display:none;">
			<div class="w3-padding w3-border-bottom">
				<a href="#" class="tlink">Products <i class="fa fa-caret-down w3-small"></i></a>
			</div>
			<div class="pt-10 pb-20">
				<a href="#" class="btn btn-lg btn-sm w3-round-xxlarge w3-text-white" style="font-weight:200;padding-right:24px;padding-left:24px;box-shadow: none;background: var(--color);font-family: robotLight;">Get Started <i class="fa fa-arrow-right"></i></a> <a href="login.php" class="ml-15 btn btn-outline-success btn-lg btn-sm w3-round-xxlarge" style="font-weight:200;padding-right:24px;padding-left:24px;border-color: var(--color);color: var(--color);box-shadow: none;font-family: robotLight;">Login <i class="fa fa-arrow-right"></i></a>
			</div>
		</div>
	</div>
	<div class="w3-center alert-info pt-15 pb-15 w3-small">
		<i class="fa fa-gift"></i> Get up to MWK100 upon registeration <a href="#" class="w3-padding-small rounded bg-info w3-text-black">Redeen Gift</a>
	</div>
	
	<div class="w3-row pt-20 pb-60">
		<div class="w3-col m2">&nbsp;</div>
		<div class="w3-col m8">
			<div class="w3-row">
				<div class="w3-half">
					<div class="w3-padding">
						<h1 style="height: 37px;font-weight: 200;margin: 0 !important;">Register, Refer and </h1>
						<h1 style="height: 37px;font-weight: 200;margin: 0 !important;">Earn money, its safe and secure</h1>
					</div>

					<div class="mt-15">
						<div class="w3-large w3-padding">
							<i class="fa fa-gift text-warning"></i> Register for free
						</div>
						<div class="w3-row pt-30">
							<div class="w3-col m8">
								<div class="w3-padding">
									<button class="btn btn-success btn-block btn-lg" style="font-weight:200;padding-top:13px;padding-bottom:14px;box-shadow: none;font-family: robotLight;background: var(--color);border: none; font-size: 0.90rem;"><i class="fa fa-user"></i> Sign Up With Email or Phone</button>
								</div>
								<div class="w3-padding-large w3-center">
									<font>or continue with</font>
								</div>
								<div class="w3-row">
									<div class="w3-col s6 w3-padding-small">
										<button class="btn btn-block btn-lg" style="box-shadow:none">
											<i class="fab fa-google"></i> Google
										</button>
									</div>
									<div class="w3-col s6 w3-padding-small">
										<button class="btn btn-block btn-lg" style="box-shadow:none">
											<i class="fab fa-facebook"></i> Facebook
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="w3-half w3-hide-small">
					<h5>Hello</h5>
				</div>
			</div>
		</div>
	</div>

	<div class="pt-70" style="background-color:#fff">
		<div class="w3-center pt-30">
			<font class="w3-xxlarge block pb-50 w3-hide-small">A platform built for a</font>
			<font class="w3-xxlarge w3-hide-small">new way of making money</font>

			<font class="w3-xlarge block pb-50 w3-hide-medium w3-hide-large">A platform built for a</font>
			<font class="w3-xlarge w3-hide-medium w3-hide-large">new way of making money</font>
			
			<h5>What would you like to manage with your OS</h5>
		</div>
		<div class="w3-row w3-hide-small">
			<div class="w3-col m3">&nbsp;</div>
			<div class="w3-col m6">
				<div class="w3-row pt-20">
					<div class="w3-col m2 w3-padding-small">
						<div class="border border-danger w3-padding rounded">
							<span style="height:20px;width:20px" class="rounded border border-danger bg-danger bcenter"><svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" style="height: 16px;"><path d="M8.53033 14.2478L8 13.7175L7.46967 14.2478C7.76256 14.5407 8.23744 14.5407 8.53033 14.2478ZM8 12.6569L4.53033 9.18718C4.23744 8.89429 3.76256 8.89429 3.46967 9.18718C3.17678 9.48008 3.17678 9.95495 3.46967 10.2478L7.46967 14.2478L8 13.7175L8.53033 14.2478L16.2478 6.53033C16.5407 6.23743 16.5407 5.76256 16.2478 5.46967C15.955 5.17677 15.4801 5.17677 15.1872 5.46967L8 12.6569Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></span>
							<div class="w3-center pt-10 pb-10">
								<div>
									<i class="fa fa-gem fa-2x text-danger"></i>
								</div>
								<div class="pt-10">
									<font class="thin-font">Legit Business</font>
								</div>
							</div>
						</div>
					</div>
					<div class="w3-col m2 w3-padding-small">
						<div class="border border-primary w3-padding rounded">
							<span style="height:20px;width:20px" class="rounded border border-primary bg-primary bcenter"><svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" style="height: 16px;"><path d="M8.53033 14.2478L8 13.7175L7.46967 14.2478C7.76256 14.5407 8.23744 14.5407 8.53033 14.2478ZM8 12.6569L4.53033 9.18718C4.23744 8.89429 3.76256 8.89429 3.46967 9.18718C3.17678 9.48008 3.17678 9.95495 3.46967 10.2478L7.46967 14.2478L8 13.7175L8.53033 14.2478L16.2478 6.53033C16.5407 6.23743 16.5407 5.76256 16.2478 5.46967C15.955 5.17677 15.4801 5.17677 15.1872 5.46967L8 12.6569Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></span>
							<div class="w3-center pt-10 pb-10">
								<div>
									<i class="fa fa-shield-alt fa-2x text-primary"></i>
								</div>
								<div class="pt-10">
									<font class="thin-font">Secured Payments</font>
								</div>
							</div>
						</div>
					</div>
					<div class="w3-col m2 w3-padding-small">
						<div class="border border-warning w3-padding rounded">
							<span style="height:20px;width:20px" class="rounded border border-warning bg-warning bcenter"><svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" style="height: 16px;"><path d="M8.53033 14.2478L8 13.7175L7.46967 14.2478C7.76256 14.5407 8.23744 14.5407 8.53033 14.2478ZM8 12.6569L4.53033 9.18718C4.23744 8.89429 3.76256 8.89429 3.46967 9.18718C3.17678 9.48008 3.17678 9.95495 3.46967 10.2478L7.46967 14.2478L8 13.7175L8.53033 14.2478L16.2478 6.53033C16.5407 6.23743 16.5407 5.76256 16.2478 5.46967C15.955 5.17677 15.4801 5.17677 15.1872 5.46967L8 12.6569Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></span>
							<div class="w3-center pt-10 pb-10">
								<div>
									<i class="fa fa-chart-line fa-2x text-warning"></i>
								</div>
								<div class="pt-10">
									<font class="thin-font">Timely Updates</font>
								</div>
							</div>
						</div>
					</div>
					<div class="w3-col m2 w3-padding-small">
						<div class="w3-border w3-border-pink w3-padding rounded">
							<span style="height:20px;width:20px" class="rounded w3-border w3-border-pink w3-pink bcenter"><svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" style="height: 16px;"><path d="M8.53033 14.2478L8 13.7175L7.46967 14.2478C7.76256 14.5407 8.23744 14.5407 8.53033 14.2478ZM8 12.6569L4.53033 9.18718C4.23744 8.89429 3.76256 8.89429 3.46967 9.18718C3.17678 9.48008 3.17678 9.95495 3.46967 10.2478L7.46967 14.2478L8 13.7175L8.53033 14.2478L16.2478 6.53033C16.5407 6.23743 16.5407 5.76256 16.2478 5.46967C15.955 5.17677 15.4801 5.17677 15.1872 5.46967L8 12.6569Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></span>
							<div class="w3-center pt-10 pb-10">
								<div>
									<i class="fa fa-award fa-2x w3-text-pink"></i>
								</div>
								<div class="pt-10">
									<font class="thin-font">Get Rewarded</font>
								</div>
							</div>
						</div>
					</div>
					<div class="w3-col m2 w3-padding-small">
						<div class="w3-border w3-border-purple w3-padding rounded">
							<span style="height:20px;width:20px" class="rounded w3-border w3-border-purple w3-purple bcenter"><svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" style="height: 16px;"><path d="M8.53033 14.2478L8 13.7175L7.46967 14.2478C7.76256 14.5407 8.23744 14.5407 8.53033 14.2478ZM8 12.6569L4.53033 9.18718C4.23744 8.89429 3.76256 8.89429 3.46967 9.18718C3.17678 9.48008 3.17678 9.95495 3.46967 10.2478L7.46967 14.2478L8 13.7175L8.53033 14.2478L16.2478 6.53033C16.5407 6.23743 16.5407 5.76256 16.2478 5.46967C15.955 5.17677 15.4801 5.17677 15.1872 5.46967L8 12.6569Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></span>
							<div class="w3-center pt-10 pb-10">
								<div>
									<i class="fa fa-cogs fa-2x w3-text-purple"></i>
								</div>
								<div class="pt-10">
									<font class="thin-font">Safe Processing</font>
								</div>
							</div>
						</div>
					</div>
					<div class="w3-col m2 w3-padding-small">
						<div class="border border-info w3-padding rounded">
							<span style="height:20px;width:20px" class="rounded border border-info bg-info bcenter"><svg viewBox="0 0 20 20" fill="currentColor" width="20" height="20" style="height: 16px;"><path d="M8.53033 14.2478L8 13.7175L7.46967 14.2478C7.76256 14.5407 8.23744 14.5407 8.53033 14.2478ZM8 12.6569L4.53033 9.18718C4.23744 8.89429 3.76256 8.89429 3.46967 9.18718C3.17678 9.48008 3.17678 9.95495 3.46967 10.2478L7.46967 14.2478L8 13.7175L8.53033 14.2478L16.2478 6.53033C16.5407 6.23743 16.5407 5.76256 16.2478 5.46967C15.955 5.17677 15.4801 5.17677 15.1872 5.46967L8 12.6569Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg></span>
							<div class="w3-center pt-10 pb-10">
								<div>
									<i class="fa fa-award fa-2x text-info"></i>
								</div>
								<div class="pt-10">
									<font class="thin-font">Legit Business</font>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="w3-center pt-40 pb-30">
			<a href="register.php" class="btn btn-success w3-round-xxlarge" style="font-weight:200;padding-right:24px;padding-left:24px;box-shadow: none;font-family: robotLight;">Get Started <i class="fa fa-arrow-right"></i></a>
			<br>
			<font class="block pt-10 w3-small">No credit card needed   ✦   Unlimited time on Free plan</font>
		</div>
	</div>
</div>

<div class="pt-60 pb-60 w3-center">
	<div class="w3-xxlarge block"><b>Everything</b> <font style="font-family: robotLight;line-height: 50px;">you need for</font> <b>any Network Marketing</b></div>
	<font class="block pt-20 pb-20">Easily build your ideal workflow with monday.com building blocks.</font>
</font></div>
<?php require 'footer.php';?>
</body>
<script type="text/javascript">
	function toggleMenu(element) {
		if ($(element).hasClass("fa-bars")) {
			$(element).removeClass("fa-bars").addClass("fa-times");
		}
		else{
			$(element).removeClass("fa-times").addClass("fa-bars");
		}
		$('#menu-content').slideToggle();
	}

	$(document).ready(function(event) {
		let str = window.localStorage.getItem("user");
		if (str != null) {
			try{
				let user = JSON.parse(str);
				window.location = 'member/'
			}
			catch(E){
				alert(E.toString());
			}
		}
	})
</script>
</html>