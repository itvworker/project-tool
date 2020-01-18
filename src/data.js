{
	"_pluginCompat": {
		"_args": ["options"],
		"taps": [{
			"type": "sync",
			"name": "Compiler"
		}, {
			"type": "sync",
			"name": "Tapable camelCase",
			"stage": 100
		}, {
			"type": "sync",
			"name": "Tapable this.hooks",
			"stage": 200
		}],
		"interceptors": []
	},
	"hooks": {
		"shouldEmit": {
			"_args": ["compilation"],
			"taps": [],
			"interceptors": []
		},
		"done": {
			"_args": ["stats"],
			"taps": [],
			"interceptors": []
		},
		"additionalPass": {
			"_args": [],
			"taps": [],
			"interceptors": []
		},
		"beforeRun": {
			"_args": ["compiler"],
			"taps": [{
				"type": "sync",
				"name": "NodeEnvironmentPlugin"
			}],
			"interceptors": []
		},
		"run": {
			"_args": ["compiler"],
			"taps": [],
			"interceptors": []
		},
		"emit": {
			"_args": ["compilation"],
			"taps": [],
			"interceptors": []
		},
		"assetEmitted": {
			"_args": ["file", "content"],
			"taps": [],
			"interceptors": []
		},
		"afterEmit": {
			"_args": ["compilation"],
			"taps": [],
			"interceptors": []
		},
		"thisCompilation": {
			"_args": ["compilation", "params"],
			"taps": [],
			"interceptors": []
		},
		"compilation": {
			"_args": ["compilation", "params"],
			"taps": [{
				"type": "sync",
				"name": "vue-loader-plugin"
			}],
			"interceptors": []
		},
		"normalModuleFactory": {
			"_args": ["normalModuleFactory"],
			"taps": [],
			"interceptors": []
		},
		"contextModuleFactory": {
			"_args": ["contextModulefactory"],
			"taps": [],
			"interceptors": []
		},
		"beforeCompile": {
			"_args": ["params"],
			"taps": [],
			"interceptors": []
		},
		"compile": {
			"_args": ["params"],
			"taps": [],
			"interceptors": []
		},
		"make": {
			"_args": ["compilation"],
			"taps": [],
			"interceptors": []
		},
		"afterCompile": {
			"_args": ["compilation"],
			"taps": [],
			"interceptors": []
		},
		"watchRun": {
			"_args": ["compiler"],
			"taps": [],
			"interceptors": []
		},
		"failed": {
			"_args": ["error"],
			"taps": [],
			"interceptors": []
		},
		"invalid": {
			"_args": ["filename", "changeTime"],
			"taps": [],
			"interceptors": []
		},
		"watchClose": {
			"_args": [],
			"taps": [],
			"interceptors": []
		},
		"infrastructureLog": {
			"_args": ["origin", "type", "args"],
			"taps": [],
			"interceptors": []
		},
		"environment": {
			"_args": [],
			"taps": [],
			"interceptors": []
		},
		"afterEnvironment": {
			"_args": [],
			"taps": [],
			"interceptors": []
		},
		"afterPlugins": {
			"_args": ["compiler"],
			"taps": [],
			"interceptors": []
		},
		"afterResolvers": {
			"_args": ["compiler"],
			"taps": [],
			"interceptors": []
		},
		"entryOption": {
			"_args": ["context", "entry"],
			"taps": [],
			"interceptors": []
		},
		"infrastructurelog": {
			"_args": ["origin", "type", "args"],
			"taps": [],
			"interceptors": []
		}
	},
	"outputPath": "",
	"outputFileSystem": {},
	"inputFileSystem": {
		"fileSystem": {},
		"_statStorage": {
			"duration": 60000,
			"running": {},
			"data": {},
			"levels": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
			"count": 0,
			"interval": null,
			"needTickCheck": false,
			"nextTick": null,
			"passive": true
		},
		"_readdirStorage": {
			"duration": 60000,
			"running": {},
			"data": {},
			"levels": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
			"count": 0,
			"interval": null,
			"needTickCheck": false,
			"nextTick": null,
			"passive": true
		},
		"_readFileStorage": {
			"duration": 60000,
			"running": {},
			"data": {},
			"levels": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
			"count": 0,
			"interval": null,
			"needTickCheck": false,
			"nextTick": null,
			"passive": true
		},
		"_readJsonStorage": {
			"duration": 60000,
			"running": {},
			"data": {},
			"levels": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
			"count": 0,
			"interval": null,
			"needTickCheck": false,
			"nextTick": null,
			"passive": true
		},
		"_readlinkStorage": {
			"duration": 60000,
			"running": {},
			"data": {},
			"levels": [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}],
			"count": 0,
			"interval": null,
			"needTickCheck": false,
			"nextTick": null,
			"passive": true
		}
	},
	"recordsInputPath": null,
	"recordsOutputPath": null,
	"records": {},
	"removedFiles": {},
	"fileTimestamps": {},
	"contextTimestamps": {},
	"resolverFactory": {
		"_pluginCompat": {
			"_args": ["options"],
			"taps": [{
				"type": "sync",
				"name": "ResolverFactory"
			}, {
				"type": "sync",
				"name": "Tapable camelCase",
				"stage": 100
			}, {
				"type": "sync",
				"name": "Tapable this.hooks",
				"stage": 200
			}],
			"interceptors": []
		},
		"hooks": {
			"resolveOptions": {
				"_map": {},
				"_interceptors": []
			},
			"resolver": {
				"_map": {},
				"_interceptors": []
			}
		},
		"cache2": {}
	},
	"resolvers": {
		"normal": {},
		"loader": {},
		"context": {}
	},
	"options": {
		"mode": "development",
		"context": "E:\\脚手架\\project-tool",
		"entry": {
			"app": ["@babel/polyfi
				ll ",". / src / entry / main.js "]},"
				output ":{"
				path ":"
				E: \\脚手架\\ project - tool\\ dist ","
				filename ":" [name].[hash: 4].js ","
				chunkFilename ":" [name].[
					hash
				].js ","
				publicPath ":" / ","
				webassemblyModuleFilename ":" [modulehash].module.wasm ","
				library ":"
				","
				hotUpdateFunction ":"
				webpackHotUpdate ","
				jsonpFunction ":"
				webpackJsonp ","
				chunkCallbackName ":"
				webpackChunk ","
				globalObject ":"
				window ","
				devtoolNamespace ":"
				","
				libraryTarget ":"
				var ","
				pathinfo ":true,"
				sourceMapFilename ":" [file].map[query]
				","
				hotUpdateChunkFilename ":" [id].[hash].hot - update.js ","
				hotUpdateMainFilename ":" [hash].hot - update.json ","
				crossOriginLoading ":false,"
				jsonpScriptType ":false,"
				chunkLoadTimeout ":120000,"
				hashFunction ":"
				md4 ","
				hashDigest ":"
				hex ","
				hashDigestLength ":20,"
				devtoolLineToLine ":false,"
				strictModuleExceptionHandling ":false},"
				resolve ":{"
				extensions ":[".js ",".vue ",".json "],"
				alias ":{"
				vue$ ":"
				vue / dist / vue.esm.js ","
				$p ":"
				E: \\脚手架\\ project - tool\\ packages ","
				@ ":"
				E: \\脚手架\\ project - tool\\ src "},"
				unsafeCache ":tr
				ue, "modules": ["node_modules"], "mainFiles": ["index"], "aliasFields": ["browser"], "mainFields": ["browser", "module", "main"], "cacheWithContext": false
			},
			"module": {
				"rules": [{
					"loader": "E:\\脚手架\\project-tool\\node_modules\\vue-loader\\lib\\loaders\\pitcher.js",
					"options": {}
				}, {
					"r
					esource ":{},"
					use ":[{"
					loader ":"
					vue - style - loader "},{"
					loader ":"
					css - loader "}]},{"
					resource ":{},"
					use ":[{"
					options ":{"
					unit ":"
					rem ","
					divisor ":37.5,"
					accuracy ":6,"
					raw ":"
					rpx "},"
					ident ":"
					ref--2 - 0 ","
					loader ":"
					units - loader "},{"
					loader ":"
					vue - style - loader "},{"
					loader ":"
					css - loader "},{"
					loader ":"
					less - loader "},{"
					options ":{"
					resources ":["
					E: \\脚手架\\ project - tool\\ src\\ assets\\ css\\
					const.less ","
					E: \\脚手架\\ project - tool\\ packages\\
					assets\\ css\\ theme.less "]},"
					ident ":"
					ref--2 - 4 ","
					loader ":"
					sass - resources - loader "}]},{"
					resource ":{},"
					use ":[{"
					loader ":"
					babel - loader "}]},{"
					resource ":{},"
					use ":[{"
					options ":{"
					limit ":10000,"
					name ":"
					E: \\脚手架\\ project - tool\\ dist\\ static\\ img\\[name].[hash: 7].[ext]
					"},"
					ident ":"
					ref -
					-4 ","
					loader ":"
					url - loader "}]},{"
					resource ":{},"
					use ":[{"
					options ":{"
					limit ":10000,"
					name ":"
					E: \\脚手架\\ project - tool\\ dist\\ static\\ media\\[na me].[hash: 7].[ext]
					"},"
					ident ":"
					ref--5 ","
					loader ":"
					url - loader "}]},{"
					resource ":{},"
					use ":[{"
					options ":{"
					limit ":1000000,"
					name ":"
					E: \\脚手架\\ pr
					oject - tool\\ dist\\ static\\ font\\[name].[hash: 7].[ext]
					"},"
					ident ":"
					ref--6 ","
					loader ":"
					url - loader "}]},{"
					use ":[{"
					options ":{},"
					loader ":"
					vue - loader ","
					ident ":"
					vue - loader - options "}]},{"
					use ":[{"
					loader ":"
					vue - style - loader "},{"
					loader ":"
					css - loader "}]},{"
					use ":[{"
					options ":{"
					unit ":"
					rem ","
					divisor ":37.5,"
					accuracy ":6,"
					raw ":"
					rpx "},"
					ident ":"
					ref--2 - 0 ","
					loader ":"
					units - loader "},{"
					loader ":"
					vue - style - loader "},{"
					loader ":"
					css - loader "},{"
					loader ":"
					less - loader "},{"
					options ":{"
					resources ":["
					E: \\脚手架\\ project - tool\\ src\\ assets\\ css\\
					const.less ","
					E: \\脚手架\\ project - to
					ol\\ packages\\ assets\\ css\\ theme.less "]},"
					ident ":"
					ref--2 - 4 ","
					loader ":"
					sass - resources - loader "}]},{"
					use ":[{"
					loader ":"
					babel - loader "}]},{"
					use ":[{"
					options ":{"
					limit ":10000,"
					name ":"
					E: \\脚手架\\ project - tool\\ dist\\ static\\ img\\[name].[hash: 7].[ext]
					"},"
					ident ":"
					ref--4 ","
					loader ":"
					url - loader "}]},{"
					use ":[{"
					options ":{"
					limit ":10000,"
					name ":"
					E: \\脚手架\\ project - tool\\ dist\\ static\\ media\\[name].[hash: 7].[ext]
					"},"
					ident ": "ref--5",
					"loader": "url-loader"
				}]
			},
			{
				"use": [{
							"options": {
								"limit": 1000000,
								"name": "E:\\脚手架\\project-tool\\dist\\static\\font\\[name].[ha
								sh: 7].[ext]
							"},"
							ident ":"
							ref--6 ","
							loader ":"
							url - loader "}]}],"
							unknownContextRequest ":".
							","
							unknownContextRegExp ":false,"
							unknownContextRecursive ":true,"
							unknownContextCritical ":true,"
							exprContextRequest ":".
							","
							exprContextRegExp ":false,"
							exprContextRecursive ":true,"
							exprContextCritical ":true,"
							wrappedContextRegExp ":{},"
							wrappedContextRecursive ":true,"
							wrappedContextCritical ":false,"
							strictExportPresence ":false,"
							strictThisContextOnImports ":false,"
							unsafeCache ":true,"
							defaultRules ":[{"
							type ":"
							javascript / auto ","
							resolve ":{}},{"
							test ":{},"
							type ":"
							javascript / esm ","
							resolve ":{"
							mainFields ":["
							browser ","
							main "]}},{"
							test ":{},"
							type ":"
							json "},{"
							test ":{},"
							type ":"
							webassembly / experimental "}]},"
							devServer ":{"
							contentBase ":"
							E: \\脚手架\\ project - tool\\ dist ","
							host ":"
							0.0 .0 .0 ","
							compress ":true,"
							open ":false,"
							hot ":true,"
							port ":8888,"
							publicPath ":" / ","
							f
							ilename ":" [name].[hash: 4].js ","
							clientLogLevel ":"
							info ","
							stats ":{"
							children ":false,"
							warnings ":true,"
							source ":true,"
							hash ":true,"
							colors ":{"
							level ":2,"
							hasBasic ":true,"
							has256 ":true,"
							has16m ":false}}},"
							stats ":{"
							children ":false,"
							warnings ":true,"
							source ":true,"
							hash ":true},"
							plugins ":[{},{"
							options ":{"
							template ":"
							public / index.dev.html ","
							filename ":"
							index.html ","
							hash ":false,"
							inject ":true,"
							compile ":true,"
							favicon ":false,"
							minify ":false,"
							cache ":true,"
							showErrors ":true,"
							chunks ":"
							all ","
							excludeChunks ":[],"
							chunksSortMode ":"
							auto ","
							meta ":{},"
							title ":"
							Webpack App ","
							xhtml ":false}}],"
							devtool ":"
							eval ","
							cache ":true,"
							target ":"
							web ","
							node ":{"
							console ":false,"
							process ":true,"
							global ":true,"
							Buffer ":true,"
							setImmediate ":true,"
							__filename ":"
							mock ","
							__dirname ":"
							mock "},"
							performance ":false,"
							optimization ":{"
							removeAvailableModules ":false,"
							removeEmptyChunks ":true,"
							mergeDuplicateChunks ":true,"
							flagIncludedChunks ":false,"
							occurrenceOrder ":false,"
							sideEffects ":false,"
							providedExports ":true,"
							usedExports ":false,"
							concatenateModules ":false,"
							splitChunks ":{"
							hidePathInfo ":false,"
							chunks ":"
							async ","
							minSize ":10000,"
							minChunks ":1,"
							maxAsyncRequests ":null,"
							automaticNameDelimiter ":"~","
							automaticNameMaxLength ":109,"
							maxInitialRequests ":null,"
							name ":true,"
							cacheGroups ":{"
							default ":{"
							automaticNamePrefix ":"
							","
							reuseExistingChunk ":true,"
							minChunks ":2,"
							priority ":-20},"
							vendors ":{"
							automaticNamePrefix ":"
							vendors ","
							test ":{},"
							priority ":-10}}},"
							noEmitOnErrors ":false,"
							checkWasmTypes ":false,"
							mangleWasmImports ":false,"
							namedModules ":true,"
							hashedModuleIds ":false,"
							namedChunks ":true,"
							portableRecords ":false,"
							minimize ":false,"
							minimizer ":[{}],"
							nodeEnv ":"
							development "},"
							resolveLoader ":{"
							unsafeCache ":true,"
							mainFields ":["
							loader ","
							main "],"
							extensions ":[".js ",".json "],"
							mainFiles ":["
							index "],"
							cacheWithContext ":false},"
							infrastructureLogging ":{"
							level ":"
							info ","
							debug ":false}},"
							context ":"
							E: \\脚手架\\ project - tool ","
							requestShortener ":{"
							currentDirectoryRegExp ":{},"
							parentDirectoryRe
							gExp ":{},"
							buildinsAsModule ":true,"
							buildinsRegExp ":{},"
							cache ":{}},"
							running ":false,"
							watchMode ":false,"
							_assetEmittingSourceCache ":{},"
							_assetEmittingWrittenFiles ":{},"
							watchFileSystem ":{"
							inputFileSystem ":{"
							fileSystem ":{},"
							_statStorage ":{"
							duration ":60000,"
							running ":{},"
							data ":{},"
							levels ":[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],"
							count ":0,"
							interval ":null,"
							needTickCheck ":false,"
							nextTick ":null,"
							passive ":true},"
							_readdirStorage ":{"
							duration ":60000,"
							running ":{},"
							data ":{},"
							levels ":[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],"
							count ":0,"
							interval ":null,"
							needTickCheck ":false,"
							nextTick ":null,"
							passive ":true},"
							_readFileStorage ":{"
							duration ":60000,"
							running ":{},"
							data ":{},"
							levels ":[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],"
							count ":0,"
							interval ":null,"
							needTickCheck ":false,"
							nextTick ":null,"
							passive ":true},"
							_readJsonStorage ":{"
							duration ":60000,"
							running ":{},"
							data ":{},"
							levels ":[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],"
							count ":0,"
							interval ":null,"
							needTickCheck ":false,"
							nextTick ":null,"
							passive ":true},"
							_readlinkStorage ":{"
							duration ":60000,"
							running ":{},"
							data ":{},"
							levels ":[{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{},{}],"
							count ":0,"
							interval ":null,"
							needTickCheck ":false,"
							nextTick ":null,"
							passive ":true}},"
							watcherOptions ":{"
							aggregateTimeout ":200},"
							watcher ":{"
							_events ":{},"
							_eventsCount ":0,"
							options ":{"
							aggregateTimeout ":200},"
							watcherOptions ":{},"
							fileWatchers ":[],"
							dirWatchers ":[],"
							mtimes ":{},"
							paused ":false,"
							aggregatedChanges ":[],"
							aggregatedRemovals ":[],"
							aggregateTimeout ":0}}}
