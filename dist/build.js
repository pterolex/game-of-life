/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/FieldState.ts":
/*!***************************!*\
  !*** ./src/FieldState.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
const FILLED_STATE_PROBABILITY_COEFFICIENT = 0.9;
const POINT_LIVE_STATE = 1;
const POINT_DEAD_STATE = 0;
class FieldState {
    constructor({ fieldWidth, fieldHeight }) {
        this.fieldWidth = fieldWidth;
        this.fieldHeight = fieldHeight;
        this.previousStateArray = [];
        this.newStateArray = [];
        for (let i = 0; i < fieldHeight; i++) {
            this.previousStateArray[i] = new Array(fieldWidth).fill(0);
            this.newStateArray[i] = new Array(fieldWidth).fill(0);
        }
    }
    getPointStateByCoordinates(x, y) {
        if (x < 0 || y < 0 || x >= this.fieldWidth || y >= this.fieldHeight)
            return POINT_DEAD_STATE;
        return this.previousStateArray[x][y];
    }
    initRandomState() {
        for (let i = 0; i < this.fieldHeight; i++) {
            for (let j = 0; j < this.fieldWidth; j++) {
                this.previousStateArray[i][j] =
                    Math.random() > FILLED_STATE_PROBABILITY_COEFFICIENT
                        ? POINT_LIVE_STATE
                        : POINT_DEAD_STATE;
                this.newStateArray[i][j] = this.previousStateArray[i][j];
            }
        }
    }
    calculatePointNextState(x, y) {
        const liveNeighborsCount = this.getPointStateByCoordinates(x - 1, y - 1) +
            this.getPointStateByCoordinates(x - 1, y) +
            this.getPointStateByCoordinates(x - 1, y + 1) +
            this.getPointStateByCoordinates(x, y - 1) +
            this.getPointStateByCoordinates(x, y + 1) +
            this.getPointStateByCoordinates(x + 1, y - 1) +
            this.getPointStateByCoordinates(x + 1, y) +
            this.getPointStateByCoordinates(x + 1, y + 1);
        if (liveNeighborsCount === 2 || liveNeighborsCount === 3)
            return POINT_LIVE_STATE;
        return POINT_DEAD_STATE;
    }
    setPointState(x, y, value) {
        this.previousStateArray[x][y] = value;
        this.newStateArray[x][y] = value;
    }
    calculateNextFieldState() {
        this.previousStateArray = JSON.parse(JSON.stringify(this.newStateArray));
        for (let i = 0; i < this.fieldHeight; i++) {
            for (let j = 0; j < this.fieldWidth; j++) {
                this.newStateArray[i][j] = this.calculatePointNextState(i, j);
            }
        }
    }
    setState(state) {
        this.previousStateArray = JSON.parse(JSON.stringify(state));
        this.newStateArray = JSON.parse(JSON.stringify(state));
    }
    getState() {
        return this.newStateArray;
    }
}
exports["default"] = FieldState;


/***/ }),

/***/ "./src/GameOfLife.ts":
/*!***************************!*\
  !*** ./src/GameOfLife.ts ***!
  \***************************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
const ConsoleDisplayEngine_1 = __importDefault(__webpack_require__(/*! ./displayEngines/ConsoleDisplayEngine */ "./src/displayEngines/ConsoleDisplayEngine.ts"));
const FieldState_1 = __importDefault(__webpack_require__(/*! ./FieldState */ "./src/FieldState.ts"));
const sleep_1 = __importDefault(__webpack_require__(/*! ./utils/sleep */ "./src/utils/sleep.ts"));
class GameOfLife {
    constructor(initialState, displayEngine) {
        this.fieldState = new FieldState_1.default({
            fieldHeight: initialState.length,
            fieldWidth: initialState[0].length,
        });
        this.fieldState.setState(initialState);
        if (!displayEngine) {
            this.displayEngine = new ConsoleDisplayEngine_1.default();
        }
        else {
            this.displayEngine = displayEngine;
        }
    }
    getState() {
        return this.fieldState.getState();
    }
    tick() {
        this.fieldState.calculateNextFieldState();
    }
    run() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.displayEngine) === null || _a === void 0 ? void 0 : _a.draw(this.fieldState.getState());
            const iterations = new Array(0).fill(0);
            for (const iteration of iterations) {
                console.clear();
                this.tick();
                console.log(`Iteration: ${iteration}`);
                (_b = this.displayEngine) === null || _b === void 0 ? void 0 : _b.draw(this.fieldState.getState());
                yield (0, sleep_1.default)(100);
            }
        });
    }
}
exports["default"] = GameOfLife;


/***/ }),

/***/ "./src/displayEngines/ConsoleDisplayEngine.ts":
/*!****************************************************!*\
  !*** ./src/displayEngines/ConsoleDisplayEngine.ts ***!
  \****************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
class ConsoleDisplayEngine {
    draw(fieldStateArray) {
        console.table(fieldStateArray);
    }
}
exports["default"] = ConsoleDisplayEngine;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
const GameOfLife_1 = __importDefault(__webpack_require__(/*! ./GameOfLife */ "./src/GameOfLife.ts"));
exports["default"] = GameOfLife_1.default;


/***/ }),

/***/ "./src/utils/sleep.ts":
/*!****************************!*\
  !*** ./src/utils/sleep.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(), ms);
    });
}
exports["default"] = sleep;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.ts");
/******/ 	exports.GameOfLife = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=build.js.map