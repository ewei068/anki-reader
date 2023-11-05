# Example Usage of anki-reader

If you would like to run the example, first install dependencies:
```bash
bun install
```

Then serve the anki files locally:
```bash
npx http-server --cors
```

Finally, run the example:
```bash
bun example.ts
```

If bun is giving errors, you can also run the example with npm:
```bash
cd ../
npm run build # build typescript
cd story
node apkgExample.js
```
