/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = 
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if(parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/ 	
/******/ 	function hotDownloadUpdateChunk(chunkId) { // eslint-disable-line no-unused-vars
/******/ 		var head = document.getElementsByTagName("head")[0];
/******/ 		var script = document.createElement("script");
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		;
/******/ 		head.appendChild(script);
/******/ 	}
/******/ 	
/******/ 	function hotDownloadManifest(requestTimeout) { // eslint-disable-line no-unused-vars
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if(typeof XMLHttpRequest === "undefined")
/******/ 				return reject(new Error("No browser support"));
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch(err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if(request.readyState !== 4) return;
/******/ 				if(request.status === 0) {
/******/ 					// timeout
/******/ 					reject(new Error("Manifest request to " + requestPath + " timed out."));
/******/ 				} else if(request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if(request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch(e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	
/******/ 	
/******/ 	var hotApplyOnUpdate = true;
/******/ 	var hotCurrentHash = "3e14d72acb5561184127"; // eslint-disable-line no-unused-vars
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParents = []; // eslint-disable-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = []; // eslint-disable-line no-unused-vars
/******/ 	
/******/ 	function hotCreateRequire(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var me = installedModules[moduleId];
/******/ 		if(!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if(me.hot.active) {
/******/ 				if(installedModules[request]) {
/******/ 					if(installedModules[request].parents.indexOf(moduleId) < 0)
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if(me.children.indexOf(request) < 0)
/******/ 					me.children.push(request);
/******/ 			} else {
/******/ 				console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for(var name in __webpack_require__) {
/******/ 			if(Object.prototype.hasOwnProperty.call(__webpack_require__, name) && name !== "e") {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if(hotStatus === "ready")
/******/ 				hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/ 	
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if(hotStatus === "prepare") {
/******/ 					if(!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if(hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/ 	
/******/ 	function hotCreateModule(moduleId) { // eslint-disable-line no-unused-vars
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/ 	
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfAccepted = true;
/******/ 				else if(typeof dep === "function")
/******/ 					hot._selfAccepted = dep;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else
/******/ 					hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if(typeof dep === "undefined")
/******/ 					hot._selfDeclined = true;
/******/ 				else if(typeof dep === "object")
/******/ 					for(var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else
/******/ 					hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if(idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if(!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if(idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/ 	
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/ 	
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/ 	
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for(var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/ 	
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/ 	
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/ 	
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = (+id) + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/ 	
/******/ 	function hotCheck(apply) {
/******/ 		if(hotStatus !== "idle") throw new Error("check() is only allowed in idle status");
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if(!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/ 	
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = 0;
/******/ 			{ // eslint-disable-line no-lone-blocks
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if(hotStatus === "prepare" && hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/ 	
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) { // eslint-disable-line no-unused-vars
/******/ 		if(!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for(var moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if(!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if(!deferred) return;
/******/ 		if(hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve().then(function() {
/******/ 				return hotApply(hotApplyOnUpdate);
/******/ 			}).then(
/******/ 				function(result) {
/******/ 					deferred.resolve(result);
/******/ 				},
/******/ 				function(err) {
/******/ 					deferred.reject(err);
/******/ 				}
/******/ 			);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for(var id in hotUpdate) {
/******/ 				if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/ 	
/******/ 	function hotApply(options) {
/******/ 		if(hotStatus !== "ready") throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 	
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/ 	
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/ 	
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while(queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if(!module || module.hot._selfAccepted)
/******/ 					continue;
/******/ 				if(module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if(module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for(var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if(!parent) continue;
/******/ 					if(parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if(outdatedModules.indexOf(parentId) >= 0) continue;
/******/ 					if(parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if(!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/ 	
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/ 	
/******/ 		function addAllToSet(a, b) {
/******/ 			for(var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if(a.indexOf(item) < 0)
/******/ 					a.push(item);
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/ 	
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn("[HMR] unexpected require(" + result.moduleId + ") to disposed module");
/******/ 		};
/******/ 	
/******/ 		for(var id in hotUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				var result;
/******/ 				if(hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if(result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch(result.type) {
/******/ 					case "self-declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if(options.onDeclined)
/******/ 							options.onDeclined(result);
/******/ 						if(!options.ignoreDeclined)
/******/ 							abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if(options.onUnaccepted)
/******/ 							options.onUnaccepted(result);
/******/ 						if(!options.ignoreUnaccepted)
/******/ 							abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if(options.onAccepted)
/******/ 							options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if(options.onDisposed)
/******/ 							options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if(abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if(doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for(moduleId in result.outdatedDependencies) {
/******/ 						if(Object.prototype.hasOwnProperty.call(result.outdatedDependencies, moduleId)) {
/******/ 							if(!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if(doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for(i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if(installedModules[moduleId] && installedModules[moduleId].hot._selfAccepted)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/ 	
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if(hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/ 	
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while(queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if(!module) continue;
/******/ 	
/******/ 			var data = {};
/******/ 	
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for(j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/ 	
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/ 	
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/ 	
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/ 	
/******/ 			// remove "parents" references from all children
/******/ 			for(j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if(!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if(idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for(j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if(idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/ 	
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/ 	
/******/ 		// insert new code
/******/ 		for(moduleId in appliedUpdate) {
/******/ 			if(Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for(moduleId in outdatedDependencies) {
/******/ 			if(Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)) {
/******/ 				module = installedModules[moduleId];
/******/ 				if(module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for(i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if(cb) {
/******/ 							if(callbacks.indexOf(cb) >= 0) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for(i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch(err) {
/******/ 							if(options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if(!options.ignoreErrored) {
/******/ 								if(!error)
/******/ 									error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// Load self accepted modules
/******/ 		for(i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch(err) {
/******/ 				if(typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch(err2) {
/******/ 						if(options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								orginalError: err, // TODO remove in webpack 4
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if(!options.ignoreErrored) {
/******/ 							if(!error)
/******/ 								error = err2;
/******/ 						}
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if(options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if(!options.ignoreErrored) {
/******/ 						if(!error)
/******/ 							error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/ 	
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if(error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/ 	
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(2)(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
		value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Sprite = function Sprite(game) {
		_classCallCheck(this, Sprite);

		this.game = game;
		/* Where on the canvas is it */
		this.positionX = 0;
		this.positionY = 0;
		/* How fast is it going */
		this.speed = 0;

		/* Where is it going */

		this.destinationX = 0;
		this.destinationY = 0;

		/* Do we draw this in the canvas */
		this.visible = false;

		/* Center of Screen */
		this.centerX = this.game.canvas.width / 2;
		this.centerY = this.game.canvas.height / 2;
};

exports.default = Sprite;

/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _batter = __webpack_require__(3);

var _batter2 = _interopRequireDefault(_batter);

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

var _pitcher = __webpack_require__(4);

var _pitcher2 = _interopRequireDefault(_pitcher);

var _ball = __webpack_require__(5);

var _ball2 = _interopRequireDefault(_ball);

var _scoreboard = __webpack_require__(6);

var _scoreboard2 = _interopRequireDefault(_scoreboard);

var _platform = __webpack_require__(7);

var _platform2 = _interopRequireDefault(_platform);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
	function Game(game) {
		_classCallCheck(this, Game);

		console.log("game.js");
		this.canvas = document.getElementsByTagName("canvas")[0];
		this.ctx = this.canvas.getContext('2d');

		/* Refactor into array of sprites */

		this.batter = new _batter2.default(this);
		this.pitcher = new _pitcher2.default(this);
		this.ball = new _ball2.default(this);
		this.platform = new _platform2.default(this);
		this.scoreboard = new _scoreboard2.default(this);

		/* Some Defaults */
		this.backgroundColor = "#000000";

		/* Timer */
		this.timer = null;
		this.tickTime = 100;

		this.roundTime = -1;
		// Round has begun
		this.roundStarted = true;

		// Current Number of Runs
		this.roundScore = 0;
		this.backgroundImage = null;

		this.audio = null;
		/* array of images */
		this.backgroundImage = null;

		this.showPlayAgain = false;
		/* Call Methods */
		/* stretch canvas */
		this.initCanvas();

		this.firstload = true;

		// Start Game Rendering  - Last Method
		this.animateGame();
	}

	_createClass(Game, [{
		key: 'initCanvas',
		value: function initCanvas() {
			this.canvas.width = 960;
			this.canvas.height = 540;
			this.backgroundImages = [];
			var drawing = new Image();
			drawing.src = "./dist/images/background.png"; // can also be a remote URL e.g. http:// // 0
			this.backgroundImages.push(drawing);

			drawing = new Image();
			drawing.src = "./dist/images/background-stars.png"; // 1
			this.backgroundImages.push(drawing);

			drawing = new Image();
			drawing.src = "./dist/images/background-stars2.png"; // 2
			this.backgroundImages.push(drawing);

			drawing = new Image();
			drawing.src = "./dist/images/keys.png"; // 3
			this.backgroundImages.push(drawing);

			drawing = new Image();
			drawing.src = "./dist/images/playagain.png"; // 4
			this.backgroundImages.push(drawing);

			drawing = new Image();
			drawing.src = "./dist/images/title.png"; // 5
			this.backgroundImages.push(drawing);

			drawing = new Image();
			drawing.src = "./dist/images/play.png"; // 6
			this.backgroundImages.push(drawing);

			this.audio = [];
			this.audio.push(new Audio('./dist/audio/47356__fotoshop__oof.wav')); //0
			this.audio.push(new Audio('./dist/audio/fart01.wav')); // 1 / 
			this.audio.push(new Audio('./dist/audio/hitbat_v1.wav')); // 2 / 
			this.audio.push(new Audio('./dist/audio/stadiumcheer1.wav')); // 3 / 
			this.audio.push(new Audio('./dist/audio/whooshbat1.wav')); //4 

		}
	}, {
		key: 'animateGame',
		value: function animateGame() {
			var _this = this;

			this.timer = setInterval(function () {

				// Clear the Canvas
				_this.clearCanvas();
				// Draw the platform
				_this.platform.draw(_this.ctx);
				// Draw the pitcher
				_this.pitcher.draw(_this.ctx);
				// Draw the scoreboard
				_this.scoreboard.draw(_this.ctx);
				// Draw the Ball
				_this.ball.draw(_this.ctx);
				// Draw the Batter
				_this.batter.draw(_this.ctx);

				// draw play again
				if (_this.showPlayAgain) {
					_this.drawPlayAgain();
				}

				/* show menu */
				if (_this.firstload == true) {
					_this.drawMenu();
				}

				// Round Timer Update
				_this.roundTimerTick();
			}), this.tickTime;
		}
	}, {
		key: 'startGame',
		value: function startGame() {
			this.startroundTimer();
			this.roundStarted = true;
			this.roundScore = 0;
			this.showPlayAgain = false;
		}
	}, {
		key: 'startroundTimer',
		value: function startroundTimer() {
			this.roundTime = 15000;
			//this.roundTime = 1000;
		}
	}, {
		key: 'roundTimerTick',
		value: function roundTimerTick() {
			if (this.roundStarted) {
				if (this.roundTime > 0) {
					this.roundTime--; // so this is 100ms
				}
			}
			/* Lets show the play again */
			if (this.roundTime == 0) {
				this.showPlayAgain = true;
			}
		}
	}, {
		key: 'drawPlayAgain',
		value: function drawPlayAgain() {
			this.ctx.drawImage(this.backgroundImages[4], 375, 110);
			this.ctx.fillText("[space]", 450, 250);
		}
	}, {
		key: 'drawMenu',
		value: function drawMenu() {
			this.ctx.beginPath();
			this.ctx.rect(0, 0, 960, 540);
			this.ctx.fillStyle = "black";
			this.ctx.fill();
			this.ctx.drawImage(this.backgroundImages[5], 375, 110);
			this.ctx.strokecolor = "red";
			this.ctx.fillStyle = "red";
			this.ctx.font = "bold 24px Georgia";
			this.ctx.color = "red";
			this.ctx.fillText("Press Space or Touch to Start", 375, 400);

			this.ctx.font = "24px Georgia";
			this.ctx.color = "white";
			this.ctx.fillStyle = "white";
			this.ctx.strokecolor = "white";
			this.ctx.fillText("Lead Art", 10, 350);
			this.ctx.fillText("Eric Hill", 10, 370);
			this.ctx.fillText("Lead Programming", 10, 400);
			this.ctx.fillText("Robert Moore", 10, 420);

			this.ctx.fillText("Programming", 10, 450);
			this.ctx.fillText("Gordon Wallace", 10, 470);
			this.ctx.fillText("QA / System Design", 10, 500);
			this.ctx.fillText("Jack Kimball", 10, 520);

			this.ctx.font = "18px Arial";
			this.ctx.fillText("Copyright 2019 - Made for GameJam 2019", 660, 520);

			this.ctx.drawImage(this.backgroundImages[6], 470, 430);
		}
	}, {
		key: 'clearCanvas',
		value: function clearCanvas() {
			/*  main background */
			this.ctx.drawImage(this.backgroundImages[0], 0, 0); // draw first batter image

			/*  stars alt */
			if (this.roundTime % 2 == 0) {
				this.ctx.drawImage(this.backgroundImages[1], 0, 0);
			}
			/*  stars alt1 */
			else {
					this.ctx.drawImage(this.backgroundImages[2], 0, 0);
				}

			/*  keys */
			this.ctx.drawImage(this.backgroundImages[3], 50, 360);
		}
	}]);

	return Game;
}();

var game = void 0;
window.addEventListener('load', function () {
	game = new Game();
});
window.addEventListener('resize', function () {
	console.log("Window Changed");
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Batter = function (_Sprite) {
	_inherits(Batter, _Sprite);

	function Batter(game) {
		_classCallCheck(this, Batter);

		var _this = _possibleConstructorReturn(this, (Batter.__proto__ || Object.getPrototypeOf(Batter)).call(this, game));

		_this.game = game;

		/* Bind Event Handlers */
		window.addEventListener('keydown', _this.keyDownAction.bind(_this.game));
		window.addEventListener('keyup', _this.keyUpAction.bind(_this.game));
		// More needs done then this - need 
		window.addEventListener('touchstart', _this.keyDownAction.bind(_this.game));
		window.addEventListener('click', _this.keyDownAction.bind(_this.game));

		/* Will hold an array of prerendered batting images */
		_this.batterImages = null;
		_this.loadImages();

		/* Time at which bat is swung from roundTimer */
		_this.swingTime = null;
		_this.batterBoxLimitRight = 550;
		_this.batterBoxLimitLeft = 470;

		_this.batterLocationX = 480;
		_this.batterLocationY = 315;

		/* bind */
		_this.keyDownAction.bind(_this);
		_this.keyUpAction.bind(_this);

		_this.throwIsHit = false;
		//http://www.williammalone.com/articles/create-html5-canvas-javascript-sprite-animation/

		_this.maxShowFoulTimer = 300;
		_this.foultimer = 0;

		_this.frameIndex = 0;
		_this.tickCount = 0;
		_this.ticksPerFrame = 20;
		_this.swinging = false;
		return _this;
	}

	_createClass(Batter, [{
		key: 'loadImages',
		value: function loadImages() {
			this.batterImages = [];

			var drawing = new Image();
			drawing.src = "./dist/images/batter.png"; // can also be a remote URL e.g. http://
			this.batterImages.push(drawing);

			drawing = new Image();
			drawing.src = "./dist/images/foul.png";
			this.batterImages.push(drawing);
		}
	}, {
		key: 'draw',
		value: function draw(ctx) {
			ctx.drawImage(this.batterImages[0], this.frameIndex * this.batterImages[0].width / 7, //
			0, //
			186, // 1314 / 7
			154, //
			this.batterLocationX, // 
			this.batterLocationY, //
			186, //
			154); //

			if (this.swinging) {
				this.updateSwing();
			}
			this.checkHit();

			if (this.foultimer > 0) {
				this.yellFoul();
				this.foultimer -= 1;
			}
		}
	}, {
		key: 'updateSwing',
		value: function updateSwing() {
			this.tickCount += 1;
			if (this.tickCount > this.ticksPerFrame) {
				this.tickCount = 1;
				// Go to the next frame
				this.frameIndex += 1;
			}
			// Stop swinging at end of animation
			if (this.frameIndex == 7) {
				this.frameIndex = 0;
				this.swinging = false;
			}
		}
	}, {
		key: 'startSwing',
		value: function startSwing() {
			this.swinging = true;
			this.frameIndex = 0;
			this.tickCount = 0;
		}
	}, {
		key: 'yellFoul',
		value: function yellFoul() {

			this.game.ctx.drawImage(this.batterImages[1], 440, 250);
		}
	}, {
		key: 'checkHit',
		value: function checkHit() {
			if (this.frameIndex == 5) {
				if (this.game.ball.ballY > 290 && this.game.ball.ballY < 340) {
					//console.log("hit" + this.throwIsHit);
					if (!this.throwIsHit) {
						this.throwIsHit = true;
						this.game.ball.balling = false;
						this.game.ball.frameIndex = -1;
						this.game.roundScore += 1;
						this.game.audio[2].play();
						this.startHitAnimation(this.game.ball.ballX, this.game.ball.ballY);
					}
				} else if (this.game.ball.ballY > 200 && this.game.ball.ballY < 269 || this.game.ball.ballY > 321 && this.game.ball.ballY < 350) {
					if (!this.throwIsHit) {
						this.throwIsHit = true;
						this.foultimer = this.maxShowFoulTimer;
						this.game.audio[1].play();
						this.yellFoul();
					}
				}
			}
		}
	}, {
		key: 'keyDownAction',
		value: function keyDownAction(e, batter) {
			/* For touch devices */
			if (e.code == null) {
				if (this.batter.game.roundTime <= 0) {
					if (this.batter.game.firstload) {
						this.batter.game.firstload = false;
					}
					this.batter.game.startGame();
				}
				this.batter.startSwing();
			}
			/* For Keyboard / Mouse */
			if (e.code == "Space" || e.code == "KeyW") {
				//console.log("space" + this.batter.game.roundTime);
				if (this.batter.game.roundTime <= 0) {
					if (this.batter.game.firstload) {
						this.batter.game.firstload = false;
					}
					this.batter.game.startGame();
				}
			}
			if (e.code == "ArrowLeft" || e.code == "KeyA") {
				if (this.batter.batterLocationX > this.batter.batterBoxLimitLeft) {
					this.batter.batterLocationX--;
				}
			}
			if (e.code == "ArrowRight" || e.code == "KeyD") {
				if (this.batter.batterLocationX < this.batter.batterBoxLimitRight) {
					this.batter.batterLocationX++;
				}
			}
		}
	}, {
		key: 'keyUpAction',
		value: function keyUpAction(e) {
			//console.log(e.code);
			if (e.code == "Space" || e.code == "KeyW") {
				//console.log(this.batter.game.ball.ballY);
				this.batter.startSwing();
				/* set swingTime to roundTimer
    	swingTime = swingTime - game.pitcher.pitchStart 
    	call ballHit*/
			}

			//console.log("keyup" + ` ${e.code}`);
		}
	}, {
		key: 'startHitAnimation',
		value: function startHitAnimation(x, y) {
			this.game.ball.balling = false;
			this.game.ball.hitAnimation = true;
			this.game.ball.ballX = x;
			this.game.ball.ballY = y;
		}
	}]);

	return Batter;
}(_sprite2.default);

exports.default = Batter;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
			value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Pitcher = function (_Sprite) {
			_inherits(Pitcher, _Sprite);

			function Pitcher(game) {
						_classCallCheck(this, Pitcher);

						var _this = _possibleConstructorReturn(this, (Pitcher.__proto__ || Object.getPrototypeOf(Pitcher)).call(this, game));

						console.log("I'm a pitcher");
						_this.game = game;

						/* For calculating ball position */
						_this.throwSpeed = null;

						_this.pitchThrown = true;

						/* For calculating where the pitch is*/
						_this.pitchStart = null;
						_this.pitchSpeed = null;

						//  Storage of actual loaded images
						_this.pitcherImages = null;
						// For Animation
						_this.pitchTime = null;

						_this.frameIndex = 0;
						_this.tickCount = 0;
						_this.ticksPerFrame = 20;

						_this.pitching = false;

						/* pitcher location */
						_this.pitcherX = 480;
						_this.pitcherY = 20;

						/* how often to pitch*/
						_this.pitchInterval = 800;
						_this.loadImages();

						return _this;
			}

			_createClass(Pitcher, [{
						key: "updatePitch",
						value: function updatePitch() {
									// 0,6,7,8,9,10
									this.tickCount += 1;
									if (this.tickCount > this.ticksPerFrame) {
												this.tickCount = 1;
												// Go to the next frame
												this.frameIndex += 1;
									}
									// Stop swinging at end of animation
									if (this.frameIndex == 11) {
												this.frameIndex = 0;
												this.pitching = false;
									} else if (this.frameIndex == 6) {
												this.game.ball.startBalling();
									}
						}
						// Animation

			}, {
						key: "startPitch",
						value: function startPitch() {
									this.tickCount = 5;
									this.pitching = true;
									this.game.batter.throwIsHit = false;
						}
			}, {
						key: "throwPitch",
						value: function throwPitch() {
									this.pitchSpeed = 10;
									this.startPitch();
						}
			}, {
						key: "loadImages",
						value: function loadImages() {
									this.pitcherImages = [];
									var drawing = new Image();
									drawing.src = "./dist/images/pitcher.png"; // can also be a remote URL e.g. http://

									this.pitcherImages.push(drawing);
						}
			}, {
						key: "draw",
						value: function draw(ctx) {
									//	ctx.drawImage(this.platformImages[0],500,40); // draw first batter image
									ctx.drawImage(this.pitcherImages[0], this.frameIndex * this.pitcherImages[0].width / 11, //
									0, //
									90, // 1314 / 7
									120, //
									this.pitcherX, // 
									this.pitcherY, //
									90, //
									120); //

									if (this.pitching) {
												this.updatePitch();
									}

									// Trigger Pitches if game is playing
									if (this.game.roundStarted && this.game.roundTime % this.pitchInterval == 0) {
												this.throwPitch();
									}
						}
			}]);

			return Pitcher;
}(_sprite2.default);

exports.default = Pitcher;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Ball = function (_Sprite) {
  _inherits(Ball, _Sprite);

  function Ball(game) {
    _classCallCheck(this, Ball);

    var _this = _possibleConstructorReturn(this, (Ball.__proto__ || Object.getPrototypeOf(Ball)).call(this, game));

    console.log("I'm a ball");

    _this.ballImages = null;
    _this.ballX = -100;
    _this.ballY = -100;
    _this.loadImages();

    _this.Ydelta = 1;

    _this.balling = false;
    _this.frameIndex = 0;
    _this.tickCount = 0;
    _this.ticksPerFrame = 85;

    /* Hit Animation for Ball leaving bottom of screen going towards top */
    _this.hitAnimation = false;
    _this.showHomeRun = false;
    _this.showHomeRunTimeRemaining = 0;

    return _this;
  }

  _createClass(Ball, [{
    key: "loadImages",
    value: function loadImages() {
      this.ballImages = [];
      var drawing = new Image();
      drawing.src = "./dist/images/ball.png"; // can also be a remote URL e.g. http://
      this.ballImages.push(drawing);

      drawing = new Image();
      drawing.src = "./dist/images/homerun.png";
      this.ballImages.push(drawing);
    }
  }, {
    key: "updateBall",
    value: function updateBall() {
      // 0,6,7,8,9,10
      this.tickCount += 1;
      if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 1;
        // Go to the next frame
        this.frameIndex -= 1;
      }
      // Stop swinging at end of animation

      if (this.frameIndex == 0) {
        this.frameIndex = 7;
        this.balling = false;
      }
      this.ballY += this.Ydelta;
    }
  }, {
    key: "updateHitAnimation",
    value: function updateHitAnimation() {
      this.tickCount += 1;
      if (this.tickCount > this.ticksPerFrame) {
        this.tickCount = 1;
        // Go to the next frame
        this.frameIndex = 0;
      }
      // Stop swinging at end of animation
      if (this.frameIndex == 0) {
        this.frameIndex = 1;
      } else {
        this.frameIndex = 0;
      }
      /* stop */
      if (this.ballY < -90) {
        this.frameIndex = 7;
        this.hitAnimation = false;
        // This only runs once so lets show the homerun
        this.startHomeRun();
      }
      this.ballY -= this.Ydelta * 2;
    }
  }, {
    key: "startHomeRun",
    value: function startHomeRun() {
      this.showHomeRun = true;
      this.showHomeRunTimeRemaining = 250;
      this.game.audio[3].play();
    }
  }, {
    key: "updateShowHomeRun",
    value: function updateShowHomeRun() {
      if (this.showHomeRunTimeRemaining > 0) {
        this.game.ctx.drawImage(this.ballImages[1], 270, 330);
        this.showHomeRunTimeRemaining--;
      }
    }
  }, {
    key: "startBalling",
    value: function startBalling() {
      this.balling = true;
      this.frameIndex = 6;
      /* Starting Location */
      this.ballX = 490;
      this.ballY = -20;

      this.destinationX = 480;
      this.destinationY = 540;
    }
  }, {
    key: "draw",
    value: function draw(ctx) {
      //ctx.drawImage(this.ballImages[0],this.ballX,this.ballY); // draw first batter image
      ctx.drawImage(this.ballImages[0], this.frameIndex * this.ballImages[0].width / 6, //
      0, //
      50, // 1314 / 7
      90, //
      this.ballX, // 
      this.ballY, //
      50, //
      90); //

      if (this.balling) {
        this.updateBall();
      }
      if (this.hitAnimation) {
        this.updateHitAnimation();
      }
      if (this.showHomeRun) {
        this.updateShowHomeRun();
      }
      // Trigger Pitches if game is playing
      if (this.game.roundStarted && this.game.roundTime % this.game.pitcher.pitchInterval == 0) {}
      //this.startBalling();


      // Stop the ball
      if (this.BallY > window.innerHeight) {
        this.balling = false;
      }
    }
  }]);

  return Ball;
}(_sprite2.default);

exports.default = Ball;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Scoreboard = function (_Sprite) {
	_inherits(Scoreboard, _Sprite);

	function Scoreboard(game) {
		_classCallCheck(this, Scoreboard);

		var _this = _possibleConstructorReturn(this, (Scoreboard.__proto__ || Object.getPrototypeOf(Scoreboard)).call(this, game));

		_this.game = game;

		_this.positionX = 6;
		_this.positionY = 10;
		_this.scoreboardImages = null;

		_this.font = "30px Arial";
		_this.fontColor = "red";
		_this.loadImages();
		return _this;
	}

	_createClass(Scoreboard, [{
		key: "loadImages",
		value: function loadImages() {
			this.scoreboardImages = [];
			var drawing = new Image();
			drawing.src = "./dist/images/scoreboard.png"; // can also be a remote URL e.g. http://

			this.scoreboardImages.push(drawing);
		}
	}, {
		key: "drawTime",
		value: function drawTime(ctx, timeText) {
			ctx.font = this.font;
			ctx.fillStyle = this.fontColor;
			ctx.fillText(timeText, 40, 65);
		}
	}, {
		key: "drawScore",
		value: function drawScore(ctx, scoreText) {
			ctx.font = this.font;
			ctx.fillStyle = this.fontColor;
			ctx.fillText(scoreText, 190, 85);
		}
	}, {
		key: "draw",
		value: function draw(ctx) {
			ctx.drawImage(this.scoreboardImages[0], this.positionX, this.positionY); // draw first batter image
			this.drawTime(ctx, this.getTime() / 100);
			this.drawScore(ctx, this.game.roundScore);
		}
	}, {
		key: "getTime",
		value: function getTime() {
			return Math.ceil(this.game.roundTime / 2.5);
		}
	}]);

	return Scoreboard;
}(_sprite2.default);

exports.default = Scoreboard;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _sprite = __webpack_require__(0);

var _sprite2 = _interopRequireDefault(_sprite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Platform = function (_Sprite) {
	_inherits(Platform, _Sprite);

	function Platform(game) {
		_classCallCheck(this, Platform);

		var _this = _possibleConstructorReturn(this, (Platform.__proto__ || Object.getPrototypeOf(Platform)).call(this, game));

		_this.game = game;
		_this.platformImages = null;

		_this.loadImages();
		return _this;
	}

	_createClass(Platform, [{
		key: "loadImages",
		value: function loadImages() {
			this.platformImages = [];
			var drawing = new Image();
			drawing.src = "./dist/images/platform.png"; // can also be a remote URL e.g. http://

			this.platformImages.push(drawing);
		}
	}, {
		key: "draw",
		value: function draw(ctx) {
			ctx.drawImage(this.platformImages[0], 270, 430); // draw first batter image
		}
	}]);

	return Platform;
}(_sprite2.default);

exports.default = Platform;

/***/ })
/******/ ]);
//# sourceMappingURL=game.js.map