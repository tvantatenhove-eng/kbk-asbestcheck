import pathlib
s=pathlib.Path('/home/user/kbk/src')
h=(s/'index.html').read_text()
h=h.replace('/*CSS*/',(s/'app.css').read_text())
js=(s/'data.js').read_text()+'\n'+(s/'engine.js').read_text()+'\n'+(s/'app.js').read_text()
h=h.replace('<script>/*JS*/</script>','<script>\n'+js.replace('</script','<\\/script')+'\n</script>')
pathlib.Path('/home/user/kbk/dist/KBK_AsbestCheck_AI.html').write_text(h)
# standalone versie: volledige html-skeleton
sa='<!doctype html><html lang="nl"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">'+h+'</html>'
pathlib.Path('/home/user/kbk/dist/KBK_AsbestCheck_AI_offline.html').write_text(sa)
print(len(h))
