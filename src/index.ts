import { parser } from "./syntax.grammar";
import { LRLanguage, LanguageSupport } from "@codemirror/language";
import { styleTags, tags as t } from "@lezer/highlight";

export const uiuaLanguage = LRLanguage.define({
  name: "uiua",
  parser: parser.configure({
    props: [
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
    closeBrackets: { brackets: ["(", "[", "{", '"'] },
    commentTokens: { line: "#" },
  },
});

export function uiua() {
  return new LanguageSupport(uiuaLanguage);
}
