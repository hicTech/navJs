/*

 NavigatorJS 0.2
 https://github.com/hicTech/navigatorJs
 www.hictech.com

 */


var navJS = {

    toJSON: function() {
        var json =  {
            userAgent: this.userAgent(),

            os: this.os(),

            browser: {
                name: this.browser(),
                version: this.version(),
                mobile: this.isMobile(),
                desktop: this.isDesktop(),
            },


            screen: {
                hd: this.isHD(),
                pixelRatio: this.pixelRatio(),
                landscape: this.isLandscape(),
                portrait: this.isPortrait(),
                touch: this.isTouch()
            }
        }

        if( this.isIOS() ) {
            json.ios = {
                version: this.getIOSVersion(),
                device: this.isIPhone()? 'iphone' : this.isIPad()? 'ipad' : undefined
            }
        }

        return json;
    },

    os: function() {
        if( this.isIOS() ) { return 'ios'; }
        if( this.isAndroid() ) { return 'android'; }
        if( this.isWindows() ) { return 'windows'; }
        if( this.isUnix() ) { return 'unix'; }
        if( this.isMac() ) { return 'mac'; }
        if( this.isLinux() ) { return 'linux'; }
        if( this.isBlackBerry() ) { return 'blackberry'; }
        else return undefined;
    },

    browser: function() {
        if ( this.isSafari() ) { return 'safari'; }
        if ( this.isChrome() ) { return 'chrome'; }
        if ( this.isIE() ) { return 'ie'; }
        if ( this.isEdge() ) { return 'edge'; }
        if ( this.isFirefox() ) { return 'firefox'; }
        if ( this.isOpera() ) { return 'opera'; }
        else return undefined;
    },

    userAgent: function () {
        return navigator.userAgent;
    },
    browserName: function () {
        var ua = this.userAgent(), tem,
            M = ua.match(/(fxios|opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
        if (/trident/i.test(M[1])) {
            tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE ' + (tem[1] || '');
        }
        if (M[1] === 'Chrome') {
            /*
             * IE Edge has "chrome" as user agent and
             * this check is mandatory at this point.
             * 
             * If the check is passed the M variabled
             * is replaced and the code continue like
             * other browers. 
             */ 
            tem = ua.match(/(edge(?=\/))\/?\s*(\d+)/i);
            if( !!tem ) {
                M = tem;
            }

            else {
                tem = ua.match(/\bOPR\/(\d+)/)
                if (tem != null) return 'Opera ' + tem[1];
            }
        }
        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];
        if ((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);
        return M.join(' ');
    },



    /* mobile detection */


    isMobile: function () {
        return this.userAgent().match(/iPhone|iPad|iPod|Android|BlackBerry|Opera Mini|IEMobile|CRiOS|OPiOS|Mobile|FxiOS/i) != null;
    },
    isDesktop: function () {
        return !this.isMobile();
    },



    /* desktop detection */


    isSafari: function () {
        return (this.userAgent().indexOf("Safari") != -1 && navigator.vendor.indexOf("Apple Computer") != -1 && !this.isChrome()) && !this.isFirefox() && !this.isOpera();
    },
    isChrome: function () {
        return ((this.userAgent().indexOf("Chrome") != -1 && navigator.vendor.indexOf("Google Inc") != -1) || this.userAgent().indexOf("CriOS") != -1) && !this.isOpera();
    },
    isIE: function () {
        return this.browserName().toLowerCase().match(/ie|msie|iemobile/i) != null;
    },
    isEdge: function () {
        return this.browserName().toLowerCase().match(/edge/i) != null;
    },
    isFirefox: function () {
        return this.browserName().toLowerCase().match(/firefox|fxios/i) != null;

    },
    isOpera: function () {
        return this.userAgent().toLowerCase().match(/opera|opr|opera mini|opios/i) != null || Object.prototype.toString.call(window.operamini) === "[object OperaMini]";
    },




    /* mobile browsers detection */


    isMobileChrome: function () {
        return (this.userAgent().toLowerCase().match("crios") != null) || (this.isChrome() && this.isMobile())
    },
    isMobileSafari: function () {
        return this.isMobile() && this.isSafari();
    },
    isMobileIE: function () {
        return this.isMobile() && this.isIE();
    },

    isMobileOpera: function () {
        return this.isMobile() && this.isOpera();
    },

    isMobileFirefox: function () {
        return this.isMobile() && this.isFirefox();
    },




    /* HD resolution detection */


    isHD: function () {
        if (!window.devicePixelRatio)
            return false;
        return window.devicePixelRatio && window.devicePixelRatio > 1;
    },
    pixelRatio: function () {
        if (!window.devicePixelRatio)
            return 1;
        return window.devicePixelRatio;
    },


    isIOS: function () {
        return this.userAgent().match(/iPhone|iPad|iPod/i) != null;
    },
    isAndroid: function () {
        return this.userAgent().match(/Android/i) != null;
    },
    isWindows: function () {
        return this.userAgent().match(/Windows/i) != null;
    },
    isUnix: function () {
        return this.userAgent().match(/Unix/i) != null;
    },
    isMac: function () {
        return this.userAgent().match(/Mac/i) != null && !this.isIOS();
    },
    isLinux: function () {
        return this.userAgent().match(/Linux/i) != null && !this.isAndroid();
    },
    isBlackBerry: function () {
        return this.userAgent().match(/BlackBerry/i) != null;
    },




    isIPad: function () {
        isIPad = (/ipad/gi).test(navigator.platform);
        return isIPad;
    },
    isIPhone: function () {
        isIPad = (/iphone/gi).test(navigator.platform);
        return isIPad;
    },
    isLandscape: function () {
        if (window.innerHeight < window.innerWidth) {
            return true;
        }
        return false;
    },
    isPortrait: function () {
        return this.isLandscape();
    },
    getIOSVersion: function () {
        if (this.isIOS()) {
            var OSVersion = navigator.appVersion.match(/OS (\d+_\d+)/i);
            OSVersion = OSVersion[1] ? +OSVersion[1].replace('_', '.') : 0;
            return OSVersion;
        }
        else
            return false;
    },
    isStandAlone: function () {
        if (!!navigator.standalone)
            return navigator.standalone;
        return false;
    },


    version: function () {
        return this.browserName().replace(/^\D+/g, '');
    },


    maxTouchPoints: function () {
        if (navigator.maxTouchPoints)
            return navigator.maxTouchPoints;
    },

    isTouch: function () {
        return 'ontouchstart' in document.documentElement;
    }



}
