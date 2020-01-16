{
	"sourceType": "unambiguous",
	"overrides": [{
		"exclude": [{}, {}],
		"presets": [
			[{}, {
				"corejs": 3,
				"loose": false,
				"debug": false,
				"modules": false,
				"useBuiltIns": "usage",
				"ignoreBrowserslistConfig": false,
				"exclude": ["es.array.iterator", "es.promise", "es.object.assign", "es.promise.finally"]
			}],
			[null, {}]
		],
		"plugins": [
			[null, {
				"polyfills": ["es.array.iterator", "es.promise", "es.object.assign", "es.promise.finally"],
				"entryFiles": [],
				"useAbsolutePath": true
			}], {},
			[{}, {
				"legacy": true
			}],
			[{}, {
				"loose": false
			}],
			[{}, {
				"regenerator": false,
				"corejs": false,
				"helpers": true,
				"useESModules": true,
				"absoluteRuntime": "E:\\project\\2019年会\\wall-codes\\node_modules\\@babel\\runtime"
			}]
		]
	}, {
		"include": [{}],
		"presets": [
			[{}, {
				"useBuiltIns": "usage",
				"corejs": 3
			}]
		]
	}]
}
