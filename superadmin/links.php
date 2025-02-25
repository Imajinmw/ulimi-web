<?php 

$ip = "192.168.43.128";
$ip = "localhost"
?>
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="theme-color" content="#19535f" />
<link rel="icon" type="image/png" href="../images/clogo.png">
<link rel="manifest" href="manifest_white.json">
<link rel="stylesheet" type="text/css" href="apple-root.css">
<link rel="stylesheet" type="text/css" href="../w3css/w3.css">
<link rel="stylesheet" type="text/css" href="../w3css/default.css">
<link rel="stylesheet" type="text/css" href="../vendor/bootstrap/css/bootstrap.min.css">
<script type="text/javascript" src="../vendor/jquery/jquery.min.js"></script>
<script type="text/javascript" src="../vendor/bootstrap/js/bootstrap.min.js"></script>
<link rel="stylesheet" type="text/css" href="../semantic/semantic.min.css">
<link rel="stylesheet" type="text/css" href="../fontawesome/css/all.css">
<script type="text/javascript" src="../resources/rodz.js"></script>
<link rel="stylesheet" type="text/css" href="../resources/rodz.css">

<style type="text/css" id="stylesheet1"></style>
<link rel="stylesheet" type="text/css" href="../toastify/src/toastify.css">
<script type="text/javascript" src="../toastify/src/toastify.js"></script>
<script src="../resources/react.js" crossorigin="anonymous"></script>
<script src="../resources/react-dom.js"></script>
<script src="../resources/material-ui.js" crossorigin="anonymous" ></script>
<script src="../resources/babel.js" crossorigin="anonymous" ></script>
<script src="../resources/prop-types.js" crossorigin="anonymous" ></script>

<style type="text/css">
    :root{
        --u-dark:#343a40;
        --u-yellow:#ffcb05;
    }
    .pointer:hover,#progress{
        cursor: pointer;
    }
    .top-bar{
        border-top: 3px solid #3385ff !important;
    }
    .hide_images img{
        display: none;
    }
    .extendable{
        height: 600px;overflow-y: hidden;
    }
    .extendable img{
        display: none;
    }
    .scrollbar1::-webkit-scrollbar{
        display: none;
        width: 0;
        height: 0;
    }
    .dark-me:hover{
        cursor: pointer;
        background: rgba(0, 0, 0, .13);
    }
    .scrollbar1{
        scrollbar-width:none;
        -ms-overflow-style:none;
    }
    @font-face{
        font-family: googleRoboto;
        src:url('../fonts/Roboto/Roboto-Regular.ttf');
    }
    @font-face{
        font-family: robotLight;
        src:url('../fonts/Roboto/Roboto-Light.ttf');
    }
    @font-face{
        font-family: openSans;
        src:url('../fonts/Open_Sans/OpenSans-Regular.ttf');
    }
    @font-face{
        font-family: sourceSans;
        src:url('../fonts/Source_Sans_Pro/SourceSansPro-Regular.ttf');
    }
    @font-face{
        font-family: ubuntu;
        src:url('../fonts/ubuntu/Ubuntu-Regular.ttf');
    }
     @font-face{
        font-family: ubuntuBold;
        src:url('../fonts/ubuntu/Ubuntu-Bold.ttf');
    }
    body{
        font-family: googleRoboto,sans-serif; !important;
    }
    .ubuntu-bold{
        font-family: ubuntuBold;
    }
    .opensans{
        font-family: openSans;
    }
    .roboto{
        font-family: googleRoboto, sans-serif;
    }
    .ubuntu{
        font-family: ubuntu;
    }
    .block{
        display: block;
    }
    .white-grad{
        background: rgba(255, 255, 255, .97);
    }
    .top_search1{
        position: relative;
    }
    .top_search1 i {
        position: absolute;
        left: 10px;
        top: 8px;
    }
    .top_search1 input{
        padding-left: 40px !important;
        border: 1px solid #ccc !important;
        width: 100%;
        border-radius: 3px;
        color: black;
        background: inherit !important;
    }
    .css-4t3x6l-MuiPaper-root-MuiDrawer-paper{
        width: 240px;
    }
    .top_search1 input:focus{
        padding-left: 40px !important;
        border: 1px solid #fd7e14 !important;
        background: inherit !important;
        width: 100%;
        color: black;
        outline: none;
    }
    .my_b{
        padding: 8px 6px;
        border-radius: 3px;
        color: black;
    }
    .my_b:hover{
        background: #ccc;
    }

    .leftBtn{
        border-right: 3px solid transparent;
    }
    .leftBtn.active{
        background: #ddd;
        padding: 3px 3px;
        border-right: 3px solid var(--bs-warning);
    }
    .wide{
        width: 25px;
    }
    .nav2{
        width: 120px;position: fixed;height: 700px;z-index: 10;background: var(--sidebar);border-right: 1px solid var(--sidebarBorderRule);
    }
    .loading-start{
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        padding-top: 300px;
        height: calc(100%);
        align-content: center;
        z-index: 10;
    }
    .loading-start img{
        width: 100px;
        width: 100px;
    }
    .border-2{
        border-width: 2px !important;
    }
    .topButtons button{
        background: inherit;
        padding: 0px 12px;
        border: none;
        color: black;
        cursor: pointer;
        outline: none;
    }

    .bold{
        font-weight: bold;
    }

    .topButtons button:hover, .topButtons button.active{
        color: var(--orange-600) !important;
    }
    .font{
        font-family: "Roboto","Helvetica","Arial",sans-serif;
    }
    .no-wrap{
        word-wrap: unset;
        white-space: nowrap;
    }
    .w3-col.s51{width:19.99%}

    .lg1{
        font-size: 1.1rem;
    }
    .welcome{
        display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    }
    .css-12rl710-MuiPaper-root-MuiDialog-paper {
        min-width: 350px;
    }
    .table-bordered td{
        border-left: none !important;
    }
    .form-control:focus{
        border: 3px solid var(--u-yellow);
    }
    .bcenter{
        display: inline-flex;
        flex-flow: column nowrap;
        justify-content: center;
        align-items: center;
    }
    .some-padding{
        padding:8px 16px !important;
    }
    .some-padding.alert-primary{
        color: #997a00;
    }
    .hover-me:hover{
        background-color: #997a00;
        color: white;
    }
    .sm-text{
        text-transform: none !important;
    }
    .some-padding.active, .active1{
        background:#997a00 !important;
    }
    .bg-alert{
        background: #fff0b3;
    } 
    .MuiButtonBase-root{
        outline: none !important;
    }   
</style>
<script type="text/javascript">
    function _(id) {
        return document.getElementById(id);
    }

    function Toast(text) {
        Toastify({
            text: text,
            gravity: "top",
            position: 'center',
            backgroundColor:"#dc3545",
            background:"#dc3545"
        }).showToast();
    }

    <?php 
    if (isset($_COOKIE['theme'])) {
        $theme = $_COOKIE['theme'];
        ?>
        var theme = "<?=ucfirst($_COOKIE['theme']);?>";
        <?php
    }
    else{
        $theme = "light";
        ?>
        var theme = "Light";
        <?php
    }
    ?>
</script>
<style type="text/css" id="theme-changer">
</style>
<script type="text/javascript" src="../Chart.min.js"></script>
<script type="text/javascript">
    <?php 
    if(isset($_SESSION['user'])){
        ?>
        var hasLogged = true;
        var userObj = JSON.parse('<?=json_encode($_SESSION['user']);?>');
        <?php
    }
    else{
        ?>
        var hasLogged = false;
        <?php
    }
    ?>
</script>