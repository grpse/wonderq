"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnvSettings = void 0;
var EnvSettings = (function () {
    function EnvSettings() {
    }
    EnvSettings.prototype.getString = function (key) {
        return process.env[key] || null;
    };
    EnvSettings.prototype.getNumber = function (key) {
        return Number(process.env[key] || 0);
    };
    return EnvSettings;
}());
exports.EnvSettings = EnvSettings;
//# sourceMappingURL=env-settings.js.map