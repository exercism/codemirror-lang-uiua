import { parser } from "./syntax.grammar";
import {
  LRLanguage,
  LanguageSupport,
  indentNodeProp,
  foldNodeProp,
  foldInside,
  delimitedIndent,
} from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";

export const uiuaLanguage = LRLanguage.define({
  name: "uiua",
  parser: parser.configure({
    props: [
      indentNodeProp.add({
        Application: delimitedIndent({ closing: ")", align: false }),
      }),
      foldNodeProp.add({
        Application: foldInside,
      }),
      styleTags({
        String: t.string,
        LineComment: t.lineComment,
        Char: t.character,
        "Integer SpecialNumber": t.number,
        "Floating Fraction": t.float,
        "( )": t.paren,
        "[ ]": t.squareBracket,
        "{ }": t.brace,
        Escape: t.escape,
        Identifier: t.function(t.definition(t.variableName)),
        Signature: t.meta,
        Glyph: t.atom,
      }),
    ],
  }),
  languageData: {
    commentTokens: { line: ";" },
  },
});

export function uiua() {
  return new LanguageSupport(uiuaLanguage);
}
