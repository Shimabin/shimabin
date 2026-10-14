しま便フェリー 公開用ファイル一式

中身:
  index.html            ゲーム本体
  manifest.webmanifest  ホーム画面に追加するための設定（名前・アイコン）
  sw.js                 オフライン用（公開後の修正は、ネットがつながっていれば自動で届く）
  icons/                アイコン（192 / 512 / 180(iPhone) / 32）

GitHub Pagesでの公開手順:
  1. GitHubにアカウントを作る
  2. 新しいリポジトリ（Public）を作る。名前の例: shimabin
  3. 「Add file」→「Upload files」で、このフォルダの中身（index.html, manifest.webmanifest, sw.js, icons フォルダ）をアップロードして Commit
  4. Settings → Pages → Branch を main / (root) にして Save
  5. 数分後、https://ユーザー名.github.io/shimabin/ で遊べる

更新するとき:
  index.html を差し替えてCommitするだけ。大きな変更のときは sw.js の「shimabin-v1」の番号を上げる。
