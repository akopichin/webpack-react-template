"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Lint = require("tslint");
var FAILURE_STRING = 'Пустая строка: ';
/**
 * Implementation of the no empty lines imports rule.
 */
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoEmptyLineImports(sourceFile, this.getOptions()));
    };
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
;
// The walker takes care of all the work.
var NoEmptyLineImports = /** @class */ (function (_super) {
    __extends(NoEmptyLineImports, _super);
    function NoEmptyLineImports() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoEmptyLineImports.prototype.visitImportDeclaration = function (node) {
        var regex = /\n\n|\r\n\r\n/;
        var fullText = this.getSourceFile().getFullText();
        var importText = fullText.slice(node.pos, node.end);
        if (regex.test(importText)) {
            this.addFailureAt(node.getStart() - 1, node.getWidth(), FAILURE_STRING + importText.split('import')[0].charCodeAt(1));
        }
    };
    return NoEmptyLineImports;
}(Lint.RuleWalker));
