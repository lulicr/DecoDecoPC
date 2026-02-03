const views = Array.from(document.querySelectorAll('.view'));
const navLinks = Array.from(document.querySelectorAll('.nav-link'));
const viewTriggers = Array.from(document.querySelectorAll('[data-view-trigger]'));

const inventory = {
  common: 24,
  rare: 7,
  ultra: 3,
};

const coinsValue = document.getElementById('coins-value');
const dailyRewardButton = document.getElementById('daily-reward');
const openGachaButton = document.getElementById('open-gacha');
const gachaResult = document.getElementById('gacha-result');
const gachaRarity = document.getElementById('gacha-rarity');
const gachaCanvas = document.getElementById('gacha-canvas');
const gachaContext = gachaCanvas.getContext('2d');

const inventoryCommon = document.getElementById('inventory-common');
const inventoryRare = document.getElementById('inventory-rare');
const inventoryUltra = document.getElementById('inventory-ultra');

let coins = 1250;
let stickerSheetReady = false;

const stickerSheetUrl =
  'https://res.cloudinary.com/dq97z8j1q/image/upload/v1770159076/Gemini_Generated_Image_6e9q2q6e9q2q6e9q_rpx3ya.png';
const stickerSheet = new Image();
stickerSheet.crossOrigin = 'anonymous';
stickerSheet.src = stickerSheetUrl;
stickerSheet.onload = () => {
  stickerSheetReady = true;
};
stickerSheet.onerror = () => {
  gachaResult.textContent = 'Error al cargar stickers';
  gachaRarity.textContent = 'Revisa la conexión';
};

const setActiveView = (viewId) => {
  views.forEach((view) => view.classList.toggle('active', view.id === viewId));
  navLinks.forEach((link) => link.classList.toggle('active', link.dataset.view === viewId));
};

navLinks.forEach((link) => {
  link.addEventListener('click', () => setActiveView(link.dataset.view));
});

viewTriggers.forEach((trigger) => {
  trigger.addEventListener('click', () => setActiveView(trigger.dataset.viewTrigger));
});

const updateInventory = () => {
  inventoryCommon.textContent = inventory.common;
  inventoryRare.textContent = inventory.rare;
  inventoryUltra.textContent = inventory.ultra;
};

const updateCoins = () => {
  coinsValue.textContent = coins.toLocaleString('es-ES');
};

const rarityTable = [
  { label: 'Común', key: 'common', chance: 0.7, color: '#6c7a5f' },
  { label: 'Raro', key: 'rare', chance: 0.2, color: '#c7896e' },
  { label: 'Ultra Raro', key: 'ultra', chance: 0.1, color: '#3e4c3c' },
];

const drawRarity = () => {
  const roll = Math.random();
  let cumulative = 0;
  return rarityTable.find((rarity) => {
    cumulative += rarity.chance;
    return roll <= cumulative;
  });
};

const drawStickerFromSheet = () => {
  if (!stickerSheetReady) {
    gachaResult.textContent = 'Cargando stickers...';
    gachaRarity.textContent = 'Espera un momento';
    return;
  }

  const rows = 5;
  const columns = 5;
  const cellWidth = stickerSheet.width / columns;
  const cellHeight = stickerSheet.height / rows;
  const randomRow = Math.floor(Math.random() * rows);
  const randomColumn = Math.floor(Math.random() * columns);

  gachaContext.clearRect(0, 0, gachaCanvas.width, gachaCanvas.height);
  gachaContext.drawImage(
    stickerSheet,
    randomColumn * cellWidth,
    randomRow * cellHeight,
    cellWidth,
    cellHeight,
    0,
    0,
    gachaCanvas.width,
    gachaCanvas.height,
  );
};

dailyRewardButton.addEventListener('click', () => {
  coins += 100;
  updateCoins();
  dailyRewardButton.textContent = 'Recompensa reclamada';
  dailyRewardButton.disabled = true;
});

openGachaButton.addEventListener('click', () => {
  if (coins < 50) {
    gachaResult.textContent = 'Coins insuficientes';
    gachaRarity.textContent = 'Recarga tu saldo';
    return;
  }

  coins -= 50;
  updateCoins();

  const rarity = drawRarity();
  inventory[rarity.key] += 1;
  updateInventory();

  gachaResult.textContent = `Sticker ${rarity.label}`;
  gachaRarity.textContent = `Rareza: ${rarity.label}`;
  gachaRarity.style.color = rarity.color;
  drawStickerFromSheet();
});

updateCoins();
updateInventory();
drawStickerFromSheet();
