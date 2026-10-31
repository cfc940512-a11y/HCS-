# HCS 群島：iPhone App 版（PWA）

這個資料夾就是完整的 App，裡面的檔案都要一起上傳。

## 裝到 iPhone
1. 把整個資料夾上傳到一個 HTTPS 網址，例如 Netlify Drop：把資料夾拖進 app.netlify.com/drop。
2. 在 iPhone 上用 Safari 打開那個網址，等地圖載入完成。
3. 點「分享」→「加入主畫面」。之後從主畫面圖示打開，就是全螢幕 App，離線也能用。

## 注意
- 內容是公司內部資料。任何拿到網址的人都看得到，所以網址不要外流。已經設定搜尋引擎不收錄（noindex）。
- 「＋ 加入小島」（大家共用的角色名冊）需要登入 claude.ai，所以只在 claude.ai 的 artifact 版本才能用。這個版本裡，主管角色和其他功能都正常。
- 換上新的 index.html 之後，請把 sw.js 第 2 行的 `hcs-v1` 改成 `hcs-v2`，iPhone 才會換成新版本（第二次打開 App 時更新）。
