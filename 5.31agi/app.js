const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

const enemies = {
  light: [
    [
      { name: "晨曦侍从", desc: "仍在执行旧日祷令的圣所仆从。", hp: 30, attack: 6, type: "attack" },
      { name: "白烛修女", desc: "用蜡泪封存痛苦，也封存异端。", hp: 28, attack: 5, block: 6, type: "block" }
    ],
    [
      { name: "圣纹枪兵", desc: "枪尖铭刻着不容质疑的律法。", hp: 42, attack: 8, type: "attack" },
      { name: "净罪医师", desc: "治疗伤口，也治疗不服从。", hp: 40, attack: 7, heal: 6, type: "heal" }
    ],
    [
      { name: "金环执法者", desc: "金环收紧时，罪名才会出现。", hp: 56, attack: 10, type: "attack" },
      { name: "圣歌傀儡", desc: "歌声越整齐，灵魂越空洞。", hp: 60, attack: 8, block: 10, type: "block" }
    ],
    [
      { name: "辉光审判官", desc: "他的光不是照明，而是定罪。", hp: 74, attack: 14, type: "attack" },
      { name: "无瑕骑士", desc: "无瑕意味着所有裂痕都被藏进别人身上。", hp: 78, attack: 12, block: 12, type: "block" }
    ],
    [
      { name: "太阳代理人", desc: "代理太阳发言，要求万物保持洁净。", hp: 104, attack: 18, heal: 8, type: "heal" },
      { name: "空座天使", desc: "神座空悬，它仍在等待命令。", hp: 110, attack: 20, block: 14, type: "attack" }
    ]
  ],
  dark: [
    [
      { name: "影隙爪徒", desc: "从裂缝里爬出的低阶猎手。", hp: 30, attack: 6, type: "attack" },
      { name: "低语残魂", desc: "把失败者的名字念给活人听。", hp: 27, attack: 5, corrupt: 1, type: "corrupt" }
    ],
    [
      { name: "月蚀盗火者", desc: "偷走炉火，再把灰烬卖回城镇。", hp: 43, attack: 8, corrupt: 1, type: "corrupt" },
      { name: "梦魇行商", desc: "只收恐惧作为货币。", hp: 45, attack: 7, type: "attack" }
    ],
    [
      { name: "墓园缝合者", desc: "将遗憾缝成新的肉身。", hp: 62, attack: 10, type: "attack" },
      { name: "黑潮祭司", desc: "每一次祈祷都会让潮水更黑。", hp: 58, attack: 9, corrupt: 2, type: "corrupt" }
    ],
    [
      { name: "无眼猎手", desc: "它看不见你，只记得你的恐惧。", hp: 72, attack: 15, type: "attack" },
      { name: "记忆食者", desc: "吞下过去，然后替你讲述未来。", hp: 76, attack: 12, corrupt: 2, type: "corrupt" }
    ],
    [
      { name: "深渊王嗣", desc: "继承深渊者，必先成为深渊。", hp: 104, attack: 21, corrupt: 2, type: "attack" },
      { name: "终夜圣母", desc: "她拥抱所有夜晚，也拒绝所有黎明。", hp: 112, attack: 17, heal: 10, corrupt: 2, type: "heal" }
    ]
  ]
};

const enemyIcons = {
  "晨曦侍从": "assets/enemies/light-01-dawn-acolyte.png",
  "白烛修女": "assets/enemies/light-02-candle-nun.png",
  "圣纹枪兵": "assets/enemies/light-03-rune-lancer.png",
  "净罪医师": "assets/enemies/light-04-absolution-doctor.png",
  "金环执法者": "assets/enemies/light-05-gold-ring-enforcer.png",
  "圣歌傀儡": "assets/enemies/light-06-hymn-puppet.png",
  "辉光审判官": "assets/enemies/light-07-radiant-judge.png",
  "无瑕骑士": "assets/enemies/light-08-flawless-knight.png",
  "太阳代理人": "assets/enemies/light-09-sun-proxy.png",
  "空座天使": "assets/enemies/light-10-empty-throne-angel.png",
  "影隙爪徒": "assets/enemies/dark-01-rift-claw.png",
  "低语残魂": "assets/enemies/dark-02-whisper-ghost.png",
  "月蚀盗火者": "assets/enemies/dark-03-eclipse-firethief.png",
  "梦魇行商": "assets/enemies/dark-04-nightmare-merchant.png",
  "墓园缝合者": "assets/enemies/dark-05-grave-stitcher.png",
  "黑潮祭司": "assets/enemies/dark-06-black-tide-priest.png",
  "无眼猎手": "assets/enemies/dark-07-eyeless-hunter.png",
  "记忆食者": "assets/enemies/dark-08-memory-eater.png",
  "深渊王嗣": "assets/enemies/dark-09-abyss-heir.png",
  "终夜圣母": "assets/enemies/dark-10-endless-night-mother.png"
};

const lexicon = {
  light: {
    光: 2, 光明: 4, 太阳: 4, 黎明: 3, 晨曦: 3, 圣: 2, 神圣: 4,
    守护: 4, 治愈: 4, 希望: 4, 誓言: 3, 审判: 3, 净化: 4,
    秩序: 3, 祝福: 3, 灯塔: 3, 星: 2, 火: 1, 白: 1, 慈悲: 3
  },
  dark: {
    暗: 2, 黑暗: 4, 深渊: 4, 月: 2, 月亮: 3, 终夜: 4, 影: 2,
    献祭: 4, 诅咒: 4, 腐化: 4, 梦魇: 4, 血: 3, 死亡: 4,
    记忆: 2, 低语: 3, 虚无: 3, 裂隙: 3, 恶: 2, 痛苦: 3
  },
  defense: ["守护", "壁垒", "盾", "誓言", "灯塔", "庇护", "城墙", "白"],
  heal: ["治愈", "慈悲", "祝福", "复苏", "生命", "黎明", "花"],
  attack: ["审判", "矛", "剑", "火", "血", "爪", "毁灭", "雷", "刃", "枪"],
  risk: ["献祭", "血", "腐化", "深渊", "诅咒", "死亡", "痛苦"]
};

const baseDecks = {
  light: [
    card("圣光斩", "light", 1, "attack", 7, 0, 0, 0, "造成 7 点伤害。"),
    card("圣光斩", "light", 1, "attack", 7, 0, 0, 0, "造成 7 点伤害。"),
    card("守护祷言", "light", 1, "skill", 0, 6, 0, -1, "获得 6 点护盾，净化 1 点腐化。"),
    card("守护祷言", "light", 1, "skill", 0, 6, 0, -1, "获得 6 点护盾，净化 1 点腐化。"),
    card("太阳矛", "light", 2, "attack", 12, 0, 0, 0, "造成 12 点伤害。")
  ],
  dark: [
    card("影刃", "dark", 1, "attack", 8, 0, 0, 1, "造成 8 点伤害，获得 1 点腐化。"),
    card("影刃", "dark", 1, "attack", 8, 0, 0, 1, "造成 8 点伤害，获得 1 点腐化。"),
    card("夜幕", "dark", 1, "skill", 0, 5, 0, 1, "获得 5 点护盾，获得 1 点腐化。"),
    card("血契", "dark", 1, "attack", 13, 0, 2, 1, "失去 2 点生命，造成 13 点伤害。"),
    card("深渊回响", "dark", 2, "attack", 10, 0, 0, 2, "造成 10 点伤害，腐化越高越危险。")
  ]
};

const state = {
  side: null,
  stage: 1,
  player: null,
  enemy: null,
  deck: [],
  drawPile: [],
  discardPile: [],
  hand: [],
  log: [],
  forgedCard: null
};

function card(name, alignment, cost, type, damage, block, selfDamage, corruption, text) {
  return { id: crypto.randomUUID(), name, alignment, cost, type, damage, block, selfDamage, corruption, text };
}

function cloneCard(source) {
  return { ...source, id: crypto.randomUUID() };
}

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function shuffle(list) {
  return list
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

function show(screenId) {
  ["startScreen", "battleScreen", "forgeScreen", "endScreen"].forEach((id) => {
    $(`#${id}`).classList.toggle("hidden", id !== screenId);
  });
}

function startRun(side) {
  state.side = side;
  state.stage = 1;
  state.player = { hp: 72, maxHp: 72, block: 0, energy: 3, maxEnergy: 3, corruption: 0 };
  state.deck = baseDecks[side].map(cloneCard);
  state.discardPile = [];
  state.log = [];
  $("#gameShell").classList.toggle("dark-run", side === "dark");
  beginBattle();
}

function beginBattle() {
  const enemySide = state.side === "light" ? "dark" : "light";
  const enemyTemplate = pick(enemies[enemySide][state.stage - 1]);
  state.enemy = { ...enemyTemplate, maxHp: enemyTemplate.hp, guard: enemyTemplate.block || 0, block: 0, side: enemySide };
  state.player.block = 0;
  state.player.energy = state.player.maxEnergy;
  state.drawPile = shuffle(state.deck.map(cloneCard));
  state.discardPile = [];
  state.hand = [];
  addLog(`第 ${state.stage} 关，${state.enemy.name} 出现。`);
  drawCards(5);
  show("battleScreen");
  renderBattle();
}

function drawCards(amount) {
  for (let i = 0; i < amount; i += 1) {
    if (state.drawPile.length === 0) {
      state.drawPile = shuffle(state.discardPile);
      state.discardPile = [];
    }
    const next = state.drawPile.pop();
    if (next) state.hand.push(next);
  }
}

function playCard(cardId) {
  const index = state.hand.findIndex((item) => item.id === cardId);
  const played = state.hand[index];
  if (!played) return;
  if (played.cost > state.player.energy) {
    showToast("能量不够，先打别的牌或结束回合");
    updateTip("能量不够", "黄色圆点是费用。你的能量不足时，这张牌会变暗，不能打出。");
    return;
  }

  state.player.energy -= played.cost;
  state.hand.splice(index, 1);
  state.discardPile.push(played);

  if (played.selfDamage) state.player.hp = Math.max(1, state.player.hp - played.selfDamage);
  if (played.block) state.player.block += played.block;
  if (played.corruption) state.player.corruption = Math.max(0, state.player.corruption + played.corruption);
  if (played.damage) {
    const corruptionBonus = played.alignment === "dark" ? Math.floor(state.player.corruption / 2) : 0;
    damageEnemy(played.damage + corruptionBonus);
  }

  addLog(`你打出了「${played.name}」。`);
  if (state.enemy.hp <= 0) {
    winBattle();
    return;
  }
  updateTip("符文仍在发光", "继续出牌，或结束回合让敌人行动。防御牌会在本回合抵挡攻击。");
  renderBattle();
}

function damageEnemy(amount) {
  const blocked = Math.min(state.enemy.block, amount);
  state.enemy.block -= blocked;
  state.enemy.hp = Math.max(0, state.enemy.hp - (amount - blocked));
}

function endTurn() {
  state.discardPile.push(...state.hand);
  state.hand = [];
  enemyAct();
  if (state.player.hp <= 0) {
    endRun(false);
    return;
  }
  state.player.block = 0;
  state.player.energy = state.player.maxEnergy;
  if (state.player.corruption >= 6) {
    state.player.hp = Math.max(0, state.player.hp - 2);
    addLog("腐化过高，你受到 2 点反噬。");
  }
  drawCards(5);
  updateTip("新回合开始", "能量重新充满，新的手牌已经展开。观察敌人意图，再决定攻击或防御。");
  renderBattle();
}

function enemyAct() {
  const enemy = state.enemy;
  if (enemy.type === "block") {
    enemy.block += enemy.guard || 8;
    addLog(`${enemy.name} 获得 ${enemy.guard || 8} 点护盾。`);
  }
  if (enemy.type === "heal") {
    enemy.hp = Math.min(enemy.maxHp, enemy.hp + (enemy.heal || 6));
    addLog(`${enemy.name} 恢复生命。`);
  }
  if (enemy.corrupt) {
    state.player.corruption += enemy.corrupt;
    addLog(`${enemy.name} 让你的腐化增加 ${enemy.corrupt}。`);
  }

  const damage = enemy.attack + Math.floor((state.stage - 1) / 2);
  const blocked = Math.min(state.player.block, damage);
  state.player.block -= blocked;
  state.player.hp = Math.max(0, state.player.hp - (damage - blocked));
  addLog(`${state.player.block > 0 ? "你挡住了一部分攻击。" : ""}${enemy.name} 攻击了你。`);
}

function winBattle() {
  addLog(`${state.enemy.name} 被击败。`);
  state.stage += 1;
  if (state.stage > 5) {
    endRun(true);
  } else {
    openForge();
  }
}

function openForge() {
  state.forgedCard = null;
  $("#forgeTerms").value = "";
  $("#forgedCard").className = "forged-placeholder";
  $("#forgedCard").textContent = "输入词条后，点击“锻造卡牌”";
  $("#continueButton").classList.add("hidden");
  updateForgePreview();
  show("forgeScreen");
}

function scoreTerms(raw) {
  const text = raw.trim();
  let light = 0;
  let dark = 0;
  let defense = 0;
  let heal = 0;
  let attack = 0;
  let risk = 0;

  Object.entries(lexicon.light).forEach(([word, score]) => {
    if (text.includes(word)) light += score;
  });
  Object.entries(lexicon.dark).forEach(([word, score]) => {
    if (text.includes(word)) dark += score;
  });
  lexicon.defense.forEach((word) => {
    if (text.includes(word)) defense += 2;
  });
  lexicon.heal.forEach((word) => {
    if (text.includes(word)) heal += 2;
  });
  lexicon.attack.forEach((word) => {
    if (text.includes(word)) attack += 2;
  });
  lexicon.risk.forEach((word) => {
    if (text.includes(word)) risk += 2;
  });

  if (!text) return { text, light: 0, dark: 0, defense: 0, heal: 0, attack: 0, risk: 0 };
  if (light === 0 && dark === 0) {
    light = state.side === "light" ? 2 : 1;
    dark = state.side === "dark" ? 2 : 1;
  }
  return { text, light, dark, defense, heal, attack, risk };
}

function forgeCard() {
  const score = scoreTerms($("#forgeTerms").value);
  if (!score.text) {
    showToast("先输入词条，或点一个例子");
    return;
  }

  const diff = score.light - score.dark;
  const alignment = Math.abs(diff) <= 2 ? "chaos" : diff > 0 ? "light" : "dark";
  const power = Math.min(9, Math.max(2, score.light + score.dark + score.attack + score.defense + score.heal + score.risk));
  const wantsDefense = score.defense + score.heal > score.attack + score.risk;
  const cost = power >= 8 ? 2 : 1;
  const name = makeCardName(score.text, alignment, wantsDefense);

  let damage = 0;
  let block = 0;
  let selfDamage = 0;
  let corruption = 0;
  let text = "";

  if (alignment === "light") {
    if (wantsDefense) {
      block = clamp(7 + power, 8, 18);
      corruption = -1;
      text = `获得 ${block} 点护盾，净化 1 点腐化。`;
    } else {
      damage = clamp(6 + power * 2, 8, 22);
      block = score.defense > 0 ? 4 : 0;
      text = block ? `造成 ${damage} 点伤害，获得 ${block} 点护盾。` : `造成 ${damage} 点伤害。`;
    }
  } else if (alignment === "dark") {
    damage = clamp(8 + power * 2, 12, 24);
    block = wantsDefense ? clamp(4 + score.defense, 5, 12) : 0;
    selfDamage = score.risk >= 4 ? 2 : 0;
    corruption = 1 + (power >= 8 ? 1 : 0);
    text = `${selfDamage ? `失去 ${selfDamage} 点生命，` : ""}造成 ${damage} 点伤害${block ? `，获得 ${block} 点护盾` : ""}，获得 ${corruption} 点腐化。`;
  } else {
    damage = clamp(7 + power, 9, 20);
    block = clamp(3 + Math.floor(power / 2), 4, 10);
    corruption = diff < 0 ? 1 : 0;
    text = `造成 ${damage} 点伤害，获得 ${block} 点护盾。`;
  }

  state.forgedCard = card(name, alignment, cost, wantsDefense ? "skill" : "attack", damage, block, selfDamage, corruption, text);
  $("#forgedCard").className = "";
  $("#forgedCard").innerHTML = renderCard(state.forgedCard, false);
  $("#continueButton").classList.remove("hidden");
  showToast(`锻造完成：${state.forgedCard.name}`);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function makeCardName(text, alignment, defense) {
  const clean = text.split(/\s+|,|，|\+|、/).filter(Boolean).slice(0, 2).join("");
  const prefix = alignment === "light" ? "辉光" : alignment === "dark" ? "终夜" : "蚀界";
  const suffix = defense ? "壁垒" : "裁决";
  return `${prefix}${clean || "无名"}${suffix}`;
}

function continueAfterForge() {
  if (!state.forgedCard) return;
  state.deck.push(cloneCard(state.forgedCard));
  addLog(`新卡「${state.forgedCard.name}」加入牌组。`);
  beginBattle();
}

function endRun(victory) {
  show("endScreen");
  $("#endingLabel").textContent = victory ? "通关成功" : "挑战失败";
  $("#endingTitle").textContent = victory ? "你打通了明暗之塔" : "炉火暂时熄灭";
  $("#endingText").textContent = victory
    ? `你以${state.side === "light" ? "光明" : "黑暗"}力量完成五关试炼，牌组共有 ${state.deck.length} 张卡。`
    : "你倒在试炼中，但下一次锻造会更顺手。";
}

function renderBattle() {
  const sideName = state.side === "light" ? "光明力量" : "黑暗力量";
  const enemySideName = state.enemy.side === "light" ? "光明敌人" : "黑暗敌人";
  $("#runLabel").textContent = `${sideName} / 对抗${enemySideName}`;
  $("#stageTitle").textContent = `第 ${state.stage} 关`;
  $("#playerSideName").textContent = sideName;
  $("#playerHp").textContent = `${state.player.hp} / ${state.player.maxHp}`;
  $("#playerHpBar").style.width = `${(state.player.hp / state.player.maxHp) * 100}%`;
  $("#playerBlock").textContent = state.player.block;
  $("#playerEnergy").textContent = `${state.player.energy} / ${state.player.maxEnergy}`;
  $("#playerCorruption").textContent = state.player.corruption;
  $("#deckCount").textContent = state.deck.length;
  $("#enemyName").textContent = state.enemy.name;
  $("#enemyDesc").textContent = state.enemy.desc;
  $("#enemyIcon").src = enemyIcons[state.enemy.name] || "";
  $("#enemyIcon").alt = `${state.enemy.name} 图标`;
  $("#enemyFaction").textContent = enemySideName;
  $("#enemyHp").textContent = `${state.enemy.hp} / ${state.enemy.maxHp}`;
  $("#enemyHpBar").style.width = `${(state.enemy.hp / state.enemy.maxHp) * 100}%`;
  $("#enemyIntent").textContent = intentText(state.enemy);
  $("#enemyZone").classList.toggle("dark-field", state.enemy.side === "dark");
  $("#runProgress").innerHTML = [1, 2, 3, 4, 5]
    .map((step) => `<i class="stage-dot ${step < state.stage ? "done" : step === state.stage ? "active" : ""}"></i>`)
    .join("");
  $("#hand").innerHTML = state.hand.map((item) => renderCard(item, true)).join("");
  $("#combatLog").innerHTML = state.log.map((line) => `<div>${line}</div>`).join("");
  $$(".card[data-id]").forEach((element) => {
    element.addEventListener("click", () => playCard(element.dataset.id));
  });
}

function renderCard(item, interactive) {
  const disabled = interactive && item.cost > state.player.energy ? "disabled" : "";
  const tags = [];
  if (item.damage) tags.push(`<span class="damage">伤害 ${item.damage}</span>`);
  if (item.block) tags.push(`<span class="block">护盾 ${item.block}</span>`);
  if (item.selfDamage) tags.push(`<span class="damage">自损 ${item.selfDamage}</span>`);
  if (item.corruption > 0) tags.push(`<span class="corruption">腐化 +${item.corruption}</span>`);
  if (item.corruption < 0) tags.push(`<span class="block">净化 ${Math.abs(item.corruption)}</span>`);

  return `
    <button class="card ${item.alignment} ${disabled}" type="button" data-id="${item.id}" ${disabled ? "disabled" : ""}>
      <span class="card-top">
        <span class="card-name">${item.name}</span>
        <span class="card-cost">${item.cost}</span>
      </span>
      <span class="card-tags">${tags.join("")}</span>
      <p class="card-text">${item.text}</p>
    </button>
  `;
}

function intentText(enemy) {
  const damage = enemy.attack + Math.floor((state.stage - 1) / 2);
  const pieces = [`攻击 ${damage}`];
  if (enemy.guard) pieces.push(`加护盾 ${enemy.guard}`);
  if (enemy.heal) pieces.push(`治疗 ${enemy.heal}`);
  if (enemy.corrupt) pieces.push(`加腐化 ${enemy.corrupt}`);
  return `敌人下回合会：${pieces.join(" / ")}`;
}

function updateForgePreview() {
  const score = scoreTerms($("#forgeTerms").value);
  const max = Math.max(8, score.light, score.dark);
  $("#lightMeter").style.width = `${Math.min(100, (score.light / max) * 100)}%`;
  $("#darkMeter").style.width = `${Math.min(100, (score.dark / max) * 100)}%`;
}

function updateTip(title, text) {
  $("#tipTitle").textContent = title;
  $("#tipText").textContent = text;
}

function addLog(text) {
  state.log.unshift(text);
  state.log = state.log.slice(0, 8);
}

function showToast(message) {
  const toast = $("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 1500);
}

function copyDeck() {
  const lines = state.deck.map((item) => `- ${item.name} [${item.alignment}] 费用${item.cost}：${item.text}`);
  navigator.clipboard.writeText(lines.join("\n")).then(
    () => showToast("牌组已复制"),
    () => showToast("当前浏览器不支持自动复制")
  );
}

$$(".side-card").forEach((button) => {
  button.addEventListener("click", () => startRun(button.dataset.side));
});

$("#endTurnButton").addEventListener("click", endTurn);
$("#forgeTerms").addEventListener("input", updateForgePreview);
$("#forgeButton").addEventListener("click", forgeCard);
$("#continueButton").addEventListener("click", continueAfterForge);
$("#restartButton").addEventListener("click", () => show("startScreen"));
$("#copyDeckButton").addEventListener("click", copyDeck);
$$(".term-chips button").forEach((button) => {
  button.addEventListener("click", () => {
    $("#forgeTerms").value = button.dataset.term;
    updateForgePreview();
  });
});
