import { isObject } from 'utils/objects';

export function getStorageItem<T>(key: string): T | null {
  const storedItem = localStorage.getItem(key);

  if (storedItem === null) {
    return null;
  }

  return JSON.parse(storedItem);
}

export function removeStorageItem(key: string): void {
  localStorage.removeItem(key);
}

export function setStorageItem(key: string, value: unknown): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function updateStorageItem(key: string, value: unknown): void {
  const currentValue = getStorageItem(key);

  if (currentValue === null) {
    throw new Error(`${key} was not found in storage.`);
  }

  localStorage.setItem(
    key,
    JSON.stringify(
      isObject(currentValue)
        ? { ...(currentValue as object), ...(value as object) }
        : value
    )
  );
}
