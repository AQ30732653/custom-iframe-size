/*!
 * jQuery custom-iframe-size version 1.1
 *
 * options:
 * url                - iframe連結
 * resize             - 縮放時變動
 * type               - 目前只有facebook個別處理
 * width              - 設定iframe寬度
 * windowWidth        - 瀏覽器視窗的寬度
 * height             - 設定iframe高度
 * windowHeight       - 瀏覽器視窗的高度
 * mobileWidth        - 設定iframe寬度(行動裝置)
 * mobileWindowWidth  - 瀏覽器視窗的寬度(行動裝置)
 * mobileHeight       - 設定iframe高度(行動裝置)
 * mobileWindowHeight - 瀏覽器視窗的高度(行動裝置)
 *
 * Copyright (C) 2020 - A project by Roy.Jiang (https://github.com/AQ30732653/jquery.custom-iframe-size)
 */
(function ($) {
    $.fn.customIframeSize = function(options) {
        var _element = this;
        var resize = options.resize;
        var isMobile = {
            Android: function() {
                return navigator.userAgent.match(/Android/i);
            },
            BlackBerry: function() {
                return navigator.userAgent.match(/BlackBerry/i);
            },
            iOS: function() {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i);
            },
            Opera: function() {
                return navigator.userAgent.match(/Opera Mini/i);
            },
            Windows: function() {
                return navigator.userAgent.match(/IEMobile/i);
            },
            any: function() {
                return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
            }
        };

        options._width = $(_element).width();
        options._height = $(_element).height();

        if (resize === true) {
            options.resize = false;
            window.addEventListener('resize', function () {
                _customIframeSize(_element, options, isMobile);
            });
        }

        _customIframeSize(_element, options, isMobile);
    };

    function _customIframeSize(_element, options, isMobile) {
        var url = options.url;
        var type = options.type;
        var _width = options._width;
        var _height = options._height;
        var _src = $(_element).attr('src');

        // pc parameters
        var width = options.width;
        var windowWidth = options.windowWidth;
        var height = options.height;
        var windowHeight = options.windowHeight;

        // mobile parameters
        var mobileWidth = options.mobileWidth;
        var mobileWindowWidth = options.mobileWindowWidth;
        var mobileHeight = options.mobileHeight;
        var mobileWindowHeight = options.mobileWindowHeight;

        if (!url) {
            if (!_src) {
                return false;
            }

            url = _src;
        }

        if (!width) {
            width = _width;
            mobileWidth = _width;
        }

        if (!height) {
            height = _height;
            mobileHeight = _height;
        }

        if (isMobile.any()) {
            width = mobileWidth;
            if (mobileWindowWidth) {
                width = parseInt(mobileWidth * (window.innerWidth / mobileWindowWidth));
            }

            height = mobileHeight;
            if (mobileWindowHeight) {
                height = parseInt(mobileHeight * (window.innerHeight / mobileWindowHeight));
            }
        } else {
            if (windowWidth) {
                width = parseInt(width * (window.innerWidth / windowWidth));
            }

            if (windowHeight) {
                height = parseInt(height * (window.innerHeight / windowHeight));
            }
        }

        if (type === 'facebook') {
            if (width) {
                url += '&width='+ width;
            }

            if (height) {
                url += '&height='+ height;
            }
        }

        $(_element).attr('src', url);
        $(_element).attr('width', width);
        $(_element).attr('height', height);
    }
}(jQuery));
