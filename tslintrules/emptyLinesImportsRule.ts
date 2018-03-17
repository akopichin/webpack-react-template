import * as Lint from 'tslint';
import * as ts from 'typescript';

const FAILURE_STRING: string = 'Empty string: ';

/**
 * Implementation of the no empty lines imports rule.
 */
export class Rule extends Lint.Rules.AbstractRule {
    apply(sourceFile) {
        return this.applyWithWalker(new NoEmptyLineImports(sourceFile, this.getOptions()));
    }
};

// The walker takes care of all the work.
class NoEmptyLineImports extends Lint.RuleWalker {
    visitImportDeclaration(node: ts.ImportDeclaration) {
        const regex = /\n\n|\r\n\r\n/;
        let fullText = this.getSourceFile().getFullText();
        let importText = fullText.slice(node.pos, node.end);
        if (regex.test(importText)) {
            this.addFailureAt(node.getStart()-1, node.getWidth(), FAILURE_STRING + importText.split('import')[0].charCodeAt(1));
        }
    }
}
