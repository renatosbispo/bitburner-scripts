import { StorageType } from 'types/storage';
import { isObject } from 'utils/objects';

export function getStorageItem<K extends keyof StorageType>(
  key: K
): StorageType[K] | null {
  const storedItem = localStorage.getItem(key);

  if (storedItem === null) {
    return null;
  }

  return JSON.parse(storedItem);
}

export function setStorageItem<K extends keyof StorageType>(
  key: K,
  value: StorageType[K]
): void {
  localStorage.setItem(key, JSON.stringify(value));
}

export function updateStorageItem<K extends keyof StorageType>(
  key: K,
  value: Partial<StorageType[K]>
): void {
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
