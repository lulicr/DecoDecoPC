# Modelo de Datos (Firebase)

## Colecciones principales

### `users/{userId}`
- `displayName`: string
- `email`: string
- `createdAt`: timestamp
- `lastLoginAt`: timestamp
- `coins`: number
- `stats`:
  - `stickersCollected`: number
  - `projectsCompleted`: number

### `projects/{projectId}`
- `userId`: string
- `title`: string
- `status`: "draft" | "final"
- `canvasData`: object (JSON de Fabric.js)
- `thumbnailUrl`: string
- `createdAt`: timestamp
- `updatedAt`: timestamp

### `inventory/{inventoryId}`
- `userId`: string
- `itemId`: string
- `rarity`: "common" | "rare" | "ultra"
- `acquiredAt`: timestamp

### `items/{itemId}`
- `name`: string
- `type`: "sticker" | "texture" | "frame"
- `rarity`: "common" | "rare" | "ultra"
- `assetUrl`: string

### `missions/{missionId}`
- `name`: string
- `rewardCoins`: number
- `criteria`: object

## Consideraciones
- `canvasData` se guarda como JSON de Fabric.js.
- Los assets se alojan en Firebase Storage.
