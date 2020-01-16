{
	"loaders": {
		"css": ["vue-style-loader", {
			"loader": "css-loader",
			"options": {
				"sourceMap": true
			}
		}, {
			"loader": "units-loader",
			"options": {
				"unit": "rem",
				"divisor": 37.5,
				"accuracy": 6
			}
		}],
		"postcss": ["vue-style-loader", {
			"loader": "css-loader",
			"options": {
				"sourceMap": true
			}
		}, {
			"loader": "units-loader",
			"options": {
				"unit": "rem",
				"divisor": 37.5,
				"accuracy": 6
			}
		}],
		"less": ["vue-style-loader", {
			"loader": "units-loader",
			"options": {
				"unit": "rem",
				"divisor": 37.5,
				"accuracy": 6,
				"raw": "rpx"
			}
		}, {
			"loader": "css-loader",
			"options": {
				"sourceMap": true
			}
		}, "less-loader", {
			"loader": "sass-resources-loader",
			"options": {
				"resources": ["E:\\project\\IHR美课\\ihr美课codes\\src\\assets\\css\\const.less"]
			}
		}],
		"sass": ["vue-style-loade
				r ",{"
				loader ":"
				css - loader ","
				options ":{"
				sourceMap ":true}},{"
				loader ":"
				units - loader ","
				options ":{"
				unit ":"
				rem ","
				divisor ":37.5,"
				accuracy ":6}},{"
				loader ":"
				sass - loader ","
				options ":{"
				indentedSyntax ":true,"
				sourceMap ":true}}],"
				scss ":["
				vue - style - loader ",{"
				loader ":"
				css - loader ","
				options ":{"
				sourceMap ":true}},{"
				loader ":"
				units - loader ","
				options ":{"
				unit ":"
				rem ","
				divisor ":37.5,"
				accuracy ":6}},{"
				loader ":"
				sass - loader ","
				options ":{"
				sourceMap ":true}}],"
				stylus ":["
				vue - style - loader ",{"
				loader ":"
				css - loader ","
				options ":{"
				sourceMap ":true}},{"
				loader ":"
				units - loader ","
				options ":{"
				unit ":"
				rem ","
				divisor ":37.5,"
				accuracy ":6}},{"
				loader ":"
				stylus - loader ","
				options ":{"
				sourceMap ":true}}],"
				styl ":["
				vue - style - loader ",{"
				loader ":"
				css - loader ","
				options ":{"
				sourceMap ":true}},{"
				loader ":"
				units - loader ","
				options ":{"
				unit ":"
				rem ","
				divisor ":37.5,"
				accuracy ":6}},{"
				loader ":"
				stylus - loader ","
				options ":{"
				sourceMap ":true}}]}}
