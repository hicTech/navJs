/**
 * Created by RiMaStInO in 09/12/2015.
 */
$(document).ready(function () {


    if(navJS.isMobile()){
        setDevice('M');

    }if(navJS.isDesktop()){
        setDevice('D');

    }if(navJS.isChrome()){
        setBrowser('C');

    }if(navJS.isFirefox()){
        setBrowser('F');

    }if(navJS.isSafari()){
        setBrowser('S');

    }if(navJS.isIE() || navJS.isEdge('E')){
        setBrowser('E');

    }if(navJS.isOpera()){
        setBrowser('O');
    }

    if(navJS.isMac()){
        setOS('Ma');
    }

    if(navJS.isWindows()){
        setOS('Wi');
    }

    if(navJS.isLinux()){
        setOS('Li');
    }

    if(navJS.isUnix()){
        setOS('Un');
    }

    if(navJS.isIOS()){
        setOS('iO');
    }

    if(navJS.isAndroid()){
        setOS('An');
    }


    setHD(navJS.isHD());


    function setDevice(str){
        var $device=$(".container-device");
        $device.each(function () {
            var labelDev = ($(this).find(".label-icon").html());
            if(str == labelDev.charAt(0)){
                $(this).addClass("color-device");
            }
        });
    }

    function setBrowser(str){
        var $browser=$(".container-browser");
        $browser.each(function () {
            var labelBrow = ($(this).find(".label-icon").html());
            if(str == labelBrow.charAt(0)){
                $(this).addClass("color-browser");
            }
        });
    }

    function setOS(str){
        var $OS=$(".container-os");
        $OS.each(function () {
            var labelOS = ($(this).find(".label-icon").html());
            if(str === labelOS.substring(0,2)){
                $(this).addClass("color-os");
            }
        });
    }

    function setHD(bool){
        if(bool){
            $(".enabledHD").addClass("color-hd");
        }if(!bool){
            $(".disabledHD").addClass("color-hd");
        }
    }

});