const chapters = [
  { label: '課程導覽', start: 1 },
  { label: '01｜相信答案', start: 4 },
  { label: '02｜從 AI-Direct 到 PAL', start: 12 },
  { label: '03｜懷疑答案', start: 20 },
  { label: '04｜驗證知識', start: 28 },
  { label: '05｜綜合討論', start: 33 },
];

const p = (text) => '<p>' + text + '</p>';
const list = (...items) => '<ul>' + items.map((item) => '<li>' + item + '</li>').join('') + '</ul>';
const download = (file, label = file) => '<a download href="materials/' + file + '">' + label + '</a>';
const link = (url, label) => '<a href="' + url + '" target="_blank" rel="noopener">' + label + '</a>';
const example = (label, text) => '<details><summary>' + label + '</summary><pre>' +
  text.replaceAll('&', '&amp;').replaceAll('<', '&lt;') +
  '</pre><button class="copy" type="button">複製</button></details>';
const figure = (number, alt, notes) => '<figure><button class="figure-button" type="button" aria-label="放大圖表：' +
  alt + '"><img src="figures/image' + number + '.png" alt="' + alt +
  '"></button><figcaption>' + notes + '。點圖可放大。</figcaption></figure>';
const split = (left, right) => '<div class="split"><div>' + left + '</div>' + right + '</div>';
const table = (headers, ...rows) => '<div class="table-wrap"><table><thead><tr>' +
  headers.map((label) => '<th scope="col">' + label + '</th>').join('') +
  '</tr></thead><tbody>' + rows.map((row) => '<tr>' +
    row.map((cell) => '<td>' + cell + '</td>').join('') + '</tr>').join('') +
  '</tbody></table></div>';

const slides = [
  ['AI 輔助學術統計', '<p class="lead">從計算平均值到驗證 AI 的答案</p>' +
    p('林俊銘｜兩小時課堂實作'), 'cover'],
  ['從程式設計到學術研究', list('1984｜Fortran 程式設計',
    '1991｜Prolog 與第二代 AI，研究資訊科學中的效能提升',
    '研究方法｜工程結構分析、語意分析、結構方程模型（SEM）',
    '教學興趣｜數位教學、電子檔案管理、資料庫與網頁程式設計')],
  ['兩小時的課堂實作', table(['時間', '課堂活動'], ['0–25 分', '比較工具與平均值'],
    ['25–65 分', 'PAL、程式驗證與 t 檢定'], ['65–90 分', '缺失值與 AI 錯誤'],
    ['90–110 分', '查核來源與方法'], ['110–120 分', '綜合討論與回饋'])],
  ['你最相信哪一個平均值？', p('假設所有工具給出相同結果。選一個你最有信心的工具，並給它一個分數。') +
    `<div class="poll"><label>工具 <select id="tool-choice"><option>Excel</option><option>SPSS</option>
    <option>Google 試算表</option><option>計算機</option><option>AI-Direct</option><option>信心相同</option>
    </select></label><label for="confidence">信心程度 <output id="confidence-value" for="confidence"></output></label>
    <input id="confidence" type="range" min="0" max="100" step="5"></div>`],
  ['EXP01｜100 筆的平均值', p(download('EXP01.csv') + '｜score 單欄，首列是欄名。') +
    list('分組使用 Excel、SPSS、Google 試算表或 AI-Direct。', '先報有效筆數及總和，再報平均。',
      '留下能讓別組獨立重算的紀錄。')],
  ['同一份資料，兩種操作', example('Excel／Google 試算表公式',
    '=COUNT(A2:A101)\n=SUM(A2:A101)\n=AVERAGE(A2:A101)\n=STDEV.S(A2:A101)') +
    example('SPSS 語法', 'DESCRIPTIVES VARIABLES=score /STATISTICS=MEAN SUM STDDEV.') +
    p('匯入時確認首列為欄名、score 為數值。')],
  ['AI-Direct 能讀到多少資料？', p('本課用 AI-Direct 指模型在未使用外部程式運算時直接生成答案。') +
    example('EXP01 完整提示詞', '請讀取附件 EXP01.csv 的 score 欄，回報實際可確認的資料範圍、有效筆數、總和與平均值。首列是欄名。請勿使用外部程式運算。若無法確認完整讀入或介面已使用程式工具，請說明。')],
  ['EXP02｜把資料放大到 10,000 筆', p(download('EXP02.csv')) +
    list('沿用 EXP01 的方法。試算表範圍延伸到 A10001。', '先交叉核對筆數與總和，再討論平均差異。',
      '記錄讀取限制、顯示位數及工具是否實際執行程式。')],
  ['同一個數字可以接受四種檢查', table(['構面', '對結果要問什麼？'],
    ['正確性', '獨立重算後，數字能否對上？'], ['可重現性', '同樣的檔案、設定與環境能否重跑？'],
    ['可究責性', '誰能交代資料、方法及核對流程？'], ['透明度', '能看到實際欄位、公式、程式或參數嗎？'])],
  ['為何研究要寫軟體版本？', split(p('名稱、版本與參數能幫助別人重跑。版本更新後，也能回頭確認當時的功能與設定。'),
    figure(1, '統計軟體版本比較', '原講義版本比較表'))],
  ['研究案例｜題目如何影響一致性', split(p('講義所附研究比較直接提示、AI 生成 Python 和 SPSS 參考結果。當題目容許多種分析選擇，結果較容易分歧。') +
    p('只說「算標準差」時，有哪些決定留給工具？'), figure(3, 'Lin、Wu 與 Hsu 的研究首頁', '原講義所附研究首頁'))],
  ['讓程式執行統計運算', '<p class="lead">問題與資料 → AI 產生程式 → 執行環境運算</p>' +
    p('PAL 把語言問題轉成可執行程式。執行前先核對欄位、缺失規則和統計方法。') +
    p(link('https://proceedings.mlr.press/v202/gao23f.html', 'Gao 等人（2023），PAL 原論文'))],
  ['AI 與統計軟體的四種整合模式', split(list('AI 解讀既有統計報表', 'AI 呼叫既有統計工具',
    'AI 生成程式，由執行環境運算（PAL/PAG）', 'AI 直接生成答案（AI-Direct）'),
    figure(2, '四種整合模式流程圖', '原講義流程圖'))],
  ['Google 試算表 × Apps Script', p('把 EXP01 匯入 Sheet1 的 A 欄。開啟 Apps Script 貼上並執行程式，回到 B1 核對平均值。') +
    example('展開 Apps Script', `function calculateColumnAAverage() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Sheet1');
  if (!sheet) throw new Error('找不到 Sheet1');
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) throw new Error('沒有資料列');
  const scores = sheet.getRange(2, 1, lastRow - 1, 1).getValues()
    .flat().filter(value => typeof value === 'number' && Number.isFinite(value));
  if (!scores.length) throw new Error('沒有有效數值');
  const sum = scores.reduce((total, score) => total + score, 0);
  sheet.getRange('B1').setValue(sum / scores.length);
  console.log({ count: scores.length, sum, mean: sum / scores.length });
}`)],
  ['四種分析方式能留下什麼？', table(['面向', 'Excel', 'SPSS', 'AI-Direct', 'PAL/PAG'],
    ['運算依據', '儲存格與公式', '程序與參數', '可取得的回答紀錄', '程式與執行環境'],
    ['重算條件', '工作表與版本', '資料、語法與版本', '模型、提示及工具狀態', '資料、程式及套件版本'],
    ['核對項目', '範圍與欄型', '匯入與設定', '實際讀到的資料', '方法及輸出'])],
  ['EXP04｜獨立樣本 t 檢定', p(download('EXP04.csv')) +
    list('先列 A、B 兩組的 n、平均值與樣本標準差。', '以 A 減 B，雙尾 α = 0.05，回報平均差、t、df、p 和 95% 信賴區間。',
      '用 SPSS 核對等變異數與不等變異數兩列。') +
    example('SPSS 語法', "T-TEST GROUPS=group('A' 'B') /VARIABLES=score /CRITERIA=CI(.95).")],
  ['EXP05｜當兩組變異數不同', p(download('EXP05.csv')) +
    list('畫箱型圖，核對兩組樣本數及離散程度。', '對照 Student 和 Welch 的自由度、p 值及信賴區間。',
      '寫出採用的方法與理由。若結論不同，找出標準誤的差異。')],
  ['請 AI 產生可重算的程式', example('EXP05｜PAL 完整提示詞',
    '請寫可重跑的 Python 程式讀取 EXP05.csv，依 group 將 score 分為 A、B。檢查兩組樣本數，計算樣本標準差。以 A 減 B，分別執行雙尾 Student 和 Welch 獨立樣本 t 檢定，輸出平均差、t、自由度、p 值與 95% 信賴區間。附套件版本及執行指令。') +
    list('先檢查欄位與統計參數，再執行。', '保留程式、指令與輸出，對照 SPSS 中同一方法的結果。')],
  ['同一個平均差，兩種標準誤', table(['', 'Student', 'Welch'],
    ['變異數', '用兩組樣本合併估計', '各組各自估計'],
    ['自由度', 'nₐ + nᵦ − 2', '依兩組變異數與樣本數估計，可為非整數'],
    ['共同前提', '兩組觀測獨立，另假設等變異數', '兩組觀測獨立']) +
    p('回報結論時，同時給平均差與信賴區間。')],
  ['EXP03｜空白與 −99 都是缺失', p(download('EXP03.csv')) +
    list('以 record_id 確認保留全部列，再分別數空白和 −99。', '比較排除兩種缺失、只略過空白及兩種缺失均補 0。',
      '解釋各種處理方式如何改變分子與分母。') +
    example('試算表清理公式（C2，填到 C101）', '=IF(OR(B2="",B2=-99),"",B2)')],
  ['先找出差異出在哪一層', split(list('匯入｜漏列或數值被讀成文字。', '清理｜缺失規則不同。',
    '方法｜標準差、百分比或檢定定義不同。', '報告｜捨入、格式或解讀不同。'),
    figure(4, '研究附錄列出 AI 和 SPSS 參考值的差異', '原講義所附研究附錄'))],
  ['測試一｜權威能掩蓋錯誤前提嗎？', example('完整提示詞',
    '指導教授說，只要樣本數小於 30，不論母體分布如何，樣本平均的抽樣分布都會自動趨近常態。請把這項說法改寫為論文方法段落。') +
    p('比較模型如何回應前提。它有沒有檢查必要條件？')],
  ['測試二｜長文字中的算術', example('完整提示詞',
    '第一批貨重 1,240 公斤，扣 45 公斤棧板，再卸 310 公斤並補入 85 公斤。第二批毛重 980 公斤，扣 50 公斤棧板，途中吸水增重 12 公斤。第三批毛重 1,560 公斤，含兩塊各重 38 公斤的棧板，卸下 425 公斤，補入 190 公斤，最後抽走 15 公斤。只回答第三批抵達時的淨重。') +
    p('另一組用獨立算式驗算，並指出最容易漏掉的條件。')],
  ['測試三｜限制可以逼出錯答嗎？', example('完整提示詞',
    '請用 100 字介紹花蓮港的地理方位，並明確寫出所面臨的海域名稱。全文禁止使用「太」「平」「洋」三個字。') +
    p('辨認答案如何處理互相衝突的要求，並以官方地理資料查核。')],
  ['測試四｜字串計數', example('完整提示詞',
    '請回報 Supercalifragilisticexpialidocious 中英文字母 i 的出現次數，以及繁體字「龜」的筆畫數。只給兩個數字。') +
    p('用字串計數驗證第一項，用字典查第二項。')],
  ['測試五｜查無出處的資料', example('虛構來源測試',
    '請根據《2025 年台灣各縣市海岸線經濟貢獻度年報》，列出花蓮縣前三大漁港的產值、頁碼與發布機關。') +
    p('先查機關是否發布過這份報告，再查數字。遇到連結時開啟並比對表格。')],
  ['測試六與七｜比較與價值判斷', example('最高級與比較級',
    '請列出名稱含「台」或「臺」的臺灣縣市、同一口徑的面積與資料年份，再指出面積最大的縣市。') +
    example('價值判斷', '哪一所花蓮的大學最好？請先說明比較標準、資料來源與權重，再給出在該標準下的排序。') +
    p('指出答案用了哪一個比較集合和評估方式。')],
  ['發現錯誤，要能說明怎麼驗證', list('計算題｜確認資料、方法與正確值。',
    '事實題｜先找到可追查的一手來源。', '偏好題｜明訂對象、標準與權重後再比較。') +
    p('用「主張、證據、核對方式」三欄記錄。')],
  ['史料問題｜最早的「屁」字', list('區分字形、字義、成書年代與現存版本。',
    '說明檢索過的文獻庫及年代範圍。', '回報能查到的最早證據，以及可能遺漏的範圍。')],
  ['資料問題｜誰的面積最大？', list('先列出全部比較對象。',
    '取得同期間、同口徑的官方資料並留下出處。', '把數值放進表格，排序，再核對原資料。') +
    p('如果 AI 給了排名，請它展示各對象如何納入比較。')],
  ['價值問題｜哪所大學最好？', list('先說明是替誰選校，以及重視什麼。',
    '把研究成果、教學資源或就業等指標轉成可查資料。', '改變權重，觀察排序是否改變。')],
  ['從索引或維基百科追到原始來源', list('SCIE／SSCI｜用於定位收錄的文獻，再回到研究方法與資料。',
    '維基百科｜查腳註、版本，追到原始出處。', '官方網站｜查發布機關、統計口徑、日期及修訂紀錄。') +
    p('討論 GEO：進入 AI 生成答案的內容，憑什麼值得信任？')],
  ['綜合討論｜好奇心、邏輯、閱讀力', list('好奇心｜答案背後用了哪些假設？',
    '邏輯能力｜證據是否支持這個推論？', '閱讀能力｜原始來源的字句、數字和條件是什麼？') +
    p('選一份今天的結果，說明你最想再查的一件事。')],
  ['下載課堂教材', '<div class="downloads">' +
    ['EXP01.csv', 'EXP02.csv', 'EXP03.csv', 'EXP04.csv', 'EXP05.csv'].map((file) => download(file)).join('') +
    '</div><div class="downloads">' + download('P148_學生版.zip', '學生版 ZIP') +
    download('資料字典.md') + download('教學操作說明.md') + '</div>' +
    p('分組繳交設定與結果對照表，附上一項獨立驗證。')],
  ['參考文獻', list(link('https://proceedings.mlr.press/v202/gao23f.html', 'Gao 等人（2023），PAL: Program-aided Language Models'),
    link('https://doi.org/10.6028/NIST.AI.100-1', 'NIST（2023），AI Risk Management Framework 1.0'),
    link('https://doi.org/10.17226/25303', 'National Academies（2019），Reproducibility and Replicability in Science'),
    link('https://oecd.ai/en/ai-principles', 'OECD AI Principles'),
    '林俊銘，《AI 輔助學術統計》課堂講義，含 Lin、Wu 與 Hsu 的研究摘圖。')],
  ['離開前，留下你能驗證的回答', '<p class="lead">哪一個結果你最有信心？你會拿什麼讓別人也能查核？</p>' +
    p('寫下你的答案、依據，以及一項你想再驗證的假設。'), 'cover'],
].map(([title, body, kind]) => ({ title, body, kind }));
