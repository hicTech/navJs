#!/bin/bash
uglifyjs --compress --mangle --comments '/@license/' --source-map navigatorJS.map -o navigatorJS.min.js navigatorJS.js
